import {
  PomodoroRunningStatus,
  PomodoroState,
  TIMER_RUNNING_STATUS,
  TIMER_STATE_TRANSITION
} from "@renderer/components/page/pomodoro/type";
import { useContext, createMemo, Accessor } from "solid-js";
import { StateContext } from "../StateProvider/StateProvider";
import {
  BREAK_AUDIO,
  WORK_AUDIO,
  pauseAudioLoop,
  playDone,
  playTurnOver
} from "../../../assets/sounds/sounds";

type UseTimeMovementReturns = {
  isNextShortBreak: Accessor<boolean>;
  isNextLongBreak: Accessor<boolean>;
  isNextFinish: Accessor<boolean>;
  isRunning: Accessor<boolean>;
  getNextStatus: Accessor<PomodoroRunningStatus>;
  getNextPomodoroParameters: Accessor<Pick<PomodoroState, "status" | "setTime" | "remainingTime">>;
  clear: (intervalId: number | undefined) => void;
  playTurnOverAudio: () => void;
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

  const isRunning = createMemo(
    () => state.pomodoro.stateTransition === TIMER_STATE_TRANSITION.running
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
        remainingTime: state.pomodoro.longBreak,
        currentAudio: BREAK_AUDIO[state.pomodoro.sounds.longBreak]
      };

    if (isNextShortBreak())
      return {
        status: TIMER_RUNNING_STATUS.shortBreak,
        setTime: state.pomodoro.shortBreak,
        remainingTime: state.pomodoro.shortBreak,
        currentAudio: BREAK_AUDIO[state.pomodoro.sounds.shortBreak]
      };

    return {
      status: TIMER_RUNNING_STATUS.work,
      setTime: state.pomodoro.work,
      remainingTime: state.pomodoro.work,
      currentAudio: WORK_AUDIO[state.pomodoro.sounds.work]
    };
  });

  // TODO: make preference of a turnOver sound .
  // if wrap it with createMemo, the following function will be executed.
  const playTurnOverAudio = (): void => {
    console.log("playturnover ");
    if (isNextLongBreak()) {
      playTurnOver(state.pomodoro.sounds.turnOver, state.preference.sounds.volume);
      return;
    }
    if (isNextShortBreak()) {
      playTurnOver(state.pomodoro.sounds.turnOver, state.preference.sounds.volume);
      return;
    }

    if (isNextFinish() && state.pomodoro.stateTransition === TIMER_STATE_TRANSITION.done) {
      playDone("shouts");
      return;
    }
    playTurnOver(state.pomodoro.sounds.turnOver, state.preference.sounds.volume);
    return;
  };

  const clear = (intervalId: number | undefined): void => {
    pauseAudioLoop(state.pomodoro.currentAudio);
    clearInterval(intervalId);
    setState("pomodoro", { intervalId: undefined, currentAudio: undefined });
  };

  return {
    isNextShortBreak,
    isNextLongBreak,
    isNextFinish,
    isRunning,
    getNextStatus,
    getNextPomodoroParameters,
    clear,
    playTurnOverAudio
  };
}
