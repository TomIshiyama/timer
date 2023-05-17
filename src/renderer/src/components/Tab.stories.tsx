import type { Meta, StoryObj } from "storybook-solidjs";

import { Tab } from "./Tab";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "atoms/Tab",
  component: Tab,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" }
  }
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: "Tab"
  }
};
