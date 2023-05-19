import { Component, For, createSignal } from "solid-js";
import { css, styled } from "solid-styled-components";
import { Tabs } from "@kobalte/core";
import { JSX } from "solid-js/types/jsx";
import { ComponentParameters } from "@renderer/utils/types";

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
    content: JSX.Element;
  }[];
  onChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
};

export const Tab: Component<Props> = (props) => {
  const [selectedTab, setSelectedTab] = createSignal<string>(
    // eslint-disable-next-line solid/reactivity
    props.defaultValue ?? props.tabList[0].value
  );

  return (
    <div>
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
        <StyledTabList>
          <For each={props.tabList} fallback={<div>Loading...</div>}>
            {(item): JSX.Element => <Trigger value={item.value}>{item.label}</Trigger>}
          </For>
          <Indicator orientation={props.orientation} />
        </StyledTabList>
        <For each={props.tabList} fallback={<div>Loading...</div>}>
          {(item): JSX.Element => <Content value={item.value}>{item.content}</Content>}
        </For>
      </StyledTabs>
    </div>
  );
};

const StyledTabs = styled(Tabs.Root)({
  backgroundColor: "red"
});

const StyledTabList = styled(Tabs.List)({ backgroundColor: "blue" });

const Trigger = styled(Tabs.Trigger)``;

const Content = styled(Tabs.Content)``;

const Indicator = styled<Pick<Props, "orientation"> & ComponentParameters<typeof Tabs.Indicator>>(
  Tabs.Indicator
)((props) => ({
  backgroundColor: "green",
  // eslint-disable-next-line solid/reactivity
  ...(props.orientation === "horizontal" ? { height: "2px" } : { width: "2px" })
}));

const tab__indicator = css`
  background-color: green;
  &[data-orientation="vertical"] {
    width: 2px;
  }

  &[data-orientation="horizontal"] {
    height: 2px;
  }
`;
// コンポーネントの宣言が前後してもエラーがでないのか・・・？
