/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "@itwin/core-react-internal/src/core-react/inputs/numberinput/NumberInput";
import { AppUiDecorator } from "../Decorators";

const meta = {
  title: "Deprecated/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Basic: Story = {
  args: {},
};
