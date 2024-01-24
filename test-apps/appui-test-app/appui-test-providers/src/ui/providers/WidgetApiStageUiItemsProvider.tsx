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
  ToolbarHelper,
  ToolbarItem,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsManager,
  UiItemsProvider,
  Widget,
  WidgetState,
} from "@itwin/appui-react";
import {
  SvgTextAlignCenter,
  SvgTextAlignJustify,
  SvgTextAlignLeft,
  SvgTextAlignRight,
  SvgUser,
  SvgUsers,
} from "@itwin/itwinui-icons-react";
import {
  getToggleCustomOverlayCommandItemDef,
  WidgetApiStage,
} from "../frontstages/WidgetApiStage";
import {
  FloatingLayoutInfo,
  LayoutControls,
  LayoutInfo,
} from "../widgets/LayoutWidget";
import { AppUiTestProviders } from "../../AppUiTestProviders";
import { SetWidgetStateTool } from "../../tools/UiLayoutTools";
import {
  RegisterUiProviderTool,
  UnregisterUiProviderTool,
} from "../../tools/RegisterUiProviderTool";
import { LogLifecycleWidget } from "../widgets/LogLifecycleWidget";

/**
 * WidgetApiStageUiItemsProvider provides widget in the bottom panel that can exercise the Widget API on Widgets in the other panels.
 * Widgets may be hidden, shown, floated, popped out etc. using the controls in the bottom panel.
 */
export class WidgetApiStageUiItemsProvider implements UiItemsProvider {
  public static providerId = "appui-test-providers:widget-api-stage";
  public readonly id = WidgetApiStageUiItemsProvider.providerId;

  public static register(localizationNamespace: string) {
    UiItemsManager.register(
      new WidgetApiStageUiItemsProvider(localizationNamespace),
      { stageIds: [WidgetApiStage.stageId] }
    );
    SetWidgetStateTool.register(localizationNamespace);
    RegisterUiProviderTool.register(localizationNamespace);
    UnregisterUiProviderTool.register(localizationNamespace);

    RegisterUiProviderTool.providers.push({
      id: "W1-provider",
      provideWidgets: (_stageId, _stageUsage, location, section) => {
        if (location !== StagePanelLocation.Right) return [];
        if (section !== StagePanelSection.Start) return [];
        return [
          {
            id: "W1",
            content: <>W1 widget content</>,
            label: "W1",
          },
        ];
      },
    });
  }

  constructor(_localizationNamespace: string) {
    // register any tools here
  }

  public static unregister() {
    UiItemsManager.unregister(WidgetApiStageUiItemsProvider.providerId);
  }

  private getLeftPanelWidgets(section?: StagePanelSection | undefined) {
    const widgets: Widget[] = [];

    if (section === StagePanelSection.Start) {
      widgets.push({
        id: "WL-A",
        label: "WL-A",
        icon: "icon-app-1",
        canPopout: true,
        defaultState: WidgetState.Open,
        content: <LogLifecycleWidget id="WL-A" />,
        canFloat: {
          hideWithUi: true,
        },
        allowedPanels: [StagePanelLocation.Left, StagePanelLocation.Right],
      });
      widgets.push({
        id: "WL-B",
        label: "WL-B",
        icon: "icon-app-2",
        defaultState: WidgetState.Unloaded,
        content: <LogLifecycleWidget id="WL-B" />,
      });
    } else if (section === StagePanelSection.End) {
      widgets.push({
        id: "WL-1",
        label: "WL-1",
        icon: "icon-smiley-happy",
        canPopout: false,
        content: <h2>Left WL-1</h2>,
      });
      widgets.push({
        id: "WL-2",
        label: "WL-2",
        icon: "icon-smiley-sad",
        defaultState: WidgetState.Open,
        canPopout: true,
        content: <h2>Left WL-2</h2>,
        allowedPanels: [StagePanelLocation.Left],
      });
      widgets.push({
        id: "WL-3",
        label: "WL-3",
        icon: "icon-smiley-happy-very",
        canPopout: true,
        content: <h2>Left WL-3</h2>,
      });
    }
    return widgets;
  }

