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
import { OpenSynchronizedViewTool } from "../../tools/OpenSynchronizedViewTool";
import { createSynchronizedViewportFrontstage } from "../frontstages/SynchronizedViewportFrontstage";
import { AppUiTestProviders } from "../../AppUiTestProviders";
import { getCustomViewSelectorPopupItem } from "../buttons/ViewSelectorPanel";

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
