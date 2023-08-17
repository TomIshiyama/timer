import { Component, JSX, createEffect, onCleanup, useContext } from "solid-js";
import { TIMER_RUNNING_STATUS, TIMER_STATE_TRANSITION } from "../../page/pomodoro/type";
import { StateContext, mockPomodoroTimer } from "../StateProvider/StateProvider";

const INTERVAL_DELAY = 1000;

type Props = {
  children: JSX.Element;
};

export const TimeMovement: Component<Props> = (props) => {
  console.log("state provider");

  // HACK: 呼び出すWrapper を設けても良い
  const { state, setState } = useContext(StateContext);

  // TODO: feature of a long break session.
  let id: number | undefined = undefined;
  createEffect(() => {
    const futureTime = Date.now() + state.pomodoro.setTime;
    console.log("on mount! futureTime", futureTime, state);
    if (state.pomodoro.stateTransition !== TIMER_STATE_TRANSITION.running) {
      clearInterval(state.pomodoro.intervalId);
      setState("pomodoro", "intervalId", undefined);
      return;
    }
    // NOTE: window オブジェクトを明示することで NodeJS.Timer を防止する
    id = window.setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = futureTime - currentTime;
      setState("pomodoro", { remainingTime });
      // when finish a current section
      if (futureTime < currentTime) {
        // when have achieved every section.
        if (state.pomodoro.section.current >= state.pomodoro.section.limit) {
          // setState("pomodoro", { isFinished: true });
          setState("pomodoro", "stateTransition", TIMER_STATE_TRANSITION.done);
          // quit pomodoro timer automatically
          clearInterval(state.pomodoro.intervalId);
          setState("pomodoro", "intervalId", undefined);
          return;
        }

        // when have not achieved, count number of the section up.
        if (state.pomodoro.status === TIMER_RUNNING_STATUS.work) {
          setState("pomodoro", "section", "current", (prev) => prev + 1);

          // check if the next sections is long break
          if (state.pomodoro.section.current % mockPomodoroTimer.longBreakInterval === 0) {
            setState("pomodoro", (prev) => ({
              ...prev,
              status: TIMER_RUNNING_STATUS.longBreak,
              setTime: mockPomodoroTimer.longBreak,
              // work: mockPomodoroTimer.longBreak, // FIXME: remove mockwork
              remainingTime: mockPomodoroTimer.longBreak
            }));
          } else {
            setState("pomodoro", (prev) => ({
              ...prev,
              status: TIMER_RUNNING_STATUS.shortBreak,
              // work: mockPomodoroTimer.shortBreak, // FIXME: remove mockwork
              setTime: mockPomodoroTimer.shortBreak,
              remainingTime: mockPomodoroTimer.shortBreak
            }));
          }
        } else {
          // when have finished a short or long break time
          // set work status
          setState("pomodoro", (prev) => ({
            ...prev,
            status: TIMER_RUNNING_STATUS.work,
            setTime: mockPomodoroTimer.work,
            // work: mockPomodoroTimer.work, // FIXME: remove mockwork
            remainingTime: mockPomodoroTimer.work
          }));
        }
      }
    }, INTERVAL_DELAY);

    setState("pomodoro", "intervalId", id);
  });

  onCleanup(() => {
    console.log("onCleanup");
    clearInterval(state.pomodoro.intervalId);
    setState("pomodoro", "intervalId", undefined);
  });

  return props.children;
};
