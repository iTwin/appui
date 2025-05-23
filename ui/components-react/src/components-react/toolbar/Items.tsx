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
import type { CommonProps } from "@itwin/core-react";
import {
  calculateBackdropFilterBlur,
  calculateBoxShadowOpacity,
  calculateToolbarOpacity,
  getToolbarBackdropFilter,
  getToolbarBackgroundColor,
  getToolbarBoxShadow,
  TOOLBAR_BACKDROP_FILTER_BLUR_DEFAULT,
  TOOLBAR_BOX_SHADOW_OPACITY_DEFAULT,
  useWidgetOpacityContext,
} from "@itwin/core-react/internal";
import {
  ToolbarOpacitySetting,
  useToolbarWithOverflowDirectionContext,
} from "./InternalToolbarComponent.js";
import type { OrthogonalDirection } from "./utilities/Direction.js";
import { OrthogonalDirectionHelpers } from "./utilities/Direction.js";

/** Properties of [[ToolbarItems]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
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
  const { toolbarOpacitySetting, openPopupCount, overflowDisplayActive } =
    useToolbarWithOverflowDirectionContext();
  const useTransparentBackground =
    toolbarOpacitySetting === ToolbarOpacitySetting.Transparent;

  let toolbarOpacity = useTransparentBackground
    ? 0
    : Number(
        document.documentElement.style.getPropertyValue(
          "--buic-toolbar-opacity"
        )
      );
  let boxShadowOpacity = useTransparentBackground
    ? 0
    : TOOLBAR_BOX_SHADOW_OPACITY_DEFAULT;
  let filterBlur = useTransparentBackground
    ? 0
    : TOOLBAR_BACKDROP_FILTER_BLUR_DEFAULT;
  let showSeparators =
    toolbarOpacitySetting === ToolbarOpacitySetting.Transparent ? false : true;

  const { ref, proximityScale } = useWidgetOpacityContext<HTMLDivElement>();

  if (
    toolbarOpacitySetting === ToolbarOpacitySetting.Proximity &&
    openPopupCount < 1 &&
    !overflowDisplayActive
  ) {
    toolbarOpacity = calculateToolbarOpacity(proximityScale);
    boxShadowOpacity = calculateBoxShadowOpacity(proximityScale);
    filterBlur = calculateBackdropFilterBlur(proximityScale);
    if (proximityScale < 0.25) showSeparators = false;
  }

  const divStyle: React.CSSProperties = {
    backgroundColor: getToolbarBackgroundColor(toolbarOpacity),
    boxShadow: getToolbarBoxShadow(boxShadowOpacity),
    backdropFilter: getToolbarBackdropFilter(filterBlur),
    ...props.style,
  };

  const className = classnames(
    "components-toolbar-items-container",
    OrthogonalDirectionHelpers.getCssClassName(props.direction),
    showSeparators && "components-toolbar-show-decorators",
    props.className
  );

  return (
    <div className={className} style={divStyle} ref={ref}>
      {props.children}
    </div>
  );
}
