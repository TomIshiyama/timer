import { Component, JSX } from "solid-js";
import { styled } from "solid-styled-components";
import { ButtonWrapper } from "./PlayPauseButton";

type Props = {
  size: "small" | "medium" | "large";
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
};

// HACK: refactoring with common variable
const sizeMap = {
  small: 32,
  medium: 48,
  large: 64
} as const;

const SquareButtonComponent: Component<Props & { class?: string }> = (props) => {
  return (
    <ButtonWrapper size={sizeMap[props.size]} onClick={props.onClick}>
      <div class={props.class} />
    </ButtonWrapper>
  );
};

export const SquareButton = styled(SquareButtonComponent)<Props>((props) => ({
  width: `${sizeMap[props.size] / 2.2}px`,
  height: `${sizeMap[props.size] / 2.2}px`,
  borderRadius: "2px",
  backgroundColor: "dimgray",
  position: "relative",
  margin: "0 auto"
}));
