/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { useActiveStageId } from "../hooks/useActiveStageId.js";
import { useAvailableUiItemsProviders } from "../hooks/useAvailableUiItemsProviders.js";
import { UiFramework } from "../UiFramework.js";
import type {
  ToolbarItem,
  ToolbarOrientation,
  ToolbarUsage,
} from "./ToolbarItem.js";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager.js";

/**
 * Collects the currently registered items providers toolbar item
 * for the active stage and provided toolbar usage and orientation.
 * @internal
 */
export const useActiveStageProvidedToolbarItems = (
  toolbarUsage: ToolbarUsage,
  toolbarOrientation: ToolbarOrientation
): readonly ToolbarItem[] => {
  const uiItemsProviderIds = useAvailableUiItemsProviders();
  const stageId = useActiveStageId();
  const [items, setItems] = React.useState<readonly ToolbarItem[]>([]);
  const providersRef = React.useRef("");
  const currentStageRef = React.useRef("");
  // gathers items from registered extensions - dependent on when a uiItemsProvider is register or unregistered and if the
  // current stage's composer allows entries from extensions.
  React.useEffect(() => {
    const uiProviders = uiItemsProviderIds.join("-");

    if (
      providersRef.current !== uiProviders ||
      currentStageRef.current !== stageId
    ) {
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      if (frontstageDef) {
        const usage = frontstageDef.usage;
        currentStageRef.current = stageId;
        providersRef.current = uiProviders;
        const toolbarItems = UiItemsManager.getToolbarButtonItems(
          stageId,
          usage,
          toolbarUsage,
          toolbarOrientation
        );
        setItems(toolbarItems);
      }
    }
  }, [uiItemsProviderIds, stageId, toolbarUsage, toolbarOrientation]);
  return items;
};
