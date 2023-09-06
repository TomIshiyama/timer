import { PreferenceState } from "./type";

export const DEFAULT_VALUES: PreferenceState = {
  work: 25 * 60000,
  shortBreak: 5 * 60000,
  longBreak: 15 * 60000,
  longBreakInterval: 5,
  sectionLimit: 10,
  opacity: 1,
  sounds: {
    volume: 1.0,
    work: "clock1",
    shortBreak: "river",
    longBreak: "pond",
    turnOver: "pigeon",
    almostDone: "timerHarry"
  }
};
