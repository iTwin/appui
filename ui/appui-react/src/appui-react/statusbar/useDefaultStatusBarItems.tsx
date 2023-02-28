/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import { StatusBarItem } from "./StatusBarItem";
import { StatusBarItemsManager } from "./StatusBarItemsManager";

/** Hook that returns items from [[StatusBarItemsManager]].
 * @public
 */
export const useDefaultStatusBarItems = (manager: StatusBarItemsManager): readonly StatusBarItem[] => {
  const [items, setItems] = React.useState(manager.items);
  const isInitialMount = React.useRef(true);
  React.useEffect(() => {
    if (isInitialMount.current)
      isInitialMount.current = false;
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
