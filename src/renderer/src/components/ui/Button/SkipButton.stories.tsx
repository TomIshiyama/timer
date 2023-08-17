import type { Meta, StoryObj } from "storybook-solidjs";

import { SkipButton } from "./SkipButton";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "atoms/SkipButton",
  component: SkipButton,
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] }
  }
} satisfies Meta<typeof SkipButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  args: {
    size: "medium"
  }
};
