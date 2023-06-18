export type PomodoroProps = {
  remainingTime: number;
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
  round: {
    current: number;
    limit: number;
  };
  //   displayMode: "desktop" | "tray" | "minimize";
};
