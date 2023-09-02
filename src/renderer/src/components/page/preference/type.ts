import { Accessor, JSX } from "solid-js";

export type PreferenceIDB = {
  id: "preference";
  work: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
  sectionLimit: number;
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
};

export type PreferenceState = {
  work: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
  sectionLimit: number;
};
