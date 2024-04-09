/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import { BlockText } from "@itwin/core-react/src/core-react/text/BlockText";

const meta = {
  title: "Deprecated/BlockText",
  component: BlockText,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof BlockText>;

export default meta;
type Story = StoryObj<typeof BlockText>;

export const Basic: Story = {
  args: {
    children: "This is a block of text",
  },
};
