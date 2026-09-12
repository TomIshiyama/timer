import { Component, JSX } from "solid-js";

export type Key = string | number;

export type ComponentParameters<T extends Component> = T extends (props: infer P) => JSX.Element
  ? P
  : never;
