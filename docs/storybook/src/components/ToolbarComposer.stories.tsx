/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import { BadgeType, ConditionalStringValue } from "@itwin/appui-abstract";
import {
  CommandItemDef,
  SyncUiEventDispatcher,
  ToolbarComposer,
  ToolbarHelper,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiFramework,
} from "@itwin/appui-react/src/appui-react";
import { ConditionalIconItem, IconHelper } from "@itwin/core-react";
import {
  Svg2D,
  Svg3D,
  SvgActivity,
  SvgAirplane,
  SvgClipboard,
  SvgExport,
} from "@itwin/itwinui-icons-react";

UiFramework.initialize(undefined);

type PropsWithArgs = React.ComponentProps<typeof ToolbarComposer> & {
  newToolbars: boolean;
};

function StoryComponent(props: PropsWithArgs) {
  const { newToolbars, ...other } = props;
  React.useEffect(() => {
    UiFramework.setPreviewFeatures({
      newToolbars,
    });
  }, [newToolbars]);
  return <ToolbarComposer {...other} />;
}

const meta = {
  title: "Components/ToolbarComposer",
  tags: ["autodocs"],
  args: {
    newToolbars: false,
  },
  argTypes: {
    newToolbars: {
      description: "Enables `newToolbars` preview feature.",
    },
  },
  render: (props) => {
    return <StoryComponent {...props} />;
  },
} satisfies Meta<PropsWithArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

function createAbstractReactIcon() {
  const internalData = new Map();
  const icon = IconHelper.getIconData(<SvgExport />, internalData);
  return {
    internalData,
    icon,
  };
}

function createAbstractConditionalIcon() {
  const internalData = new Map();
  const icon = IconHelper.getIconData(
    new ConditionalIconItem(() => <SvgExport />, [], <SvgExport />),
    internalData
  );
  return {
    internalData,
    icon,
  };
}

let i = 10;
function bump() {
  i++;
  SyncUiEventDispatcher.dispatchSyncUiEvent("bump");
}

export const Basic: Story = {
  args: {
    items: [
      ToolbarItemUtilities.createActionItem(
        "item1",
        100,
        <Svg2D />,
        "Item 1",
        action("Item 1")
      ),
      ToolbarItemUtilities.createActionItem(
        "item2",
        100,
        <Svg3D />,
        new ConditionalStringValue(() => `Item 2 (${i})`, ["bump"]),
        () => {
          bump();
          action("Item 2");
        },
        {
          description: new ConditionalStringValue(
            () => `Conditional item (${i}).`,
            ["bump"]
          ),
        }
      ),
      ToolbarHelper.createToolbarItemFromItemDef(
        125,
        new CommandItemDef({
          iconSpec: <SvgActivity />,
          label: "Item 3",
          execute: action("Item 3"),
          description: "TechnicalPreview badge.",
          badgeType: BadgeType.TechnicalPreview,
        })
      ),
      ToolbarHelper.createToolbarItemFromItemDef(
        127,
        new CommandItemDef({
          iconSpec: <SvgClipboard />,
          label: "Item 4",
          execute: action("Item 4"),
        }),
        {
          badgeType: BadgeType.New,
          isDisabled: true,
          ...createAbstractReactIcon(),
        }
      ),
      ToolbarHelper.createToolbarItemFromItemDef(
        130,
        new CommandItemDef({
          iconSpec: <SvgAirplane />,
          label: "Item 5",
          execute: action("Item 5"),
          badgeType: BadgeType.None,
        }),
        {
          badgeType: BadgeType.None,
          description: "No badge, conditional icon overrides.",
          ...createAbstractConditionalIcon(),
        }
      ),
      ...ToolbarHelper.createToolbarItemsFromItemDefs(
        [
          new CommandItemDef({
            iconSpec: <SvgActivity />,
            label: "Item 6",
            execute: action("Item 6"),
            badgeType: BadgeType.New,
          }),
          new CommandItemDef({
            iconSpec: <SvgClipboard />,
            label: "Item 7",
            execute: action("Item 7"),
          }),
        ],
        200,
        {
          badgeType: BadgeType.TechnicalPreview,
          description: "TechnicalPreview badge override.",
        }
      ),
    ],
    orientation: ToolbarOrientation.Horizontal,
    usage: ToolbarUsage.ContentManipulation,
  },
};
