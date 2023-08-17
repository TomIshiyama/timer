import { Component } from "solid-js";
import { PomodoroProps } from "./type";
import { PomodoroPresentational } from "./Presentational";

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
      state.pomodoro.section.current % mockPomodoroTimer.longBreakInterval === 0 &&
      isNextShortBreak()
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
        // work: mockPomodoroTimer.longBreak, // FIXME: remove mockwork
        setTime: mockPomodoroTimer.longBreak,
        remainingTime: mockPomodoroTimer.longBreak
      };

    if (isNextShortBreak())
      return {
        status: TIMER_RUNNING_STATUS.shortBreak,
        setTime: mockPomodoroTimer.shortBreak,
        remainingTime: mockPomodoroTimer.shortBreak
      };

    return {
      status: TIMER_RUNNING_STATUS.work,
      setTime: mockPomodoroTimer.work,
      remainingTime: mockPomodoroTimer.work
    };
  });

  const forceInitialize = (): void => {
    setState("pomodoro", {
      ...JSON.parse(JSON.stringify(mockPomodoroTimer))
    });
  };

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

  return (
    <>
    </>
  );
};
