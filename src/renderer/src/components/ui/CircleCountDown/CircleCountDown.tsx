import { Component, createEffect, createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import { Timer } from "./Timer";
import { getTimeWithoutHours } from "../../../utils/time";
import { JSX } from "solid-js";
import { COLOR } from "../../../utils/color";

type CircleCountDownProps = {
  size: number;
  setTime: number;
  remainingTime: number;
  mode?: "play" | "pause";
  status?: string;
  onClickTimer?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
};

export const CircleCountDown: Component<CircleCountDownProps> = (props) => {
  const time = createMemo(() => getTimeWithoutHours(props.remainingTime));

  createEffect(() => {
    const semiCircle = document.querySelectorAll<HTMLElement>("#circle-container > div");
    if (semiCircle == null) return;

    const angle = 360 * (1 - props.remainingTime / props.setTime);
    if (angle <= 180) {
      semiCircle[0].style.transform = `rotate(${angle}deg)`;
      semiCircle[1].style.transform = `rotate(${angle}deg)`;
      semiCircle[2].style.display = `block`;
    } else {
      semiCircle[0].style.transform = `rotate(180deg)`;
      semiCircle[1].style.transform = `rotate(${angle}deg)`;
      semiCircle[2].style.display = `none`;
    }
  });

  return (
    <Wrapper size={props.size}>
      <CircleContainer size={props.size} id="circle-container">
        <SemiCircle size={props.size} />
        <SemiCircle size={props.size} />
        <SemiCircle size={props.size} />
        <OutermostCircle size={props.size} />
        <InnerContents size={props.size}>
          <Timer
            onClick={props.onClickTimer}
            minutes={time().minutes}
            seconds={time().seconds}
            size={props.size}
          />
          {props.status && <p>{props.status}</p>}
        </InnerContents>
      </CircleContainer>
    </Wrapper>
  );
};

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const CircleContainer = styled("div")<Pick<CircleCountDownProps, "size">>((props) => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  backgroundColor: COLOR.dark.circleCountDown.background,
  borderRadius: "50%",
  position: "absolute",
  zIndex: 1,
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
  // ...center
}));

const SemiCircle = styled("div")<Pick<CircleCountDownProps, "size">>((props) => ({
  width: `${props.size / 2}px`,
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  transformOrigin: "100% 50%",
  "&:nth-child(1)": {
    backgroundColor: COLOR.dark.circleCountDown.indicator,
    zIndex: 2
  },
  "&:nth-child(2)": {
    backgroundColor: COLOR.dark.circleCountDown.indicator,
    zIndex: 3
  },
  "&:nth-child(3)": {
    backgroundColor: COLOR.dark.circleCountDown.background,
    zIndex: 4
  }
}));

const OutermostCircle = styled("div")<Pick<CircleCountDownProps, "size">>((props) => ({
  backgroundColor: COLOR.dark.circleCountDown.black,
  width: `${props.size * 0.975}px`,
  height: `${props.size * 0.975}px`,
  borderRadius: "50%",
  zIndex: 5
}));

// CircleContainer is actually an absolute position.
// In order to pretend a layering overlapping.
const Wrapper = styled("div")<Pick<CircleCountDownProps, "size">>((props) => ({
  width: `${props.size}px`,
  height: `${props.size}px`
}));

const InnerContents = styled("div")<Pick<CircleCountDownProps, "size">>((props) => ({
  position: "absolute",
  zIndex: 6,
  "& > p": {
    fontSize: `${Math.round(props.size / 16)}px`,
    textAlign: "center"
  }
}));
