/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
  BackstageItem,
  BackstageItemUtilities,
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  StatusBarItem,
  StatusBarItemUtilities,
  ToolbarItem,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsManager,
  UiItemsProvider,
  Widget,
  WidgetState,
} from "@itwin/appui-react";
import { AppUiTestProviders } from "../../AppUiTestProviders";
import { getCustomViewSelectorPopupItem } from "../buttons/ViewSelectorPanel";
import { PopoutWindowsFrontstage } from "../frontstages/PopoutWindowsFrontstage";
import { DisplayStyleField } from "../statusfields/DisplayStyleField";
import { OpenPopoutViewTool } from "../../tools/OpenPopoutViewTool";
import { OpenPopoutDialogTool } from "../../tools/OpenPopoutDialogTool";
import { ViewAttributesWidgetComponent } from "../widgets/ViewAttributesWidget";

/**
 * The PopoutWindowsStageUiItemsProvider provides additional items only to the `PopoutWindowsFrontstage` frontstage.
 * Note: If you want to allow the user to perform an action via the key-in palette, a `Tool` must be created and registered.
 *       The Key-in Palette is open using keystroke Ctrl+F2 and shows the keyins from all the registered Tools.
 * This provider also adds a display style picker to the status bar. This item allows user to apply a display style to the
 * "active" view. If the display style for a view contains a schedule script one of the default view overlay components will
 * display to allow user to play the animation.
 */
export class PopoutWindowsStageUiItemsProvider implements UiItemsProvider {
  public static providerId =
    "appui-test-providers:popout-windows-stage-items-provider";
  public readonly id = PopoutWindowsStageUiItemsProvider.providerId;

  constructor(localizationNamespace: string) {
    OpenPopoutViewTool.register(localizationNamespace);
    OpenPopoutDialogTool.register(localizationNamespace);
  }

  public static register(localizationNamespace: string) {
    UiItemsManager.register(
      new PopoutWindowsStageUiItemsProvider(localizationNamespace),
      { stageIds: [PopoutWindowsFrontstage.stageId] }
    );
  }

  public static unregister() {
    UiItemsManager.unregister(PopoutWindowsStageUiItemsProvider.providerId);
  }

  public provideWidgets(
    _stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection
  ): ReadonlyArray<Widget> {
    const widgets: Widget[] = [];
    if (
      stageUsage === StageUsage.General.valueOf() &&
      location === StagePanelLocation.Left &&
      section === StagePanelSection.Start
    ) {
      widgets.push({
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
      });
    }
    return widgets;
  }

  public provideToolbarItems(
    stageId: string,
    _stageUsage: string,
    toolbarUsage: ToolbarUsage,
    toolbarOrientation: ToolbarOrientation
  ): ToolbarItem[] {
    const allowedStages = [PopoutWindowsFrontstage.stageId];
    if (allowedStages.includes(stageId)) {
      if (
        toolbarUsage === ToolbarUsage.ContentManipulation &&
        toolbarOrientation === ToolbarOrientation.Horizontal
      ) {
        return [
          OpenPopoutViewTool.getActionButtonDef(20, 3000),
          OpenPopoutDialogTool.getActionButtonDef(25, 3000),
        ];
      } else if (
        toolbarUsage === ToolbarUsage.ViewNavigation &&
        toolbarOrientation === ToolbarOrientation.Vertical
      ) {
        return [getCustomViewSelectorPopupItem(20, 3000)];
      }
    }
    return [];
  }

  public provideStatusBarItems(
    _stageId: string,
    stageUsage: string
  ): StatusBarItem[] {
    const statusBarItems: StatusBarItem[] = [];
    if (stageUsage === StageUsage.General.valueOf()) {
      statusBarItems.push(
        StatusBarItemUtilities.createCustomItem({
          id: "DisplayStyle",
          itemPriority: 400,
          content: <DisplayStyleField />,
        })
      );
    }
    return statusBarItems;
  }

  public provideBackstageItems(): BackstageItem[] {
    return [
      BackstageItemUtilities.createStageLauncher({
        stageId: PopoutWindowsFrontstage.stageId,
        groupPriority: 300,
        itemPriority: 2,
        label: AppUiTestProviders.translate(
          "backstage.PopoutWindowsFrontstageLabel"
        ),
      }),
    ];
  }
}
