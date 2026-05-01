/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  BackstageAppButton,
  BackstageItemUtilities,
  BottomContentToolWidgetComposer,
  BottomViewToolWidgetComposer,
  CondensedLayout,
  Frontstage,
  FrontstageUtilities,
  StagePanelLocation,
  StagePanelSection,
  StagePanelState,
  StageUsage,
  StandardContentLayouts,
  StandardLayout,
  StatusBarItemUtilities,
  StatusBarSection,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
  Widget,
  WidgetState,
} from "@itwin/appui-react";
import { MeasureDistanceTool, PrimitiveTool } from "@itwin/core-frontend";
import {
  SvgCursor,
  SvgTextAlignCenter,
  SvgTextAlignJustify,
  SvgTextAlignLeft,
  SvgTextAlignRight,
  SvgFlag,
  SvgInfo,
  SvgNetwork,
  SvgHome,
  SvgCamera,
  SvgZoomIn,
  SvgZoomOut,
} from "@itwin/itwinui-icons-react";
import {
  FloatingLayoutInfo,
  LayoutControls,
  LayoutInfo,
  LogLifecycleWidget,
  SampleTool,
  ToolWithDynamicSettings,
  ViewportContent,
} from "@itwin/appui-test-providers";

// ---------------------------------------------------------------------------
// Pointer tool — a simple tool with no tool settings
// ---------------------------------------------------------------------------

class PointerTool extends PrimitiveTool {
  public static override toolId = "content-overlay-PointerTool";
  public static override iconSpec = "icon-cursor";

  public override requireWriteableTarget(): boolean {
    return false;
  }
  public override async onRestartTool(): Promise<void> {
    return this.exitTool();
  }
}

// ---------------------------------------------------------------------------
// Overlay mode hook — listens for postMessage from parent window
// ---------------------------------------------------------------------------

/**
 * Listens for `{ type: "appui-set-overlay-mode", enabled }` messages from
 * the parent window and returns the current enabled state.
 * Starts disabled — the parent sends a message to activate overlay mode.
 */
function useOverlayMode(): boolean {
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!event.data || event.data.type !== "appui-set-overlay-mode") return;
      setEnabled(!!event.data.enabled);
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return enabled;
}

// ---------------------------------------------------------------------------
// Frontstage definition
// ---------------------------------------------------------------------------

export function createContentOverlayFrontstage(): Frontstage {
  PointerTool.register("ContentOverlay");

  const config = FrontstageUtilities.createStandardFrontstage({
    id: createContentOverlayFrontstage.stageId,
    contentGroupProps: {
      id: "content-overlay-content-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "primaryContent",
          classId: "",
          content: <ViewportContent />,
        },
      ],
    },
    cornerButton: (
      <BackstageAppButton
        key="content-overlay-backstage"
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        icon="icon-bentley-systems"
      />
    ),
    defaultTool: MeasureDistanceTool.toolId,
    usage: StageUsage.General,
    leftPanelProps: {
      resizable: true,
      pinned: true,
      defaultState: StagePanelState.Open,
    },
    rightPanelProps: {
      resizable: true,
      pinned: true,
      defaultState: StagePanelState.Open,
    },
    bottomPanelProps: {
      resizable: true,
      pinned: true,
      defaultState: StagePanelState.Open,
    },
  });

  return {
    ...config,
    bottomContentManipulation: {
      id: `${createContentOverlayFrontstage.stageId}-bottomContentManipulation`,
      content: <BottomContentToolWidgetComposer />,
    },
    bottomViewNavigation: {
      id: `${createContentOverlayFrontstage.stageId}-bottomViewNavigation`,
      content: <BottomViewToolWidgetComposer />,
    },
    layout: <ContentOverlayLayout />,
  };
}
createContentOverlayFrontstage.stageId = "content-overlay";

/**
 * Switches between `StandardLayout` and `CondensedLayout` based on
 * parent postMessage.
 */
function ContentOverlayLayout() {
  const overlayMode = useOverlayMode();

  if (!overlayMode) {
    return <StandardLayout />;
  }

  return <CondensedLayout />;
}

// ---------------------------------------------------------------------------
// UiItemsProvider
// ---------------------------------------------------------------------------

