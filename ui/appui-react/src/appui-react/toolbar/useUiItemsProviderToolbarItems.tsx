/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import type {
  ToolbarItem,
  ToolbarOrientation,
  ToolbarUsage,
} from "./ToolbarItem.js";
import type { ToolbarItemsManager } from "./ToolbarItemsManager.js";
import { useActiveStageProvidedToolbarItems } from "./useActiveStageProvidedToolbarItems.js";

/** Hook that retrieves active frontstage toolbar items from UiItemsProviders and manage them through [[ToolbarItemsManager]].
 * @public
 * @deprecated in 4.4.0. This uses ToolbarItemsManager which is internal, directly use [[ToolbarComposer]] instead.
 */
export const useUiItemsProviderToolbarItems = (
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  manager: ToolbarItemsManager,
  toolbarUsage: ToolbarUsage,
  toolbarOrientation: ToolbarOrientation
): readonly ToolbarItem[] => {
  const providedItems = useActiveStageProvidedToolbarItems(
    toolbarUsage,
    toolbarOrientation
  );
  const [items, setItems] = React.useState(providedItems);
  React.useEffect(() => {
    manager?.loadItems(providedItems);
    setItems(manager?.items ?? providedItems);

    return manager?.onItemsChanged.addListener((args) => {
      setItems(args.items);
    });
  }, [manager, providedItems]);
  return items;
};
