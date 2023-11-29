/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../AppUiDecorator";
import { Page } from "../AppUiStory";
import { KeyboardShortcutsStory } from "./UiItemsProvider";

const meta = {
  title: "KeyboardShortcuts",
  component: KeyboardShortcutsStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
  args: {
    processKeys: true,
  },
} satisfies Meta<typeof KeyboardShortcutsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
