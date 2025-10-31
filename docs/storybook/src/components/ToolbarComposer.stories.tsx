/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { action } from "storybook/actions";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import {
  CommandItemDef,
  ToolItemDef,
  ToolbarActionItem,
  ToolbarCustomItem,
  ToolbarGroupItem,
  ToolbarHelper,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  useConditionalValue,
} from "@itwin/appui-react";
import { BadgeType, ConditionalIconItem, IconHelper } from "@itwin/core-react";
import {
  Svg2D,
  Svg3D,
  SvgActivity,
  SvgAdd,
  SvgAirplane,
  SvgAndroid,
  SvgClipboard,
  SvgExport,
  SvgPlaceholder,
  SvgRemove,
} from "@itwin/itwinui-icons-react";
import genericPlaceholderIcon from "@bentley/icons-generic/icons/placeholder.svg";
import { Icon } from "@stratakit/foundations";
import placeholderIcon from "@stratakit/icons/placeholder.svg";
import { AppUiDecorator, InitializerDecorator } from "../Decorators";
import { withResizer } from "../../.storybook/addons/Resizer";
import { createBumpEvent } from "../createBumpEvent";
import { enumArgType } from "../Utils";
import { ToolbarComposerStory, UseStrataKitContext } from "./ToolbarComposer";

const meta = {
  title: "Components/ToolbarComposer",
  component: ToolbarComposerStory,
  tags: ["autodocs"],
  decorators: [withResizer, AppUiDecorator, InitializerDecorator],
  args: {
    useStrataKit: false,
    orientation: ToolbarOrientation.Horizontal,
    usage: ToolbarUsage.ContentManipulation,
  },
  argTypes: {
    orientation: enumArgType(ToolbarOrientation),
    usage: enumArgType(ToolbarUsage),
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ToolbarComposerStory>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = createItems();

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const ActionItem: Story = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      return [
        factory.createActionItem(),
        factory.createActionItem(),
        factory.createActionItem(),
      ];
    })(),
  },
};

export const GroupItem: Story = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      return [
        factory.createGroupItem({
          items: [factory.createActionItem(), factory.createActionItem()],
        }),
        factory.createGroupItem({
          items: [
            factory.createActionItem(),
            factory.createActionItem(),
            factory.createGroupItem({
              items: [
                factory.createActionItem(),
                factory.createGroupItem({
                  items: [factory.createActionItem()],
                }),
              ],
            }),
          ],
        }),
        factory.createGroupItem({
          items: Array.from({ length: 10 }, () => factory.createActionItem()),
        }),
      ];
    })(),
  },
};

export const CustomItem: Story = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      return [
        factory.createCustomItem(),
        factory.createCustomItem(),
        factory.createCustomItem(),
      ];
    })(),
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
          const badges = [
            BadgeType.New,
            BadgeType.TechnicalPreview,
            "deprecated",
          ];
          const badgeIndex = index % badges.length;
          const badge = badges[badgeIndex];
          return {
            ...item,
            badge: typeof badge === "string" ? undefined : badge,
            badgeKind: typeof badge === "string" ? badge : undefined,
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
        description: "Deprecated badge",
        badgeKind: "deprecated",
      },
      {
        ...items.group3,
        description: "Deprecated badge",
        badgeKind: "deprecated",
      },
      {
        ...items.custom3,
        description: "Deprecated badge",
        badgeKind: "deprecated",
      },
      {
        ...items.action4,
        description: "No badge",
        badge: BadgeType.None,
      },
    ],
  },
};

export const Disabled: Story = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      return [
        factory.createActionItem({ isDisabled: true }),
        factory.createGroupItem({ isDisabled: true }),
        factory.createGroupItem({
          items: [
            factory.createActionItem({ isDisabled: true }),
            factory.createActionItem({ isDisabled: true }),
            factory.createGroupItem({ isDisabled: true }),
          ],
        }),
        factory.createCustomItem({ isDisabled: true }),
      ];
    })(),
  },
};

export const Hidden: Story = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      return [
        factory.createActionItem(),
        factory.createActionItem(),
        factory.createActionItem({ isHidden: true }),
        factory.createGroupItem({
          items: [factory.createActionItem()],
        }),
        factory.createGroupItem({
          items: [factory.createActionItem()],
        }),
        factory.createGroupItem({
          items: [factory.createActionItem()],
          isHidden: true,
        }),
        factory.createCustomItem(),
        factory.createCustomItem(),
        factory.createCustomItem({ isHidden: true }),
      ];
    })(),
  },
};

const { getVal, bump, eventId } = createBumpEvent();

