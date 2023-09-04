import { Component, createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import { COLOR, WHITE } from "../../../utils/color";
import { getTimeWithObject } from "../../../utils/time";
import { BaseButton } from "../../ui/Button/BackButton";
import { CircleCountDown } from "../../ui/CircleCountDown/CircleCountDown";
import { Wrapper } from "../../ui/Container/Container";
import { FooterToolbar } from "../../ui/FooterToolbar/FooterToolbar";
import { PomodoroProps, TIMER_STATE_TRANSITION } from "./type";

export const PomodoroPresentational: Component<PomodoroProps> = (props) => {
  return (
    <Wrapper bgcolor={COLOR.dark.pomodoro[props.status]}>
      <PomodoroInner>
        {props.stateTransition === TIMER_STATE_TRANSITION.done ? (
          <>
            <h1>Well Done!</h1>
            <BaseButton onClick={props.onClickInitialize}> GO BACK </BaseButton>
          </>
        ) : (
          <>
            {/* TODO: fix display position */}
            <p>{`${props.section.current} / ${props.section.limit}`}</p>
            <div>
              <CircleCountDown
                size={props.size ?? 400}
                setTime={props.setTime}
                remainingTime={props.remainingTime}
                status={props.status}
              />
            </div>
          </>
        )}
      </PomodoroInner>
      <FooterToolbar
        mode={
          props.stateTransition === TIMER_STATE_TRANSITION.pause ||
          props.stateTransition === TIMER_STATE_TRANSITION.initial
            ? "play"
            : "pause"
        }
        color={WHITE}
        onClickPlay={props.onClickPlay}
        onClickPause={props.onClickPause}
        onClickSkip={props.onClickSkip}
        onClickForceFinish={props.onClickForceFinish}
      />
    </Wrapper>
  );
};

const PomodoroInner = styled("div")((props) => ({
  backgsectionColor: COLOR.dark.base.background,
  color: COLOR.dark.base.color,
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}));

const Remaining: Component<Pick<PomodoroProps, "remainingTime">> = (props) => {
  // TODO: refactor
  const remaining = createMemo(() => getTimeWithObject(props.remainingTime));

  return (
    <StyledRemaining>{`${remaining().hours} : ${remaining().minutes} : ${
      remaining().seconds
    }`}</StyledRemaining>
  );
};

const StyledRemaining = styled("p")({
  fontSize: "3rem",
  color: COLOR.dark.base.color
});
