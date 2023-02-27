/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */
import * as React from "react";
import {
  ActionButton, CommonToolbarItem, ConditionalStringValue, CustomButtonDefinition, GroupButton, StringGetter
} from "@itwin/appui-abstract";
import { IconHelper } from "@itwin/core-react";
import { AnyItemDef } from "../shared/AnyItemDef";
import { CommandItemDef } from "../shared/CommandItemDef";
import { CustomItemDef } from "../shared/CustomItemDef";
import { ToolItemDef } from "../shared/ToolItemDef";
import { GroupItemDef } from "./GroupItem";
import { isToolbarActionItem, isToolbarGroupItem, ToolbarActionItem, ToolbarCustomItem, ToolbarGroupItem, ToolbarItem } from "./ToolbarItem";

/** Helper functions for defining an ToolbarComposer.
 * @public
 */
export class ToolbarHelper {
  /** Construct CustomToolbarItem definitions given a CustomItemDef. */
  public static createCustomDefinitionToolbarItem(itemPriority: number, itemDef: CustomItemDef, overrides?: Partial<CustomButtonDefinition>): ToolbarCustomItem {
    const isHidden = itemDef.isHidden;
    const isDisabled = itemDef.isDisabled;
    const internalData = new Map<string, any>();  // used to store ReactNode if iconSpec hold a ReactNode
    const icon = IconHelper.getIconData(itemDef.iconSpec, internalData);
    const label = this.getStringOrConditionalString(itemDef.rawLabel);
    const badgeType = itemDef.badgeType;

    // istanbul ignore else
    return {
      id: itemDef.id,
      itemPriority,
      icon,
      label,
      isCustom: true,
      isHidden,
      isDisabled,
      internalData,
      badgeType,
      panelContent: itemDef.popupPanelNode,
      ...overrides,
    };
  }

  /** Construct ActionButton and GroupButton definitions given an array to ItemDefs. */
  public static constructChildToolbarItems(itemDefs: AnyItemDef[]): Array<ToolbarActionItem | ToolbarGroupItem> {
    let count = 10;
    const items: Array<ToolbarActionItem | ToolbarGroupItem> = [];
    for (const itemDef of itemDefs) {
      const item = this.createToolbarItemFromItemDef(count, itemDef);
      count = count + 10;
      // istanbul ignore else
      if (isToolbarActionItem(item) || isToolbarGroupItem(item))
        items.push(item);
    }
    return items;
  }

  private static getStringOrConditionalString(inString: string | StringGetter | ConditionalStringValue): string | ConditionalStringValue {
    if (inString instanceof ConditionalStringValue || typeof inString === "string")
      return inString;

    return inString();
  }

  public static getIconReactNode(item: ActionButton | GroupButton): React.ReactNode {
    return IconHelper.getIconReactNode(item.icon, item.internalData);
  }

  /** Helper method to creates a generic toolbar item entry */
  public static createToolbarItemFromItemDef(itemPriority: number, itemDef: AnyItemDef, overrides?: Partial<CommonToolbarItem>): ToolbarItem {
    const isHidden = itemDef.isHidden;
    const isDisabled = itemDef.isDisabled;
    const icon = itemDef.iconSpec;
    const label = this.getStringOrConditionalString(itemDef.rawLabel);
    const badge = itemDef.badgeType;

    // istanbul ignore else
    if (itemDef instanceof CommandItemDef) {
      return {
        id: itemDef.id,
        itemPriority,
        icon,
        label,
        isHidden,
        isDisabled,
        isActive: itemDef.isActive,
        execute: itemDef.execute,
        badge,
        ...overrides,
      };
    } else if (itemDef instanceof CustomItemDef) {
      return ToolbarHelper.createCustomDefinitionToolbarItem(itemPriority, itemDef, overrides);
    } else if (itemDef instanceof GroupItemDef) {
      const children: Array<ToolbarActionItem | ToolbarGroupItem> = this.constructChildToolbarItems(itemDef.items);
      return {
        id: itemDef.id,
        itemPriority,
        icon,
        label,
        panelLabel: itemDef.panelLabel,
        isHidden,
        isDisabled,
        items: children,
        isActive: false,
        badge,
        ...overrides,
      };
    } else if (itemDef instanceof ToolItemDef) {
      return {
        id: itemDef.id,
        itemPriority,
        icon,
        label,
        isHidden,
        isDisabled,
        isActive: itemDef.isActive,
        execute: itemDef.execute,
        badge,
        ...overrides,
      };
    } else {
      throw new Error(`Invalid Item type encountered, item id=${itemDef.id}`);
    }
  }

  public static createToolbarItemsFromItemDefs(itemDefs: AnyItemDef[], startingItemPriority = 10, overrides?: Partial<CommonToolbarItem>): ToolbarItem[] {
    let itemPriority = startingItemPriority;
    const items = itemDefs.map((itemDef: AnyItemDef) => {
      const item = ToolbarHelper.createToolbarItemFromItemDef(itemPriority, itemDef, overrides);
      itemPriority = itemPriority + 10;
      return item;
    });
    return items;
  }
}
