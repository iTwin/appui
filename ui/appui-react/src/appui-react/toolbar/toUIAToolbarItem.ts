/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import type { CommonToolbarItem as UIA_CommonToolbarItem } from "@itwin/appui-abstract";
import type { CustomToolbarItem } from "@itwin/components-react";
import type { ToolbarItem } from "./ToolbarItem";
import { isToolbarCustomItem, isToolbarGroupItem } from "./ToolbarItem";

/** @internal */
export function toUIAToolbarItem(item: ToolbarItem): UIA_CommonToolbarItem {
  if (isToolbarCustomItem(item)) {
    // eslint-disable-next-line deprecation/deprecation
    const customItem: CustomToolbarItem = {
      ...item,
      badgeType: item.badge,
      isCustom: true,
      icon: item.icon as string,
      panelContentNode: item.panelContent,
    };
    return customItem;
  }
  if (isToolbarGroupItem(item)) {
    return {
      ...item,
      items: item.items.map(toUIAToolbarItem),
      badgeType: item.badge,
    } as UIA_CommonToolbarItem;
  }
  return {
    ...item,
    badgeType: item.badge,
  } as UIA_CommonToolbarItem;
}
