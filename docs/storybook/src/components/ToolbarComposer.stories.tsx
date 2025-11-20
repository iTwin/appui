/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
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
  ToolbarItem,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  useConditionalValue,
  useToolbarIcon,
} from "@itwin/appui-react";
import { ConditionalIconItem, IconHelper } from "@itwin/core-react";
import {
  Svg2D,
  Svg3D,
  SvgActivity,
  SvgAdd,
  SvgAirplane,
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
import { ToolbarComposerStory } from "./ToolbarComposer";
import { usePreviewFeatures } from "@itwin/appui-react-internal/lib/appui-react/preview/PreviewFeatures";

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
    items: (() => {
      const factory = createItemFactory();
      const badges: ToolbarItem["badgeKind"][] = [
        "technical-preview",
        "new",
        "deprecated",
      ];
      return [
        ...badges.flatMap((badgeKind) => {
          return [
            factory.createActionItem({
              description: `${badgeKind} badge`,
              badgeKind,
            }),
            factory.createGroupItem({
              description: `${badgeKind} badge`,
              badgeKind,
            }),
            factory.createCustomItem({
              description: `${badgeKind} badge`,
              badgeKind,
            }),
          ];
        }),
      ];
    })(),
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
        label: "Icon node",
        icon: <SvgPlaceholder />,
      }),
      ToolbarItemUtilities.createActionItem(
        "spec-node",
        0,
        <SvgPlaceholder />,
        "Icon spec node",
        () => {}
      ),
      ToolbarItemUtilities.createActionItem(
        "svg-loader",
        0,
        genericPlaceholderIcon,
        "SVG loader",
        () => {}
      ),
      ToolbarItemUtilities.createActionItem(
        "font-icon",
        0,
        "icon-placeholder",
        "Font icon",
        () => {}
      ),
      ToolbarItemUtilities.createActionItem({
        id: "dynamic-icon",
        icon: <DynamicIcon />,
        label: "Dynamic icon",
      }),
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

type IconProps = React.ComponentProps<typeof Icon>;

function DynamicIcon(props: IconProps) {
  const { useStrataKit } = usePreviewFeatures();
  const { size } = useToolbarIcon();
  if (useStrataKit) {
    return (
      <Icon
        href={`${placeholderIcon}#icon${size === "regular" ? "" : `-${size}`}`}
        size={size}
        {...props}
      />
    );
  }
  return <SvgPlaceholder />;
}
