/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { IModelApp, type ToolType } from "@itwin/core-frontend";
import type {
  ToolbarActionItem,
  ToolbarCustomItem,
  ToolbarGroupItem,
} from "./ToolbarItem.js";
import { isArgsUtil } from "../backstage/BackstageItemUtilities.js";
import { ToolUtilities } from "@itwin/imodel-components-react";

/** Helper namespace to create toolbar items.
 * @public
 */
export namespace ToolbarItemUtilities {
  interface CreateActionItemArgs
    extends Partial<Omit<ToolbarActionItem, "icon" | "iconNode" | "id">>,
      Pick<ToolbarActionItem, "id"> {
    icon?: ToolbarActionItem["iconNode"];
  }

  type DeprecatedActionItemArgs = [
    id: ToolbarActionItem["id"],
    itemPriority: ToolbarActionItem["itemPriority"],
    icon: ToolbarActionItem["icon"],
    label: ToolbarActionItem["label"],
    execute: ToolbarActionItem["execute"],
    overrides?: Partial<ToolbarActionItem>
  ];

  function createDeprecatedActionItem(
    ...[
      id,
      itemPriority,
      icon,
      label,
      execute,
      overrides,
    ]: DeprecatedActionItemArgs
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

  /** Creates an action item. */
  export function createActionItem(
    args: CreateActionItemArgs
  ): ToolbarActionItem;
  /** Creates an action item.
   * @deprecated in 4.16.0. Uses a deprecated {@link @itwin/core-react#IconSpec} type. Use an overload instead.
   */
  export function createActionItem(
    ...args: DeprecatedActionItemArgs
  ): ToolbarActionItem;
  /** Creates an action item. */
  export function createActionItem(
    ...args: DeprecatedActionItemArgs | [CreateActionItemArgs]
  ): ToolbarActionItem {
    if (isArgsUtil(args)) {
      const {
        execute = () => {},
        icon,
        itemPriority = 0,
        label = "",
        ...other
      } = args[0];
      return {
        execute,
        itemPriority,
        iconNode: icon,
        icon: icon ? <>{icon}</> : undefined,
        label,
        ...other,
      };
    }
    return createDeprecatedActionItem(...args);
  }

  interface CreateGroupItemArgs
    extends Partial<Omit<ToolbarGroupItem, "icon" | "iconNode" | "id">>,
      Pick<ToolbarGroupItem, "id"> {
    icon?: ToolbarGroupItem["iconNode"];
  }

  type DeprecatedGroupItemArgs = [
    id: string,
    itemPriority: number,
    icon: ToolbarGroupItem["icon"],
    label: ToolbarGroupItem["label"],
    items: ToolbarGroupItem["items"],
    overrides?: Partial<ToolbarGroupItem>
  ];

  function createDeprecatedGroupItem(
    ...[
      id,
      itemPriority,
      icon,
      label,
      items,
      overrides,
    ]: DeprecatedGroupItemArgs
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

  /** Creates a group item. */
  export function createGroupItem(args: CreateGroupItemArgs): ToolbarGroupItem;
  /** Creates a group item.
   * @deprecated in 4.16.0. Uses a deprecated {@link @itwin/core-react#IconSpec} type. Use an overload instead.
   */
  export function createGroupItem(
    ...args: DeprecatedGroupItemArgs
  ): ToolbarGroupItem;
  /** Creates a group item. */
  export function createGroupItem(
    ...args: DeprecatedGroupItemArgs | [CreateGroupItemArgs]
  ): ToolbarGroupItem {
    if (isArgsUtil(args)) {
      const {
        icon,
        itemPriority = 0,
        items = [],
        label = "",
        ...other
      } = args[0];
      return {
        itemPriority,
        items,
        iconNode: icon,
        icon: icon ? <>{icon}</> : undefined,
        label,
        ...other,
      };
    }
    return createDeprecatedGroupItem(...args);
  }

  interface CreateCustomItemArgs
    extends Partial<Omit<ToolbarCustomItem, "icon" | "iconNode" | "id">>,
      Pick<ToolbarCustomItem, "id"> {
    icon?: ToolbarCustomItem["iconNode"];
  }

  type DeprecatedCustomItemArgs = [
    id: string,
    itemPriority: number,
    icon: ToolbarCustomItem["icon"],
    label: ToolbarCustomItem["label"],
    panelContent?: ToolbarCustomItem["panelContent"],
    overrides?: Partial<ToolbarCustomItem>
  ];

  function createDeprecatedCustomItem(
    ...[
      id,
      itemPriority,
      icon,
      label,
      panelContent,
      overrides,
    ]: DeprecatedCustomItemArgs
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

  /** Creates a custom item. */
  export function createCustomItem(
    args: CreateCustomItemArgs
  ): ToolbarCustomItem;
  /** Creates a custom item.
   * @deprecated in 4.16.0. Uses a deprecated {@link @itwin/core-react#IconSpec} type. Use an overload instead.
   */
  export function createCustomItem(
    ...args: DeprecatedCustomItemArgs
  ): ToolbarCustomItem;
  /** Creates a custom item. */
  export function createCustomItem(
    ...args: DeprecatedCustomItemArgs | [CreateCustomItemArgs]
  ): ToolbarCustomItem {
    if (isArgsUtil(args)) {
      const { icon, itemPriority = 0, ...other } = args[0];
      return {
        itemPriority,
        iconNode: icon,
        icon: icon ? <>{icon}</> : undefined,
        ...other,
      };
    }
    return createDeprecatedCustomItem(...args);
  }

  /** Creates an action item from the specified tool type. */
  export function createForTool(
    toolType: ToolType,
    overrides?: Partial<ToolbarActionItem>
  ): ToolbarActionItem {
    const iconNode = ToolUtilities.isWithIcon(toolType)
      ? toolType.iconElement
      : undefined;

    // eslint-disable-next-line @typescript-eslint/no-deprecated
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
        iconNode,
        ...overrides,
      }
    );
  }
}
