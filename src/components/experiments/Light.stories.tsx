import { Meta, StoryObj } from "@storybook/react";

import Light from "./Light";

const meta: Meta<typeof Light> = {
  component: Light,
  title: "Light",
  tags:["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["green", "yellow", "red"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Green: Story = {
  args: {
    variant: "green",
  },
};

export const Yellow: Story = {
  args: {
    variant: "yellow",
  },
};

export const Red: Story = {
  args: {
    variant: "red",
  },
};

export const Grouped: Story = {
  render: (args) => (
    <div className="flex flex-col gap-1 border-solid border-2 border-black w-max p-2 bg-slate-600">
      <Light variant="red" />
      <Light variant="yellow" />
      <Light variant="green" />
    </div>
  ),
};
