/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import { IModelApp, type ToolType } from "@itwin/core-frontend";
import type {
  ToolbarActionItem,
  ToolbarCustomItem,
  ToolbarGroupItem,
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

  /** Creates an action item from the specified tool type. */
  export function createForTool(
    toolType: ToolType,
    overrides?: Partial<ToolbarActionItem>
  ): ToolbarActionItem {
    return ToolbarItemUtilities.createActionItem(
      toolType.toolId,
      0,
      toolType.iconSpec,
      toolType.flyover,
      () => {
        void IModelApp.tools.run(toolType.toolId);
      },
      {
        description: toolType.description,
        ...overrides,
      }
    );
  }
}
