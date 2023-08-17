import type { Meta, StoryObj } from "storybook-solidjs";

import { Input } from "./Input";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "atoms/Input",
  component: Input,
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" }
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  args: {
    name: "sample",
    label: "label ",
    placeholder: "label を入力してください"
  }
};
