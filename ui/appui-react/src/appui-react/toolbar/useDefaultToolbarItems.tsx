/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import type { ToolbarItem } from "./ToolbarItem";
import type { ToolbarItemsManager } from "./ToolbarItemsManager";

/** Hook that returns items from [[ToolbarItemsManager]].
 * @public
 */
export const useDefaultToolbarItems = (
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
