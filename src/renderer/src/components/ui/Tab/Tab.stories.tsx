import type { Meta, StoryObj } from "storybook-solidjs";

import { Tab } from "./Tab";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "atoms/Tab",
  component: Tab,
  // tags: ["autodocs"], // document を生成してくれるが、不要なのでオフ
  argTypes: {}
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: "Tab",
    orientation: "horizontal",
    tabList: [
      {
        value: "pomodoro",
        label: "Pomodoro",
        content: <h1>Hello Pomodoro</h1>
      },
      {
        value: "timer",
        label: "Timer",
        content: <h1>Hello Timer</h1>
      }
    ]
  }
};
