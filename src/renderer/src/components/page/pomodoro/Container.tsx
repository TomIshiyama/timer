import { Component } from "solid-js";
import { PomodoroProps } from "./type";
import { PomodoroPresentational } from "./Presentational";

export const PomodoroContainer: Component<PomodoroProps> = (props) => {
  return <PomodoroPresentational {...props} />;
};
