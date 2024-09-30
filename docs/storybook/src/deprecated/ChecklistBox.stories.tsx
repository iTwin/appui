/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { AppUiDecorator } from "../Decorators";
import {
  CheckListBox,
  CheckListBoxItem,
  CheckListBoxSeparator,
} from "@itwin/core-react-internal/src/core-react/checklistbox/CheckListBox";

const meta = {
  title: "Deprecated/CheckListBox",
  component: CheckListBox,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof CheckListBox>;

export default meta;
type Story = StoryObj<typeof CheckListBox>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <CheckListBoxItem label="Item 1" />
        <CheckListBoxItem label="Item 2" />
        <CheckListBoxItem label="Item 3" />
      </>
    ),
  },
};

export const Checked: Story = {
  args: {
    children: (
      <>
        <CheckListBoxItem label="Item 1" />
        <CheckListBoxItem label="Item 2" checked />
        <CheckListBoxItem label="Item 3" />
      </>
    ),
  },
};

export const Separator = {
  args: {
    children: (
      <>
        <CheckListBoxItem label="Item 1" />
        <CheckListBoxSeparator />
        <CheckListBoxItem label="Item 2" />
        <CheckListBoxItem label="Item 3" />
      </>
    ),
  },
};
