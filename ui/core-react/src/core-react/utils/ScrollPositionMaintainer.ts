/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */
import type { IDisposable } from "@itwin/core-bentley";

/**
 * A helper class to recursively save and restore scroll positions.
 * Usage:
 * ```ts
 * // scroll positions are saved when `ScrollPositionMaintainer` object is created
 * const maintainer = new ScrollPositionMaintainer(element);
 * // can do something with `element` here
 * // disposing the `maintainer` object restores scroll positions
 * maintainer.dispose();
 * ```
 * @public
 * @deprecated in 4.15.0. Not use by AppUI.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class ScrollPositionMaintainer implements IDisposable {
  private _storage: Map<Element, number>;
  public constructor(el: Element) {
    this._storage = new Map();
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    ScrollPositionMaintainer.saveScrollPositions([el], this._storage);
  }
  public dispose() {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    ScrollPositionMaintainer.restoreScrollPositions(this._storage);
  }
  private static saveScrollPositions(
    elements: Element[] | HTMLCollection,
    storage: Map<Element, number>
  ) {
    for (const el of elements) {
      if (el.scrollTop) storage.set(el, el.scrollTop);
      if (el.children) this.saveScrollPositions(el.children, storage);
    }
  }
  private static restoreScrollPositions(storage: Map<Element, number>) {
    storage.forEach((scrollTop, el) => (el.scrollTop = scrollTop));
  }
}
