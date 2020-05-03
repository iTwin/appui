/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./Items.scss";
import classnames from "classnames";
import * as React from "react";
import {
  calculateBackdropFilterBlur, calculateBoxShadowOpacity, calculateProximityScale, calculateToolbarOpacity, CommonProps, getToolbarBackdropFilter,
  getToolbarBackgroundColor, getToolbarBoxShadow, TOOLBAR_BACKDROP_FILTER_BLUR_DEFAULT, TOOLBAR_BOX_SHADOW_OPACITY_DEFAULT, TOOLBAR_OPACITY_DEFAULT,
  useProximityToMouse,
} from "@bentley/ui-core";
import { useToolbarWithOverflowDirectionContext } from "./Toolbar";
import { OrthogonalDirection, OrthogonalDirectionHelpers } from "./utilities/Direction";

/** Properties of [[ToolbarItems]] component.
 * @internal
 */
export interface ToolbarItemsProps extends CommonProps {
  /** Toolbar items. */
  children?: React.ReactNode;
  /** Toolbar items direction. */
  direction: OrthogonalDirection;
}

/** Toolbar items container. Used in [[ToolbarWithOverflow]] component.
 * @internal
 */
export function ToolbarItems(props: ToolbarItemsProps) {
  const className = classnames(
    "components-toolbar-items-container",
    OrthogonalDirectionHelpers.getCssClassName(props.direction),
    props.className);

  const ref = React.useRef<HTMLDivElement>(null);
  const proximity = useProximityToMouse(ref);
  const { useProximityOpacity, openPopupCount, overflowDisplayActive } = useToolbarWithOverflowDirectionContext();
  let toolbarOpacity = TOOLBAR_OPACITY_DEFAULT;
  let boxShadowOpacity = TOOLBAR_BOX_SHADOW_OPACITY_DEFAULT;
  let filterBlur = TOOLBAR_BACKDROP_FILTER_BLUR_DEFAULT;

  if (useProximityOpacity && openPopupCount < 1 && !overflowDisplayActive) {
    const proximityScale = calculateProximityScale(proximity);
    toolbarOpacity = calculateToolbarOpacity(proximityScale);
    boxShadowOpacity = calculateBoxShadowOpacity(proximityScale);
    filterBlur = calculateBackdropFilterBlur(proximityScale);
  }

  const divStyle: React.CSSProperties = {
    backgroundColor: getToolbarBackgroundColor(toolbarOpacity),
    boxShadow: getToolbarBoxShadow(boxShadowOpacity),
    backdropFilter: getToolbarBackdropFilter(filterBlur),
    ...props.style,
  };

  return (
    <div
      className={className}
      style={divStyle}
      ref={ref}
    >
      {props.children}
    </div>
  );
}
