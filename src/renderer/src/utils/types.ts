import { Component } from "solid-js";
import { JSX } from "solid-js/types/jsx";

export type Key = string | number;

export type ComponentParameters<T extends Component> = T extends (props: infer P) => JSX.Element
  ? P
  : never;
