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
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
  useActiveViewport,
  Widget,
  WidgetState,
} from "@itwin/appui-react";
import {
  createSplitSingleViewportToolbarItem,
  RestoreSavedContentLayoutTool,
  SaveContentLayoutTool,
} from "../../tools/ContentLayoutTools";
import { AppUiTestProviders } from "../../AppUiTestProviders";
import { getCustomViewSelectorPopupItem } from "../buttons/ViewSelectorPanel";
import { DisplayStyleField } from "../statusfields/DisplayStyleField";
import { IModelApp } from "@itwin/core-frontend";
import { ControlViewportWidget } from "../widgets/ControlViewportWidget";
import { ViewportWidget as ViewportWidgetBase } from "../widgets/ViewportWidget";
import { WidgetContentContext } from "./WidgetContentProvider";
import { createContentLayoutFrontstage } from "../frontstages/ContentLayoutFrontstage";

/**
 * The ContentLayoutStageUiItemsProvider provides additional items only to the `ContentLayoutStage` frontstage.
 * This provider provides four tool buttons to:
 *  - toggle between a single view and two side-by-side views.
 *  - activate a tool to save the current view layout and viewstate shown in each view.
 *  - activate a tool to restore the previous saved state for the current stage.
 *  - open a popup to change the viewstate of the "active" view to that selected from the popup list.
 * Note: If you want to allow the user to perform an action via the key-in palette, a `Tool` must be created and registered.
 *       The Key-in Palette is open using keystroke Ctrl+F2 and shows the keyins from all the registered Tools.
 * This provider also adds a display style picker to the status bar. This item allows user to apply a display style to the
 * "active" view. If the display style for a view contains a schedule script one of the default view overlay components will
 * display to allow user to play the animation.
 */
export class ContentLayoutStageUiItemsProvider implements UiItemsProvider {
  public static providerId =
    "appui-test-providers:content-layout-stage-items-provider";
  public readonly id = ContentLayoutStageUiItemsProvider.providerId;

  constructor(localizationNamespace: string) {
    RestoreSavedContentLayoutTool.register(localizationNamespace);
    SaveContentLayoutTool.register(localizationNamespace);
  }

  public provideToolbarItems(
    stageId: string,
    _stageUsage: string,
    toolbarUsage: ToolbarUsage,
    toolbarOrientation: ToolbarOrientation
  ): ToolbarItem[] {
    const allowedStages = [createContentLayoutFrontstage.stageId];
    if (allowedStages.includes(stageId)) {
      if (
        toolbarUsage === ToolbarUsage.ContentManipulation &&
        toolbarOrientation === ToolbarOrientation.Horizontal
      ) {
        return [
          {
            ...createSplitSingleViewportToolbarItem(() => {
              return IModelApp.viewManager.selectedView;
            }),
            itemPriority: 15,
            groupPriority: 3000,
          },
        ];
      } else if (
        toolbarUsage === ToolbarUsage.ViewNavigation &&
        toolbarOrientation === ToolbarOrientation.Vertical
      ) {
        return [
          ToolbarItemUtilities.createForTool(SaveContentLayoutTool, {
            itemPriority: 10,
            groupPriority: 3000,
          }),
          ToolbarItemUtilities.createForTool(RestoreSavedContentLayoutTool, {
            itemPriority: 15,
            groupPriority: 3000,
          }),
          getCustomViewSelectorPopupItem(),
        ];
      }
    }
    return [];
  }

  public getWidgets(): ReadonlyArray<Widget> {
    return [
      {
        id: "appui-test-providers:viewport-old",
        label: "Viewport (old)",
        icon: "icon-bentley-systems",
        defaultState: WidgetState.Floating,
        canFloat: {
          containerId: "appui-test-providers:viewport-widget",
        },
        canPopout: true,
        content: <ControlViewportWidget />,
        layouts: {
          standard: {
            location: StagePanelLocation.Bottom,
            section: StagePanelSection.Start,
          },
        },
      },
      {
        id: "appui-test-providers:viewport-widget1",
        label: "Viewport 1",
        icon: "icon-bentley-systems",
        defaultState: WidgetState.Floating,
        canFloat: {
          containerId: "appui-test-providers:viewport-widget1",
        },
        canPopout: true,
        content: <ViewportWidget contentId="viewport-widget1" />,
        layouts: {
          standard: {
            location: StagePanelLocation.Bottom,
            section: StagePanelSection.Start,
          },
        },
      },
      {
        id: "appui-test-providers:viewport-widget2",
        label: "Viewport 2",
        icon: "icon-bentley-systems",
        defaultState: WidgetState.Floating,
        // TODO: two viewports in the same floating widget: viewport can not be created from a div with zero w/h.
        canFloat: {
          containerId: "appui-test-providers:viewport-widget2",
        },
        canPopout: true,
        content: <ViewportWidget contentId="viewport-widget2" />,
        layouts: {
          standard: {
            location: StagePanelLocation.Bottom,
            section: StagePanelSection.Start,
          },
        },
      },
      {
        id: "active-view",
        label: "Active view",
        content: <ActiveView />,
        layouts: {
          standard: {
            location: StagePanelLocation.Right,
            section: StagePanelSection.End,
          },
        },
      },
    ];
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

  public getBackstageItems(): BackstageItem[] {
    return [
      BackstageItemUtilities.createStageLauncher({
        stageId: createContentLayoutFrontstage.stageId,
        groupPriority: 300,
        itemPriority: 2,
        label: AppUiTestProviders.translate(
          "backstage.ContentLayoutFrontstage"
        ),
      }),
    ];
  }
}

interface ViewportWidgetProps {
  contentId: string;
}

function ViewportWidget({ contentId }: ViewportWidgetProps) {
  // We could have used `IModelApp.viewManager` instead to track active viewport.
  const context = React.useContext(WidgetContentContext);
  return (
    <ViewportWidgetBase
      active={contentId === context.activeId}
      onActivate={() => {
        context.setActiveId(contentId);
      }}
    />
  );
}

function ActiveView() {
  const viewport = useActiveViewport();
  if (!viewport) return <span>No active viewport</span>;
  return (
    <span>
      <b>id:</b> {viewport.view.id}
      <br />
      <b>description:</b> {viewport.view.description}
    </span>
  );
}
