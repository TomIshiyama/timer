import { Component, createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import { PomodoroProps, TIMER_STATE_TRANSITION } from "./type";
import { COLOR } from "../../../utils/color";
import { PlayPauseButton } from "../../ui/Button/PlayPauseButton";
import { getTimeWithObject } from "../../../utils/time";
import { CircleCountDown } from "../../ui/CircleCountDown/CircleCountDown";
import { SkipButton } from "../../ui/Button/SkipButton";
import { SquareButton } from "../../ui/Button/SquareButton";
import { Container } from "../../ui/Container/Container";

export const PomodoroPresentational: Component<PomodoroProps> = (props) => {
  return (
    <Container>
      <Style>
        <h2>Pomodoro timer</h2>
        {props.stateTransition === TIMER_STATE_TRANSITION.done ? (
          <>
            <h1>Well Done!</h1>
            <button onClick={props.onClickInitialize}> GO BACK </button>
          </>
        ) : (
          <>
            {/* TODO: fix display position */}
            <p>session: {`${props.section.current} / ${props.section.limit}`}</p>
            <div>
              <CircleCountDown
                size={props.size ?? 400}
                setTime={props.setTime}
                remainingTime={props.remainingTime}
              />
            </div>
            <div>
              <PlayPauseButton
                size="large"
                mode={
                  props.stateTransition === TIMER_STATE_TRANSITION.pause ||
                  props.stateTransition === TIMER_STATE_TRANSITION.initial
                    ? "play"
                    : "pause"
                }
                onPlayClick={props.onClickPlay}
                onPauseClick={props.onClickPause}
              />
              <SkipButton size={"large"} onClick={props.onClickSkip} />
              <SquareButton size={"large"} onClick={props.onClickForceFinish} />
            </div>
          </>
        )}
      </Style>
    </Container>
  );
};

const Style = styled("div")((props) => ({
  backgsectionColor: COLOR.dark.base.background,
  color: COLOR.dark.base.color,
  width: "100%",
  height: "100%"
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
