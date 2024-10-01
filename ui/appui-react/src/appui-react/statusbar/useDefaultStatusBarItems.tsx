/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import type { StatusBarItem } from "./StatusBarItem.js";
import type { StatusBarItemsManager } from "./StatusBarItemsManager.js";
import type { StatusBarComposer } from "./StatusBarComposer.js";

/** Hook that returns items from [[StatusBarItemsManager]].
 * @deprecated in 4.17.0. Uses an internal `StatusBarItemsManager` API. Use {@link StatusBarComposer} instead.
 * @public
 */
export const useDefaultStatusBarItems = (
  manager: StatusBarItemsManager
): readonly StatusBarItem[] => {
  const [items, setItems] = React.useState(manager.items);
  const isInitialMount = React.useRef(true);
  React.useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false;
    else {
      setItems(manager.items);
    }
  }, [manager]);
  React.useEffect(() => {
    return manager.onItemsChanged.addListener((args) => {
      setItems(args.items);
    });
  }, [manager]);
  return items;
};
