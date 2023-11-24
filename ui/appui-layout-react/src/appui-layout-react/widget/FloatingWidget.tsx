/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./FloatingWidget.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import {
  Point,
  Rectangle,
  useRefs,
  useResizeObserver,
} from "@itwin/core-react";
import type { UseDragResizeHandleArgs } from "../base/DragManager";
import {
  DragManagerContext,
  useDragResizeHandle,
  useIsDraggedItem,
} from "../base/DragManager";
import {
  FloatingWidgetNodeContext,
  MeasureContext,
  NineZoneDispatchContext,
  UiIsVisibleContext,
} from "../base/NineZone";
import type { FloatingWidgetState } from "../state/WidgetState";
import { WidgetContentContainer } from "./ContentContainer";
import { WidgetTabBar } from "./TabBar";
import { Widget, WidgetIdContext, WidgetProvider } from "./Widget";
import type { PointerCaptorArgs } from "../base/usePointerCaptor";
import { usePointerCaptor } from "../base/usePointerCaptor";
import { WidgetTarget } from "../target/WidgetTarget";
import { WidgetOutline } from "../outline/WidgetOutline";
import { useLayout } from "../base/LayoutStore";
import { getWidgetState } from "../state/internal/WidgetStateHelpers";
import type { XAndY } from "../state/internal/NineZoneStateHelpers";
import { usePreviewFeatures } from "../preview/PreviewFeatures";
import { usePreviewMaximizedWidgetStore } from "./PreviewMaximizeToggle";

type FloatingWidgetEdgeHandle = "left" | "right" | "top" | "bottom";
type FloatingWidgetCornerHandle =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

/** @internal */
export type FloatingWidgetResizeHandle =
  | FloatingWidgetEdgeHandle
  | FloatingWidgetCornerHandle;

/** @internal */
export interface FloatingWidgetProviderProps {
  id: FloatingWidgetState["id"];
}

/** @internal */
export function FloatingWidgetProvider(props: FloatingWidgetProviderProps) {
  const floatingWidget = React.useContext(FloatingWidgetNodeContext);
  return <WidgetProvider id={props.id}>{floatingWidget}</WidgetProvider>;
}

