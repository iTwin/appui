/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
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
  StandardLayout,
  StatusBarItemUtilities,
  StatusBarSection,
  UiItemsProvider,
  Widget,
  WidgetState,
} from "@itwin/appui-react";
import { MeasureDistanceTool } from "@itwin/core-frontend";
import {
  SvgTextAlignCenter,
  SvgTextAlignJustify,
  SvgTextAlignLeft,
  SvgTextAlignRight,
  SvgFlag,
  SvgInfo,
  SvgNetwork,
} from "@itwin/itwinui-icons-react";
import {
  FloatingLayoutInfo,
  LayoutControls,
  LayoutInfo,
  LogLifecycleWidget,
  ViewportContent,
} from "@itwin/appui-test-providers";

// ---------------------------------------------------------------------------
// Reserved overlay spacer — the child app renders this transparent div whose
// height is driven by the `overlayHeight` URL search param. It reports its
// bounding rect to the parent window via `postMessage` so the parent can
// position its own components on top of the iframe.
// ---------------------------------------------------------------------------

/** Reads the `overlayHeight` search param (pixels). Returns 0 when absent. */
function useOverlayHeight(): number {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("overlayHeight");
  const parsed = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

/** Reads the `statusBarOverlay` search param. Returns true when present. */
function useStatusBarOverlay(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.has("statusBarOverlay");
}

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

/**
 * A transparent spacer that reserves vertical space in the content overlay zone.
 * On mount and whenever its rect changes (size or position), it posts
 * `{ type: "appui-overlay-rect", rect }` to `window.parent`.
 *
 * ResizeObserver catches size changes (panel collapse/expand), but internal
 * layout shifts (e.g. tool settings undocking) only change position — not size.
 * A lightweight rAF loop detects those position-only changes.
 */
function OverlaySpacer({ height }: { height: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const lastRectRef = React.useRef({ top: 0, left: 0, width: 0, height: 0 });

  const postRect = React.useCallback(() => {
    if (!ref.current || window.parent === window) return;
    const rect = ref.current.getBoundingClientRect();
    const r = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };

    // Only post when the rect actually changed.
    const prev = lastRectRef.current;
    if (
      prev.top === r.top &&
      prev.left === r.left &&
      prev.width === r.width &&
      prev.height === r.height
    )
      return;

    lastRectRef.current = r;
    window.parent.postMessage({ type: "appui-overlay-rect", rect: r }, "*");
  }, []);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Report on mount.
    postRect();

    // ResizeObserver — catches size changes (width from panel resize, etc.).
    const observer = new ResizeObserver(postRect);
    observer.observe(el);

    // Also observe the grid ancestor that resizes when tool settings or
    // panels change — its size change shifts our position.
    const centerArea = el.closest(".nz-centerArea");
    if (centerArea) observer.observe(centerArea);

    // rAF loop — catches position-only shifts that no observer detects
    // (e.g. animated transitions, tool settings undocking).
    let rafId = 0;
    const tick = () => {
      postRect();
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [postRect]);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height,
        pointerEvents: "none",
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Frontstage definition
// ---------------------------------------------------------------------------

export function createContentOverlayFrontstage(): Frontstage {
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
    layout: <ContentOverlayLayout />,
  };
}
createContentOverlayFrontstage.stageId = "content-overlay";

/**
 * Wraps `StandardLayout` and conditionally enables the content overlay spacer
 * and status bar overlay based on parent postMessage or URL params.
 */
function ContentOverlayLayout() {
  const overlayHeight = useOverlayHeight();
  const statusBarOverlay = useStatusBarOverlay();
  const overlayMode = useOverlayMode();

  return (
    <StandardLayout
      contentOverlay={
        overlayMode && overlayHeight > 0 ? (
          <OverlaySpacer height={overlayHeight} />
        ) : undefined
      }
      statusBarOverlay={overlayMode && statusBarOverlay}
    />
  );
}

// ---------------------------------------------------------------------------
// UiItemsProvider
// ---------------------------------------------------------------------------

export function createContentOverlayProvider(): UiItemsProvider {
  return {
    id: "content-overlay-provider",
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
