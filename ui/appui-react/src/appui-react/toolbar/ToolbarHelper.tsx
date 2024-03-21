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
  CommonToolbarItem,
  CustomButtonDefinition,
  GroupButton,
  StringGetter,
} from "@itwin/appui-abstract";
import { ConditionalStringValue } from "@itwin/appui-abstract";
import { IconHelper } from "@itwin/core-react";
import type { AnyItemDef } from "../shared/AnyItemDef";
import { CommandItemDef } from "../shared/CommandItemDef";
import { CustomItemDef } from "../shared/CustomItemDef";
import { ToolItemDef } from "../shared/ToolItemDef";
import { GroupItemDef } from "./GroupItem";
import type {
  ToolbarActionItem,
  ToolbarCustomItem,
  ToolbarGroupItem,
  ToolbarItem,
} from "./ToolbarItem";
import { isToolbarActionItem, isToolbarGroupItem } from "./ToolbarItem";

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
  overrides?: Partial<CommonToolbarItem>
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
 */
export class ToolbarHelper {
  /** Construct ToolbarCustomItem definitions given a CustomItemDef. */
  public static createCustomDefinitionToolbarItem(
    itemPriority: number,
    itemDef: CustomItemDef,
    overrides?: Partial<CustomButtonDefinition>
  ): ToolbarCustomItem {
    return this.createToolbarItemFromItemDef(itemPriority, itemDef, overrides);
  }

  /** Construct ToolbarActionItem and ToolbarGroupItem definitions given an array of ItemDefs. */
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

  public static getIconReactNode(
    item: ActionButton | GroupButton
  ): React.ReactNode {
    return IconHelper.getIconReactNode(item.icon, item.internalData);
  }

  /** Helper method to creates a generic toolbar item entry */
  public static createToolbarItemFromItemDef(
    itemPriority: number,
    itemDef: AnyItemDef,
    overrides?: Partial<CommonToolbarItem>
  ): ToolbarItem {
    const { badgeType, description, icon, internalData, ...itemOverrides } =
      overrides ?? {};
    const itemBase: ToolbarItem = {
      id: itemDef.id,
      itemPriority,
      isActive: itemDef.isActive,
      isHidden: itemDef.isHidden,
      isDisabled: itemDef.isDisabled,
      icon:
        internalData?.get(IconHelper.reactIconKey) ??
        internalData?.get(IconHelper.conditionalIconItemKey) ??
        icon ??
        itemDef.iconSpec,
      label: this.getStringOrConditionalString(itemDef.rawLabel),
      badge: badgeType ?? itemDef.badgeType,
      description: description ?? itemDef.description,
    };

    // istanbul ignore else
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

  /**
   * Helper method to creates a generic toolbar item entry list.
   */
  public static createToolbarItemsFromItemDefs(
    itemDefs: AnyItemDef[],
    startingItemPriority = 10,
    overrides?: Partial<CommonToolbarItem>
  ): ToolbarItem[] {
    return constructToolbarItemArray(
      itemDefs,
      true,
      startingItemPriority,
      overrides
    );
  }
}
