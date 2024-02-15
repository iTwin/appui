/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BadgeType } from "@itwin/appui-react";
import {
  CommandItemDef,
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
      ToolbarHelper.createToolbarItemFromItemDef(
        125,
        new CommandItemDef({
          iconSpec: <SvgActivity />,
          execute: () => undefined,
          label: "Badge(TP)-executes(HI!) overrides",
          badgeType: BadgeType.New,
        }),
        {
          badgeType: BadgeType.TechnicalPreview,
          execute() {
            alert("Hi!");
          },
        }
      ),
      ToolbarHelper.createToolbarItemFromItemDef(
        127,
        new CommandItemDef({
          iconSpec: <SvgClipboard />,
          execute: () => undefined,
          label: "Badge(New)-Disabled-reactIcon(export) overrides",
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
          execute: () => undefined,
          label: "Item 3",
          badgeType: BadgeType.New,
        }),
        {
          badgeType: BadgeType.None,
          label: "Badge(None)-label-conditionalIcon(export) overrides",
          ...createAbstractConditionalIcon(),
        }
      ),
      ...ToolbarHelper.createToolbarItemsFromItemDefs(
        [
          new CommandItemDef({
            iconSpec: <SvgActivity />,
            execute: () => undefined,
            label: "Array 1 (TechP override)",
            badgeType: BadgeType.New,
          }),
          new CommandItemDef({
            iconSpec: <SvgClipboard />,
            execute: () => undefined,
            label: "Array 2 (TechP override)",
          }),
          new CommandItemDef({
            iconSpec: <SvgAirplane />,
            execute: () => undefined,
            label: "Array 3 (TechP override)",
          }),
        ],
        200,
        {
          badgeType: BadgeType.TechnicalPreview,
        }
      ),
    ],
    orientation: ToolbarOrientation.Horizontal,
    usage: ToolbarUsage.ContentManipulation,
  },
};
