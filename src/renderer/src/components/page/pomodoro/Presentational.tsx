import { Component, createMemo } from "solid-js";
import { styled } from "solid-styled-components";
import { PomodoroProps } from "./type";
import { COLOR } from "../../../utils/color";
import { PlayPauseButton } from "../../ui/Button/PlayPauseButton";
import { getTimeWithObject } from "../../../utils/time";

export const PomodoroPresentational: Component<PomodoroProps> = (props) => {
  return (
    <Style>
      <h1>Pomodoro</h1>
      {props.isFinished ? (
        <h1>Well Done!</h1>
      ) : (
        <>
          <p>remaing : {`${props.round.current} / ${props.round.limit}`}</p>
          <Remaining remainingTime={props.remainingTime} />
          <PlayPauseButton size="large" mode={props.isPaused ? "pause" : "play"} />
        </>
      )}
    </Style>
  );
};

const Style = styled("div")((props) => ({
  backgroundColor: COLOR.dark.base.background,
  color: COLOR.dark.base.color
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
