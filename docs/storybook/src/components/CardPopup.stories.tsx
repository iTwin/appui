/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Meta, StoryObj } from "@storybook/react";
import { CardPopupStory } from "./CardPopup";
import {
  PreviewFeaturesProvider,
  ToolbarItemUtilities,
} from "@itwin/appui-react";
import {
  SvgCut,
  SvgInfo,
  SvgPasteHollow,
  SvgSave,
  SvgSaveAs,
  SvgSaveSettings,
  SvgSaveUpdate,
} from "@itwin/itwinui-icons-react";
import { action } from "@storybook/addon-actions";

const meta = {
  title: "Components/CardPopup",
  component: CardPopupStory,
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
} satisfies Meta<typeof CardPopupStory>;

export default meta;
type Story = StoryObj<typeof CardPopupStory>;

export const Basic: Story = {};

export const Overflow: Story = {
  args: {
    toolbarProps: {
      items: [
        ...meta.args.toolbarProps.items,
        ToolbarItemUtilities.createActionItem(
          "item4",
          100,
          <SvgPasteHollow />,
          "Item 4",
          action("Item 4")
        ),
      ],
    },
  },
};

export const NoTitle: Story = {
  args: {
    title: undefined,
  },
};
