/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import * as React from "react";
import { BackstageItemsChangedArgs, BackstageItemsManager } from "@itwin/appui-abstract";
import { useAvailableUiItemsProviders } from "../hooks/useAvailableUiItemsProviders";
import { BackstageItem } from "./BackstageItem";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager";

/** Hook that returns items from [[BackstageItemsManager]].
 * @public
 */
export const useUiItemsProviderBackstageItems = (manager: BackstageItemsManager): readonly BackstageItem[] => {
  const uiItemProviderIds = useAvailableUiItemsProviders();
  const [items, setItems] = React.useState(manager ? manager.items : /* istanbul ignore next */[]);
  const providersRef = React.useRef("");
  // gathers items from registered extensions - dependent on when a UiItemsProvider is register or unregistered and if the
  // current stage's composer allows entries from extensions.
  React.useEffect(() => {
    const uiProviders = uiItemProviderIds.join("-");
    // istanbul ignore else
    if (providersRef.current !== uiProviders) {
      providersRef.current = uiProviders;
      const backstageItems = UiItemsManager.getBackstageItems();
      manager.loadItems(backstageItems);
      setItems(manager.items);
    }
  }, [manager, uiItemProviderIds]);
  // handle item changes caused by calls to UiFramework.backstageManager
  React.useEffect(() => {
    const handleChanged = (args: BackstageItemsChangedArgs) => {
      setItems(args.items);
    };
    manager.onItemsChanged.addListener(handleChanged);
    return () => {
      manager.onItemsChanged.removeListener(handleChanged);
    };
  }, [manager]);
  return items;
};
