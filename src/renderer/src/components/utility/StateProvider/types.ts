import { PomodoroProps } from "@renderer/components/page/pomodoro/type";

export type State = {
  pomodoro: PomodoroProps;
  timer: {
    remainingTime: number;
    isRunning: boolean;
    isFinished: boolean;
  };
};
