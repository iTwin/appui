/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { ToolbarItem } from "./ToolbarItem";
import { useAvailableUiItemsProviders } from "../hooks/useAvailableUiItemsProviders";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager";
import type { ToolbarItemLocation } from "./ToolbarItemLocation";

/** @internal */
export function useToolbarItems(): ReadonlyArray<ToolbarItem> {
  const [items, setItems] = React.useState<ToolbarItem[]>([]);
  const providerIds = useAvailableUiItemsProviders();
  React.useEffect(() => {
    const itemMap = new Map<ToolbarItem["id"], ToolbarItem>();
    for (const providerId of providerIds) {
      const provider = UiItemsManager.getUiItemsProvider(providerId);
      if (!provider) continue;
      const newItems = provider.getToolbarItems
        ? provider.getToolbarItems()
        : [];
      for (const newItem of newItems) {
        if (itemMap.has(newItem.id)) continue;
        itemMap.set(newItem.id, newItem);
      }
    }
    setItems(Array.from(itemMap.values()));
  }, [providerIds]);
  return items;
}

/** @internal */
export function useGroupedToolbarItems(
  groupedLocations: ReadonlyArray<ReadonlyArray<ToolbarItemLocation>>
): ReadonlyArray<ReadonlyArray<ToolbarItem>> {
  const allItems = useToolbarItems();
  return React.useMemo(() => {
    const groupedItems: Array<Array<ToolbarItem>> = [];
    for (const locationGroup of groupedLocations) {
      const itemGroup: Array<ToolbarItem> = [];
      for (const location of locationGroup) {
        const newItem = allItems.find((item) => item.id === location.id);
        if (!newItem) continue;
        itemGroup.push(newItem);
      }

      if (itemGroup.length !== 0) groupedItems.push(itemGroup);
    }
    return groupedItems;
  }, [allItems, groupedLocations]);
}

/** @internal */
export function useToolbarItemLocations(): ReadonlyArray<ToolbarItemLocation> {
  const [items, setItems] = React.useState<ToolbarItemLocation[]>([]);
  const providerIds = useAvailableUiItemsProviders();
  React.useEffect(() => {
    const allItems = new Array<ToolbarItemLocation>();
    for (const providerId of providerIds) {
      const provider = UiItemsManager.getUiItemsProvider(providerId);
      if (!provider) continue;
      const newItems = provider.getToolbarItemLocations
        ? provider.getToolbarItemLocations()
        : [];
      allItems.push(...newItems);
    }
    setItems(allItems);
  }, [providerIds]);
  return items;
}

/** @internal */
export function useGroupToolbarItemLocations(
  items: ReadonlyArray<ToolbarItemLocation>
): ReadonlyArray<ReadonlyArray<ToolbarItemLocation>> {
  const priorityToItems = items.reduce<Map<number, ToolbarItemLocation[]>>(
    (acc, item) => {
      const groupPriority = item.groupPriority ?? 0;
      let group = acc.get(groupPriority);
      if (!group) {
        group = [];
        acc.set(groupPriority, group);
      }
      group.push(item);
      return acc;
    },
    new Map()
  );
  const sortedGroups = [...priorityToItems.entries()].sort(
    (a, b) => a[0] - b[0]
  );
  const sortedItems = sortedGroups.map((group) => {
    const groupItems = group[1];
    return groupItems.sort((a, b) => {
      const aPriority = a.itemPriority ?? 0;
      const bPriority = b.itemPriority ?? 0;
      return aPriority - bPriority;
    });
  });
  return sortedItems;
}
