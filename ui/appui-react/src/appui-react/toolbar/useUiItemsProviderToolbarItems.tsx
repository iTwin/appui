/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { useActiveStageId } from "../hooks/useActiveStageId";
import { useAvailableUiItemsProviders } from "../hooks/useAvailableUiItemsProviders";
import { UiFramework } from "../UiFramework";
import { ToolbarItem, ToolbarOrientation, ToolbarUsage } from "./ToolbarItem";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager";
import { ToolbarItemsManager } from "./ToolbarItemsManager";

/** Hook that returns items from [[ToolbarItemsManager]].
 * @public
 */
export const useUiItemsProviderToolbarItems = (manager: ToolbarItemsManager, toolbarUsage: ToolbarUsage, toolbarOrientation: ToolbarOrientation): readonly ToolbarItem[] => {
  const uiItemsProviderIds = useAvailableUiItemsProviders();
  const stageId = useActiveStageId();
  const [items, setItems] = React.useState(manager.items);
  const providersRef = React.useRef("");
  const currentStageRef = React.useRef("");
  // gathers items from registered extensions - dependent on when a uiItemsProvider is register or unregistered and if the
  // current stage's composer allows entries from extensions.
  React.useEffect(() => {
    const uiProviders = uiItemsProviderIds.join("-");

    // istanbul ignore else
    if (providersRef.current !== uiProviders || currentStageRef.current !== stageId) {
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      // istanbul ignore else
      if (frontstageDef) {
        const usage = frontstageDef.usage;
        currentStageRef.current = stageId;
        providersRef.current = uiProviders;
        const toolbarItems = UiItemsManager.getToolbarButtonItems(stageId, usage, toolbarUsage, toolbarOrientation);
        manager.loadItems(toolbarItems);
        setItems(manager.items);
      }
    }
    return manager.onItemsChanged.addListener((args) => {
      setItems(args.items);
    });
  }, [uiItemsProviderIds, stageId, manager, toolbarUsage, toolbarOrientation]);
  return items;
};
