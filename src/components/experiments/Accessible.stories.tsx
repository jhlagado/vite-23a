import { type Meta, type StoryObj } from "@storybook/react";

import Accessible from "./Accessible";

const meta: Meta<typeof Accessible> = {
  component: Accessible,
  title: "Accessible",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const MessageListStory: Story = {
  name: "Accessible",
  render: () => <Accessible />,
};
