/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module StatusBar */

import { UiEvent } from "@bentley/ui-core";
import { StatusBarItem, StatusBarItemId } from "./StatusBarItem";

/** StatusBar Items Changed Event class.
 * @beta
 */
export class StatusBarItemsChangedEvent extends UiEvent<{}> { }

type InstanceOrArray<T> = T | ReadonlyArray<T>;

const isInstance = <T extends any>(args: InstanceOrArray<T>): args is T => {
  return !Array.isArray(args);
};

/** StatusBar Items Manager class.
 * @beta
 */
export class StatusBarItemsManager {
  private _items: ReadonlyArray<StatusBarItem> = [];

  /** Event raised when StatusBar items are changed. */
  public static readonly onStatusBarItemsChanged = new StatusBarItemsChangedEvent();

  public get items(): ReadonlyArray<StatusBarItem> {
    return this._items;
  }

  /** @internal */
  public set items(items: ReadonlyArray<StatusBarItem>) {
    if (this._items === items)
      return;
    this._items = items;
    StatusBarItemsManager.onStatusBarItemsChanged.emit({ items });
  }

  public add(itemOrItems: StatusBarItem | ReadonlyArray<StatusBarItem>) {
    let itemsToAdd = isInstance(itemOrItems) ? [itemOrItems] : itemOrItems;
    itemsToAdd = itemsToAdd.filter((itemToAdd) => this._items.find((item) => item.id === itemToAdd.id) === undefined);
    const items = [
      ...this._items,
      ...itemsToAdd,
    ];
    this.items = items;
  }

  public remove(itemIdOrItemIds: StatusBarItemId | ReadonlyArray<StatusBarItemId>) {
    const items = this._items.filter((item) => {
      return isInstance(itemIdOrItemIds) ? item.id !== itemIdOrItemIds : !itemIdOrItemIds.find((itemId) => itemId === item.id);
    });
    this.items = items;
  }

  /** @internal */
  public removeAll() {
    this._items = [];
  }

}
