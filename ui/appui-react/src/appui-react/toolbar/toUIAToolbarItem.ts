/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import { CommonToolbarItem as UIA_CommonToolbarItem } from "@itwin/appui-abstract";
import { CustomToolbarItem } from "@itwin/components-react";
import { isToolbarCustomItem, ToolbarItem } from "./ToolbarItem";

/** @internal */
export function toUIAToolbarItem(item: ToolbarItem): UIA_CommonToolbarItem {
  if (isToolbarCustomItem(item)) {
    const customItem: CustomToolbarItem = {
      ...item,
      isCustom: true,
      icon: item.icon as string,
      panelContentNode: item.panelContent,
    };
    return customItem;
  }
  return item as UIA_CommonToolbarItem; // TODO: 4.0
}
