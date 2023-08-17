import { JSX } from "solid-js";

export const TIMER_RUNNING_STATUS = {
  work: "work",
  shortBreak: "shortBreak",
  longBreak: "longBreak"
} as const;

export const TIMER_STATE_TRANSITION = {
  initial: "initial",
  running: "running",
  pause: "pause",
  done: "done"
} as const;

export type PomodoroRunningStatus =
  (typeof TIMER_RUNNING_STATUS)[keyof typeof TIMER_RUNNING_STATUS];
export type PomodoroStateTransition =
  (typeof TIMER_STATE_TRANSITION)[keyof typeof TIMER_STATE_TRANSITION];

type Section = {
  current: number;
  limit: number;
};

export type PomodoroProps = {
  remainingTime: number;
  setTime: number;
  status: PomodoroRunningStatus;
  stateTransition: PomodoroStateTransition;
  section: Section;
  futureTime?: number;
  size?: number;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
  onClickPlay?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
  onClickPause?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
  onClickSkip?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
  onClickForceFinish?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
  onClickInitialize?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
  on?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
  //   displayMode: "desktop" | "tray" | "minimize";
};

export type PomodoroState = {
  remainingTime: number;
  setTime: number;
  // HACK: should be included meta property
  work: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
  status: PomodoroRunningStatus;
  stateTransition: PomodoroStateTransition;
  section: Section;
  intervalId: number | undefined;
  futureTime?: number;
};
