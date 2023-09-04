import type { Meta, StoryObj } from "storybook-solidjs";
import { FooterToolbar } from "./FooterToolbar";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "atoms/FooterToolbar",
  component: FooterToolbar,
  // tags: ["autodocs"], // document を生成してくれるが、不要なのでオフ
  argTypes: { color: {} }
} satisfies Meta<typeof FooterToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
