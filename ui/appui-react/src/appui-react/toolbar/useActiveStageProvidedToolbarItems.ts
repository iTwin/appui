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

function getItems(
  stageId: string,
  usage: ToolbarUsage,
  orientation: ToolbarOrientation
) {
  const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
  if (!frontstageDef) return [];

  const toolbarItems = UiItemsManager.getToolbarButtonItems(
    stageId,
    frontstageDef.usage,
    usage,
    orientation
  );
  return toolbarItems;
}

/**
 * Collects the currently registered items providers toolbar item
 * for the active stage and provided toolbar usage and orientation.
 * @internal
 */
export const useActiveStageProvidedToolbarItems = (
  usage: ToolbarUsage,
  orientation: ToolbarOrientation
): readonly ToolbarItem[] => {
  const uiItemsProviderIds = useAvailableUiItemsProviders();
  const stageId = useActiveStageId();

  const [items, setItems] = React.useState<readonly ToolbarItem[]>(() =>
    getItems(stageId, usage, orientation)
  );
  const providersRef = React.useRef("");
  const currentStageRef = React.useRef("");

  // gathers items from registered extensions - dependent on when a uiItemsProvider is register or unregistered and if the
  // current stage's composer allows entries from extensions.
  React.useEffect(() => {
    const uiProviders = uiItemsProviderIds.join("-");

    if (
      providersRef.current === uiProviders &&
      currentStageRef.current === stageId
    )
      return;

    currentStageRef.current = stageId;
    providersRef.current = uiProviders;
    const newItems = getItems(stageId, usage, orientation);
    setItems(newItems);
  }, [orientation, stageId, uiItemsProviderIds, usage]);
  return items;
};
