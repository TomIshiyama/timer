// X-EX01 Gundam Calibarn
// Primitive Colors
export const BLACK = "#151e1c";
export const DARK_GRAY = "#303f3d";
export const DIM_GRAY = "#445956";
export const WHITE = "#d4d8e1";
export const WHITE_DARKER = "#b8bbc3";
export const SILVER = "#80858e";
export const RED = "#b54441";
export const YELLOW = "#eaca45";
export const GREEN = "#5af387";

// Semantic Colors
export const COLOR = {
  dark: {
    base: {
      background: DARK_GRAY,
      color: WHITE,
      border: WHITE,
      hover: SILVER,
      active: SILVER
    },
    button: {},
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
    }
  },
  light: {}
};

export const GRID = {
  half: 8,
  base: 16
};
