import { Button } from "@kobalte/core";
import { Component } from "solid-js";
import { styled } from "solid-styled-components";

type Props = {
  mode: "play" | "pause";
  size: "small" | "medium" | "large";
};

const sizeMap = {
  small: 32,
  medium: 48,
  large: 64
} as const;

export const PlayPauseButton: Component<Props> = (props) => {
  // TODO: should get dark-mode flag from ThemeProvider
  return (
    <ButtonWrapper size={sizeMap[props.size] ?? sizeMap.medium}>
      {props.mode === "play" ? (
        // <Play initialSize={sizeMap[props.size] ?? sizeMap.medium} />
        <div />
      ) : (
        <Pause initialSize={sizeMap[props.size] ?? sizeMap.medium} />
      )}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled(Button.Root)<{ size: number }>((props) => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  borderRadius: "50%",
  border: "1px solid whitesmoke",
  "&:hover": {
    backgroundColor: "white"
  },
  "&:click": {
    backgroundColor: "#ccc"
  }
}));

export const PauseComponent: Component<{ class?: string }> = (props) => {
  return (
    <div class={props.class}>
      <div />
      <div />
    </div>
  );
};

const Pause = styled(PauseComponent)<{ initialSize: number }>((props) => ({
  transition: "all 0.2s ease-in-out",
  top: `${props.initialSize / 4}px`,
  width: `${props.initialSize / 4}px`,
  height: `${props.initialSize / 2}px`,
  display: "flex",
  justifyContent: "space-between",
  margin: "0 auto",
  "& > div ": {
    background: "dimgray",
    borderRadius: `${(2 * props.initialSize) / props.initialSize}px`,
    height: "100%",
    width: `${props.initialSize / 20}px`
  }
}));
