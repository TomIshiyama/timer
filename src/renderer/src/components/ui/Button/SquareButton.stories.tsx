import type { Meta, StoryObj } from "storybook-solidjs";

import { SquareButton } from "./SquareButton";
import { styled } from "solid-styled-components";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "atoms/SquareButton",
  component: SquareButton,
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] }
  }
} satisfies Meta<typeof SquareButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  args: {
    size: "medium"
  }
};
