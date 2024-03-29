/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import {
  CommandItemDef,
  SyncUiEventDispatcher,
  ToolbarHelper,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
} from "@itwin/appui-react";
import { BadgeType, ConditionalIconItem, IconHelper } from "@itwin/core-react";
import {
  Svg2D,
  Svg3D,
  SvgActivity,
  SvgAirplane,
  SvgAndroid,
  SvgClipboard,
  SvgExport,
} from "@itwin/itwinui-icons-react";
import { StoryComponent } from "./ToolbarComposer";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import { withResizer } from "../../.storybook/addons/Resizer";

const meta = {
  title: "Components/ToolbarComposer",
  component: StoryComponent,
  tags: ["autodocs"],
  decorators: [withResizer, AppUiDecorator, InitializerDecorator],
  args: {
    newToolbars: false,
    orientation: ToolbarOrientation.Horizontal,
    usage: ToolbarUsage.ContentManipulation,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof StoryComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = createItems();

export const ActionItem: Story = {
  args: {
    items: [items.action1, items.action2, items.action3],
  },
};

export const GroupItem: Story = {
  args: {
    items: [items.group1, items.group2, items.group3],
  },
};

export const CustomItem: Story = {
  args: {
    items: [items.custom1, items.custom2, items.custom3],
  },
};

export const Badge: Story = {
  args: {
    items: [
      {
        ...items.action1,
        description: "TechnicalPreview badge",
        badge: BadgeType.TechnicalPreview,
      },
      {
        ...items.group1,
        description: "TechnicalPreview badge",
        badge: BadgeType.TechnicalPreview,
      },
      {
        ...items.custom1,
        description: "TechnicalPreview badge",
        badge: BadgeType.TechnicalPreview,
      },
      {
        ...items.action2,
        description: "New badge",
        badge: BadgeType.New,
      },
      {
        ...items.group2,
        description: "New badge",
        badge: BadgeType.New,
        items: items.group2.items.map((item, index) => {
          const badges = [BadgeType.New, BadgeType.TechnicalPreview];
          const badgeIndex = index % badges.length;
          const badge = badges[badgeIndex];
          return {
            ...item,
            badge,
          };
        }),
      },
      {
        ...items.custom2,
        description: "New badge",
        badge: BadgeType.New,
      },
      {
        ...items.action3,
        description: "No badge",
        badge: BadgeType.None,
      },
    ],
  },
};

export const Disabled: Story = {
  args: {
    items: [
      {
        ...items.action1,
        isDisabled: true,
      },
      {
        ...items.group1,
        isDisabled: true,
      },
      {
        ...items.group2,
        items: items.group2.items.map((item) => ({
          ...item,
          isDisabled: true,
        })),
      },
      {
        ...items.custom1,
        isDisabled: true,
      },
    ],
  },
};

export const Hidden: Story = {
  args: {
    items: [
      items.action1,
      items.action2,
      {
        ...items.action3,
        isHidden: true,
      },
      items.group1,
      items.group2,
      {
        ...items.group3,
        isHidden: true,
      },
      items.custom1,
      items.custom2,
      {
        ...items.custom3,
        isHidden: true,
      },
    ],
  },
};

const { getVal, bump, eventId } = createBumpEvent();

export const Conditional: Story = {
  args: {
    items: [
      {
        ...items.action1,
        execute: () => {
          bump();
          items.action1.execute();
        },
      },
      {
        ...items.action2,
        icon: new ConditionalIconItem(
          () => (getVal() % 2 === 0 ? <Svg3D /> : <Svg2D />),
          [eventId]
        ),
        label: new ConditionalStringValue(
          () => `Item 2 (${getVal()})`,
          [eventId]
        ),
        isDisabled: new ConditionalBooleanValue(
          () => getVal() % 2 === 1,
          [eventId]
        ),
        description: new ConditionalStringValue(
          () => `Conditional item. Click 'Item 1' to toggle. (${getVal()}).`,
          [eventId]
        ),
      },
    ],
  },
};

export const ItemDef: Story = {
  args: {
    items: [
      ToolbarHelper.createToolbarItemFromItemDef(
        125,
        new CommandItemDef({
          iconSpec: <SvgActivity />,
          label: "Item 3",
          execute: action("Item 3"),
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
          ...createAbstractReactIcon(),
        }
      ),
      ToolbarHelper.createToolbarItemFromItemDef(
        130,
        new CommandItemDef({
          iconSpec: <SvgAirplane />,
          label: "Item 5",
          execute: action("Item 5"),
        }),
        {
          description: "Conditional icon overrides.",
          isDisabled: true,
          ...createAbstractConditionalIcon(),
        }
      ),
      ...ToolbarHelper.createToolbarItemsFromItemDefs(
        [
          new CommandItemDef({
            iconSpec: <SvgActivity />,
            label: "Item 6",
            execute: action("Item 6"),
          }),
          new CommandItemDef({
            iconSpec: <SvgClipboard />,
            label: "Item 7",
            execute: action("Item 7"),
          }),
        ],
        200
      ),
    ],
  },
};

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

function createItems() {
  const action1 = ToolbarItemUtilities.createActionItem(
    "item1",
    100,
    <Svg2D />,
    "Item 1",
    action("Item 1")
  );
  const action2 = ToolbarItemUtilities.createActionItem(
    "item2",
    100,
    <Svg3D />,
    "Item 2",
    action("Item 2")
  );
  const action3 = ToolbarItemUtilities.createActionItem(
    "item3",
    100,
    <SvgAndroid />,
    "Item 3",
    action("Item 3")
  );

  const group1 = ToolbarItemUtilities.createGroupItem(
    "group1",
    100,
    <SvgActivity />,
    "Group 1",
    [action1, action2]
  );

  const group2_2 = ToolbarItemUtilities.createGroupItem(
    "group2_2",
    100,
    <SvgAirplane />,
    "Group 2_2",
    [action2]
  );
  const group2_1 = ToolbarItemUtilities.createGroupItem(
    "group2_1",
    100,
    <SvgAndroid />,
    "Group 2_1",
    [action1, group2_2]
  );
  const group2 = ToolbarItemUtilities.createGroupItem(
    "group2",
    100,
    <SvgClipboard />,
    "Group 2",
    [action1, action2, group2_1]
  );

  const group3 = ToolbarItemUtilities.createGroupItem(
    "group3",
    100,
    <SvgExport />,
    "Group 3",
    Array.from({ length: 10 }, (_, i) => {
      const item = [action1, action2, action3][i % 3];
      return {
        ...item,
        id: `${item.id}_${i}`,
        label: `${item.label} (${i})`,
        itemPriority: i,
      };
    })
  );

  const custom1 = ToolbarItemUtilities.createCustomItem(
    "custom1",
    100,
    <Svg2D />,
    "Custom 1",
    <div>Custom panel content 1</div>
  );
  const custom2 = ToolbarItemUtilities.createCustomItem(
    "custom2",
    100,
    <Svg3D />,
    "Custom 2",
    <div>Custom panel content 2</div>
  );
  const custom3 = ToolbarItemUtilities.createCustomItem(
    "custom3",
    100,
    <SvgActivity />,
    "Custom 3",
    <div>Custom panel content 3</div>
  );

  return {
    action1,
    action2,
    action3,
    /** Group item. */
    group1,
    /** Group item with nested groups. */
    group2,
    /** Group item with multiple columns. */
    group3,
    custom1,
    custom2,
    custom3,
  };
}

function createBumpEvent() {
  let i = 10;
  const eventId = "bump";
  const bump = () => {
    i++;
    SyncUiEventDispatcher.dispatchSyncUiEvent(eventId);
  };
  return {
    getVal: () => i,
    bump,
    eventId,
  };
}
