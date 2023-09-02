import {
  PomodoroRunningStatus,
  PomodoroState,
  TIMER_RUNNING_STATUS
} from "@renderer/components/page/pomodoro/type";
import { useContext, createMemo, Accessor } from "solid-js";
import { StateContext } from "../StateProvider/StateProvider";

type UseTimeMovementReturns = {
  isNextShortBreak: Accessor<boolean>;
  isNextLongBreak: Accessor<boolean>;
  isNextFinish: Accessor<boolean>;
  getNextStatus: Accessor<PomodoroRunningStatus>;
  getNextPomodoroParameters: Accessor<Pick<PomodoroState, "status" | "setTime" | "remainingTime">>;
  //   state: State["pomodoro"];
  //   setState: SetStoreFunction<State["pomodoro"]>;
};

export function useTimeMovement(): UseTimeMovementReturns {
  const { state, setState } = useContext(StateContext);

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

  return {
    isNextShortBreak,
    isNextLongBreak,
    isNextFinish,
    getNextStatus,
    getNextPomodoroParameters
  };
}
