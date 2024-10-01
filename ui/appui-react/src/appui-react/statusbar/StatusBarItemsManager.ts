/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import { BeEvent } from "@itwin/core-bentley";
import type { StatusBarItem } from "./StatusBarItem.js";

type InstanceOrArray<T> = T | ReadonlyArray<T>;

const isInstance = <T>(args: InstanceOrArray<T>): args is T => {
  return !Array.isArray(args);
};

/** Arguments of [[StatusBarItemsManager.onChanged]] event.
 * @internal
 */
export interface StatusBarItemsChangedArgs {
  readonly items: ReadonlyArray<StatusBarItem>;
}

/**
 * Controls status bar items.
 * @internal
 */
export class StatusBarItemsManager {
  private _items: ReadonlyArray<StatusBarItem> = [];

  constructor(items?: ReadonlyArray<StatusBarItem>) {
    if (items) this.loadItemsInternal(items, true, false);
  }

  /** Event raised when StatusBar items are changed.
   * @internal
   */
  public readonly onItemsChanged = new BeEvent<
    (args: StatusBarItemsChangedArgs) => void
  >();

  private loadItemsInternal(
    items: ReadonlyArray<StatusBarItem>,
    processConditions: boolean,
    sendItemChanged: boolean
  ) {
    if (processConditions && items) {
      const eventIds = StatusBarItemsManager.getSyncIdsOfInterest(items);
      if (0 !== eventIds.length) {
        const { itemsUpdated, updatedItems } =
          this.internalRefreshAffectedItems(items, new Set(eventIds));

        if (itemsUpdated) items = updatedItems;
      }
    }

    this._items = items;
    if (sendItemChanged) this.onItemsChanged.raiseEvent({ items });
  }

  /** load items but do not fire onItemsChanged
   * @internal
   */
  public loadItems(items: ReadonlyArray<StatusBarItem>) {
    this.loadItemsInternal(items, true, false);
  }

  /** Get an array of the StatusBar items  */
  public get items(): ReadonlyArray<StatusBarItem> {
    return this._items;
  }

  public set items(items: ReadonlyArray<StatusBarItem>) {
    if (items !== this._items) this.loadItemsInternal(items, true, true);
  }

  public add(itemOrItems: StatusBarItem | ReadonlyArray<StatusBarItem>) {
    let itemsToAdd;
    if (isInstance(itemOrItems)) itemsToAdd = [itemOrItems];
    else {
      itemsToAdd = itemOrItems.filter(
        (itemToAdd, index) =>
          itemOrItems.findIndex((item) => item.id === itemToAdd.id) === index
      );
    }
    itemsToAdd = itemsToAdd.filter(
      (itemToAdd) =>
        this._items.find((item) => item.id === itemToAdd.id) === undefined
    );
    if (itemsToAdd.length === 0) return;
    const items = [...this._items, ...itemsToAdd];
    this.items = items;
  }

  /** Remove StatusBar items based on id */
  public remove(
    itemIdOrItemIds: StatusBarItem["id"] | ReadonlyArray<StatusBarItem["id"]>
  ) {
    const items = this._items.filter((item) => {
      return isInstance(itemIdOrItemIds)
        ? item.id !== itemIdOrItemIds
        : !itemIdOrItemIds.find((itemId) => itemId === item.id);
    });
    this.items = items;
  }

  /** @internal */
  public removeAll() {
    this._items = [];
  }

  public static getSyncIdsOfInterest(
    items: readonly StatusBarItem[]
  ): string[] {
    const eventIds = new Set<string>();
    items.forEach((item) => {
      for (const [, entry] of Object.entries(item)) {
        if (entry instanceof ConditionalBooleanValue) {
          entry.syncEventIds.forEach((eventId: string) =>
            eventIds.add(eventId.toLowerCase())
          );
        } else if (entry instanceof ConditionalStringValue) {
          entry.syncEventIds.forEach((eventId: string) =>
            eventIds.add(eventId.toLowerCase())
          );
        }
      }
    });
    return [...eventIds.values()];
  }

  private internalRefreshAffectedItems(
    items: readonly StatusBarItem[],
    eventIds: Set<string>
  ): { itemsUpdated: boolean; updatedItems: StatusBarItem[] } {
    if (0 === eventIds.size) return { itemsUpdated: false, updatedItems: [] };

    let updateRequired = false;

    const newItems: StatusBarItem[] = [];
    for (const item of items) {
      const updatedItem = { ...item };

      for (const [, entry] of Object.entries(updatedItem)) {
        if (entry instanceof ConditionalBooleanValue) {
          if (ConditionalBooleanValue.refreshValue(entry, eventIds))
            updateRequired = true;
        } else if (entry instanceof ConditionalStringValue) {
          if (ConditionalStringValue.refreshValue(entry, eventIds))
            updateRequired = true;
        }
      }

      newItems.push(updatedItem);
    }

    return { itemsUpdated: updateRequired, updatedItems: newItems };
  }

  public refreshAffectedItems(eventIds: Set<string>) {
    if (0 === eventIds.size) return;

    const { itemsUpdated, updatedItems } = this.internalRefreshAffectedItems(
      this.items,
      eventIds
    );

    if (itemsUpdated) this.loadItemsInternal(updatedItems, false, true);
  }
}
