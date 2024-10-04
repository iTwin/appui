/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import type { ToolbarItem } from "./ToolbarItem.js";
import type { ToolbarItemsManager } from "./ToolbarItemsManager.js";

/** Hook that returns items from [[ToolbarItemsManager]].
 * @public
 * @deprecated in 4.4.0. Use [[Toolbar]] component instead of this hooks, ToolbarItemsManager is internal and should not be used here.
 */
export const useDefaultToolbarItems = (
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  manager: ToolbarItemsManager
): readonly ToolbarItem[] => {
  const [items, setItems] = React.useState(() => manager.items);
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
