/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { BackstageAppButton } from "@itwin/appui-react";
import { SvgBentleySystems } from "@itwin/itwinui-icons-react";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";

const meta = {
  title: "Components/BackstageAppButton",
  component: BackstageAppButton,
  tags: ["autodocs"],
  decorators: [AppUiDecorator, InitializerDecorator],
  args: {
    execute: action("execute"),
  },
} satisfies Meta<typeof BackstageAppButton>;

export default meta;
type Story = StoryObj<typeof BackstageAppButton>;

export const Default: Story = {};

export const Icon: Story = {
  args: {
    iconNode: <SvgBentleySystems />,
  },
};

export const IconSpec: Story = {
  name: "Icon Spec (deprecated)",
  args: {
    icon: "icon-bentley-systems",
  },
};
