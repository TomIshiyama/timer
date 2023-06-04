import type { Meta, StoryObj } from "storybook-solidjs";

import { PlayPauseButton } from "./PlayPauseButton";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "atoms/PlayPauseButton",
  component: PlayPauseButton,
  // tags: ["autodocs"], // document を生成してくれるが、不要なのでオフ
  argTypes: {
    mode: { control: "select", options: ["play", "pause"] }
  }
} satisfies Meta<typeof PlayPauseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Primary: Story = {
  args: {
    mode: "pause"
  }
};
