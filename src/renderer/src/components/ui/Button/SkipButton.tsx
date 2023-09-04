import { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { ButtonWrapper, Play } from "./PlayPauseButton";
import { JSX } from "solid-js";

type Props = {
  size: "atom" | "small" | "medium" | "large";
  color?: string;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
};

const sizeMap = {
  atom: 24,
  small: 32,
  medium: 48,
  large: 64
} as const;

const VerticalLine = styled("div")``;
const Button = styled("button")`
  background: transparent;
  border: none;
`;

const SkipButtonComponent: Component<Props & { class?: string }> = (props) => {
  return (
    <ButtonWrapper size={sizeMap[props.size]} onClick={props.onClick}>
      <div class={props.class}>
        <Play initialSize={sizeMap[props.size] ?? sizeMap.medium} color={props.color} />
        <VerticalLine />
      </div>
    </ButtonWrapper>
  );
};

// TODO: button を作る
// TODO: outline オプションを作る
export const SkipButton = styled(SkipButtonComponent)<Props>((props) => ({
  width: `${sizeMap[props.size]}px`,
  height: `${(sizeMap[props.size] * 2) / 3}px`,
  position: "relative",
  "& > div": {
    transform: "none"
  },
  "& > div + div": {
    width: `${sizeMap[props.size] / 12}px`,
    height: `${(sizeMap[props.size] * 2) / 3}px`,
    position: "absolute",
    // left: `${(sizeMap[props.size] * 2) / 3}px`,
    top: 0,
    backgroundColor: props.color ?? "dimgray",
    transform: `translateX(${sizeMap[props.size] / 3}px)`
  }
}));
