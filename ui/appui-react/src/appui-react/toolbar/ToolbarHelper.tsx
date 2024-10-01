/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */
import type * as React from "react";
import type {
  ActionButton,
  CustomButtonDefinition,
  GroupButton,
  StringGetter,
} from "@itwin/appui-abstract";
import { ConditionalStringValue } from "@itwin/appui-abstract";
import { assert } from "@itwin/core-bentley";
import type { BadgeKind } from "@itwin/core-react";
import { IconHelper } from "@itwin/core-react";
import type { AnyItemDef } from "../shared/AnyItemDef.js";
import { CommandItemDef } from "../shared/CommandItemDef.js";
import { CustomItemDef } from "../shared/CustomItemDef.js";
import { ToolItemDef } from "../shared/ToolItemDef.js";
import { GroupItemDef } from "./GroupItem.js";
import type {
  ToolbarActionItem,
  ToolbarCustomItem,
  ToolbarGroupItem,
  ToolbarItem,
} from "./ToolbarItem.js";
import { isToolbarActionItem, isToolbarGroupItem } from "./ToolbarItem.js";
import type { ToolbarItemUtilities } from "./ToolbarItemUtilities.js";
import type { CommonToolbarItemWithBadgeKind } from "@itwin/components-react";

/* eslint-disable deprecation/deprecation */

/**
 * Common implementation for `constructChildToolbarItems` and `createToolbarItemsFromItemDefs`.
 * @param itemDefs List of itemDefs to convert.
 * @param allowCustom false if we are building children and don't support custom items.
 * @param startingItemPriority defaults to 10.
 * @param overrides Single override to apply to each itemDefs.
 * @returns ToolbarItem[] or (ToolbarActionItem | ToolbarGroupItem) if allowCustom is false.
 */
function constructToolbarItemArray<T extends boolean>(
  itemDefs: AnyItemDef[],
  allowCustom: T,
  startingItemPriority = 10,
  overrides?: Partial<CommonToolbarItemWithBadgeKind>
) {
  let priority = startingItemPriority;
  const items = [];
  for (const itemDef of itemDefs) {
    const item = ToolbarHelper.createToolbarItemFromItemDef(
      priority,
      itemDef,
      overrides
    );
    priority = priority + 10;
    if (allowCustom || isToolbarActionItem(item) || isToolbarGroupItem(item))
      items.push(item);
  }
  return items as T extends true
    ? Array<ToolbarItem>
    : Array<ToolbarActionItem | ToolbarGroupItem>;
}

/** Helper functions for defining a Toolbar items used in `Toolbar`, `ToolbarComposer` and `UiItemsProvider`.
 * @public
 * @deprecated in 4.15.0. Use {@link ToolbarItemUtilities} instead.
 */
export class ToolbarHelper {
  /** Construct ToolbarCustomItem definitions given a CustomItemDef.
   * @deprecated in 4.15.0. Use `ToolbarItemUtilities.createCustomItem` instead.
   */
  public static createCustomDefinitionToolbarItem(
    itemPriority: number,
    itemDef: CustomItemDef,
    overrides?: Partial<CustomButtonDefinition & { badgeKind?: BadgeKind }>
  ): ToolbarCustomItem {
    return this.createToolbarItemFromItemDef(itemPriority, itemDef, overrides);
  }

  /** Construct ToolbarActionItem and ToolbarGroupItem definitions given an array of ItemDefs.
   * @deprecated in 4.15.0. Use {@link ToolbarItemUtilities} instead.
   */
  public static constructChildToolbarItems(
    itemDefs: AnyItemDef[]
  ): Array<ToolbarActionItem | ToolbarGroupItem> {
    return constructToolbarItemArray(itemDefs, false);
  }

  private static getStringOrConditionalString(
    inString: string | StringGetter | ConditionalStringValue
  ): string | ConditionalStringValue {
    if (
      inString instanceof ConditionalStringValue ||
      typeof inString === "string"
    )
      return inString;

    return inString();
  }

  /** @deprecated in 4.15.0. Use {@link @itwin/core-react#IconHelper} instead. */
  public static getIconReactNode(
    item: ActionButton | GroupButton
  ): React.ReactNode {
    // eslint-disable-next-line deprecation/deprecation
    return IconHelper.getIconReactNode(item.icon, item.internalData);
  }

  /** Helper method to creates a generic toolbar item entry.
   * @deprecated in 4.15.0. Use {@link ToolbarItemUtilities} instead.
   */
  public static createToolbarItemFromItemDef(
    itemPriority: number,
    itemDef: AnyItemDef,
    overrides?: Partial<CommonToolbarItemWithBadgeKind>
  ): ToolbarItem {
    const {
      badgeType,
      badgeKind,
      description,
      icon,
      internalData,
      ...itemOverrides
    } = overrides ?? {};
    const itemBase: ToolbarItem = {
      id: itemDef.id,
      itemPriority,
      isActive: itemDef.isActive,
      isHidden: itemDef.isHidden,
      isDisabled: itemDef.isDisabled,
      icon:
        internalData?.get(IconHelper.reactIconKey) ?? // eslint-disable-line deprecation/deprecation
        internalData?.get(IconHelper.conditionalIconItemKey) ?? // eslint-disable-line deprecation/deprecation
        icon ??
        itemDef.iconSpec,
      label: this.getStringOrConditionalString(itemDef.rawLabel),
      badge: badgeType ?? itemDef.badgeType,
      badgeKind: badgeKind ?? itemDef.badgeKind,
      description: description ?? itemDef.description,
    };

    if (itemDef instanceof CommandItemDef || itemDef instanceof ToolItemDef) {
      return {
        ...itemBase,
        execute: itemDef.execute,
        ...itemOverrides,
      };
    } else if (itemDef instanceof CustomItemDef) {
      return {
        ...itemBase,
        panelContent: itemDef.popupPanelNode,
        ...itemOverrides,
      };
    } else if (itemDef instanceof GroupItemDef) {
      return {
        ...itemBase,
        panelLabel: itemDef.panelLabel,
        items: this.constructChildToolbarItems(itemDef.items),
        isActive: false,
        ...itemOverrides,
      };
    } else {
      throw new Error(`Invalid Item type encountered, item id=${itemDef.id}`);
    }
  }

  /** Helper method to creates a generic toolbar item entry list.
   * @deprecated in 4.15.0. Use {@link ToolbarItemUtilities} instead.
   */
  public static createToolbarItemsFromItemDefs(
    itemDefs: AnyItemDef[],
    startingItemPriority = 10,
    overrides?: Partial<CommonToolbarItemWithBadgeKind>
  ): ToolbarItem[] {
    return constructToolbarItemArray(
      itemDefs,
      true,
      startingItemPriority,
      overrides
    );
  }
}

/** @internal */
export function itemDefToToolbarActionItem(
  itemDef: ToolItemDef | CommandItemDef,
  overrides?: Partial<ToolbarActionItem>
): ToolbarActionItem {
  const item = ToolbarHelper.createToolbarItemFromItemDef(0, itemDef);
  assert(isToolbarActionItem(item));
  return {
    ...item,
    ...overrides,
  };
}

/** @internal */
export function itemDefToToolbarGroupItem(
  itemDef: GroupItemDef,
  overrides?: Partial<ToolbarGroupItem>
): ToolbarGroupItem {
  const item = ToolbarHelper.createToolbarItemFromItemDef(0, itemDef);
  assert(isToolbarGroupItem(item));
  return {
    ...item,
    ...overrides,
  };
}
