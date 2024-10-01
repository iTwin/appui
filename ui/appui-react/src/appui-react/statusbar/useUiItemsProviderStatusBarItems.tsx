/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import { useActiveStageId } from "../hooks/useActiveStageId.js";
import { useAvailableUiItemsProviders } from "../hooks/useAvailableUiItemsProviders.js";
import { UiFramework } from "../UiFramework.js";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager.js";
import type { StatusBarItem } from "./StatusBarItem.js";
import type { StatusBarItemsManager } from "./StatusBarItemsManager.js";
import type { StatusBarComposer } from "./StatusBarComposer.js";

/** Hook that returns items from [[StatusBarItemsManager]].
 * @deprecated in 4.17.0. Uses an internal `StatusBarItemsManager` API. Use {@link StatusBarComposer} instead.
 * @public
 */
export const useUiItemsProviderStatusBarItems = (
  manager: StatusBarItemsManager
): readonly StatusBarItem[] => {
  const uiItemProviderIds = useAvailableUiItemsProviders();
  const stageId = useActiveStageId();
  const [items, setItems] = React.useState(manager.items);
  const providersRef = React.useRef("");
  const currentStageRef = React.useRef("");
  // gathers items from registered extensions - dependent on when a UiItemsProvider is register or unregistered and if the
  // current stage's composer allows entries from extensions.
  React.useEffect(() => {
    const uiProviders = uiItemProviderIds.join("-");
    if (
      providersRef.current !== uiProviders ||
      currentStageRef.current !== stageId
    ) {
      currentStageRef.current = stageId;
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      if (frontstageDef) {
        providersRef.current = uiProviders;
        const statusBarItems = UiItemsManager.getStatusBarItems(
          stageId,
          frontstageDef.usage
        );
        manager.loadItems(statusBarItems);
        setItems(manager.items);
      }
    }
  }, [manager, uiItemProviderIds, stageId]);
  // handle item changes caused by setter calls to UiFramework.addonStatusBarItemsManager
  React.useEffect(() => {
    return manager.onItemsChanged.addListener((args) => {
      setItems(args.items);
    });
  }, [manager]);
  return items;
};
