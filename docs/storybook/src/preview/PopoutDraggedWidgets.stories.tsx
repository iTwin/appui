/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { PreviewStory } from "./PopoutDraggedWidgets";

const meta = {
  title: "PreviewFeatures/PopoutDraggedWidgets",
  component: PreviewStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
  args: {
    popoutDraggedWidgets: true,
  },
} satisfies Meta<typeof PreviewStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
