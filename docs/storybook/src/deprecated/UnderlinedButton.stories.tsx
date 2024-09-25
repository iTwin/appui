/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import { UnderlinedButton } from "@itwin/core-react-internal/src/core-react/button/UnderlinedButton";

const meta = {
  title: "Deprecated/UnderlinedButton",
  component: UnderlinedButton,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
  args: {
    children: "Underlined Button",
  },
} satisfies Meta<typeof UnderlinedButton>;

export default meta;
type Story = StoryObj<typeof UnderlinedButton>;

export const Basic: Story = {};
