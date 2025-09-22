/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppUiDecorator } from "../Decorators";
import { Page } from "../AppUiStory";
import { ActiveFrontstageStory } from "./Active";

const meta = {
  title: "Frontstage/Active",
  component: ActiveFrontstageStory,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    stableContentLayout: true,
  },
  parameters: {
    docs: {
      page: () => <Page />,
    },
    layout: "fullscreen",
  },
} satisfies Meta<typeof ActiveFrontstageStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
