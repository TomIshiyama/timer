import { Component, createSignal, onMount } from "solid-js";
import { Tab } from "../Tab/Tab";
import { useNavigate } from "@solidjs/router";
import { readFileSync } from "fs";
import { IconTomatoSVG } from "../../../assets/IconTomatoSVG";
import { IconGearSVG } from "../../../assets/IconGearSVG";
import { BackButton } from "../Button/BackButton";
import { COLOR } from "../../../utils/color";
import { styled } from "solid-styled-components";

type Props = { wip?: unknown };

const tabList = [
  { value: "/", label: "Home" },
  {
    value: "/pomodoro", // should set URL path
    label: "Pomodoro" // should use icon
  },
  {
    value: "/preference",
    label: "Preference" // should use icon
  }
];

const tabListWithIcon = [
  // { value: "/", label: "Home" },
  {
    value: "/pomodoro", // should set URL path
    label: (
      <>
        <IconTomatoSVG /> Pomodoro
      </>
    ) // should use icon
  },
  {
    value: "/preference",
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
    value: "/pomodoro", // should set URL path
    label: (
      <>
        <IconTomatoSVG />
      </>
    ) // should use icon
  },
  {
    value: "/preference",
    label: (
      <>
        <IconGearSVG />
      </>
    )
  }
];

export const Menu: Component<Props> = (_) => {
  const navigate = useNavigate();
  const [getOpen, setOpen] = createSignal(true);
  onMount(() => {
    navigate("/pomodoro");
  });
  return (
    <div style={{ position: "relative", "border-right": `1px solid ${COLOR.dark.footer.border}` }}>
      <Tab
        disableBorder
        tabList={getOpen() ? tabListWithIcon : tabListOnlyIcon}
        orientation={"vertical"}
        onChange={(path): void => navigate(path)}
        defaultValue="/pomodoro"
      />
      <Button
        onClick={(): void => {
          setOpen((prev) => !prev);
        }}
      >
        {getOpen() ? "<" : ">"}
      </Button>
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
