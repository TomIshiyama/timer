import type { Meta, StoryObj } from "storybook-solidjs";

import { PomodoroPresentational } from "./Presentational";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "page/PomodoroPresentational",
  component: PomodoroPresentational,
  // tags: ["autodocs"], // document を生成してくれるが、不要なのでオフ
  argTypes: {
    // mode: { control: "select", options: ["play", "pause"] }
    remainingTime: { control: { type: "number", min: 0, step: 1000 } },
    isRunning: { control: "boolean" },
    isPaused: { control: "boolean" },
    isFinished: { control: "boolean" },
    round: {
      current: { control: { type: "number", min: 0, max: 3600000, step: 1000 } },
      limit: { control: { type: "number", min: 0, max: 3600000, step: 1000 } }
    }
  }
} satisfies Meta<typeof PomodoroPresentational>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Default: Story = {
  args: {
    remainingTime: 64801000,
    isRunning: true,
    isPaused: false,
    isFinished: false,
    round: { current: 1, limit: 10 }
  }
};
