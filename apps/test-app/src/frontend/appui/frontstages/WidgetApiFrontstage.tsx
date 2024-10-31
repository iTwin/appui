/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ConditionalStringValue } from "@itwin/appui-abstract";
import {
  BackstageAppButton,
  BackstageItemUtilities,
  Frontstage,
  FrontstageUtilities,
  StagePanelLocation,
  StagePanelSection,
  StagePanelState,
  StageUsage,
  StandardContentLayouts,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
  useConditionalValue,
  Widget,
  WidgetState,
} from "@itwin/appui-react";
import { IModelApp, MeasureDistanceTool } from "@itwin/core-frontend";
import {
  SvgTextAlignCenter,
  SvgTextAlignJustify,
  SvgTextAlignLeft,
  SvgTextAlignRight,
  SvgUser,
  SvgUsers,
  SvgZoomIn,
  SvgZoomOut,
} from "@itwin/itwinui-icons-react";
import {
  AppUiTestProviders,
  FloatingLayoutInfo,
  LayoutControls,
  LayoutInfo,
  LogLifecycleWidget,
  store,
  UseWidgetHookWidget,
  ViewportContent,
} from "@itwin/appui-test-providers";

/** Tool settings widget can be configured by providing a URL param `toolSettings` with values `off` or `hidden`. */
export function createWidgetApiFrontstage(): Frontstage {
  const config = FrontstageUtilities.createStandardFrontstage({
    id: createWidgetApiFrontstage.stageId,
    contentGroupProps: {
      id: "widget-api-stage-frontstage-main-content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "primaryContent",
          classId: "",
          content: (
            <ViewportContent
              renderViewOverlay={() => {
                return <MyCustomViewOverlay />;
              }}
            />
          ),
        },
      ],
    },
    cornerButton: (
      <BackstageAppButton
        key="appui-test-providers-WidgetApi-backstage"
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
createWidgetApiFrontstage.stageId = "widget-api";

function MyCustomViewOverlay() {
  const [visible, setVisible] = React.useState(
    store.state.showCustomViewOverlay
  );
  React.useEffect(() => {
    return store.onChanged.addListener(() => {
      setVisible(store.state.showCustomViewOverlay);
    });
  }, []);
  return visible ? (
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

export function createWidgetApiFrontstageProvider() {
  return {
    id: "appui-test-app:widget-api-provider",
    getWidgets: () => {
      return [
        ...createLeftPanelWidgets(),
        ...createRightPanelWidgets(),
        ...createTopPanelWidgets(),
        ...createBottomPanelWidgets(),
      ];
    },
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher({
        stageId: createWidgetApiFrontstage.stageId,
        groupPriority: 300,
        itemPriority: 2,
        label: "Exercise Widget Api",
      }),
    ],
    getToolbarItems: () => [
      {
        ...createToggleCustomOverlayToolbarItem(),
        itemPriority: 17,
        groupPriority: 3000,
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.ContentManipulation,
          },
        },
      },
    ],
  } satisfies UiItemsProvider;
}

function createLeftPanelWidgets(): Widget[] {
  const startLayout = {
    standard: {
      location: StagePanelLocation.Left,
      section: StagePanelSection.Start,
    },
  };
  const endLayout = {
    standard: {
      location: StagePanelLocation.Left,
      section: StagePanelSection.End,
    },
  };
  return [
    {
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
      layouts: startLayout,
    },
    {
      id: "WL-B",
      label: "WL-B",
      icon: "icon-app-2",
      defaultState: WidgetState.Unloaded,
      content: <LogLifecycleWidget id="WL-B" />,
      layouts: startLayout,
    },
    {
      id: "WL-1",
      label: "WL-1",
      icon: "icon-smiley-happy",
      canPopout: false,
      content: <h2>Left WL-1</h2>,
      layouts: endLayout,
    },
    {
      id: "WL-2",
      label: "WL-2",
      icon: "icon-smiley-sad",
      defaultState: WidgetState.Open,
      canPopout: true,
      content: <h2>Left WL-2</h2>,
      allowedPanels: [StagePanelLocation.Left],
      layouts: endLayout,
    },
    {
      id: "WL-3",
      label: "WL-3",
      icon: "icon-smiley-happy-very",
      canPopout: true,
      content: <h2>Left WL-3</h2>,
      layouts: endLayout,
    },
  ];
}

function createRightPanelWidgets(): Widget[] {
  const startLayout = {
    standard: {
      location: StagePanelLocation.Right,
      section: StagePanelSection.Start,
    },
  };
  const endLayout = {
    standard: {
      location: StagePanelLocation.Right,
      section: StagePanelSection.End,
    },
  };
  return [
    {
      id: "WR-A",
      label: "WR-A",
      icon: <SvgTextAlignLeft />,
      canPopout: true,
      defaultState: WidgetState.Open,
      content: <h2>Right WR-A</h2>,
      allowedPanels: [StagePanelLocation.Left, StagePanelLocation.Right],
      layouts: startLayout,
    },
    {
      id: "WR-B",
      label: "WR-B",
      icon: <SvgTextAlignRight />,
      canPopout: true,
      defaultState: WidgetState.Hidden,
      content: <h2>Right WR-B</h2>,
      layouts: startLayout,
    },
    {
      id: "WR-1",
      label: "WR-1",
      icon: <SvgTextAlignCenter />,
      canPopout: false,
      content: <h2>Right WR-1</h2>,
      layouts: endLayout,
    },
    {
      id: "WR-2",
      label: "WR-2",
      icon: <SvgTextAlignJustify />,
      defaultState: WidgetState.Open,
      canPopout: true,
      content: <h2>Right WR-2</h2>,
      allowedPanels: [StagePanelLocation.Right],
      layouts: endLayout,
    },
    {
      id: "WR-3",
      label: "WR-3",
      icon: <SvgUser />,
      canPopout: true,
      content: <h2>Right WR-3</h2>,
      layouts: endLayout,
    },
    {
      id: "WR-4",
      label: "WR-4",
      icon: <SvgUsers />,
      canPopout: true,
      defaultState: WidgetState.Open,
      content: <h2>Right WR-4</h2>,
      layouts: endLayout,
    },
  ];
}

function createTopPanelWidgets(): Widget[] {
  const startLayout = {
    standard: {
      location: StagePanelLocation.Top,
      section: StagePanelSection.Start,
    },
  };
  const endLayout = {
    standard: {
      location: StagePanelLocation.Top,
      section: StagePanelSection.End,
    },
  };

  return [
    {
      id: "WT-A",
      label: "WT-A",
      canPopout: true,
      defaultState: WidgetState.Open,
      content: <h2>Top WT-A</h2>,
      canFloat: {
        defaultSize: { width: 400, height: 600 },
        isResizable: true,
      },
      layouts: startLayout,
    },
    {
      id: "WT-B",
      label: "WT-B",
      canPopout: true,
      content: <h2>Top WT-B</h2>,
      allowedPanels: [StagePanelLocation.Top, StagePanelLocation.Bottom],
      layouts: startLayout,
    },
    {
      id: "WT-1",
      label: "WT-1",
      canPopout: true,
      content: <h2>Top WT-1</h2>,
      layouts: endLayout,
    },
    {
      id: "WT-2",
      label: "WT-2",
      canPopout: true,
      defaultState: WidgetState.Open,
      content: <h2>Top WT-2</h2>,
      allowedPanels: [StagePanelLocation.Top],
      layouts: endLayout,
    },
  ];
}

function createBottomPanelWidgets(): Widget[] {
  const startLayout = {
    standard: {
      location: StagePanelLocation.Bottom,
      section: StagePanelSection.Start,
    },
  };
  const endLayout = {
    standard: {
      location: StagePanelLocation.Bottom,
      section: StagePanelSection.End,
    },
  };

  return [
    {
      id: "widget-info-Floating",
      label: "Floating Info",
      canPopout: true,
      defaultState: WidgetState.Open,
      content: <FloatingLayoutInfo />,
      allowedPanels: [StagePanelLocation.Top, StagePanelLocation.Bottom],
      layouts: startLayout,
    },
    {
      id: "widget-layout-info",
      label: "Layout Info",
      canPopout: true,
      content: <LayoutInfo />,
      allowedPanels: [StagePanelLocation.Bottom],
      layouts: startLayout,
    },
    {
      id: "widget-layout-controls",
      label: "Layout Controls",
      defaultState: WidgetState.Open,
      content: <LayoutControls />,
      layouts: endLayout,
    },
    {
      id: "appui-test-providers:UseWidgetHookWidget",
      label: "Use Widget Hook",
      icon: "icon-window-settings",
      defaultState: WidgetState.Open,
      canFloat: {
        containerId: "appui-test-providers:UseWidgetHookWidget",
      },
      content: <UseWidgetHookWidget />,
      canPopout: true,
      allowedPanels: [StagePanelLocation.Left, StagePanelLocation.Right],
      layouts: endLayout,
    },
  ];
}

function CustomOverlayIcon() {
  const showCustomViewOverlay = useConditionalValue(
    () => store.state.showCustomViewOverlay,
    [AppUiTestProviders.syncEventIdHideCustomViewOverlay]
  );
  if (showCustomViewOverlay) return <SvgZoomOut />;
  return <SvgZoomIn />;
}

function createToggleCustomOverlayToolbarItem() {
  const label = new ConditionalStringValue(
    () => (store.state.showCustomViewOverlay ? "Hide overlay" : "Show overlay"),
    [AppUiTestProviders.syncEventIdHideCustomViewOverlay]
  );
  const execute = () => {
    const showCustomViewOverlay = store.state.showCustomViewOverlay;
    store.setShowCustomViewOverlay(!showCustomViewOverlay);
    IModelApp.toolAdmin.dispatchUiSyncEvent(
      AppUiTestProviders.syncEventIdHideCustomViewOverlay
    );
  };
  return ToolbarItemUtilities.createActionItem({
    id: "testHideShowItems",
    icon: <CustomOverlayIcon />,
    label,
    execute,
  });
}
