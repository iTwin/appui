/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { ToolbarPopupStory } from "./ToolbarPopup";
import { ToolbarItemUtilities } from "@itwin/appui-react";
import {
  SvgCut,
  SvgInfo,
  SvgSave,
  SvgSaveAs,
  SvgSaveSettings,
  SvgSaveUpdate,
} from "@itwin/itwinui-icons-react";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "Components/ToolbarPopup",
  component: ToolbarPopupStory,
  tags: ["autodocs"],
  args: {
    title: "Platform ABC123",
    location: {
      x: 100,
      y: 100,
    },
    offset: {
      x: 0,
      y: 0,
    },
    toolbarProps: {
      items: [
        ToolbarItemUtilities.createActionItem(
          "item1",
          100,
          <SvgInfo />,
          "Item 1",
          action("Item 1")
        ),
        ToolbarItemUtilities.createActionItem(
          "item2",
          100,
          <SvgCut />,
          "Item 2",
          action("Item 2")
        ),
        ToolbarItemUtilities.createGroupItem(
          "item3",
          100,
          <SvgSaveSettings />,
          "Item 3",
          [
            ToolbarItemUtilities.createActionItem(
              "item3_1",
              100,
              <SvgSave />,
              "Item 3_1",
              action("Item 3_1")
            ),
            ToolbarItemUtilities.createActionItem(
              "item3_2",
              100,
              <SvgSaveAs />,
              "Item 3_2",
              action("Item 3_2")
            ),
            ToolbarItemUtilities.createActionItem(
              "item3_3",
              100,
              <SvgSaveUpdate />,
              "Item 3_3",
              action("Item 3_3")
            ),
          ]
        ),
      ],
    },
    placement: "right-start",
  },
} satisfies Meta<typeof ToolbarPopupStory>;

export default meta;
type Story = StoryObj<typeof ToolbarPopupStory>;

export const Basic: Story = {};
