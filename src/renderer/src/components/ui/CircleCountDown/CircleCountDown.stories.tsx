import type { Meta, StoryObj } from "storybook-solidjs";

import { CircleCountDown } from "./CircleCountDown";
import { styled } from "solid-styled-components";
import { createSignal } from "solid-js";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "atoms/CircleCountDown",
  component: CircleCountDown,
  // tags: ["autodocs"], // document を生成してくれるが、不要なのでオフ
  argTypes: {
    mode: { control: "select", options: ["play", "pause"] },
    size: { control: { type: "number" } },
    setTime: { control: { type: "number", step: 1000 } },
    remainingTime: { control: { type: "number", step: 1000 } }
  }
} satisfies Meta<typeof CircleCountDown>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  args: {
    size: 400,
    setTime: 10000,
    remainingTime: 6000
  }
};
