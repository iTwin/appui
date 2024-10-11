/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { BeEvent } from "@itwin/core-bentley";

type ActiveToolIdSynchedItem<T> =
  | { id: string; isActive?: boolean }
  | { id: string; items: T[] };

interface ActiveToolIdSynchedHost {
  activeToolId: string;
  onToolActivatedEvent: BeEvent<(args: { toolId: string }) => void>;
}

/**
 * Recursively checks if the item with the current id of "toolId" is
 * the only active tool.
 * @param items list of items to validate
 * @param toolId toolId to check
 * @returns true if any item "isActive" must change.
 */
function mustRefresh<T extends ActiveToolIdSynchedItem<T>>(
  items: readonly T[],
  toolId: string
): boolean {
  return items.some((item) => {
    if ("items" in item) {
      return mustRefresh(item.items, toolId);
    }
    return (
      (item.isActive && item.id !== toolId) ||
      (!item.isActive && item.id === toolId)
    );
  });
}

/**
 * Recursively updates the isActive for the tools and only activate
 * the one with the id equal to toolId.
 * @param items list of items to update
 * @param toolId toolId to check
 * @returns updated list of items
 */
function refreshItems<T extends ActiveToolIdSynchedItem<T>>(
  items: readonly T[],
  toolId: string
): T[] {
  return items.map((item) =>
    "items" in item
      ? {
          ...item,
          isActive: item.id === toolId,
          items: refreshItems(item.items, toolId),
        }
      : {
          ...item,
          isActive: item.id === toolId,
        }
  );
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
>(itemsToSynch: readonly T[], syncHost: ActiveToolIdSynchedHost): T[] {
  const [items, setItems] = React.useState<T[]>(() =>
    refreshItems(itemsToSynch, syncHost.activeToolId)
  );
  React.useEffect(() => {
    setItems(refreshItems(itemsToSynch, syncHost.activeToolId));
    return syncHost.onToolActivatedEvent.addListener(({ toolId }) => {
      setItems((current) =>
        mustRefresh(current, toolId) ? refreshItems(current, toolId) : current
      );
    });
  }, [itemsToSynch, syncHost.activeToolId, syncHost.onToolActivatedEvent]);
  return items;
}
