/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import type { ToolbarItem } from "../../toolbar/ToolbarItem.js";
import { SyncUiEventDispatcher } from "../../syncui/SyncUiEventDispatcher.js";
import { ConditionalBooleanValue } from "../../shared/ConditionalValue.js";

/** @internal */
export function useVisibleItems(items: ToolbarItem[]) {
  const [visibleItems, setVisibleItems] = React.useState<ToolbarItem[]>(() => {
    const initialVisibleItems: ToolbarItem[] = [];
    for (const item of items) {
      if (item.isHidden instanceof ConditionalBooleanValue) {
        item.isHidden.refresh();
      }
      const isHidden = ConditionalBooleanValue.getValue(item.isHidden);
      if (isHidden) continue;
      initialVisibleItems.push(item);
    }
    return initialVisibleItems;
  });
  React.useEffect(() => {
    return SyncUiEventDispatcher.onSyncUiEvent.addListener((args) => {
      const newVisibleItems: ToolbarItem[] = [];
      let refreshed = false;
      for (const item of items) {
        if (
          ConditionalBooleanValue.refreshValue(item.isHidden, args.eventIds)
        ) {
          refreshed = true;
        }

        const isHidden = ConditionalBooleanValue.getValue(item.isHidden);
        if (isHidden) continue;
        newVisibleItems.push(item);
      }
      if (!refreshed) return;
      setVisibleItems(newVisibleItems);
    });
  }, [items]);

  return visibleItems;
}
