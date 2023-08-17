import { Component } from "solid-js";
import { styled } from "solid-styled-components";
import { Play } from "./PlayPauseButton";
import { JSX } from "solid-js";

type Props = {
  size: "small" | "medium" | "large";
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
};

const sizeMap = {
  small: 32,
  medium: 48,
  large: 64
} as const;

const VerticalLine = styled("div")``;

const SkipButtonComponent: Component<Props & { class?: string }> = (props) => {
  return (
    <button onClick={props.onClick}>
      <div class={props.class}>
        <Play initialSize={sizeMap[props.size] ?? sizeMap.medium} />
        <VerticalLine />
      </div>
    </button>
  );
};

// TODO: button を作る
// TODO: outline オプションを作る
export const SkipButton = styled(SkipButtonComponent)<Props>((props) => ({
  width: `${sizeMap[props.size]}px`,
  height: `${(sizeMap[props.size] * 2) / 3}px`,
  position: "relative",
  "& > div + div": {
    width: `${sizeMap[props.size] / 12}px`,
    height: `${(sizeMap[props.size] * 2) / 3}px`,
    position: "absolute",
    left: `${(sizeMap[props.size] * 2) / 3}px`,
    top: 0,
    backgroundColor: "dimgray"
  }
}));
