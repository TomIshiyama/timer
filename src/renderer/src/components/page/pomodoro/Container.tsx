import { StateContext } from "@renderer/components/utility/StateProvider/StateProvider";
import { useTimeMovement } from "@renderer/components/utility/TimeMovement/useTimeMovement";
import { Component, onCleanup, onMount, useContext } from "solid-js";
import { WORK_AUDIO } from "../../../assets/sounds/sounds";
import { getTimeLiteral } from "../../../utils/time";
import { useWindowRect } from "../../../utils/useWindowRect";
import { PomodoroPresentational } from "./Presentational";
import { PomodoroProps, TIMER_RUNNING_STATUS, TIMER_STATE_TRANSITION } from "./type";

export const PomodoroContainer: Component<PomodoroProps> = (props) => {
  const { state, setState } = useContext(StateContext);

  const { getRect } = useWindowRect();

  // HACK: create a new file for usePomodoroTimer hooks
  const { getNextPomodoroParameters, isNextFinish, clear, playTurnOverAudio } = useTimeMovement();

  // handlers
  const onClickPlay = (): void => {
    // setState("pomodoro", "isRunning", true);
    setState("pomodoro", "stateTransition", TIMER_STATE_TRANSITION.running);
    setState("pomodoro", "currentAudio", WORK_AUDIO[state.pomodoro.sounds.work]);
    const title = getTimeLiteral(state.pomodoro.remainingTime);
    window.electronAPI.setTrayTitle(title);
  };

  const onClickPause = (): void => {
    console.log("onClickPause");
    setState("pomodoro", {
      stateTransition: TIMER_STATE_TRANSITION.pause,
      setTime: state.pomodoro.remainingTime
    });
    clear(state.pomodoro.intervalId);
    window.electronAPI.setTrayTitle("pause");
  };

  const goNextSection = (): void => {
    clear(state.pomodoro.intervalId);
    setState("pomodoro", (prev) => ({
      ...getNextPomodoroParameters(),
      ...(isNextFinish() && { stateTransition: TIMER_STATE_TRANSITION.done }),
      // after work section, section.current will be incremented
      ...(state.pomodoro.status !== TIMER_RUNNING_STATUS.work && {
        section: {
          ...state.pomodoro.section,
          current: state.pomodoro.section.current + 1
        }
      })
    }));
    playTurnOverAudio();
  };

  // HACK: create a constant for finished status
  // When click the finish button
  const forceFinish = (): void => {
    // HACK: initial state
    setState("pomodoro", {
      status: TIMER_RUNNING_STATUS.work,
      stateTransition: TIMER_STATE_TRANSITION.initial,
      // HACK: there is the same code on StateProvider
      work: state.preference.work,
      remainingTime: state.preference.work,
      setTime: state.preference.work,
      shortBreak: state.preference.shortBreak,
      longBreak: state.preference.longBreak,
      longBreakInterval: state.preference.longBreakInterval,
      section: { current: 1, limit: state.preference.sectionLimit }
    });
    clear(state.pomodoro.intervalId);
  };

  const onClickInitialize = (): void => {
    forceFinish();
  };

  // when transition is "initial", move latest preference settings to pomodoro state.
  onMount(() => {
    if (state.pomodoro.stateTransition !== TIMER_STATE_TRANSITION.initial) return;
    console.log("pomodoro rendered");
    setState("pomodoro", {
      ...state.pomodoro,
      work: state.preference.work,
      remainingTime: state.preference.work,
      setTime: state.preference.work,
      shortBreak: state.preference.shortBreak,
      longBreak: state.preference.longBreak,
      longBreakInterval: state.preference.longBreakInterval,
      section: { ...state.pomodoro.section, limit: state.preference.sectionLimit },
      sounds: { ...state.preference.sounds }
    });
  });

  onMount(() => {
    if (state.pomodoro.stateTransition === TIMER_STATE_TRANSITION.done) {
      forceFinish();
    }
  });

  onCleanup(() => {
    console.log("cleaned");
    if (state.pomodoro.stateTransition === TIMER_STATE_TRANSITION.done) {
      forceFinish();
    }
  });

  return (
    <>
      {/* <div>window dimensions : {JSON.stringify(getRect())}</div>
      <div>state pomodoro : {JSON.stringify(state.pomodoro)}</div> */}
      <PomodoroPresentational
        // HACK: use spread syntax
        setTime={state.pomodoro[state.pomodoro.status]}
        status={state.pomodoro.status}
        remainingTime={state.pomodoro.remainingTime}
        stateTransition={state.pomodoro.stateTransition}
        onClickPlay={onClickPlay}
        onClickPause={onClickPause}
        onClickSkip={goNextSection}
        onClickForceFinish={forceFinish}
        onClickInitialize={onClickInitialize}
        section={state.pomodoro.section}
        size={getRect().width < getRect().height ? getRect().width / 1.5 : getRect().height / 1.5}
      />
    </>
  );
};
