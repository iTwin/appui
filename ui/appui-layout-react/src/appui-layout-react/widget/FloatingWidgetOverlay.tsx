/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./FloatingWidgetOverlay.scss";
import { assert } from "@itwin/core-bentley";
import { Rectangle } from "@itwin/core-react";
import * as React from "react";
import { useLayout } from "../base/LayoutStore";
import { FloatingWidgetHandle, useFloatingWidgetId } from "./FloatingWidget";
import { useWidgetZIndex } from "./ContentRenderer";

/** @internal */
export function FloatingWidgetOverlay() {
  const zIndex = useWidgetZIndex();
  const id = useFloatingWidgetId();
  assert(!!id);
  const bounds = useLayout((state) => state.floatingWidgets.byId[id].bounds);

  const boundsRect = Rectangle.create(bounds);
  const { height, width } = boundsRect.getSize();
  const style: React.CSSProperties = {
    transform: `translate(${boundsRect.left}px, ${boundsRect.top}px)`,
    height,
    width,
    zIndex: zIndex === undefined ? undefined : zIndex + 2,
  };
  return (
    <div
      className="nz-widget-floatingWidgetOverlay"
      style={style}
    >
      <FloatingWidgetHandle handle="left" />
      <FloatingWidgetHandle handle="top" />
      <FloatingWidgetHandle handle="right" />
      <FloatingWidgetHandle handle="bottom" />
      <FloatingWidgetHandle handle="topLeft" />
      <FloatingWidgetHandle handle="topRight" />
      <FloatingWidgetHandle handle="bottomLeft" />
      <FloatingWidgetHandle handle="bottomRight" />
    </div>
  );
}