/** @internal */
export interface FloatingWidgetProps {
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

/** @internal */
export function FloatingWidget(props: FloatingWidgetProps) {
  const uiIsVisible = React.useContext(UiIsVisibleContext);
  const id = useFloatingWidgetId();
  assert(!!id);
  const {
    autoSized,
    bounds,
    hideWithUiWhenFloating,
    isToolSettingsTab,
    minimized,
    resizable,
  } = useFloatingWidgetState();
  const hideFloatingWidget = !uiIsVisible && hideWithUiWhenFloating;

  const item = React.useMemo(
    () => ({
      id,
      type: "widget" as const,
    }),
    [id]
  );
  const dragged = useIsDraggedItem(item);
  const ref = useHandleAutoSize(dragged);
  const { enableMaximizedFloatingWidget } = usePreviewFeatures();
  const maximizedWidget = usePreviewMaximizedWidgetStore(
    (state) => state.maximizedWidget
  );
  // istanbul ignore next (preview)
  const previewMaximizedWidgetSectionsClass =
    maximizedWidget === id &&
    enableMaximizedFloatingWidget &&
    "preview-enableMaximizedFloatingWidget-maximized";

  const className = classnames(
    "nz-widget-floatingWidget",
    dragged && "nz-dragged",
    isToolSettingsTab && "nz-floating-toolSettings",
    minimized && "nz-minimized",
    hideFloatingWidget && "nz-hidden",
    previewMaximizedWidgetSectionsClass
  );
  const style = React.useMemo(() => {
    const boundsRect = Rectangle.create(bounds);
    const { height, width } = boundsRect.getSize();
    const position = boundsRect.topLeft();
    // istanbul ignore next
    return {
      transform: `translate(${position.x}px, ${position.y}px)`,
      height: minimized || autoSized ? undefined : height,
      width: autoSized ? undefined : width,
      maxHeight: autoSized ? "60%" : undefined,
      maxWidth: autoSized ? "60%" : undefined,
    };
  }, [autoSized, bounds, minimized]);

  const content = React.useMemo(
    () => (
      <WidgetContentContainer>
        <WidgetTarget />
        <WidgetOutline />
      </WidgetContentContainer>
    ),
    []
  );
  const handles = React.useMemo(
    () =>
      resizable && (
        <>
          <FloatingWidgetHandle handle="left" />
          <FloatingWidgetHandle handle="top" />
          <FloatingWidgetHandle handle="right" />
          <FloatingWidgetHandle handle="bottom" />
          <FloatingWidgetHandle handle="topLeft" />
          <FloatingWidgetHandle handle="topRight" />
          <FloatingWidgetHandle handle="bottomLeft" />
          <FloatingWidgetHandle handle="bottomRight" />
        </>
      ),
    [resizable]
  );
  return (
    <Widget
      className={className}
      widgetId={id}
      style={style}
      ref={ref}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <WidgetTabBar separator={!minimized} />
      {content}
      {handles}
    </Widget>
  );
}

function useFloatingWidgetState() {
  const id = useFloatingWidgetId();
  assert(!!id);
  return useLayout((state) => {
    const widget = getWidgetState(state, id);
    const floatingWidget = state.floatingWidgets.byId[id];
    const tabs = widget.tabs;
    const activeTabId = widget.activeTabId;
    const activeTab = state.tabs[activeTabId];
    const userSized = floatingWidget.userSized;
    const singleTab = 1 === tabs.length;

    const toolSettingsTabId = state.toolSettings?.tabId;
    const isToolSettingsTab = widget.tabs[0] === toolSettingsTabId;
    const resizable = !!floatingWidget.resizable && !isToolSettingsTab;
    const autoSized = singleTab && !userSized;
    return {
      autoSized,
      bounds: floatingWidget.bounds,
      hideWithUiWhenFloating: activeTab.hideWithUiWhenFloating,
      isToolSettingsTab,
      minimized: widget.minimized,
      resizable,
    };
  }, true);
}

// Re-adjust bounds so that widget is behind pointer when auto-sized.
// istanbul ignore next
function useHandleAutoSize(dragged: boolean) {
  const dragManager = React.useContext(DragManagerContext);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const measureNz = React.useContext(MeasureContext);
  const id = useFloatingWidgetId();
  assert(!!id);
  const userSized = useLayout(
    (state) => state.floatingWidgets.byId[id].userSized
  );
  const { enableMaximizedFloatingWidget } = usePreviewFeatures();
  const maximizedWidget = usePreviewMaximizedWidgetStore(
    (state) => state.maximizedWidget
  );
  const maximized = enableMaximizedFloatingWidget && maximizedWidget === id;

  const updatePosition = React.useRef(true);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (!updatePosition.current) return;
    if (!dragged) return;
    // istanbul ignore next (preview)
    if (maximized) return;
    if (!dragManager.draggedItem) return;
    if (!ref.current) return;

    let bounds = Rectangle.create(ref.current.getBoundingClientRect());
    const nzBounds = measureNz();
    const pointerPosition = dragManager.draggedItem.info.pointerPosition;

    if (bounds.containsPoint(pointerPosition)) return;

    // Pointer is outside of tab area. Need to re-adjust widget bounds so that tab is behind pointer
    if (pointerPosition.x > bounds.right) {
      const offset = pointerPosition.x - bounds.right + 20;
      bounds = bounds.offsetX(offset);
    }

    // Adjust bounds to be relative to 9z origin
    bounds = bounds.offset({ x: -nzBounds.left, y: -nzBounds.top });

    dispatch({
      type: "FLOATING_WIDGET_SET_BOUNDS",
      id,
      bounds: bounds.toProps(),
    });
    dispatch({
      type: "FLOATING_WIDGET_SET_USER_SIZED",
      id,
      userSized: true,
    });
    updatePosition.current = false;
  }, [dragged, dragManager, dispatch, id, measureNz, maximized]);
  const handleResize = React.useCallback(() => {
    if (!ref.current) return;
    if (dragged) return;
    // istanbul ignore next (preview)
    if (maximized) return;
    if (userSized) return;

    let bounds = Rectangle.create(ref.current.getBoundingClientRect());

    // Adjust bounds to be relative to 9z origin
    const nzBounds = measureNz();
    bounds = bounds.offset({ x: -nzBounds.left, y: -nzBounds.top });

    dispatch({
      type: "FLOATING_WIDGET_SET_BOUNDS",
      id,
      bounds,
    });
  }, [dispatch, dragged, id, userSized, measureNz, maximized]);
  const roRef = useResizeObserver(handleResize);
  const refs = useRefs(ref, roRef);
  return refs;
}