  private getRightPanelWidgets(section?: StagePanelSection | undefined) {
    const widgets: Widget[] = [];

    if (section === StagePanelSection.Start) {
      widgets.push({
        id: "WR-A",
        label: "WR-A",
        icon: <SvgTextAlignLeft />,
        canPopout: true,
        defaultState: WidgetState.Open,
        content: <h2>Right WR-A</h2>,
        allowedPanels: [StagePanelLocation.Left, StagePanelLocation.Right],
      });
      widgets.push({
        id: "WR-B",
        label: "WR-B",
        icon: <SvgTextAlignRight />,
        canPopout: true,
        defaultState: WidgetState.Hidden,
        content: <h2>Right WR-B</h2>,
      });
    } else if (section === StagePanelSection.End) {
      widgets.push({
        id: "WR-1",
        label: "WR-1",
        icon: <SvgTextAlignCenter />,
        canPopout: false,
        content: <h2>Right WR-1</h2>,
      });
      widgets.push({
        id: "WR-2",
        label: "WR-2",
        icon: <SvgTextAlignJustify />,
        defaultState: WidgetState.Open,
        canPopout: true,
        content: <h2>Right WR-2</h2>,
        allowedPanels: [StagePanelLocation.Right],
      });
      widgets.push({
        id: "WR-3",
        label: "WR-3",
        icon: <SvgUser />,
        canPopout: true,
        content: <h2>Right WR-3</h2>,
      });
      widgets.push({
        id: "WR-4",
        label: "WR-4",
        icon: <SvgUsers />,
        canPopout: true,
        defaultState: WidgetState.Open,
        content: <h2>Right WR-4</h2>,
      });
    }
    return widgets;
  }

  private getTopPanelWidgets(section?: StagePanelSection | undefined) {
    const widgets: Widget[] = [];

    if (section === StagePanelSection.Start) {
      widgets.push({
        id: "WT-A",
        label: "WT-A",
        canPopout: true,
        defaultState: WidgetState.Open,
        content: <h2>Top WT-A</h2>,
        canFloat: {
          defaultSize: { width: 400, height: 600 },
          isResizable: true,
        },
      });
      widgets.push({
        id: "WT-B",
        label: "WT-B",
        canPopout: true,
        content: <h2>Top WT-B</h2>,
        allowedPanels: [StagePanelLocation.Top, StagePanelLocation.Bottom],
      });
    } else if (section === StagePanelSection.End) {
      widgets.push({
        id: "WT-1",
        label: "WT-1",
        canPopout: true,
        content: <h2>Top WT-1</h2>,
      });
      widgets.push({
        id: "WT-2",
        label: "WT-2",
        canPopout: true,
        defaultState: WidgetState.Open,
        content: <h2>Top WT-2</h2>,
        allowedPanels: [StagePanelLocation.Top],
      });
    }
    return widgets;
  }

  private getBottomPanelWidgets(section?: StagePanelSection | undefined) {
    const widgets: Widget[] = [];

    if (section === StagePanelSection.Start) {
      widgets.push({
        id: "widget-info-Floating",
        label: "Floating Info",
        canPopout: true,
        defaultState: WidgetState.Open,
        content: <FloatingLayoutInfo />,
        allowedPanels: [StagePanelLocation.Top, StagePanelLocation.Bottom],
      });
      widgets.push({
        id: "widget-layout-info",
        label: "Layout Info",
        canPopout: true,
        content: <LayoutInfo />,
        allowedPanels: [StagePanelLocation.Bottom],
      });
    } else if (section === StagePanelSection.End) {
      widgets.push({
        id: "widget-layout-controls",
        label: "Layout Controls",
        defaultState: WidgetState.Open,
        content: <LayoutControls />,
      });
    }
    return widgets;
  }

  public provideWidgets(
    stageId: string,
    _stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection | undefined
  ): ReadonlyArray<Widget> {
    const allowedStages = [WidgetApiStage.stageId];
    if (allowedStages.includes(stageId)) {
      switch (location) {
        case StagePanelLocation.Left:
          return this.getLeftPanelWidgets(section);
        case StagePanelLocation.Right:
          return this.getRightPanelWidgets(section);
        case StagePanelLocation.Top:
          return this.getTopPanelWidgets(section);
        case StagePanelLocation.Bottom:
          return this.getBottomPanelWidgets(section);
      }
    }

    return [];
  }

  /** provide a toolbar button to set a value in redux store that toggles the display of the custom overlay */
  public provideToolbarItems(
    stageId: string,
    _stageUsage: string,
    toolbarUsage: ToolbarUsage,
    toolbarOrientation: ToolbarOrientation
  ): ToolbarItem[] {
    const allowedStages = [WidgetApiStage.stageId];
    if (allowedStages.includes(stageId)) {
      if (
        toolbarUsage === ToolbarUsage.ContentManipulation &&
        toolbarOrientation === ToolbarOrientation.Horizontal
      ) {
        const items: ToolbarItem[] = [];
        items.push(
          ToolbarHelper.createToolbarItemFromItemDef(
            17,
            getToggleCustomOverlayCommandItemDef(),
            { groupPriority: 3000 }
          )
        );
        return items;
      }
    }
    return [];
  }

  /** Add entry to activate this stage in the backstage. */
  public provideBackstageItems(): BackstageItem[] {
    const label = AppUiTestProviders.translate(
      "backstage.widgetApiTestFrontstageLabel"
    );
    return [
      BackstageItemUtilities.createStageLauncher(
        WidgetApiStage.stageId,
        300,
        2,
        label,
        undefined,
        undefined
      ),
    ];
  }
}
