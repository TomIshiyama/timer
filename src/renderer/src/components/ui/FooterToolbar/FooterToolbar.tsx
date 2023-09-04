import { styled } from "solid-styled-components";
import { COLOR } from "../../../utils/color";
import { Component, JSX } from "solid-js";
import { Pause, Play, PlayPauseButton } from "../Button/PlayPauseButton";
import { SkipButton } from "../Button/SkipButton";
import { SquareButton } from "../Button/SquareButton";
import { PomodoroStateTransition } from "../../page/pomodoro/type";

type Props = {
  mode: "play" | "pause";
  //   size: "small" | "medium" | "large";
  color?: string;
  stateTransition?: PomodoroStateTransition;
  onClickPlay?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
  onClickPause?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
  onClickSkip?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
  onClickForceFinish?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
};

const sizeMap = {
  small: 32,
  medium: 48,
  large: 64
} as const;

export const FooterToolbar: Component<Props> = (props) => {
  return (
    <Footer>
      <div>
        <div>
          <PlayPauseButton
            size="atom"
            mode={props.mode}
            onPlayClick={props.onClickPlay}
            onPauseClick={props.onClickPause}
            color={props.color}
          />

          <SkipButton size={"atom"} color={props.color} onClick={props.onClickSkip} />
        </div>
        <div>
          <SquareButton size={"atom"} color={props.color} onClick={props.onClickForceFinish} />
        </div>
      </div>
    </Footer>
  );
};

const Footer = styled("footer")`
  width: 100%;
  height: 32px;
  border-top: 1px solid ${COLOR.dark.footer.border};
  background: linear-gradient(0, #111111, transparent);
  & > div {
    padding: 0 10px;

    /* & div { */
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    /* } */
  }
`;
