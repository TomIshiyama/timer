import { Button } from "@kobalte/core";
import { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { JSX } from "solid-js";

type Props = {
  mode: "play" | "pause";
  size: "small" | "medium" | "large";
  onPlayClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
  onPauseClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
};

const sizeMap = {
  small: 32,
  medium: 48,
  large: 64
} as const;

export const PlayPauseButton: Component<Props> = (props) => {
  // TODO: should get dark-mode flag from ThemeProvider
  return (
    <ButtonWrapper
      onClick={props.mode === "pause" ? props.onPauseClick : props.onPlayClick}
      size={sizeMap[props.size] ?? sizeMap.medium}
    >
      {props.mode === "play" ? (
        <Play initialSize={sizeMap[props.size] ?? sizeMap.medium} />
      ) : (
        <Pause initialSize={sizeMap[props.size] ?? sizeMap.medium} />
      )}
    </ButtonWrapper>
  );
};

export const ButtonWrapper = styled(Button.Root)<{ size: number }>((props) => ({
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

export const Pause = styled(PauseComponent)<{ initialSize: number }>((props) => ({
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

export const Play = styled("div")<{ initialSize: number }>((props) => ({
  transform: `translateX(${props.initialSize / 4}px)`,
  borderTop: `${props.initialSize / 3}px solid transparent`,
  borderBottom: `${props.initialSize / 3}px solid transparent`,
  borderLeft: `${props.initialSize / 3}px solid dimgray`
}));