export const Conditional: Story = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      return [
        factory.createActionItem({
          isActiveCondition: new ConditionalBooleanValue(
            () => getVal() % 2 === 1,
            [eventId]
          ),
          execute: () => {
            bump();
          },
        }),
        {
          ...factory.createActionItem({
            label: new ConditionalStringValue(
              () => `Item 2 (${getVal()})`,
              [eventId]
            ),
            isDisabled: new ConditionalBooleanValue(
              () => getVal() % 2 === 1,
              [eventId]
            ),
            description: new ConditionalStringValue(
              () =>
                `Conditional item. Click 'Item 1' to toggle. (${getVal()}).`,
              [eventId]
            ),
          }),
          iconNode: undefined,
          icon: new ConditionalIconItem(
            () => (getVal() % 2 === 0 ? <Svg3D /> : <Svg2D />),
            [eventId]
          ),
        },
        factory.createActionItem({
          iconNode: <ConditionalReactIcon />,
        }),
        factory.createGroupItem({
          items: [
            factory.createActionItem({
              label: new ConditionalStringValue(
                () => `Item 4 (${getVal()})`,
                [eventId]
              ),
            }),
            factory.createGroupItem({
              items: [
                factory.createActionItem({
                  isActiveCondition: new ConditionalBooleanValue(
                    () => getVal() % 2 === 0,
                    [eventId]
                  ),
                }),
              ],
            }),
          ],
        }),
      ];
    })(),
  },
};

function ConditionalReactIcon() {
  const val = useConditionalValue(getVal, [eventId]);
  return val % 2 === 0 ? <SvgAdd /> : <SvgRemove />;
}

export const ItemDef: Story = {
  args: {
    items: [
      ToolbarHelper.createToolbarItemFromItemDef(
        125,
        new CommandItemDef({
          iconSpec: <SvgActivity />,
          label: "Item 1",
          execute: () => {
            bump();
            action("Item 1")();
          },
        })
      ),
      ToolbarHelper.createToolbarItemFromItemDef(
        127,
        new CommandItemDef({
          iconSpec: <SvgClipboard />,
          label: "Item 2",
          execute: action("Item 2"),
        }),
        {
          ...createAbstractReactIcon(),
        }
      ),
      ToolbarHelper.createToolbarItemFromItemDef(
        130,
        new CommandItemDef({
          iconSpec: <SvgAirplane />,
          label: "Item 3",
          execute: action("Item 3"),
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
            label: "Item 4",
            execute: action("Item 4"),
          }),
          new CommandItemDef({
            iconSpec: <SvgClipboard />,
            label: "Item 5",
            execute: action("Item 5"),
          }),
        ],
        200
      ),
      ToolbarHelper.createToolbarItemFromItemDef(
        250,
        new ToolItemDef({
          toolId: "item6",
          execute: action("Item 6"),
          iconSpec: new ConditionalIconItem(
            () => (getVal() % 2 === 0 ? <Svg3D /> : <Svg2D />),
            [eventId]
          ),
        })
      ),
    ],
  },
};

export const Icons = {
  args: {
    items: [
      ToolbarItemUtilities.createActionItem({
        id: "node",
        label: "Icon Node",
        icon: <SvgPlaceholder />,
      }),
      ToolbarItemUtilities.createActionItem(
        "spec-node",
        0,
        <SvgPlaceholder />,
        "Icon Spec Node",
        () => {}
      ),
      ToolbarItemUtilities.createActionItem(
        "svg-loader",
        0,
        genericPlaceholderIcon,
        "SVG Loader",
        () => {}
      ),
      ToolbarItemUtilities.createActionItem(
        "font-icon",
        0,
        "icon-placeholder",
        "Font Icon",
        () => {}
      ),
    ],
  },
} satisfies Story;

export const GroupIcons: Story = {
  args: {
    items: [
      ToolbarItemUtilities.createGroupItem({
        id: "group-node",
        label: "Icon Node",
        icon: <SvgPlaceholder />,
        items: [...Icons.args.items],
      }),
      ToolbarItemUtilities.createGroupItem(
        "group-spec-node",
        0,
        <SvgPlaceholder />,
        "Icon Spec Node",
        [...Icons.args.items]
      ),
      ToolbarItemUtilities.createGroupItem(
        "group-svg-loader",
        0,
        genericPlaceholderIcon,
        "SVG Loader",
        [...Icons.args.items]
      ),
      ToolbarItemUtilities.createGroupItem(
        "group-font-icon",
        0,
        "icon-placeholder",
        "Font Icon",
        [...Icons.args.items]
      ),
    ],
  },
};

