import { Input } from "@renderer/components/ui/form/Input";
import { Component } from "solid-js";
import { PreferenceProps } from "./type";

const DEFAULT_VALUES = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 5,
  sectionLimit: 10
};

export const Presentational: Component<PreferenceProps> = () => {
  return (
    <>
      <h1>hello preference</h1>

      <Input name="work" type="number" defaultValue={DEFAULT_VALUES.work} />
      <Input name="shortBreak" type="number" defaultValue={DEFAULT_VALUES.shortBreak} />
      <Input name="longBreak" type="number" defaultValue={DEFAULT_VALUES.longBreak} />
      <Input
        name="longBreakInterval"
        type="number"
        defaultValue={DEFAULT_VALUES.longBreakInterval}
      />
      <Input name="sectionLimit" type="number" defaultValue={DEFAULT_VALUES.sectionLimit} />
    </>
  );
};
