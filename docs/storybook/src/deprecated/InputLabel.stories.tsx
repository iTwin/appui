/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { InputLabel } from "@itwin/core-react-internal/src/core-react/inputs/InputLabel";
import { Input } from "@itwin/itwinui-react";
import { AppUiDecorator } from "../Decorators";
import { InputStatus } from "@itwin/core-react";

const meta = {
  title: "Deprecated/InputLabel",
  component: InputLabel,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof InputLabel>;

export default meta;
type Story = StoryObj<typeof InputLabel>;

export const Basic: Story = {
  args: {
    label: "Label",
    status: InputStatus.Success,
    children: <Input />,
  },
};
