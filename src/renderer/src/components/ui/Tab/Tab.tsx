import { Tabs } from "@kobalte/core";
import { ComponentParameters } from "@renderer/utils/types";
import { Component, For, createSignal } from "solid-js";
import { JSX } from "solid-js/types/jsx";
import { styled } from "solid-styled-components";
import { COLOR, GRID } from "../../../utils/color";

export const tabMenus = {
  pomodoro: "pomodoro",
  timer: "timer",
  stopwatch: "stopwatch",
  alarm: "alarm",
  worldClock: "worldClock"
} as const;

type Props = {
  defaultValue?: string;
  tabList: {
    value: string;
    label: JSX.Element;
    content?: JSX.Element;
  }[];
  disableBorder?: boolean;
  onChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
};

export const Tab: Component<Props> = (props) => {
  const [selectedTab, setSelectedTab] = createSignal<string>(
    // eslint-disable-next-line solid/reactivity
    props.defaultValue ?? props.tabList[0].value
  );
  return (
    <StyledTabs
      // controlled value
      value={selectedTab()}
      onChange={(value): void => {
        console.log(value);
        setSelectedTab(value);
        props.onChange?.(value);
      }}
      orientation={props.orientation ?? "horizontal"}
      aria-label="Main navigation"
    >
      <StyledTabList orientation={props.orientation}>
        <For each={props.tabList} fallback={<div>Loading...</div>}>
          {(item): JSX.Element => <Trigger value={item.value}>{item.label}</Trigger>}
        </For>
        <Indicator orientation={props.orientation} />
      </StyledTabList>
      <For each={props.tabList} fallback={<div>Loading...</div>}>
        {(item): JSX.Element =>
          item.content && <Content value={item.value}>{item.content}</Content>
        }
      </For>
    </StyledTabs>
  );
};

const StyledTabs = styled(Tabs.Root)<Pick<Props, "disableBorder">>((props) => ({
  backgroundColor: COLOR.dark.tab.background,
  display: "flex",
  height: "100vh",
  ...(props.orientation === "horizontal"
    ? {
        flexDirection: "column",
        borderBottom: props.disableBorder ? "none" : `1px solid ${COLOR.dark.tab.border}`
      }
    : {
        flexDirection: "row",
        borderRight: props.disableBorder ? "none" : `1px solid ${COLOR.dark.tab.border}`
      })
}));

const StyledTabList = styled(Tabs.List)<Pick<Props, "orientation">>((props) => ({
  backgroundColor: COLOR.dark.tab.background,
  display: "flex",
  position: "relative",
  // eslint-disable-next-line solid/reactivity
  ...(props.orientation === "horizontal"
    ? {}
    : {
        flexDirection: "column",
        alignItems: "stretch"
      })
}));

const Trigger = styled(Tabs.Trigger)((props) => ({
  backgroundColor: COLOR.dark.tab.background,
  color: COLOR.dark.base.color,
  border: "none",
  padding: `${GRID.base / 2}px ${GRID.base / 2}px`,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: COLOR.dark.tab.hover
  },
  "&:focus-visible": {
    outline: "none"
  }
}));

const Content = styled(Tabs.Content)``;

const Indicator = styled<Pick<Props, "orientation"> & ComponentParameters<typeof Tabs.Indicator>>(
  Tabs.Indicator
)((props) => ({
  backgroundColor: COLOR.dark.tab.indicator,
  position: "absolute",
  transition: "all .25s",
  // eslint-disable-next-line solid/reactivity
  ...(props.orientation === "horizontal"
    ? { height: "2px", bottom: "-1px" }
    : { width: "2px", left: "0" })
}));
