import { Component, JSX } from "solid-js";
import { styled } from "solid-styled-components";
import { COLOR, GRID } from "../../../utils/color";
import { TextField } from "@kobalte/core";

type Props = {
  name: string;
  type?: "url" | "number";
  label?: string;
  error?: boolean;
  disabled?: boolean;
  class?: string;
  value?: number | string;
  defaultValue?: number | string;
  placeholder?: string;
  onChange?: JSX.ChangeEventHandler<HTMLInputElement, Event> | undefined;
  min?: number;
  max?: number;
};

const InputComponent: Component<Props> = (props) => {
  return (
    <TextField.Root class={props.class}>
      <TextField.Label>{props.label}</TextField.Label>
      <TextField.Input
        type={props.type}
        name={props.name}
        disabled={props.disabled}
        value={props.value ?? props.defaultValue}
        onChange={props.onChange}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
      />
    </TextField.Root>
  );
};

export const Input = styled(InputComponent)((props) => ({
  padding: `${GRID.half}px`,
  borderRadius: "2px",
  borderBottom: `2px solid ${
    props.error ? COLOR.dark.input.borderError : COLOR.dark.input.border
  } `,
  "& > label": {
    color: COLOR.dark.input.label,
    fontSize: "0.8em",
    paddingBottom: "4px"
  },
  "& > input": {
    color: COLOR.dark.input.color,
    width: "100%",
    border: "none",
    background: "transparent",
    padding: 0,
    "&:focus-visible": { outline: "none" }
  }
}));
