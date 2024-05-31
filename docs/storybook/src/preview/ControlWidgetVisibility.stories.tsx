/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { PreviewStory } from "./ControlWidgetVisibility";

const meta = {
  title: "PreviewFeatures/ControlWidgetVisibility",
  component: PreviewStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
  args: {
    threshold: 2,
    visibleWidgets: 1,
  },
} satisfies Meta<typeof PreviewStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HiddenTabs: Story = {
  args: {
    visibleWidgets: 0,
  },
};