export function createContentOverlayProvider(): UiItemsProvider {
  return {
    id: "content-overlay-provider",
    getToolbarItems: () => [
      ToolbarItemUtilities.createForTool(PointerTool, {
        icon: <SvgCursor />,
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.ContentManipulation,
          },
        },
      }),
      ToolbarItemUtilities.createForTool(SampleTool, {
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.ContentManipulation,
          },
        },
      }),
      ToolbarItemUtilities.createForTool(ToolWithDynamicSettings, {
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.ContentManipulation,
          },
        },
      }),
      // Bottom content manipulation toolbar items
      {
        id: "bottom-home-tool",
        itemPriority: 10,
        icon: <SvgHome />,
        label: "Home",
        execute: () => {},
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.BottomContentManipulation,
          },
        },
      },
      {
        id: "bottom-zoom-in-tool",
        itemPriority: 20,
        icon: <SvgZoomIn />,
        label: "Zoom In",
        execute: () => {},
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Vertical,
            usage: ToolbarUsage.BottomContentManipulation,
          },
        },
      },
      {
        id: "bottom-zoom-out-tool",
        itemPriority: 30,
        icon: <SvgZoomOut />,
        label: "Zoom Out",
        execute: () => {},
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Vertical,
            usage: ToolbarUsage.BottomContentManipulation,
          },
        },
      },
      // Bottom view navigation toolbar item
      {
        id: "bottom-camera-tool",
        itemPriority: 10,
        icon: <SvgCamera />,
        label: "Camera",
        execute: () => {},
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.BottomViewNavigation,
          },
        },
      },
    ],
    getWidgets: () => {
      const leftStart = {
        standard: {
          location: StagePanelLocation.Left,
          section: StagePanelSection.Start,
        },
      };
      const leftEnd = {
        standard: {
          location: StagePanelLocation.Left,
          section: StagePanelSection.End,
        },
      };
      const rightStart = {
        standard: {
          location: StagePanelLocation.Right,
          section: StagePanelSection.Start,
        },
      };
      const rightEnd = {
        standard: {
          location: StagePanelLocation.Right,
          section: StagePanelSection.End,
        },
      };
      const bottomStart = {
        standard: {
          location: StagePanelLocation.Bottom,
          section: StagePanelSection.Start,
        },
      };
      const bottomEnd = {
        standard: {
          location: StagePanelLocation.Bottom,
          section: StagePanelSection.End,
        },
      };

      const widgets: Widget[] = [
        // Left panel – start
        {
          id: "co-WL-A",
          label: "WL-A",
          icon: "icon-app-1",
          canPopout: true,
          defaultState: WidgetState.Open,
          content: <LogLifecycleWidget id="co-WL-A" />,
          canFloat: { hideWithUi: true },
          allowedPanels: [StagePanelLocation.Left, StagePanelLocation.Right],
          layouts: leftStart,
        },
        // Left panel – end
        {
          id: "co-WL-1",
          label: "WL-1",
          icon: "icon-smiley-happy",
          canPopout: false,
          content: <h2>Left WL-1</h2>,
          layouts: leftEnd,
        },
        {
          id: "co-WL-2",
          label: "WL-2",
          icon: "icon-smiley-sad",
          defaultState: WidgetState.Open,
          canPopout: true,
          content: <h2>Left WL-2</h2>,
          allowedPanels: [StagePanelLocation.Left],
          layouts: leftEnd,
        },
        // Right panel – start
        {
          id: "co-WR-A",
          label: "WR-A",
          icon: <SvgTextAlignLeft />,
          canPopout: true,
          defaultState: WidgetState.Open,
          content: <h2>Right WR-A</h2>,
          allowedPanels: [StagePanelLocation.Left, StagePanelLocation.Right],
          layouts: rightStart,
        },
        {
          id: "co-WR-B",
          label: "WR-B",
          icon: <SvgTextAlignRight />,
          canPopout: true,
          defaultState: WidgetState.Hidden,
          content: <h2>Right WR-B</h2>,
          layouts: rightStart,
        },
        // Right panel – end
        {
          id: "co-WR-1",
          label: "WR-1",
          icon: <SvgTextAlignCenter />,
          canPopout: false,
          content: <h2>Right WR-1</h2>,
          layouts: rightEnd,
        },
        {
          id: "co-WR-2",
          label: "WR-2",
          icon: <SvgTextAlignJustify />,
          defaultState: WidgetState.Open,
          canPopout: true,
          content: <h2>Right WR-2</h2>,
          allowedPanels: [StagePanelLocation.Right],
          layouts: rightEnd,
        },
        // Bottom panel – start
        {
          id: "co-floating-info",
          label: "Floating Info",
          canPopout: true,
          defaultState: WidgetState.Open,
          content: <FloatingLayoutInfo />,
          allowedPanels: [StagePanelLocation.Top, StagePanelLocation.Bottom],
          layouts: bottomStart,
        },
        {
          id: "co-layout-info",
          label: "Layout Info",
          canPopout: true,
          content: <LayoutInfo />,
          allowedPanels: [StagePanelLocation.Bottom],
          layouts: bottomStart,
        },
        // Bottom panel – end
        {
          id: "co-layout-controls",
          label: "Layout Controls",
          defaultState: WidgetState.Open,
          content: <LayoutControls />,
          layouts: bottomEnd,
        },
      ];
      return widgets;
    },
    getBackstageItems: () => [
      BackstageItemUtilities.createStageLauncher({
        stageId: createContentOverlayFrontstage.stageId,
        groupPriority: 200,
        itemPriority: 10,
        label: "Content Overlay",
      }),
    ],
    getStatusBarItems: () => [
      StatusBarItemUtilities.createCustomItem({
        id: "co-status-coordinates",
        section: StatusBarSection.Left,
        itemPriority: 10,
        content: (
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <SvgFlag style={{ width: 16, height: 16 }} />
            <span>X: 1204.5 Y: 832.1</span>
          </span>
        ),
      }),
      StatusBarItemUtilities.createCustomItem({
        id: "co-status-units",
        section: StatusBarSection.Left,
        itemPriority: 20,
        content: (
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <SvgInfo style={{ width: 16, height: 16 }} />
            <span>Meters</span>
          </span>
        ),
      }),
      StatusBarItemUtilities.createCustomItem({
        id: "co-status-connection",
        section: StatusBarSection.Left,
        itemPriority: 30,
        content: (
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <SvgNetwork style={{ width: 16, height: 16 }} />
            <span>Connected</span>
          </span>
        ),
      }),
    ],
  };
}
