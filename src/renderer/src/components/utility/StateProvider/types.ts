import { PomodoroState } from "@renderer/components/page/pomodoro/type";

export type State = {
  pomodoro: PomodoroState;
  timer: {
    remainingTime: number;
    isRunning: boolean;
    isFinished: boolean;
  };
};
