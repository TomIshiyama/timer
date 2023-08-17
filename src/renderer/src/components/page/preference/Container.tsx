import { Component } from "solid-js";
import { PreferenceProps } from "./type";
import { Presentational } from "./Presentational";

export const PreferenceContainer: Component<PreferenceProps> = (props) => {
  return <Presentational {...props} />;
};
