/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import type { ItemDefBase } from "./ItemDefBase";

/* eslint-disable deprecation/deprecation */

/** Contains a map of Items.
 * @public
 * @deprecated in 4.15.0. Map for deprecated {@link ItemDefBase} class instances. Use `Map` to store your objects.
 */
export class ItemMap extends Map<string, ItemDefBase> {
  constructor(items?: ItemDefBase[]) {
    super();

    if (items && typeof items === "object") this.addItems(items);
  }

  public addItem(item: ItemDefBase) {
    this.set(item.id, item);
  }

  public addItems(items: ItemDefBase[]) {
    items.forEach((item: ItemDefBase) => {
      this.set(item.id, item);
    });
  }
}

/** Contains a list of Items.
 * @public
 * @deprecated in 4.15.0. List of deprecated {@link ItemDefBase} class instances. Use `Array` to store your objects.
 */
export class ItemList extends Array<ItemDefBase> {
  constructor(items?: ItemDefBase[]) {
    super();

    if (items && typeof items === "object") this.addItems(items);
  }

  public addItem(item: ItemDefBase) {
    this.push(item);
  }

  public addItems(items: ItemDefBase[]) {
    items.forEach((item: ItemDefBase) => {
      this.push(item);
    });
  }

  public get items(): ItemDefBase[] {
    return this;
  }
}
