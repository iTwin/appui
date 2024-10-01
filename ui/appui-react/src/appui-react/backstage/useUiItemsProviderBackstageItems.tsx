/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import { useAvailableUiItemsProviders } from "../hooks/useAvailableUiItemsProviders.js";
import type { BackstageItem } from "./BackstageItem.js";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager.js";
import type { BackstageItemsManager } from "./BackstageItemsManager.js";
import type { BackstageComposer } from "./BackstageComposer.js";

/** Hook that returns backstage items from {@link UiItemsManager}.
 * @deprecated in 4.17.0. Uses an internal `BackstageItemsManager` API. Use {@link BackstageComposer} instead.
 * @public
 */
export const useUiItemsProviderBackstageItems = (
  manager: BackstageItemsManager
): readonly BackstageItem[] => {
  const uiItemProviderIds = useAvailableUiItemsProviders();
  const [items, setItems] = React.useState(manager ? manager.items : []);
  const providersRef = React.useRef("");
  // gathers items from registered extensions - dependent on when a UiItemsProvider is register or unregistered and if the
  // current stage's composer allows entries from extensions.
  React.useEffect(() => {
    const uiProviders = uiItemProviderIds.join("-");
    if (providersRef.current !== uiProviders) {
      providersRef.current = uiProviders;
      const backstageItems = UiItemsManager.getBackstageItems();
      manager.loadItems(backstageItems);
      setItems(manager.items);
    }
  }, [manager, uiItemProviderIds]);
  // handle item changes caused by calls to UiFramework.backstageManager
  React.useEffect(() => {
    return manager.onItemsChanged.addListener((args) => {
      setItems(args.items);
    });
  }, [manager]);
  return items;
};
