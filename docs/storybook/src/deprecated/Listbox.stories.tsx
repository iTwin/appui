/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import {
  Listbox,
  ListboxItem,
} from "@itwin/core-react-internal/src/core-react/listbox/Listbox";
import { AppUiDecorator } from "../Decorators";

const meta = {
  title: "Deprecated/Listbox",
  component: Listbox,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof Listbox>;

export default meta;
type Story = StoryObj<typeof Listbox>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <ListboxItem value="1">Item 1</ListboxItem>
        <ListboxItem value="2">Item 2</ListboxItem>
        <ListboxItem value="3">Item 3</ListboxItem>
      </>
    ),
  },
};
