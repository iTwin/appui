/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
  BackstageItemUtilities,
  StagePanelLocation,
  StagePanelSection,
  StatusBarItemUtilities,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
  WidgetState,
} from "@itwin/appui-react";
import { AppUiTestProviders } from "../../AppUiTestProviders";
import { getCustomViewSelectorPopupItem } from "../buttons/ViewSelectorPanel";
import { createPopoutWindowsFrontstage } from "../frontstages/PopoutWindowsFrontstage";
import { DisplayStyleField } from "../statusfields/DisplayStyleField";
import { OpenPopoutViewTool } from "../../tools/OpenPopoutViewTool";
import { OpenPopoutDialogTool } from "../../tools/OpenPopoutDialogTool";
import { ViewAttributesWidgetComponent } from "../widgets/ViewAttributesWidget";

export function createPopoutWindowsProvider() {
  return {
    id: "appui-test-providers:popout-windows-provider",
    getWidgets: () => [
      {
        id: "appui-test-providers:ViewAttributesWidget",
        label: "View Attributes",
        icon: "icon-window-settings",
        defaultState: WidgetState.Open,
        canFloat: {
          containerId: "appui-test-providers:ViewAttributesWidget",
        },
        content: <ViewAttributesWidgetComponent />,
        canPopout: true,
        allowedPanels: [StagePanelLocation.Left, StagePanelLocation.Right],
        layouts: {
          standard: {
            location: StagePanelLocation.Left,
            section: StagePanelSection.Start,
          },
        },
      },
    ],
    getToolbarItems: () => [
      ToolbarItemUtilities.createForTool(OpenPopoutViewTool, {
        itemPriority: 20,
        groupPriority: 3000,
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.ContentManipulation,
          },
        },
      }),
      ToolbarItemUtilities.createForTool(OpenPopoutDialogTool, {
        itemPriority: 25,
        groupPriority: 3000,
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.ContentManipulation,
          },
        },
      }),
      getCustomViewSelectorPopupItem({
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Vertical,
            usage: ToolbarUsage.ViewNavigation,
          },
        },
      }),
    ],
    getStatusBarItems: () => [
      StatusBarItemUtilities.createCustomItem({
        id: "DisplayStyle",
        itemPriority: 400,
        content: <DisplayStyleField />,
      }),
    ],
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher({
        stageId: createPopoutWindowsFrontstage.stageId,
        groupPriority: 300,
        itemPriority: 2,
        label: AppUiTestProviders.translate(
          "backstage.PopoutWindowsFrontstage"
        ),
      }),
    ],
  } satisfies UiItemsProvider;
}
