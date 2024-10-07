/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  BackstageItemUtilities,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
} from "@itwin/appui-react";
import { OpenSynchronizedViewTool } from "../../tools/OpenSynchronizedViewTool.js";
import { createSynchronizedViewportFrontstage } from "../frontstages/SynchronizedViewportFrontstage.js";
import { AppUiTestProviders } from "../../AppUiTestProviders.js";
import { getCustomViewSelectorPopupItem } from "../buttons/ViewSelectorPanel.js";

export function createSynchronizedViewportProvider() {
  const layouts = {
    standard: {
      usage: ToolbarUsage.ContentManipulation,
      orientation: ToolbarOrientation.Horizontal,
    },
  };
  return {
    id: "SynchronizedViewportProvider",
    getToolbarItems: () => [
      getCustomViewSelectorPopupItem({
        layouts,
      }),
      ToolbarItemUtilities.createForTool(OpenSynchronizedViewTool, {
        itemPriority: 10,
        groupPriority: 10,
        layouts,
      }),
    ],
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher({
        stageId: createSynchronizedViewportFrontstage.stageId,
        groupPriority: 300,
        itemPriority: 2,
        label: AppUiTestProviders.translate(
          "backstage.SynchronizedViewportFrontstage"
        ),
      }),
    ],
  } satisfies UiItemsProvider;
}
