/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import { DisabledText } from "@itwin/core-react-internal/src/core-react/text/DisabledText";

const meta = {
  title: "Deprecated/DisabledText",
  component: DisabledText,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof DisabledText>;

export default meta;
type Story = StoryObj<typeof DisabledText>;

export const Basic: Story = {
  args: {
    children: "This is a disabled text",
  },
};
