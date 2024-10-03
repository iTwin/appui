/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./TabBar.scss";
import classnames from "classnames";
import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { Timer } from "@itwin/core-react";
import { Point } from "@itwin/core-react/internal";
import type { UseDragWidgetArgs } from "../base/DragManager.js";
import { useDragWidget } from "../base/DragManager.js";
import { NineZoneDispatchContext } from "../base/NineZone.js";
import type {
  PointerCaptorArgs,
  PointerCaptorEvent,
} from "../base/usePointerCaptor.js";
import { usePointerCaptor } from "../base/usePointerCaptor.js";
import { TabBarButtons } from "./Buttons.js";
import { WidgetTabs } from "./Tabs.js";
import { WidgetIdContext } from "./Widget.js";
import { useDoubleClick } from "../widget-panels/Grip.js";
import { useFloatingWidgetId } from "./FloatingWidget.js";
import { useMaximizedWidgetTabBarHandle } from "../../preview/enable-maximized-widget/useMaximizedWidget.js";

/** @internal */
export interface WidgetTabBarProps {
  separator?: boolean;
}

/** @internal */
export function WidgetTabBar(props: WidgetTabBarProps) {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const id = React.useContext(WidgetIdContext);
  const floatingWidgetId = useFloatingWidgetId();
  assert(!!id);
  const widgetId = floatingWidgetId === undefined ? id : floatingWidgetId;
  const handleDoubleClick = React.useCallback(() => {
    floatingWidgetId &&
      dispatch({
        type: "FLOATING_WIDGET_CLEAR_USER_SIZED",
        id: floatingWidgetId,
      });
  }, [dispatch, floatingWidgetId]);
  const handleActionAreaClick = useDoubleClick(handleDoubleClick);

  const onDrag = React.useCallback<NonNullable<UseDragWidgetArgs["onDrag"]>>(
    (dragBy) => {
      floatingWidgetId !== undefined &&
        dispatch({
          type: "WIDGET_DRAG",
          dragBy,
          floatingWidgetId,
        });
    },
    [dispatch, floatingWidgetId]
  );
  const onDragEnd = React.useCallback<
    NonNullable<UseDragWidgetArgs["onDragEnd"]>
  >(
    (target) => {
      floatingWidgetId !== undefined && handleActionAreaClick();
      floatingWidgetId !== undefined &&
        dispatch({
          type: "WIDGET_DRAG_END",
          floatingWidgetId,
          target,
        });
    },
    [dispatch, floatingWidgetId, handleActionAreaClick]
  );
  const handleWidgetDragStart = useDragWidget({
    widgetId,
    onDrag,
    onDragEnd,
  });

  const containerRef = React.useRef<HTMLDivElement>(null);
  const handleDragStart = React.useCallback(
    (initialPointerPosition: Point, pointerPosition: Point) => {
      handleWidgetDragStart({
        initialPointerPosition,
        pointerPosition,
      });
    },
    [handleWidgetDragStart]
  );
  const handleTouchStart = React.useCallback(() => {
    floatingWidgetId &&
      dispatch({
        type: "FLOATING_WIDGET_BRING_TO_FRONT",
        id: floatingWidgetId,
      });
  }, [dispatch, floatingWidgetId]);
  const ref = useDrag(
    handleDragStart,
    undefined,
    undefined,
    handleTouchStart,
    handleDoubleClick
  );
  const maximizedWidgetHandle = useMaximizedWidgetTabBarHandle();
  const className = classnames(
    "nz-widget-tabBar",
    props.separator && "nz-separator"
  );
  const handleClassName = classnames("nz-handle", maximizedWidgetHandle);
  return (
    <div ref={containerRef} className={className}>
      <div className={handleClassName} ref={ref} />
      <WidgetTabs />
      <TabBarButtons />
    </div>
  );
}

/** Hook to control drag interactions.
 * Starts drag interaction after pointer moves or after timeout.
 * @internal
 */
export function useDrag<T extends HTMLElement>(
  onDragStart?: (initialPointerPosition: Point, pointerPosition: Point) => void,
  onDrag?: (position: Point) => void,
  onDragEnd?: () => void,
  onTouchStart?: () => void,
  onDoubleClick?: () => void
) {
  // eslint-disable-next-line deprecation/deprecation
  const doubleClickTimer = React.useRef(new Timer(300));
  const clickCount = React.useRef(0);
  const initialPointerPosition = React.useRef<Point>();

  React.useEffect(() => {
    const handleExecute = () => {
      if (clickCount.current === 2) onDoubleClick && onDoubleClick();
      clickCount.current = 0;
    };
    const timer = doubleClickTimer.current;
    timer.setOnExecute(handleExecute);
    return () => {
      timer.setOnExecute(undefined);
    };
  }, [onDoubleClick]);

  const handlePointerDown = React.useCallback(
    (args: PointerCaptorArgs, e: PointerCaptorEvent) => {
      initialPointerPosition.current = new Point(args.clientX, args.clientY);
      e.type === "touchstart" && onTouchStart && onTouchStart();
    },
    [onTouchStart]
  );
  const handlePointerMove = React.useCallback(
    (args: PointerCaptorArgs) => {
      if (initialPointerPosition.current) {
        onDragStart &&
          onDragStart(
            initialPointerPosition.current,
            new Point(args.clientX, args.clientY)
          );
        initialPointerPosition.current = undefined;
        return;
      }
      onDrag && onDrag(new Point(args.clientX, args.clientY));
    },
    [onDragStart, onDrag]
  );
  const handlePointerUp = React.useCallback(() => {
    clickCount.current++;
    doubleClickTimer.current.start();
    initialPointerPosition.current = undefined;
    onDragEnd && onDragEnd();
  }, [onDragEnd]);
  const ref = usePointerCaptor<T>(
    handlePointerDown,
    handlePointerMove,
    handlePointerUp
  );
  return ref;
}
