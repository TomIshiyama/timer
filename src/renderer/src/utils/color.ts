// X-EX01 Gundam Calibarn
// Primitive Colors
export const BLACK = "#151e1c";
export const DARK_GRAY = "#303f3d";
export const DARK_GRAY_TRANSPARENT = "#202f2d55";
export const DIM_GRAY = "#445956";
export const WHITE = "#d4d8e1";
export const WHITE_DARKER = "#b8bbc3";
export const SILVER = "#80858e";
export const RED = "#b54441";
export const YELLOW = "#eaca45";
export const GREEN = "#5af387";
export const SKY_BLUE = "";
export const DEEP_BLUE = "";
export const SKY_GREEN = "#A5D9B7";
export const DEEP_GREEN = "378E55";
export const GREEN_DARK = "#5D8C6D";
export const BROWN_DARK = "#5D8C6D";

// Semantic Colors
export const COLOR = {
  dark: {
    base: {
      background: DARK_GRAY,
      backgroundWrapper: DARK_GRAY_TRANSPARENT,
      color: WHITE,
      border: WHITE,
      hover: SILVER,
      active: SILVER
    },
    button: {
      background: WHITE,
      color: DARK_GRAY,
      hover: {
        background: WHITE_DARKER
      }
    },
    tab: {
      indicator: GREEN,
      background: DARK_GRAY,
      hover: DIM_GRAY,
      border: BLACK
    },
    input: {
      border: SILVER,
      borderError: RED,
      color: WHITE,
      background: DARK_GRAY,
      label: WHITE_DARKER
    },
    select: {
      border: SILVER,
      borderError: RED,
      color: WHITE,
      background: "transparent"
    },
    circleCountDown: {
      indicator: GREEN,
      background: WHITE,
      black: BLACK
    },
    pomodoro: {
      work: DARK_GRAY,
      shortBreak: GREEN_DARK, // TODO: something to be good.
      longBreak: BROWN_DARK
    },
    footer: {
      border: SILVER
    }
  },
  light: {}
};

export const GRID = {
  half: 8,
  base: 16
};
