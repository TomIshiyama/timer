import type { Meta, StoryObj } from "storybook-solidjs";

import { Timer } from "./Timer";
import { styled } from "solid-styled-components";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "atoms/Timer",
  component: Timer,
  // tags: ["autodocs"], // document を生成してくれるが、不要なのでオフ
  argTypes: {
    // mode: { control: "select", options: ["play", "pause"] }
    size: { control: { type: "number" } },
    minutes: { control: { type: "number" } },
    seconds: { control: { type: "number" } }
  }
} satisfies Meta<typeof Timer>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  args: {
    size: 200,
    minutes: 25,
    seconds: 10
  }
};
