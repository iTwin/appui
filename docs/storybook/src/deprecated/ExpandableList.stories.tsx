/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { ExpandableList } from "@itwin/core-react-internal/src/core-react/expandable/ExpandableList";
import { ExpandableBlock } from "@itwin/itwinui-react";
import { AppUiDecorator } from "../Decorators";

const meta = {
  title: "Deprecated/ExpandableList",
  component: ExpandableList,
  tags: ["autodocs"],
  decorators: [AppUiDecorator],
} satisfies Meta<typeof ExpandableList>;

export default meta;
type Story = StoryObj<typeof ExpandableList>;

export const Basic: Story = {
  args: {
    children: [
      <ExpandableBlock title="Block 1">Content 1</ExpandableBlock>,
      <ExpandableBlock title="Block 2">Content 2</ExpandableBlock>,
      <ExpandableBlock title="Block 3">Content 3</ExpandableBlock>,
    ],
  },
};
