import { PomodoroState } from "@renderer/components/page/pomodoro/type";
import { PreferenceState } from "@renderer/components/page/preference/type";

export type State = {
  pomodoro: PomodoroState;
  timer: {
    remainingTime: number;
    isRunning: boolean;
    isFinished: boolean;
  };
  preference: PreferenceState;
};
