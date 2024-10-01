/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import {
  ConditionalBooleanValue,
  ConditionalStringValue,
} from "@itwin/appui-abstract";
import { BeEvent } from "@itwin/core-bentley";
import { ConditionalIconItem } from "@itwin/core-react";
import type {
  ToolbarActionItem,
  ToolbarGroupItem,
  ToolbarItem,
} from "./ToolbarItem.js";
import { isToolbarGroupItem } from "./ToolbarItem.js";

function isInstance<T>(args: T | ReadonlyArray<T>): args is T {
  return !Array.isArray(args);
}

/** Arguments of [[ToolbarItemsManager.onChanged]] event.
 * @internal
 */
export interface ToolbarItemsChangedArgs {
  readonly items: ReadonlyArray<ToolbarItem>;
}

/**
 * Controls status bar items.
 * @internal
 * @deprecated in 4.4.0. This is no longer used internally, left because of an erroneous public dependency that is also deprecated.
 */
export class ToolbarItemsManager {
  // This class should be removed once `useDefaultToolbarItems` and `useUiItemsProviderToolbarItems` (public version) get removed.
  // If you are attempting to fix/clean this class, it is probably an error as it is no longer used and should not be reintroduced, use Hooks instead.
  protected _items: ReadonlyArray<ToolbarItem> = [];

  constructor(items?: ReadonlyArray<ToolbarItem>) {
    if (items) this.loadItemsInternal(items, true, false);
  }

  /** Event raised when Toolbar items are changed.
   * @internal
   */
  public readonly onItemsChanged = new BeEvent<
    (args: ToolbarItemsChangedArgs) => void
  >();

