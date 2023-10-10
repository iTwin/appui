/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { CanPopoutStory } from "./CanPopout";
import { AppUiDecorator } from "../AppUiDecorator";
import { Page } from "../AppUiStory";

const meta = {
  title: "Widget/canPopout",
  component: CanPopoutStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
} satisfies Meta<typeof CanPopoutStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Enabled: Story = {
  args: {
    canPopout: true,
  },
};

export const Disabled: Story = {
  args: {
    canPopout: false,
  },
};
