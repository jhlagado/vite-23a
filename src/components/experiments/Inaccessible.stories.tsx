import { type Meta, type StoryObj } from "@storybook/react";

import Inaccessible from "./Inaccessible";

const meta: Meta<typeof Inaccessible> = {
  component: Inaccessible,
  title: "Inaccessible",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const MessageListStory: Story = {
  name: "Inaccessible",
  render: () => <Inaccessible />,
};
