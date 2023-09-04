import { Component, createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import * as CSS from "csstype";
import { JSX } from "solid-js";
import { COLOR } from "../../../utils/color";

type TimerProps = {
  minutes: number;
  seconds: number;
  size: number;
  style?: CSS.Properties;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
};

export const Timer: Component<TimerProps> = (props) => {
  const minutes = createMemo(() => props.minutes.toString().padStart(2, "0"));
  const seconds = createMemo(() => props.seconds.toString().padStart(2, "0"));
  return (
    <Wrapper size={props.size} onClick={props.onClick}>
      <Span>{minutes()}</Span>
      <Colons>:</Colons>
      <Span>{seconds()}</Span>
    </Wrapper>
  );
};

const Span = styled("span")({});

const Colons = styled("span")({
  padding: "0 10px"
});

const Wrapper = styled("button")<Pick<TimerProps, "size" | "style">>((props) => ({
  fontSize: `${props.size / 5}px`,
  width: `${props.size}px`,
  height: `${props.size * (9 / 21)}px`,
  padding: `${props.size / 20}px`,
  color: COLOR.dark.base.color,
  backgroundColor: "transparent",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "'NotoSansJP', 'Nunito Sans'",
  fontWeight: 100,
  border: "none"
}));
