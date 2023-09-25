/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import type {
  ToolbarActionItem,
  ToolbarCustomItem,
  ToolbarGroupItem,
  ToolbarOrientation,
  ToolbarUsage,
} from "./ToolbarItem";

/** Helper class to create toolbar items.
 * @beta
 */
export namespace ToolbarItemUtilities {
  /** Creates an action item. */
  export function createActionItem(
    id: ToolbarActionItem["id"],
    itemPriority: ToolbarActionItem["itemPriority"],
    icon: ToolbarActionItem["icon"],
    label: ToolbarActionItem["label"],
    execute: ToolbarActionItem["execute"],
    overrides?: Partial<ToolbarActionItem>
  ): ToolbarActionItem {
    return {
      id,
      itemPriority,
      icon,
      label,
      execute,
      ...overrides,
    };
  }

  /** Creates a group item. */
  export function createGroupItem(
    id: string,
    itemPriority: number,
    icon: ToolbarGroupItem["icon"],
    label: ToolbarGroupItem["label"],
    items: ToolbarGroupItem["items"],
    overrides?: Partial<ToolbarGroupItem>
  ): ToolbarGroupItem {
    return {
      id,
      itemPriority,
      icon,
      label,
      items,
      ...overrides,
    };
  }

  /** Creates a custom item. */
  export function createCustomItem(
    id: string,
    itemPriority: number,
    icon: ToolbarCustomItem["icon"],
    label: ToolbarCustomItem["label"],
    panelContent?: ToolbarCustomItem["panelContent"],
    overrides?: Partial<ToolbarCustomItem>
  ): ToolbarCustomItem {
    return {
      id,
      itemPriority,
      icon,
      label,
      panelContent,
      ...overrides,
    };
  }

  /** @alpha */
  export function toToolbarId(
    usage: ToolbarUsage,
    orientation: ToolbarOrientation
  ) {
    return JSON.stringify({ usage, orientation });
  }

  /** @alpha */
  export function fromToolbarId(toolbarId: string):
    | undefined
    | {
        usage: ToolbarUsage;
        orientation: ToolbarOrientation;
      } {
    const obj = JSON.parse(toolbarId);
    const usage = obj.usage;
    const orientation = obj.orientation;
    if (usage === undefined) return undefined;
    if (orientation === undefined) return undefined;
    return { usage, orientation };
  }
}
