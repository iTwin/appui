/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PopoutRestoreStory } from "./PopoutRestore";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";

const meta = {
  title: "Widget/PopoutRestore",
  component: PopoutRestoreStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  parameters: {
    docs: {
      page: () => <Page />,
    },
  },
} satisfies Meta<typeof PopoutRestoreStory>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Steps to reproduce AB#2024472:
 * 1. Pop the widget out (drag its tab out of the panel, or use the tab's
 *    "..." menu and click "Pop out active widget tab").
 * 2. Click "Hide widget".
 * 3. Click "Show widget".
 *
 * Expected: the widget re-appears in its popout window.
 * Before the fix it would instead dock back into the left panel.
 */
export const Default: Story = {};
