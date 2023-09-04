import { COLOR } from "@renderer/utils/color";
import { styled } from "solid-styled-components";

export const BackButton = styled("div")``;

type ButtonProps = {
  bgcolor?: string;
  color?: string;
};
export const BaseButton = styled("button")<ButtonProps>((props) => ({
  padding: "8px 12px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  ...COLOR.dark.button,
  "&:hover": {
    background: COLOR.dark.button.hover.background
  }
}));
