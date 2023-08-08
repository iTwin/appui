/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  ToolbarItem,
  ToolbarOrientation,
  ToolbarUsage,
  UiFramework,
  UiItemsManager,
  useActiveStageId,
  useAvailableUiItemsProviders,
} from "@itwin/appui-react";

export function useToolbarItems(
  usage: ToolbarUsage, // TODO: no usage, orientation args
  orientation: ToolbarOrientation
): ToolbarItem[] {
  const [items, setItems] = React.useState<ToolbarItem[]>([]);
  const providerIds = useAvailableUiItemsProviders();
  const providerIdsStr = providerIds.join("-");
  const stageId = useActiveStageId();
  React.useEffect(() => {
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) return;

    const stageUsage = frontstageDef.usage;
    const newItems = UiItemsManager.getToolbarButtonItems(
      stageId,
      stageUsage,
      usage,
      orientation
    );
    setItems([...newItems]);
  }, [stageId, providerIdsStr, usage, orientation]);
  return items;
}

export function useGroupToolbarItems(items: ToolbarItem[]) {
  const priorityToItems = items.reduce<Map<number, ToolbarItem[]>>(
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
    return groupItems.sort((a, b) => a.itemPriority - b.itemPriority);
  });
  return sortedItems;
}
