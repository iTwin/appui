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
import { CommonProps, Point, PointProps, Rectangle, useRefs } from "@bentley/ui-core";
import { assert } from "../base/assert";
import { useDragResizeHandle, UseDragResizeHandleArgs, useIsDraggedItem } from "../base/DragManager";
import { NineZoneDispatchContext } from "../base/NineZone";
import { FloatingWidgetState, WidgetState } from "../base/NineZoneState";
import { WidgetContentContainer } from "./ContentContainer";
import { WidgetTabBar } from "./TabBar";
import { Widget, WidgetProvider } from "./Widget";
import { PointerCaptorArgs, usePointerCaptor } from "../base/PointerCaptor";
import { CssProperties } from "../utilities/Css";

/** @internal */
export type FloatingWidgetResizeHandle = "left" | "right" | "top" | "bottom";

/** @internal */
export interface FloatingWidgetProps {
  floatingWidget: FloatingWidgetState;
  widget: WidgetState;
}

/** @internal */
export const FloatingWidget = React.memo<FloatingWidgetProps>(function FloatingWidget(props) { // tslint:disable-line: variable-name no-shadowed-variable
  const { id, bounds } = props.floatingWidget;
  const { minimized } = props.widget;
  const style = React.useMemo(() => {
    const boundsRect = Rectangle.create(bounds);
    const { height, width } = boundsRect.getSize();
    const position = boundsRect.topLeft();
    return {
      ...CssProperties.transformFromPosition(position),
      height: minimized ? undefined : height,
      width,
    };
  }, [bounds, minimized]);
  const className = React.useMemo(() => classnames(
    minimized && "nz-minimized",
  ), [minimized]);
  return (
    <FloatingWidgetIdContext.Provider value={id}>
      <FloatingWidgetContext.Provider value={props.floatingWidget}>
        <WidgetProvider
          widget={props.widget}
        >
          <FloatingWidgetComponent
            className={className}
            style={style}
          />
        </WidgetProvider>
      </FloatingWidgetContext.Provider>
    </FloatingWidgetIdContext.Provider>
  );
});

/** @internal */
export const FloatingWidgetIdContext = React.createContext<FloatingWidgetState["id"] | undefined>(undefined); // tslint:disable-line: variable-name
FloatingWidgetIdContext.displayName = "nz:FloatingWidgetIdContext";

/** @internal */
export const FloatingWidgetContext = React.createContext<FloatingWidgetState | undefined>(undefined); // tslint:disable-line: variable-name
FloatingWidgetContext.displayName = "nz:FloatingWidgetContext";

const FloatingWidgetComponent = React.memo<CommonProps>(function FloatingWidgetComponent(props) { // tslint:disable-line: no-shadowed-variable variable-name
  const floatingWidgetId = React.useContext(FloatingWidgetIdContext);
  assert(floatingWidgetId);
  const item = React.useMemo(() => ({
    id: floatingWidgetId,
    type: "widget" as "widget",
  }), [floatingWidgetId]);
  const dragged = useIsDraggedItem(item);
  const className = classnames(
    "nz-widget-floatingWidget",
    dragged && "nz-dragged",
    props.className,
  );
  return (
    <Widget
      className={className}
      style={props.style}
    >
      <WidgetTabBar />
      <WidgetContentContainer />
      <FloatingWidgetHandle handle="left" />
      <FloatingWidgetHandle handle="top" />
      <FloatingWidgetHandle handle="right" />
      <FloatingWidgetHandle handle="bottom" />
    </Widget>
  );
});

interface FloatingWidgetHandleProps {
  handle: FloatingWidgetResizeHandle;
}

const FloatingWidgetHandle = React.memo<FloatingWidgetHandleProps>(function FloatingWidgetHandle(props) { // tslint:disable-line: no-shadowed-variable variable-name
  const id = React.useContext(FloatingWidgetIdContext);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const { handle } = props;
  const relativePosition = React.useRef<Point>(new Point());
  assert(id !== undefined);
  const onDrag = React.useCallback<NonNullable<UseDragResizeHandleArgs["onDrag"]>>((pointerPosition) => {
    assert(ref.current);
    const bounds = Rectangle.create(ref.current.getBoundingClientRect());
    const newRelativePosition = bounds.topLeft().getOffsetTo(pointerPosition);
    const offset = relativePosition.current.getOffsetTo(newRelativePosition);
    const resizeBy = getResizeBy(handle, offset);
    dispatch({
      type: "FLOATING_WIDGET_RESIZE",
      id,
      resizeBy,
    });
  }, [dispatch, handle, id]);
  const handleDragStart = useDragResizeHandle({
    handle,
    widgetId: id,
    onDrag,
  });
  const handlePointerDown = React.useCallback((args: PointerCaptorArgs) => {
    assert(ref.current);
    const bounds = Rectangle.create(ref.current.getBoundingClientRect());
    const initialPointerPosition = new Point(args.clientX, args.clientY);
    relativePosition.current = bounds.topLeft().getOffsetTo(initialPointerPosition);
    handleDragStart({
      initialPointerPosition,
    });
    dispatch({
      type: "FLOATING_WIDGET_BRING_TO_FRONT",
      id,
    });
  }, [dispatch, handleDragStart, id]);
  const pointerCaptorRef = usePointerCaptor(handlePointerDown);
  const ref = React.useRef<HTMLDivElement>(null);
  const refs = useRefs(ref, pointerCaptorRef);
  const className = classnames(
    "nz-widget-floatingWidget_handle",
    `nz-${handle}`,
  );
  return (
    <div
      className={className}
      ref={refs}
    />
  );
});

/** @internal */
export function getResizeBy(handle: FloatingWidgetResizeHandle, offset: PointProps) {
  if (handle === "left") {
    return new Rectangle(-offset.x);
  } else if (handle === "top") {
    return new Rectangle(0, -offset.y);
  } else if (handle === "right") {
    return new Rectangle(0, 0, offset.x);
  }
  return new Rectangle(0, 0, 0, offset.y);
}
