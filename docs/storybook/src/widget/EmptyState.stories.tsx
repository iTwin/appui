/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { EmptyStateStory } from "./EmptyState";
import { AppUiDecorator } from "../AppUiDecorator";
import { Page } from "../AppUiStory";

const meta = {
  title: "Widget/Empty State",
  component: EmptyStateStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
  args: {
    hideOnEmptyState: true,
  },
} satisfies Meta<typeof EmptyStateStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HideWidget: Story = {};

export const ShowEmptyState: Story = {
  args: {
    hideOnEmptyState: false,
  },
};
