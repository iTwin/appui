/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import "./Grip.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import type { CommonProps } from "@itwin/core-react";
import { Point, Rectangle, Timer } from "@itwin/core-react";
import type { UseDragPanelGripArgs } from "../base/DragManager";
import { useDragPanelGrip } from "../base/DragManager";
import { NineZoneDispatchContext, useLabel } from "../base/NineZone";
import {
  isHorizontalPanelSide,
  PanelSideContext,
  WidgetPanelContext,
} from "./Panel";
import type { PointerCaptorArgs } from "../base/usePointerCaptor";
import { usePointerCaptor } from "../base/usePointerCaptor";
import { useLayout, useLayoutStore } from "../base/LayoutStore";

/** Resize grip of [[WidgetPanel]] component.
 * @internal
 */
export function WidgetPanelGrip(props: CommonProps) {
  const side = React.useContext(PanelSideContext);
  assert(!!side);
  const { collapsed, pinned } = useLayout((state) => {
    const panel = state.panels[side];
    return {
      collapsed: panel.collapsed,
      pinned: panel.pinned,
    };
  }, true);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const [ref, resizing, active] = useResizeGrip<HTMLDivElement>();
  const className = classnames(
    "nz-widgetPanels-grip",
    `nz-${side}`,
    active && "nz-active",
    resizing && "nz-resizing",
    props.className
  );
  const resizeGripTitle = useLabel("resizeGripTitle");
  return (
    <div className={className} title={resizeGripTitle} style={props.style}>
      <div className="nz-line-grip">
        <div className="nz-line-grip-detail" />
      </div>
      <div
        className="nz-handle"
        ref={ref}
        onMouseOverCapture={() => {
          collapsed &&
            !pinned &&
            !resizing &&
            dispatch({
              side,
              collapsed: false,
              type: "PANEL_SET_COLLAPSED",
            });
        }}
      />
    </div>
  );
}

/** @internal */
export const useResizeGrip = <T extends HTMLElement>(): [
  (instance: T | null) => void,
  boolean,
  boolean
] => {
  const widgetPanel = React.useContext(WidgetPanelContext);
  const side = React.useContext(PanelSideContext);
  const dispatch = React.useContext(NineZoneDispatchContext);
  assert(!!side);
  assert(!!widgetPanel);
  const [resizing, setResizing] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const initialPointerPosition = React.useRef<Point>();
  const dragStartTimer = React.useRef(new Timer(300));
  const ref = React.useRef<T | null>(null);
  const relativePosition = React.useRef(new Point());
  const layoutStore = useLayoutStore();
  const panelStateRef = React.useRef(layoutStore.getState().panels[side]);
  React.useEffect(
    () =>
      layoutStore.subscribe((state) => {
        panelStateRef.current = state.panels[side];
      }),
    [layoutStore, side]
  );
  const handleDoubleClick = React.useCallback(() => {
    dispatch({
      type: "PANEL_TOGGLE_COLLAPSED",
      side,
    });
  }, [dispatch, side]);
  const handleClick = useDoubleClick(handleDoubleClick);
  const onDrag = React.useCallback<NonNullable<UseDragPanelGripArgs["onDrag"]>>(
    (pointerPosition, lastPointerPosition) => {
      if (!ref.current) return;
      const direction = side === "left" || side === "top" ? 1 : -1;
      const dragOffset = lastPointerPosition.getOffsetTo(pointerPosition);
      const dragBy = isHorizontalPanelSide(side) ? dragOffset.y : dragOffset.x;
      const resizeBy = direction * dragBy;

      const bounds = widgetPanel.getBounds();
      const outerEdge = bounds[side];
      const innerEdge = isHorizontalPanelSide(side)
        ? pointerPosition.y
        : pointerPosition.x;
      const size = (innerEdge - outerEdge) * direction;

      const panel = panelStateRef.current;
      if (resizeBy === 0) return;
      if (panel.collapsed) {
        if (size >= panel.collapseOffset) {
          dispatch({
            type: "PANEL_SET_COLLAPSED",
            side,
            collapsed: false,
          });
          return;
        }
        return;
      }

      if (panel.size === undefined) return;

      // New size should match drag direction (i.e. dragging `left` panel grip to the left should not increase left panel size).
      const sizeDiff = size - panel.size;
      if (sizeDiff * resizeBy < 0) return;
      const collapseThreshold = Math.max(
        panel.minSize - panel.collapseOffset,
        0
      );
      if (size <= collapseThreshold) {
        dispatch({
          type: "PANEL_SET_COLLAPSED",
          side,
          collapsed: true,
        });
        dispatch({
          type: "PANEL_SET_SIZE",
          side,
          size: panel.minSize,
        });
        return;
      }

      const newSize = Math.min(Math.max(size, panel.minSize), panel.maxSize);
      dispatch({
        type: "PANEL_SET_SIZE",
        side,
        size: newSize,
      });
    },
    [dispatch, side, widgetPanel]
  );
  const onDragEnd = React.useCallback(() => {
    setResizing(false);
  }, []);
  const handlePanelGripDragStart = useDragPanelGrip({
    side,
    onDrag,
    onDragEnd,
  });
  React.useEffect(() => {
    const timer = dragStartTimer.current;
    timer.setOnExecute(() => {
      if (initialPointerPosition.current && ref.current) {
        relativePosition.current = Rectangle.create(
          ref.current.getBoundingClientRect()
        )
          .topLeft()
          .getOffsetTo(initialPointerPosition.current);
        setResizing(true);
        handlePanelGripDragStart({
          initialPointerPosition: initialPointerPosition.current,
          pointerPosition: initialPointerPosition.current,
        });
      }
      initialPointerPosition.current = undefined;
    });
    return () => {
      timer.setOnExecute(undefined);
    };
  }, [handlePanelGripDragStart]);
  const handleDragEnd = React.useCallback(() => {
    initialPointerPosition.current = undefined;
    dragStartTimer.current.stop();
    handleClick();
    setActive(false);
  }, [handleClick]);
  const handlePointerDown = React.useCallback((args: PointerCaptorArgs) => {
    initialPointerPosition.current = new Point(args.clientX, args.clientY);
    dragStartTimer.current.start();
    setActive(true);
  }, []);
  const handlePointerMove = React.useCallback(
    (args: PointerCaptorArgs) => {
      if (!initialPointerPosition.current) return;
      const position = new Point(args.clientX, args.clientY);
      setResizing(true);
      handlePanelGripDragStart({
        initialPointerPosition: position,
        pointerPosition: position,
      });
      onDrag(position, initialPointerPosition.current);
      initialPointerPosition.current = undefined;
      dragStartTimer.current.stop();
    },
    [handlePanelGripDragStart, onDrag]
  );
  const handlePointerCaptorRef = usePointerCaptor(
    handlePointerDown,
    handlePointerMove,
    handleDragEnd
  );
  const handleRef = React.useCallback(
    (instance: T | null) => {
      ref.current = instance;
      handlePointerCaptorRef(instance);
    },
    [handlePointerCaptorRef]
  );
  return [handleRef, resizing, active];
};

/** @internal */
export function useDoubleClick(onDoubleClick?: () => void): () => void {
  const timer = React.useRef(new Timer(300));
  const clickCount = React.useRef(0);
  timer.current.setOnExecute(() => {
    clickCount.current = 0;
  });
  const handleClick = React.useCallback(() => {
    timer.current.start();
    clickCount.current++;
    if (clickCount.current === 2) {
      onDoubleClick && onDoubleClick();
      clickCount.current = 0;
      timer.current.stop();
    }
  }, [onDoubleClick]);
  return handleClick;
}
