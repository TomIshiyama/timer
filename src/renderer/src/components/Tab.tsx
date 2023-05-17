import { Component, For, createSignal } from "solid-js";
import { styled } from "solid-styled-components";
import { Tabs } from "@kobalte/core";
import { JSX } from "solid-js/types/jsx";

export const tabMenus = {
  pomodoro: "pomodoro",
  timer: "timer",
  stopwatch: "stopwatch",
  alarm: "alarm",
  worldClock: "worldClock"
} as const;

type Props = {
  hoge: string;
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
            {(item): JSX.Element => <Tabs.Trigger value={item.value}>{item.label}</Tabs.Trigger>}
          </For>
          <Tabs.Indicator />
        </StyledTabList>
        <For each={props.tabList} fallback={<div>Loading...</div>}>
          {(item): JSX.Element => <Tabs.Content value={item.value}>{item.content}</Tabs.Content>}
        </For>
      </StyledTabs>
    </div>
  );
};

const StyledTabs = styled(Tabs.Root)`
  background-color: red;
`;

const StyledTabList = styled(Tabs.List)`
  background-color: blue;
`;

// コンポーネントの宣言が前後してもエラーがでないのか・・・？