export const Separators: Story = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      let groupPriority = 0;
      return [
        // All items of first group are hidden
        factory.createActionItem({
          groupPriority: ++groupPriority,
          isHidden: true,
        }),
        // Single item in a group
        factory.createActionItem({
          groupPriority: ++groupPriority,
        }),
        // Single item in a group
        factory.createActionItem({
          groupPriority: ++groupPriority,
        }),
        // Multiple items in a group
        factory.createActionItem({
          groupPriority: ++groupPriority,
        }),
        factory.createActionItem({
          groupPriority: groupPriority,
        }),
        // All items in a group are hidden
        factory.createActionItem({
          groupPriority: ++groupPriority,
          isHidden: true,
        }),
        // Last item of a group is hidden
        factory.createActionItem({
          groupPriority: ++groupPriority,
        }),
        factory.createActionItem({
          groupPriority: groupPriority,
          isHidden: true,
        }),
        // All items in a group are hidden
        factory.createActionItem({
          groupPriority: ++groupPriority,
          isHidden: true,
        }),
        // All items of last group are hidden
        factory.createActionItem({
          groupPriority: ++groupPriority,
          isHidden: true,
        }),
      ];
    })(),
  },
};

export const ActiveToolId: Story = {
  args: {
    activeToolId: "item3",
    items: (() => {
      const factory = createItemFactory();
      return [
        factory.createActionItem(),
        factory.createGroupItem({
          items: [
            factory.createActionItem(),
            factory.createGroupItem({
              items: [
                factory.createActionItem(),
                factory.createGroupItem({
                  items: [factory.createActionItem()],
                }),
              ],
            }),
            factory.createActionItem(),
          ],
        }),
        factory.createActionItem(),
      ];
    })(),
  },
};

export const ActiveItemIds: Story = {
  args: {
    activeItemIds: ["item3", "item10"],
    items: (() => {
      const factory = createItemFactory();
      return [
        factory.createActionItem(),
        factory.createGroupItem({
          items: [
            factory.createActionItem(),
            factory.createGroupItem({
              items: [
                factory.createActionItem(),
                factory.createGroupItem({
                  items: [factory.createActionItem()],
                }),
              ],
            }),
            factory.createActionItem(),
          ],
        }),
        factory.createActionItem(),
        factory.createActionItem(),
      ];
    })(),
  },
};

export const Overflow: Story = {
  args: {
    items: (() => {
      const factory = createItemFactory();
      const createItems = () =>
        Array.from({ length: 8 }).map(() => factory.createActionItem());
      return [
        ...createItems(),
        factory.createGroupItem({
          items: [
            ...createItems(),
            factory.createGroupItem({
              items: [
                ...createItems(),
                factory.createGroupItem({
                  items: [...createItems(), ...createItems()],
                }),
                ...createItems(),
              ],
            }),
            ...createItems(),
          ],
        }),
        ...createItems(),
      ];
    })(),
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

function createItemFactory() {
  let i = 0;
  function createActionItem(
    overrides?: Omit<Partial<ToolbarActionItem>, "icon">
  ) {
    const id = `item${++i}`;
    const label = `Item ${i}`;
    return ToolbarItemUtilities.createActionItem({
      id,
      label,
      icon: <DynamicIcon />,
      execute: () => action(label)(),
      ...overrides,
    });
  }

  function createGroupItem(
    overrides?: Omit<Partial<ToolbarGroupItem>, "icon">
  ) {
    const id = `group${++i}`;
    const label = `Group ${i}`;
    return ToolbarItemUtilities.createGroupItem({
      id,
      label,
      icon: <DynamicIcon />,
      ...overrides,
    });
  }

  function createCustomItem(
    overrides?: Omit<Partial<ToolbarCustomItem>, "icon">
  ) {
    const id = `custom${++i}`;
    const label = `Custom ${i}`;
    return ToolbarItemUtilities.createCustomItem({
      id,
      label,
      icon: <DynamicIcon />,
      panelContent: <div>Custom panel content {i}</div>,
      ...overrides,
    });
  }

  return {
    createActionItem,
    createGroupItem,
    createCustomItem,
  };
}

function DynamicIcon() {
  const useStrataKit = React.useContext(UseStrataKitContext);
  if (useStrataKit) {
    return <Icon href={`${placeholderIcon}#icon-large`} size="large" />;
  }
  return <SvgPlaceholder />;
}

function createItems() {
  const action1 = ToolbarItemUtilities.createActionItem(
    "item1",
    100,
    "",
    "Item 1",
    action("Item 1"),
    {
      iconNode: <Svg2D />,
    }
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
  const action4 = ToolbarItemUtilities.createActionItem(
    "item4",
    100,
    <SvgAdd />,
    "Item 4",
    action("Item 4")
  );

  const group1 = ToolbarItemUtilities.createGroupItem(
    "group1",
    100,
    "",
    "Group 1",
    [action1, action2],
    {
      iconNode: <SvgActivity />,
    }
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
    "",
    "Custom 1",
    <div>Custom panel content 1</div>,
    {
      iconNode: <Svg2D />,
    }
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
    action4,
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
