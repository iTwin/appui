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
import { Point, Timer } from "@itwin/core-react";
import type { UseDragWidgetArgs } from "../base/DragManager";
import { useDragWidget } from "../base/DragManager";
import { NineZoneDispatchContext } from "../base/NineZone";
import type {
  PointerCaptorArgs,
  PointerCaptorEvent,
} from "../base/usePointerCaptor";
import { usePointerCaptor } from "../base/usePointerCaptor";
import { TabBarButtons } from "./Buttons";
import { WidgetTabs } from "./Tabs";
import { WidgetIdContext } from "./Widget";
import { useDoubleClick } from "../widget-panels/Grip";
import { useFloatingWidgetId } from "./FloatingWidget";
import { usePreviewFeatures } from "../preview/PreviewFeatures";

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

  const { changeActiveTabAfterDragDrop } = usePreviewFeatures();
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
          isActiveTabPreview: changeActiveTabAfterDragDrop,
        });
    },
    [
      dispatch,
      floatingWidgetId,
      handleActionAreaClick,
      changeActiveTabAfterDragDrop,
    ]
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
  const className = classnames(
    "nz-widget-tabBar",
    props.separator && "nz-separator"
  );

  return (
    <div ref={containerRef} className={className}>
      <div className="nz-handle" ref={ref} />
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
  const doubleClickTimer = React.useRef(new Timer(300));
  const clickCount = React.useRef(0);
  const initialPointerPosition = React.useRef<Point>();

  React.useEffect(() => {
    const handleExecute = () => {
      // istanbul ignore else
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
