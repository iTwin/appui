/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { BadgeType } from "@itwin/appui-abstract";
import { WidgetState } from "@itwin/appui-react";
import { AppUiDecorator } from "../AppUiDecorator";
import { Page } from "../AppUiStory";
import { StoryWidget, WidgetStory } from "./Widget";

const meta = {
  title: "Widget/Widget",
  component: WidgetStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
  args: {
    id: "w1",
    label: "Widget 1",
    content: <StoryWidget id="w1" />,
  },
} satisfies Meta<typeof WidgetStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Unloaded: Story = {
  args: {
    defaultState: WidgetState.Unloaded,
  },
};

export const Floating: Story = {
  args: {
    defaultState: WidgetState.Floating,
  },
};

export const Badge: Story = {
  args: {
    badge: BadgeType.TechnicalPreview,
  },
};
