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

  return (
    <>
    </>
  );
};