  private loadItemsInternal(
    items: ReadonlyArray<ToolbarItem>,
    processConditions: boolean,
    sendItemChanged: boolean
  ) {
    if (processConditions && items) {
      // eslint-disable-next-line deprecation/deprecation
      const eventIds = ToolbarItemsManager.getSyncIdsOfInterest(items);
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
  public loadItems(items: ReadonlyArray<ToolbarItem>) {
    this.loadItemsInternal(items, true, false);
  }

  /** Get an array of the Toolbar items  */
  public get items(): ReadonlyArray<ToolbarItem> {
    return this._items;
  }

  public set items(items: ReadonlyArray<ToolbarItem>) {
    if (items !== this._items) this.loadItemsInternal(items, true, true);
  }

  public add(itemOrItems: ToolbarItem | ReadonlyArray<ToolbarItem>) {
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

  /** Remove Toolbar items based on id */
  public remove(
    itemIdOrItemIds: ToolbarItem["id"] | ReadonlyArray<ToolbarItem["id"]>
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

  private static gatherSyncIds(
    eventIds: Set<string>,
    items: readonly ToolbarItem[]
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
          // eslint-disable-next-line deprecation/deprecation
        } else if (entry instanceof ConditionalIconItem) {
          entry.syncEventIds.forEach((eventId: string) =>
            eventIds.add(eventId.toLowerCase())
          );
        }
      }
      if (isToolbarGroupItem(item)) {
        this.gatherSyncIds(eventIds, item.items);
      }
    }
  }

  public static getSyncIdsOfInterest(items: readonly ToolbarItem[]): string[] {
    const eventIds = new Set<string>();
    this.gatherSyncIds(eventIds, items);
    return [...eventIds.values()];
  }

  private static refreshChildItems(
    parentItem: ToolbarGroupItem,
    eventIds: Set<string>
  ): {
    childrenUpdated: boolean;
    childItems: ReadonlyArray<ToolbarActionItem | ToolbarGroupItem>;
  } {
    const updatedItems: Array<ToolbarActionItem | ToolbarGroupItem> = [];
    let itemsUpdated = false;

    for (const item of parentItem.items) {
      let updatedItem;
      if (isToolbarGroupItem(item)) {
        updatedItem = { ...item };
        const { childrenUpdated, childItems } = this.refreshChildItems(
          updatedItem,
          eventIds
        );
        if (childrenUpdated) {
          updatedItem.items = childItems;
          itemsUpdated = true;
        }
      } else {
        updatedItem = { ...item };
      }

      for (const [, entry] of Object.entries(updatedItem)) {
        if (entry instanceof ConditionalBooleanValue) {
          if (ConditionalBooleanValue.refreshValue(entry, eventIds))
            itemsUpdated = true;
        } else if (entry instanceof ConditionalStringValue) {
          if (ConditionalStringValue.refreshValue(entry, eventIds))
            itemsUpdated = true;
          // eslint-disable-next-line deprecation/deprecation
        } else if (entry instanceof ConditionalIconItem) {
          // eslint-disable-next-line deprecation/deprecation
          if (ConditionalIconItem.refreshValue(entry, eventIds))
            itemsUpdated = true;
        }
      }

      updatedItems.push(updatedItem);
    }
    return { childrenUpdated: itemsUpdated, childItems: updatedItems };
  }

  private internalRefreshAffectedItems(
    items: readonly ToolbarItem[],
    eventIds: Set<string>
  ): { itemsUpdated: boolean; updatedItems: ToolbarItem[] } {
    if (0 === eventIds.size) return { itemsUpdated: false, updatedItems: [] };

    let updateRequired = false;

    const newItems: ToolbarItem[] = [];
    for (const item of items) {
      let updatedItem = { ...item };
      if (isToolbarGroupItem(updatedItem)) {
        const { childrenUpdated, childItems } =
          // eslint-disable-next-line deprecation/deprecation
          ToolbarItemsManager.refreshChildItems(updatedItem, eventIds);
        if (childrenUpdated) {
          updatedItem = {
            ...updatedItem,
            items: childItems,
          };
          updateRequired = true;
        }
      }

      for (const [, entry] of Object.entries(updatedItem)) {
        if (entry instanceof ConditionalBooleanValue) {
          if (ConditionalBooleanValue.refreshValue(entry, eventIds))
            updateRequired = true;
        } else if (entry instanceof ConditionalStringValue) {
          if (ConditionalStringValue.refreshValue(entry, eventIds))
            updateRequired = true;
          // eslint-disable-next-line deprecation/deprecation
        } else if (entry instanceof ConditionalIconItem) {
          // eslint-disable-next-line deprecation/deprecation
          if (ConditionalIconItem.refreshValue(entry, eventIds))
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

  private static isActiveToolIdRefreshRequiredForChildren(
    children: ReadonlyArray<ToolbarActionItem | ToolbarGroupItem>,
    toolId: string
  ): boolean {
    for (const item of children) {
      if (isToolbarGroupItem(item)) {
        if (this.isActiveToolIdRefreshRequiredForChildren(item.items, toolId))
          return true;
      } else {
        const isActive = !!item.isActive;
        if (
          (isActive && item.id !== toolId) ||
          (!isActive && item.id === toolId)
        )
          return true;
      }
    }
    return false;
  }

  private isActiveToolIdRefreshRequired(toolId: string): boolean {
    for (const item of this.items) {
      if (isToolbarGroupItem(item)) {
        if (
          // eslint-disable-next-line deprecation/deprecation
          ToolbarItemsManager.isActiveToolIdRefreshRequiredForChildren(
            item.items,
            toolId
          )
        )
          return true;
      } else {
        const isActive = !!item.isActive;
        if (
          (isActive && item.id !== toolId) ||
          (!isActive && item.id === toolId)
        )
          return true;
      }
    }

    return false;
  }

  private static refreshActiveToolIdInChildItems(
    parentItem: ToolbarGroupItem,
    toolId: string
  ): Array<ToolbarActionItem | ToolbarGroupItem> {
    const newChildren: Array<ToolbarActionItem | ToolbarGroupItem> = [];
    for (const item of parentItem.items) {
      let updatedItem = { ...item };

      if (isToolbarGroupItem(updatedItem)) {
        updatedItem = {
          ...updatedItem,
          // eslint-disable-next-line deprecation/deprecation
          items: ToolbarItemsManager.refreshActiveToolIdInChildItems(
            updatedItem,
            toolId
          ),
        };
      }

      updatedItem.isActive = updatedItem.id === toolId;
      newChildren.push(updatedItem);
    }
    return newChildren;
  }

  public setActiveToolId(toolId: string) {
    // first see if any updates are really necessary
    if (!this.isActiveToolIdRefreshRequired(toolId)) return;

    const newItems: ToolbarItem[] = [];
    for (const item of this.items) {
      let updatedItem = { ...item };

      if (isToolbarGroupItem(updatedItem)) {
        updatedItem = {
          ...updatedItem,
          // eslint-disable-next-line deprecation/deprecation
          items: ToolbarItemsManager.refreshActiveToolIdInChildItems(
            updatedItem,
            toolId
          ),
        };
      }

      updatedItem.isActive = updatedItem.id === toolId;
      newItems.push(updatedItem);
    }

    this.items = newItems;
  }
}
