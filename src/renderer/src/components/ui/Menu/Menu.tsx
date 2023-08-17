import { Component } from "solid-js";
import { Tab } from "../Tab/Tab";
import { useNavigate } from "@solidjs/router";

type Props = { wip: unknown };

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

export const Menu: Component<Props> = (_) => {
  const navigate = useNavigate();

  return (
    <Tab tabList={tabList} orientation={"vertical"} onChange={(path): void => navigate(path)} />
  );
};
