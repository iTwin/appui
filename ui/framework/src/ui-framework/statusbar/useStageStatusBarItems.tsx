/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module StatusBar */

import * as React from "react";
import { CommonStatusBarItem, StatusBarItemsManager, StatusBarItemsChangedArgs } from "@bentley/ui-abstract";

/** Hook that returns items from [[StatusBarItemsManager]].
 * @beta
 */
export const useStageStatusBarItems = (manager: StatusBarItemsManager): readonly CommonStatusBarItem[] => {
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
    const handleChanged = (args: StatusBarItemsChangedArgs) => {
      setItems(args.items);
    };
    manager.onItemsChanged.addListener(handleChanged);
    return () => {
      manager.onItemsChanged.removeListener(handleChanged);
    };
  }, [manager]);
  return items;
};
