/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { CanFloatStory } from "./CanFloat";
import { AppUiDecorator } from "../AppUiDecorator";
import { Page } from "../AppUiStory";

const meta = {
  title: "Widget/canFloat",
  component: CanFloatStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
} satisfies Meta<typeof CanFloatStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Resizable: Story = {
  args: {
    isResizable: true,
  },
};

export const Position: Story = {
  args: {
    defaultPosition: {
      x: 10,
      y: 200,
    },
  },
};

export const Size: Story = {
  args: {
    defaultSize: {
      height: 100,
      width: 100,
    },
  },
};

export const HideWithUI: Story = {
  args: {
    hideWithUi: true,
  },
};

export const ContainerId: Story = {
  args: {
    containerId: "container-1",
  },
};

export const MultipleOptions: Story = {
  args: {
    ...Resizable.args,
    ...Position.args,
    ...Size.args,
    ...HideWithUI.args,
    ...ContainerId.args,
  },
};
