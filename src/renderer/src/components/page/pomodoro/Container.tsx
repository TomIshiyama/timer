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

  return (
    <>
    </>
  );
};
