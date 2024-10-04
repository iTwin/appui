/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */

import "./OverflowPanel.scss";
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
  TOOLBAR_OPACITY_DEFAULT,
  useWidgetOpacityContext,
} from "@itwin/core-react/internal";

import {
  ToolbarOpacitySetting,
  useToolbarWithOverflowDirectionContext,
} from "./InternalToolbarComponent.js";
import {
  DirectionHelpers,
  OrthogonalDirectionHelpers,
} from "./utilities/Direction.js";

/** Properties of [[ToolbarOverflowPanel]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface ToolbarOverflowPanelProps extends CommonProps {
  /** Panel content. */
  children?: React.ReactNode;
}

/** Displays overflown tool settings.
 * @internal
 */
export function ToolbarOverflowPanel(props: ToolbarOverflowPanelProps) {
  const {
    toolbarOpacitySetting,
    openPopupCount,
    overflowDisplayActive,
    expandsTo,
    overflowExpandsTo,
    overflowDirection,
  } = useToolbarWithOverflowDirectionContext();
  const { proximityScale } = useWidgetOpacityContext();

  const useTransparentBackground =
    toolbarOpacitySetting === ToolbarOpacitySetting.Transparent;
  let toolbarOpacity = useTransparentBackground ? 0 : TOOLBAR_OPACITY_DEFAULT;
  let boxShadowOpacity = useTransparentBackground
    ? 0
    : TOOLBAR_BOX_SHADOW_OPACITY_DEFAULT;
  let filterBlur = useTransparentBackground
    ? 0
    : TOOLBAR_BACKDROP_FILTER_BLUR_DEFAULT;
  let showSeparators =
    toolbarOpacitySetting === ToolbarOpacitySetting.Transparent ? false : true;

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
    "components-toolbar-overflow-panel",
    "components-toolbar-items-container",
    OrthogonalDirectionHelpers.getCssClassName(overflowDirection),
    `${OrthogonalDirectionHelpers.getCssClassName(
      overflowDirection
    )}-${DirectionHelpers.getCssClassName(expandsTo)}`,
    showSeparators && "components-toolbar-show-decorators",
    DirectionHelpers.getCssClassName(overflowExpandsTo),
    props.className
  );

  return (
    <div className={className} style={divStyle}>
      {props.children}
    </div>
  );
}
