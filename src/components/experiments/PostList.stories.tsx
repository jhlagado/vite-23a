import { type Meta, type StoryObj } from "@storybook/react";

import PostList from "./PostList";

const meta: Meta<typeof PostList> = {
  component: PostList,
  title: "PostList",
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const MessageListStory: Story = {
  name: "PostList",
  render: () => <PostList />,
};
