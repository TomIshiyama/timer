import { StateContext } from "@renderer/components/utility/StateProvider/StateProvider";
import { Component, createMemo, onMount, useContext } from "solid-js";
import { getTimeLiteral } from "../../../utils/time";
import { useWindowRect } from "../../../utils/useWindowRect";
import { PomodoroPresentational } from "./Presentational";
import { PomodoroProps, TIMER_RUNNING_STATUS, TIMER_STATE_TRANSITION } from "./type";

export const PomodoroContainer: Component<PomodoroProps> = (props) => {
  const { state, setState } = useContext(StateContext);

  const { getRect } = useWindowRect();

  // HACK: create a new file for usePomodoroTimer hooks

  const isNextShortBreak = createMemo(
    () =>
      state.pomodoro.status === TIMER_RUNNING_STATUS.work &&
      state.pomodoro.section.current < state.pomodoro.section.limit
  );

  const isNextLongBreak = createMemo(
    () =>
      state.pomodoro.section.current % state.pomodoro.longBreakInterval === 0 && isNextShortBreak()
  );

  const isNextFinish = createMemo(
    () => state.pomodoro.section.current === state.pomodoro.section.limit
  );

  const getNextStatus = createMemo(() => {
    if (isNextLongBreak()) return TIMER_RUNNING_STATUS.longBreak;
    if (isNextShortBreak()) return TIMER_RUNNING_STATUS.shortBreak;
    return TIMER_RUNNING_STATUS.work;
  });

  const getNextPomodoroParameters = createMemo(() => {
    if (isNextLongBreak())
      return {
        status: TIMER_RUNNING_STATUS.longBreak,
        setTime: state.pomodoro.longBreak,
        remainingTime: state.pomodoro.longBreak
      };

    if (isNextShortBreak())
      return {
        status: TIMER_RUNNING_STATUS.shortBreak,
        setTime: state.pomodoro.shortBreak,
        remainingTime: state.pomodoro.shortBreak
      };

    return {
      status: TIMER_RUNNING_STATUS.work,
      setTime: state.pomodoro.work,
      remainingTime: state.pomodoro.work
    };
  });

  // handlers
  const onClickPlay = (): void => {
    // setState("pomodoro", "isRunning", true);
    setState("pomodoro", "stateTransition", TIMER_STATE_TRANSITION.running);
    const title = getTimeLiteral(state.pomodoro.remainingTime);
    window.electronAPI.setTrayTitle(title);
  };

  const onClickPause = (): void => {
    console.log("onClickPause");
    clearInterval(state.pomodoro.intervalId);
    setState("pomodoro", {
      stateTransition: TIMER_STATE_TRANSITION.pause,
      // [state.pomodoro.status]: state.pomodoro.remainingTime,
      setTime: state.pomodoro.remainingTime,
      intervalId: undefined
    });
    window.electronAPI.setTrayTitle("pause");
  };

  const goNextSection = (): void => {
    clearInterval(state.pomodoro.intervalId);
    setState("pomodoro", "intervalId", undefined);
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
  };

  // HACK: create a constant for finished status
  // When click the finish button
  const forceFinish = (): void => {
    // HACK: initial state
    clearInterval(state.pomodoro.intervalId);
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
      section: { current: 1, limit: state.preference.sectionLimit },
      intervalId: undefined
    });
  };

  const onClickInitialize = (): void => {
    // forceInitialize();
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
      section: { ...state.pomodoro.section, limit: state.preference.sectionLimit }
    });
  });

  return (
    <>
      <div>window dimensions : {JSON.stringify(getRect())}</div>
      <div>state pomodoro : {JSON.stringify(state.pomodoro)}</div>
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
