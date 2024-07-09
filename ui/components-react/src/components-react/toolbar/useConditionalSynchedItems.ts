/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import type { BeEvent } from "@itwin/core-bentley";
import { ConditionalIconItem } from "@itwin/core-react";
import * as React from "react";

/**
 * From a list of ToolbarItem, recursively return the list of syncIds
 * that are relevant to every Conditional members used in the items.
 * @param eventIds Set to fill with syncIds
 * @param items ToolbarItems list to search through
 */
function gatherSyncIds<T extends {} | { items: T[] }>(
  eventIds: Set<string>,
  items: readonly T[]
) {
  for (const item of items) {
    for (const [, entry] of Object.entries(item)) {
      if (entry instanceof ConditionalBooleanValue) {
        entry.syncEventIds.forEach((eventId: string) =>
          eventIds.add(eventId.toLowerCase())
        );
      } else if (entry instanceof ConditionalStringValue) {
        entry.syncEventIds.forEach((eventId: string) =>
          eventIds.add(eventId.toLowerCase())
        );
      } else if (entry instanceof ConditionalIconItem) {
        entry.syncEventIds.forEach((eventId: string) =>
          eventIds.add(eventId.toLowerCase())
        );
      }
    }
    if ("items" in item) {
      gatherSyncIds(eventIds, item.items);
    }
  }
}

/**
 * Refresh all conditional values interested by the provided eventIds.
 * @param items List of ToolbarItems that may content Conditional properties.
 * @param eventIds Set of triggered eventIds.
 * @returns null if no updates occurred, or the provided items with updated values if ANY were updated.
 */
function refreshItems<T extends {} | { items: T[] }>(
  items: readonly T[],
  eventIds: Set<string>
): T[] | null {
  if (0 === eventIds.size) return null;
  let itemsUpdated = false;
  const updatedItems: T[] = [];

  for (const item of items) {
    let updatedItem = { ...item };
    if ("items" in updatedItem) {
      const childItems = refreshItems(updatedItem.items, eventIds);
      updatedItem = {
        ...updatedItem,
        items: childItems ?? updatedItem.items,
      };
      itemsUpdated ||= !!childItems;
    }

    for (const [, entry] of Object.entries(updatedItem)) {
      if (
        (entry instanceof ConditionalBooleanValue &&
          ConditionalBooleanValue.refreshValue(entry, eventIds)) ||
        (entry instanceof ConditionalStringValue &&
          ConditionalStringValue.refreshValue(entry, eventIds)) ||
        (entry instanceof ConditionalIconItem &&
          ConditionalIconItem.refreshValue(entry, eventIds))
      ) {
        itemsUpdated = true;
      }
    }
    updatedItems.push(updatedItem);
  }
  return itemsUpdated ? updatedItems : null;
}

/**
 * Register a listener on the syncUiEVent and updates all conditionals within the provided items.
 * @param items Items to keep up to date
 * @param syncUiEvent Event to attach to (because we don't depend on appui-react);
 * @returns Synched items
 * @internal
 */
export function useConditionalSynchedItems<T extends {} | { items: T[] }>(
  items: readonly T[],
  syncUiEvent: undefined | BeEvent<(args: { eventIds: Set<string> }) => void>
) {
  const [eventSynchedItems, setEventSynchedItems] = React.useState<
    readonly T[]
  >([]);
  React.useEffect(() => {
    const ids = new Set<string>();
    gatherSyncIds(ids, items);
    setEventSynchedItems(refreshItems(items, ids) ?? items);
    const syncIdsOfInterest = [...ids.values()];
    return syncUiEvent?.addListener((args) => {
      if (0 === syncIdsOfInterest.length) return;

      if (
        syncIdsOfInterest.some((value: string): boolean =>
          args.eventIds.has(value.toLowerCase())
        )
      ) {
        setEventSynchedItems(
          (current) => refreshItems(current, args.eventIds) ?? current
        );
      }
    });
  }, [syncUiEvent, items]);
  return eventSynchedItems;
}
