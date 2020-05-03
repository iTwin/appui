/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./TabBar.scss";
import * as React from "react";
import { Point, Timer } from "@bentley/ui-core";
import { assert } from "../base/assert";
import { isTabTarget, useDragWidget, UseDragWidgetArgs } from "../base/DragManager";
import { getUniqueId, NineZoneDispatchContext } from "../base/NineZone";
import { WIDGET_DRAG, WIDGET_DRAG_END, WidgetDragEndAction } from "../base/NineZoneState";
import { usePointerCaptor } from "../base/PointerCaptor";
import { TabBarButtons } from "./Buttons";
import { FloatingWidgetIdContext } from "./FloatingWidget";
import { WidgetTabs } from "./Tabs";
import { WidgetIdContext } from "./Widget";

/** @internal */
export const WidgetTabBar = React.memo(function WidgetTabBar() { // tslint:disable-line: variable-name no-shadowed-variable
  const dispatch = React.useContext(NineZoneDispatchContext);
  const id = React.useContext(WidgetIdContext);
  assert(id);
  const floatingWidgetId = React.useContext(FloatingWidgetIdContext);
  const dragStartTimer = React.useRef<Timer>(new Timer(300));
  const pointerPosition = React.useRef<Point>();
  const dragging = React.useRef(false);
  const widgetId = floatingWidgetId === undefined ? id : floatingWidgetId;
  const handleWidgetDragStart = useDragWidget({
    widgetId,
  });
  const handleDragStart = React.useCallback(() => {
    dragging.current = true;
    assert(pointerPosition.current);
    dragStartTimer.current.stop();
    handleWidgetDragStart({
      initialPointerPosition: pointerPosition.current,
    });
    pointerPosition.current = undefined;
  }, [handleWidgetDragStart]);
  const onDrag = React.useCallback<NonNullable<UseDragWidgetArgs["onDrag"]>>((dragBy) => {
    floatingWidgetId !== undefined && dispatch({
      type: WIDGET_DRAG,
      dragBy,
      floatingWidgetId,
    });
  }, [dispatch, floatingWidgetId]);
  const onDragEnd = React.useCallback<NonNullable<UseDragWidgetArgs["onDragEnd"]>>((dragTarget) => {
    dragging.current = false;
    let target: WidgetDragEndAction["target"];
    if (dragTarget && isTabTarget(dragTarget)) {
      target = dragTarget;
    } else if (dragTarget) {
      target = {
        ...dragTarget,
        newWidgetId: getUniqueId(),
      };
    }
    floatingWidgetId !== undefined && dispatch({
      type: WIDGET_DRAG_END,
      floatingWidgetId,
      target,
    });
  }, [dispatch, floatingWidgetId]);
  useDragWidget({
    widgetId: id,
    onDrag,
    onDragEnd,
  });
  const handlePointerDown = React.useCallback((e: PointerEvent) => {
    pointerPosition.current = new Point(e.clientX, e.clientY);
    dragStartTimer.current.start();
  }, []);
  const handlePointerMove = React.useCallback((e: PointerEvent) => {
    pointerPosition.current = new Point(e.clientX, e.clientY);
    !dragging.current && handleDragStart();
  }, [handleDragStart]);
  const handlePointerUp = React.useCallback(() => {
    dragStartTimer.current.stop();
    pointerPosition.current = undefined;
  }, []);
  React.useEffect(() => {
    const timer = dragStartTimer.current;
    timer.setOnExecute(handleDragStart);
    return () => {
      timer.setOnExecute(undefined);
    };
  }, [handleDragStart]);
  const ref = usePointerCaptor(handlePointerDown, handlePointerMove, handlePointerUp);
  return (
    <div
      className="nz-widget-tabBar"
    >
      <div
        className="nz-handle"
        ref={ref}
      />
      <WidgetTabs />
      <TabBarButtons />
    </div>
  );
});
