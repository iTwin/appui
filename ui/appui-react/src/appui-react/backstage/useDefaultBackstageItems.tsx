/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Backstage
 */

import * as React from "react";
import type { BackstageItem } from "./BackstageItem.js";
import type { BackstageItemsManager } from "./BackstageItemsManager.js";

/** Hook that returns items from [[BackstageItemsManager]].
 * @internal
 */
export const useDefaultBackstageItems = (
  manager: BackstageItemsManager
): readonly BackstageItem[] => {
  const [items, setItems] = React.useState(manager.items);
  const isInitialMount = React.useRef(true);
  React.useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else {
      setItems(manager.items);
    }
  }, [manager, manager.items]);
  React.useEffect(() => {
    return manager.onItemsChanged.addListener((args) => {
      setItems(args.items);
    });
  }, [manager]);
  return items;
};
