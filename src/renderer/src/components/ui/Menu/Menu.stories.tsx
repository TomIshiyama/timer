import type { Meta, StoryObj } from "storybook-solidjs";

import { Menu } from "./Menu";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "atoms/Menu",
  component: Menu,
  // tags: ["autodocs"], // document を生成してくれるが、不要なのでオフ
  argTypes: {}
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  args: {
    orientation: "vertical",
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
