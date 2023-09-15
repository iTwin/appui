/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../AppUiDecorator";
import { CanFloatOptions } from "./CanFloatOptions";

const meta = {
  title: "Widget/canFloat Options",
  component: CanFloatOptions,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    isResizable: false,
  },
} satisfies Meta<typeof CanFloatOptions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    isResizable: true,
    defaultPosition: {
      x: 250,
      y: 50,
    },
    defaultSize: {
      height: 100,
      width: 100,
    },
    containerId: "container-1",
    hideWithUi: true,
  },
};
