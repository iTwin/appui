/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { SpatialToolbarItem } from "./SpatialToolbarItem";
import { ToolbarItem } from "@itwin/appui-react";
import { Toolbar } from "./Toolbar";

interface ToolbarGroupProps extends React.ComponentProps<"div"> {
  items: SpatialToolbarItem[];
}

export function ToolbarGroup(props: ToolbarGroupProps) {
  const { items, ...rest } = props;
  const groups = useGroupToolbarItems(items);
  return (
    <div {...rest}>
      {groups.map((group, index) => {
        return <Toolbar key={index} items={group} />;
      })}
    </div>
  );
}

// Groups and sorts toolbar items by their `groupPriority` and `itemPriority`.
function useGroupToolbarItems<T extends ToolbarItem>(items: ReadonlyArray<T>) {
  const priorityToItems = items.reduce<Map<number, T[]>>((acc, item) => {
    const groupPriority = item.groupPriority ?? 0;
    let group = acc.get(groupPriority);
    if (!group) {
      group = [];
      acc.set(groupPriority, group);
    }
    group.push(item);
    return acc;
  }, new Map());
  const sortedGroups = [...priorityToItems.entries()].sort(
    (a, b) => a[0] - b[0]
  );
  const sortedItems = sortedGroups.map((group) => {
    const groupItems = group[1];
    return groupItems.sort((a, b) => a.itemPriority - b.itemPriority);
  });
  return sortedItems;
}
