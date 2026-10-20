/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputLabel, InputStatus } from "@itwin/core-react";
import { Input } from "@itwin/itwinui-react";
import { AppUiDecorator } from "../Decorators";

const meta = {
  title: "Deprecated/InputLabel",
  component: InputLabel,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    label: "Label",
    children: <Input />,
  },
} satisfies Meta<typeof InputLabel>;

export default meta;
type Story = StoryObj<typeof InputLabel>;

export const Basic: Story = {};

export const Status: Story = {
  args: {
    status: InputStatus.Success,
  },
};
