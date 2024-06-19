/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { useSelector } from "react-redux";
import {
  ConditionalStringValue,
  StandardContentLayouts,
} from "@itwin/appui-abstract";
import {
  BackstageAppButton,
  Frontstage,
  FrontstageUtilities,
  StagePanelState,
  StageUsage,
  StandardContentToolsUiItemsProvider,
  StandardNavigationToolsUiItemsProvider,
  StandardStatusbarUiItemsProvider,
  StateManager,
  ToolbarItemUtilities,
  UiFramework,
  UiItemsManager,
  WidgetState,
} from "@itwin/appui-react";
import { WidgetApiStageUiItemsProvider } from "../providers/WidgetApiStageUiItemsProvider";
import {
  getTestProviderState,
  setShowCustomViewOverlay,
  TestProviderState,
} from "../../store";
import { AppUiTestProviders } from "../../AppUiTestProviders";
import {
  IModelApp,
  MeasureDistanceTool,
  ScreenViewport,
} from "@itwin/core-frontend";
import { updatedUiItemsProvider } from "../providers/UpdatedUiItemsProvider";
import { RegisterUiProviderTool } from "../../tools/RegisterUiProviderTool";
import { ViewportContent } from "../ViewportContent";

const supplyViewOverlay = (viewport: ScreenViewport) => {
  if (viewport.view) {
    return <MyCustomViewOverlay />;
  }
  return null;
};

/** Tool settings widget can be configured by providing an URL param `toolSettings` with values `off` or `hidden`. */
function createWidgetApiFrontstage(): Frontstage {
  const config = FrontstageUtilities.createStandardFrontstage({
    id: WidgetApiStage.stageId,
    version: 1.1,
    contentGroupProps: {
      id: "widget-api-stage-frontstage-main-content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "primaryContent",
          classId: "",
          applicationData: {
            supplyViewOverlay,
            isPrimaryView: true,
            featureOptions: {
              defaultViewOverlay: {
                enableScheduleAnimationViewOverlay: true,
                enableAnalysisTimelineViewOverlay: true,
                enableSolarTimelineViewOverlay: true,
              },
            },
          },
          content: <ViewportContent />,
        },
      ],
    },
    cornerButton: (
      <BackstageAppButton
        key="appui-test-providers-WidgetApi-backstage"
        label="Toggle Backstage"
        icon="icon-bentley-systems"
      />
    ),
    defaultTool: MeasureDistanceTool.toolId,
    usage: StageUsage.General,
    topPanelProps: {
      resizable: true,
      pinned: true,
      defaultState: StagePanelState.Open,
    },
    leftPanelProps: {
      resizable: true,
      pinned: true,
      defaultState: StagePanelState.Open,
    },
  });
  const urlParams = new URLSearchParams(window.location.search);
  const noToolSettings = urlParams.get("toolSettings") === "off";
  const hiddenToolSettings = urlParams.get("toolSettings") === "hidden";
  const toolSettings = noToolSettings
    ? undefined
    : {
        id: "WidgetApi:ToolSettings",
        defaultState: hiddenToolSettings ? WidgetState.Hidden : undefined,
      };

  return {
    ...config,
    toolSettings,
  };
}

export class WidgetApiStage {
  public static stageId = "appui-test-providers:WidgetApi";

  public static register(localizationNamespace: string) {
    UiFramework.frontstages.addFrontstage(createWidgetApiFrontstage());
    this.registerToolProviders(localizationNamespace);
  }

  private static registerToolProviders(localizationNamespace: string) {
    // Provides standard tools for ToolWidget in stage
    UiItemsManager.register(
      new StandardContentToolsUiItemsProvider({
        vertical: {
          selectElement: true,
        },
        horizontal: {
          clearSelection: true,
          clearDisplayOverrides: true,
          hide: "group",
          isolate: "group",
          emphasize: "element",
        },
      }),
      {
        providerId: "widget-api-stage-standardContentTools",
        stageIds: [WidgetApiStage.stageId],
      }
    );

    // Provides standard tools for NavigationWidget in stage
    UiItemsManager.register(new StandardNavigationToolsUiItemsProvider(), {
      providerId: "widget-api-stage-standardNavigationTools",
      stageIds: [WidgetApiStage.stageId],
    });

    // Provides standard status fields for stage
    UiItemsManager.register(new StandardStatusbarUiItemsProvider(), {
      providerId: "widget-api-stage-standardStatusItems",
      stageIds: [WidgetApiStage.stageId],
    });

    // Provides example widgets stage and tool to toggle display of Custom overlay.
    WidgetApiStageUiItemsProvider.register(localizationNamespace);
    RegisterUiProviderTool.providers.push(updatedUiItemsProvider);
  }
}

export function createToggleCustomOverlayToolbarItem() {
  const id = "testHideShowItems";
  const icon = new ConditionalStringValue(
    () =>
      getTestProviderState().showCustomViewOverlay
        ? "icon-zoom-out"
        : "icon-zoom-in",
    [AppUiTestProviders.syncEventIdHideCustomViewOverlay]
  );
  const label = new ConditionalStringValue(
    () =>
      getTestProviderState().showCustomViewOverlay
        ? "Hide overlay"
        : "Show overlay",
    [AppUiTestProviders.syncEventIdHideCustomViewOverlay]
  );
  const execute = () => {
    const showCustomViewOverlay = getTestProviderState().showCustomViewOverlay;
    // eslint-disable-next-line deprecation/deprecation
    StateManager.store.dispatch(
      setShowCustomViewOverlay(!showCustomViewOverlay)
    );
    IModelApp.toolAdmin.dispatchUiSyncEvent(
      AppUiTestProviders.syncEventIdHideCustomViewOverlay
    );
  };
  return ToolbarItemUtilities.createActionItem(id, 0, icon, label, execute);
}

function MyCustomViewOverlay() {
  const showOverlay = useSelector(
    (state: { testProviderState: TestProviderState }) => {
      return !!state.testProviderState.showCustomViewOverlay;
    }
  );

  return showOverlay ? (
    <div className="uifw-view-overlay">
      <div
        className="my-custom-control"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        <div>Hello From View Overlay</div>
        <div>
          (turn off using Hide/Show Overlay tool in horizontal toolbar at
          top-left)
        </div>
      </div>
    </div>
  ) : null;
}
