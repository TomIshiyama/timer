import { Component, JSX, createEffect, createMemo, onCleanup, useContext } from "solid-js";
import { TIMER_RUNNING_STATUS, TIMER_STATE_TRANSITION } from "../../page/pomodoro/type";
import { StateContext } from "../StateProvider/StateProvider";
import { useTimeMovement } from "./useTimeMovement";

const INTERVAL_DELAY = 1000;

type Props = {
  children: JSX.Element;
};

export const TimeMovement: Component<Props> = (props) => {
  // HACK: 呼び出すWrapper を設けても良い
  const { state, setState } = useContext(StateContext);

  const { getNextPomodoroParameters, isNextFinish } = useTimeMovement();

  let id: number | undefined = undefined;
  createEffect(() => {
    const futureTime = Date.now() + state.pomodoro.setTime;
    setState("pomodoro", "futureTime", futureTime);
    if (state.pomodoro.stateTransition !== TIMER_STATE_TRANSITION.running) {
      clearInterval(state.pomodoro.intervalId);
      setState("pomodoro", "intervalId", undefined);
      clearInterval(id);
      return;
    }
    // NOTE: window オブジェクトを明示することで NodeJS.Timer を防止する
    id = window.setInterval(() => {
      if (state.pomodoro.stateTransition !== TIMER_STATE_TRANSITION.running) {
        clearInterval(state.pomodoro.intervalId);
        setState("pomodoro", "intervalId", undefined);
        clearInterval(id);
        return;
      }
      const currentTime = Date.now();
      const remainingTime = state.pomodoro.futureTime - currentTime;
      setState("pomodoro", { remainingTime });
      if (state.pomodoro.futureTime < currentTime) {
        const params = getNextPomodoroParameters();
        setState("pomodoro", {
          ...params,
          ...(isNextFinish() && {
            stateTransition: TIMER_STATE_TRANSITION.done
          }),
          ...(state.pomodoro.status !== TIMER_RUNNING_STATUS.work && {
            section: {
              ...state.pomodoro.section,
              current: state.pomodoro.section.current + 1
            }
          })
        });
        console.log("intervalId", id, state.pomodoro.intervalId);
        clearInterval(state.pomodoro.intervalId);
        setState("pomodoro", "intervalId", undefined);
        clearInterval(id);
        return;
      }
    }, INTERVAL_DELAY);

    setState("pomodoro", "intervalId", id);
    console.log("useeffect final ", state, id);
  });

  onCleanup(() => {
    console.log("onCleanup");
    setState("pomodoro", "intervalId", undefined);
    clearInterval(id);
  });

  return props.children;
};
