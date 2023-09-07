import { AlmostDone, Break, TurnOver, Work } from "@renderer/assets/sounds/sounds";
import { Accessor, JSX } from "solid-js";

export type PreferenceIDB = {
  id: "preference";
  work: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
  sectionLimit: number;
  opacity: number;
  sounds: Sound;
};

export type Values = Omit<PreferenceIDB, "id">;

export type PreferenceProps = {
  defaultValues: Values;
  getValues?: Accessor<Values>;
  onChangeWork?: JSX.ChangeEventHandler<HTMLInputElement, Event> | undefined;
  onChangeShortBreak?: JSX.ChangeEventHandler<HTMLInputElement, Event> | undefined;
  onChangeLongBreak?: JSX.ChangeEventHandler<HTMLInputElement, Event> | undefined;
  onChangeLongBreakInterval?: JSX.ChangeEventHandler<HTMLInputElement, Event> | undefined;
  onChangeSectionLimit?: JSX.ChangeEventHandler<HTMLInputElement, Event> | undefined;
  onChangeOpacity?: JSX.ChangeEventHandler<HTMLInputElement, Event> | undefined;
  onChangeSoundsParams?: JSX.ChangeEventHandler<HTMLInputElement, Event> | undefined;
};

export type PreferenceState = {
  // HACK: nested structure
  // for pomodoro timer
  work: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
  sectionLimit: number;
  opacity: number;
  // for sounds
  sounds: Sound;
};

export type Sound = {
  volume: number; // 0.0 to 1.0
  work: Work;
  shortBreak: Break;
  longBreak: Break;
  turnOver: TurnOver;
  almostDone: AlmostDone;
};