interface FloatingWidgetHandleProps {
  handle: FloatingWidgetResizeHandle;
}

function FloatingWidgetHandle(props: FloatingWidgetHandleProps) {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const id = useFloatingWidgetId();
  const { handle } = props;
  const relativePosition = React.useRef<Point>(new Point());
  assert(id !== undefined);
  const onDrag = React.useCallback<
    NonNullable<UseDragResizeHandleArgs["onDrag"]>
  >(
    (pointerPosition) => {
      assert(!!ref.current);
      const bounds = Rectangle.create(ref.current.getBoundingClientRect());
      const newRelativePosition = bounds.topLeft().getOffsetTo(pointerPosition);
      const offset = relativePosition.current.getOffsetTo(newRelativePosition);
      const resizeBy = getResizeBy(handle, offset);
      dispatch({
        type: "FLOATING_WIDGET_RESIZE",
        id,
        resizeBy,
      });
    },
    [dispatch, handle, id]
  );
  const handleDragStart = useDragResizeHandle({
    handle,
    widgetId: id,
    onDrag,
  });
  const handlePointerDown = React.useCallback(
    (args: PointerCaptorArgs) => {
      assert(!!ref.current);
      const bounds = Rectangle.create(ref.current.getBoundingClientRect());
      const initialPointerPosition = new Point(args.clientX, args.clientY);
      relativePosition.current = bounds
        .topLeft()
        .getOffsetTo(initialPointerPosition);
      handleDragStart({
        initialPointerPosition,
        pointerPosition: initialPointerPosition,
      });
      dispatch({
        type: "FLOATING_WIDGET_BRING_TO_FRONT",
        id,
      });
    },
    [dispatch, handleDragStart, id]
  );
  const pointerCaptorRef = usePointerCaptor(handlePointerDown);
  const ref = React.useRef<HTMLDivElement>(null);
  const refs = useRefs(ref, pointerCaptorRef);
  const className = classnames(
    "nz-widget-floatingWidget_handle",
    `nz-${handle}`
  );
  return <div className={className} ref={refs} />;
}

/** @internal */
export function getResizeBy(handle: FloatingWidgetResizeHandle, offset: XAndY) {
  switch (handle) {
    case "left":
      return new Rectangle(-offset.x);
    case "top":
      return new Rectangle(0, -offset.y);
    case "right":
      return new Rectangle(0, 0, offset.x);
    case "bottom":
      return new Rectangle(0, 0, 0, offset.y);
    case "topLeft":
      return new Rectangle(-offset.x, -offset.y);
    case "topRight":
      return new Rectangle(0, -offset.y, offset.x);
    case "bottomLeft":
      return new Rectangle(-offset.x, 0, 0, offset.y);
    case "bottomRight":
      return new Rectangle(0, 0, offset.x, offset.y);
  }
}

/** @internal */
export function useFloatingWidgetId(): FloatingWidgetState["id"] | undefined {
  const widgetId = React.useContext(WidgetIdContext);
  return useLayout((state) => {
    if (!widgetId) return undefined;
    const floatingWidget = state.floatingWidgets.byId[widgetId];
    if (!floatingWidget) return undefined;

    return widgetId;
  });
}

/** @internal */
export function useWidgetAllowedToDock(): boolean {
  const id = useFloatingWidgetId();
  return useLayout((state) => {
    if (id) {
      const widget = getWidgetState(state, id);
      const activeTab = state.tabs[widget.activeTabId];
      if (activeTab.allowedPanelTargets?.length === 0) {
        return false;
      }
    }
    return true;
  });
}
