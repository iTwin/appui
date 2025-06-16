/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { BeEvent } from "@itwin/core-bentley";
import { produce } from "immer";

interface Item {
  id: string;
  isActive?: boolean;
}

type ActiveToolIdSynchedItem<T> = Item | (Item & { items: T[] });

interface ActiveToolIdSynchedHost {
  activeToolId: string;
  onToolActivatedEvent: BeEvent<(args: { toolId: string }) => void>;
}

function updateActiveItems<T extends ActiveToolIdSynchedItem<T>>(
  items: T[],
  toolId: string
) {
  return produce(items, (draft) => {
    // Iterative DFS with ancestor backtracking.
    const stack = draft.map((item) => [item, [] as typeof draft] as const);

    while (stack.length > 0) {
      const [current, ancestors] = stack.pop()!;

      const isActive = current.id === toolId;
      current.isActive = isActive;

      if ("items" in current) {
        for (const child of current.items) {
          stack.push([child, [...ancestors, current]]);
        }
      }

      if (!isActive) continue;

      // Mark ancestors of active item as active.
      for (const ancestor of ancestors) {
        ancestor.isActive = true;
      }
    }
  });
}

/**
 * Synch the provided items to only show the item with id === activeToolId to be
 * active, as determined by the UiFramework.frontstages.activeToolId.
 * @param itemsToSynch List of items to keep in synch.
 * @param syncHost Source of information to synch to (UiFramework.frontstages)
 * @returns Up to date itemsToSynch.
 * @internal
 */
export function useActiveToolIdSynchedItems<
  T extends ActiveToolIdSynchedItem<T>
>(itemsToSynch: T[], syncHost: ActiveToolIdSynchedHost): T[] {
  const [items, setItems] = React.useState<T[]>(() =>
    updateActiveItems(itemsToSynch, syncHost.activeToolId)
  );
  React.useEffect(() => {
    setItems(updateActiveItems(itemsToSynch, syncHost.activeToolId));
    return syncHost.onToolActivatedEvent.addListener(({ toolId }) => {
      setItems((current) => updateActiveItems(current, toolId));
    });
  }, [itemsToSynch, syncHost.activeToolId, syncHost.onToolActivatedEvent]);
  return items;
}
