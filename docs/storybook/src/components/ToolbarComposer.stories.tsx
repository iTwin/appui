/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import {
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
} from "@itwin/appui-react";
import { ToolbarComposer } from "@itwin/appui-react/src/appui-react/toolbar/ToolbarComposer";
import { Svg2D, Svg3D } from "@itwin/itwinui-icons-react";

const meta = {
  title: "Components/ToolbarComposer",
  component: ToolbarComposer,
  tags: ["autodocs"],
} satisfies Meta<typeof ToolbarComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    items: [
      ToolbarItemUtilities.createActionItem(
        "item1",
        100,
        <Svg2D />,
        "Item 1",
        () => undefined
      ),
      ToolbarItemUtilities.createActionItem(
        "item2",
        100,
        <Svg3D />,
        "Item 2",
        () => undefined
      ),
    ],
    orientation: ToolbarOrientation.Horizontal,
    usage: ToolbarUsage.ContentManipulation,
  },
};
