import { Button } from "@kobalte/core";
import { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { JSX } from "solid-js";

type Props = {
  mode: "play" | "pause";
  size: "atom" | "small" | "medium" | "large";
  outline?: boolean;
  color?: string;
  onPlayClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
  onPauseClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
};

const sizeMap = {
  atom: 24,
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
      outline={props.outline}
    >
      {props.mode === "play" ? (
        <Play initialSize={sizeMap[props.size] ?? sizeMap.medium} color={props.color} />
      ) : (
        <Pause initialSize={sizeMap[props.size] ?? sizeMap.medium} color={props.color} />
      )}
    </ButtonWrapper>
  );
};

export const ButtonWrapper = styled(Button.Root)<{ size: number; outline?: boolean }>((props) => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  borderRadius: "50%",
  cursor: "pointer",
  "&:click": {
    backgroundColor: "#ccc"
  },
  ...(props.outline
    ? {
        border: "1px solid whitesmoke",
        "&:hover": {
          backgroundColor: "white"
        }
      }
    : {
        background: "transparent",
        border: "none"
      })
}));

export const PauseComponent: Component<{ class?: string }> = (props) => {
  return (
    <div class={props.class}>
      <div />
      <div />
    </div>
  );
};

export const Pause = styled(PauseComponent)<{ initialSize: number; color?: string }>((props) => ({
  transition: "all 0.2s ease-in-out",
  top: `${props.initialSize / 4}px`,
  width: `${props.initialSize / 3}px`,
  height: `${props.initialSize / 1.5}px`,
  display: "flex",
  justifyContent: "space-between",
  margin: "0 auto",
  "& > div ": {
    background: props.color ?? "dimgray",
    borderRadius: `${(2 * props.initialSize) / props.initialSize}px`,
    height: "100%",
    width: `${props.initialSize / 10}px`
  }
}));

export const Play = styled("div")<{ initialSize: number; color?: string }>((props) => ({
  transform: `translateX(${props.initialSize / 4}px)`,
  borderTop: `${props.initialSize / 3}px solid transparent`,
  borderBottom: `${props.initialSize / 3}px solid transparent`,
  borderLeft: `${props.initialSize / 3}px solid ${props.color ?? "dimgray"}`
}));
