import { useNavigate } from "@solidjs/router";
import { Component, createSignal, onMount, JSX } from "solid-js";
import { styled } from "solid-styled-components";
import { IconGearSVG } from "../../../assets/IconGearSVG";
import { IconTomatoSVG } from "../../../assets/IconTomatoSVG";
import { COLOR } from "../../../utils/color";
import { Tab } from "../Tab/Tab";
import { routes } from "@renderer/components/utility/Routes/routes";

type Props = {
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> | undefined;
  isOpen?: boolean;
};

const tabListWithIcon = [
  // { value: "/", label: "Home" },
  {
    value: routes.pomodoro.path,
    label: (
      <>
        <IconTomatoSVG /> Pomodoro
      </>
    ) // should use icon
  },
  {
    value: routes.preference.path,
    label: (
      <>
        <IconGearSVG /> Preference
      </>
    )
  }
];

const tabListOnlyIcon = [
  // { value: "/", label: "Home" },
  {
    value: routes.pomodoro.path,
    label: <IconTomatoSVG />
  },
  {
    value: routes.preference.path,
    label: <IconGearSVG />
  }
];

export const Menu: Component<Props> = (props) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        background: `${COLOR.dark.base.background}`,
        "border-right": `1px solid ${COLOR.dark.footer.border}`,
        width: props.isOpen ? "88px" : "48px",
        transition: "all 0.2s ease-in-out 0s"
      }}
    >
      <Tab
        disableBorder
        tabList={props.isOpen ? tabListWithIcon : tabListOnlyIcon}
        orientation={"vertical"}
        onChange={(path): void => navigate(path)}
        defaultValue="/pomodoro"
      />
      <Button onClick={props.onClick}>{props.isOpen ? "<" : ">"}</Button>
    </div>
  );
};

const Button = styled("button")((props) => ({
  background: "transparent",
  position: "absolute",
  bottom: 0,
  padding: "8px",
  color: "white",
  border: "none",
  cursor: "pointer",
  right: 0,
  "&:hover": {
    backgroundColor: COLOR.dark.tab.hover
  }
}));
