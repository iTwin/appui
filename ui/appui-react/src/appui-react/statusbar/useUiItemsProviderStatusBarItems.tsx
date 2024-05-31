/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import { useActiveStageId } from "../hooks/useActiveStageId";
import { useAvailableUiItemsProviders } from "../hooks/useAvailableUiItemsProviders";
import { UiFramework } from "../UiFramework";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager";
import type { StatusBarItem } from "./StatusBarItem";
import type { StatusBarItemsManager } from "./StatusBarItemsManager";

/** Hook that returns items from [[StatusBarItemsManager]].
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
