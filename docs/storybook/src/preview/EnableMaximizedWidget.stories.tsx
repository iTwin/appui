/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { PreviewStory } from "./EnableMaximizedWidget";

const meta = {
  title: "PreviewFeatures/EnableMaximizedWidget",
  component: PreviewStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
  args: {
    enableMaximizedFloatingWidget: true,
    enableMaximizedPanelWidget: true,
  },
} satisfies Meta<typeof PreviewStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
