/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import type { CommonToolbarItemWithBadgeKind as UIACommonToolbarItemWithBadgeKind } from "@itwin/components-react/internal";
import type { ToolbarItem } from "./ToolbarItem.js";
import { isToolbarCustomItem, isToolbarGroupItem } from "./ToolbarItem.js";

/** @internal */
export function toUIAToolbarItem(
  item: ToolbarItem
): UIACommonToolbarItemWithBadgeKind {
  if (isToolbarCustomItem(item)) {
    return {
      ...item,
      badgeType: item.badge, // eslint-disable-line @typescript-eslint/no-deprecated
      badgeKind: item.badgeKind,
      isCustom: true,
      icon: item.iconNode ?? (item.icon as string), // eslint-disable-line @typescript-eslint/no-deprecated
      panelContentNode: item.panelContent,
    } as UIACommonToolbarItemWithBadgeKind;
  }
  if (isToolbarGroupItem(item)) {
    return {
      ...item,
      items: item.items.map(toUIAToolbarItem),
      badgeType: item.badge, // eslint-disable-line @typescript-eslint/no-deprecated
      badgeKind: item.badgeKind,
      icon: item.iconNode ?? item.icon, // eslint-disable-line @typescript-eslint/no-deprecated
    } as UIACommonToolbarItemWithBadgeKind;
  }
  return {
    ...item,
    badgeType: item.badge, // eslint-disable-line @typescript-eslint/no-deprecated
    badgeKind: item.badgeKind,
    icon: item.iconNode ?? item.icon, // eslint-disable-line @typescript-eslint/no-deprecated
  } as UIACommonToolbarItemWithBadgeKind;
}
