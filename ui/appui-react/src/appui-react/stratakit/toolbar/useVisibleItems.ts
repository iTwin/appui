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
  const [hiddenItems, setHiddenItems] = React.useState<string[]>(() => {
    return getHiddenItems(items);
  });

  React.useEffect(() => {
    setHiddenItems(getHiddenItems(items));
    return SyncUiEventDispatcher.onSyncUiEvent.addListener((args) => {
      const newHiddenItems: string[] = [];
      let refreshed = false;
      for (const item of items) {
        if (
          ConditionalBooleanValue.refreshValue(item.isHidden, args.eventIds)
        ) {
          refreshed = true;
        }

        const isHidden = ConditionalBooleanValue.getValue(item.isHidden);
        if (!isHidden) continue;
        newHiddenItems.push(item.id);
      }
      if (!refreshed) return;
      setHiddenItems(newHiddenItems);
    });
  }, [items]);

  const visibleItems = items.filter((item) => !hiddenItems.includes(item.id));
  return visibleItems;
}

function getHiddenItems(items: ToolbarItem[]): string[] {
  const hiddenItems: string[] = [];
  for (const item of items) {
    if (item.isHidden instanceof ConditionalBooleanValue) {
      item.isHidden.refresh();
    }
    const isHidden = ConditionalBooleanValue.getValue(item.isHidden);
    if (!isHidden) continue;
    hiddenItems.push(item.id);
  }
  return hiddenItems;
}
