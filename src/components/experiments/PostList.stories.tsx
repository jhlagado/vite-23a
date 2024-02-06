import { Meta, StoryObj } from "@storybook/react";

import PostList from "./PostList";

const meta: Meta<typeof PostList> = {
  component: PostList,
  title: "MessageList",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const MessageListStory: Story = {
  name: "MessageList",
  render: () => <PostList />,
};
