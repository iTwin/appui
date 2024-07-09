/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import type { CommonToolbarItemWithBadgeKind as UIACommonToolbarItemWithBadgeKind } from "@itwin/components-react";
import type { ToolbarItem } from "./ToolbarItem";
import { isToolbarCustomItem, isToolbarGroupItem } from "./ToolbarItem";

/** @internal */
export function toUIAToolbarItem(
  item: ToolbarItem
): UIACommonToolbarItemWithBadgeKind {
  if (isToolbarCustomItem(item)) {
    return {
      ...item,
      badgeType: item.badge, // eslint-disable-line deprecation/deprecation
      badgeKind: item.badgeKind,
      isCustom: true,
      icon: item.icon as string,
      panelContentNode: item.panelContent,
    } as UIACommonToolbarItemWithBadgeKind;
  }
  if (isToolbarGroupItem(item)) {
    return {
      ...item,
      items: item.items.map(toUIAToolbarItem),
      badgeType: item.badge, // eslint-disable-line deprecation/deprecation
      badgeKind: item.badgeKind,
    } as UIACommonToolbarItemWithBadgeKind;
  }
  return {
    ...item,
    badgeType: item.badge, // eslint-disable-line deprecation/deprecation
    badgeKind: item.badgeKind,
  } as UIACommonToolbarItemWithBadgeKind;
}
