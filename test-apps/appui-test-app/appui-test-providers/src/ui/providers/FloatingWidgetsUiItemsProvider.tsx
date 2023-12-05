/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ViewAttributesWidgetComponent } from "../widgets/ViewAttributesWidget";
import {
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  UiItemsProvider,
  Widget,
  WidgetState,
} from "@itwin/appui-react";
import { LogLifecycleWidget } from "../widgets/LogLifecycleWidget";

/** Test UiItemsProvider that provide FloatingWidgets in any General usage stage. */
export class FloatingWidgetsUiItemsProvider implements UiItemsProvider {
  public static providerId = "appui-test-providers:FloatingWidgetsUiProvider";
  public readonly id = FloatingWidgetsUiItemsProvider.providerId;

  public provideWidgets(
    _stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection
  ): ReadonlyArray<Widget> {
    const widgets: Widget[] = [];
    if (
      stageUsage === StageUsage.General &&
      location === StagePanelLocation.Left &&
      section === StagePanelSection.Start
    ) {
      widgets.push({
        id: "appui-test-providers:ViewAttributesWidget",
        label: "View Attributes",
        icon: "icon-window-settings",
        defaultState: WidgetState.Floating,
        canFloat: {
          containerId: "appui-test-providers:ViewAttributesWidget",
        },
        content: <ViewAttributesWidgetComponent />,
        canPopout: true,
        allowedPanels: [StagePanelLocation.Left, StagePanelLocation.Right],
      });

      widgets.push({
        id: "FW-1",
        label: "FW-1",
        icon: "icon-app-1",
        defaultState: WidgetState.Floating,
        canFloat: {
          containerId: "appui-test-providers:floating-widget",
          defaultPosition: { x: 600, y: 385 },
        },
        content: <div>Floating widget 1</div>,
      });
      widgets.push({
        id: "FW-2",
        label: "FW-2",
        icon: "icon-app-2",
        defaultState: WidgetState.Floating,
        canFloat: {
          containerId: "appui-test-providers:floating-widget",
        },
        content: <div>Floating widget 2</div>,
        allowedPanels: [],
      });
      widgets.push({
        id: "FW-3",
        label: "FW-3",
        icon: "icon-app-1",
        defaultState: WidgetState.Floating,
        canFloat: {
          containerId: "appui-test-providers:floating-widget",
        },
        content: <div>Floating widget 3</div>,
      });

      widgets.push({
        id: "FW-H1",
        label: "FW-H1",
        icon: "icon-visibility-hide",
        defaultState: WidgetState.Hidden,
        canFloat: {
          containerId: "appui-test-providers:hidden-floating-widget",
        },
        content: <div>Hidden floating widget 1</div>,
      });
      widgets.push({
        id: "appui-test-providers:PopoutMountUnmountWidget",
        label: "Mount/Unmount",
        icon: "icon-window-settings",
        defaultState: WidgetState.Floating,
        canFloat: {
          containerId: "appui-test-providers:PopoutMountUnmountWidget",
          defaultPosition: { x: 101, y: 200 },
        },
        content: <LogLifecycleWidget id="PopoutMountUnmountWidget" />,
        canPopout: true,
        allowedPanels: [StagePanelLocation.Left],
      });
    }
    return widgets;
  }
}
