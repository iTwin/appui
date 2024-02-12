/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module WidgetPanels
 */

import "./StandardLayout.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";
import { useLayout } from "./base/LayoutStore";
import { usePreviewFeatures } from "../preview/PreviewFeatures";
import { usePanelsAutoCollapse } from "./widget-panels/AppContent";
import { useMaximizedWidgetLayout } from "../preview/enable-maximized-widget/useMaximizedWidget";

interface StandardLayoutProps extends CommonProps {
  /** Main content area of the application (i.e. viewport) that will change bounds based on panel pinned state. */
  children?: React.ReactNode;
  /** Component that displays center content (i.e. toolbars). Content is always bound by widget panels. */
  centerContent?: React.ReactNode;
  toolSettings?: React.ReactNode;
  statusBar?: React.ReactNode;
  topPanel?: React.ReactNode;
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  bottomPanel?: React.ReactNode;
}

/** Component that displays widgets in a standard layout.
 * @internal
 */
export function StandardLayout(props: StandardLayoutProps) {
  const pinned = usePinned();
  const maximizedWidget = useMaximizedWidgetLayout();
  const appContentRef = usePanelsAutoCollapse<HTMLDivElement>();
  const className = classnames("nz-standardLayout", pinned, props.className);
  return (
    <div className={className} style={props.style}>
      <div className="nz-appContent" ref={appContentRef}>
        {props.children}
      </div>
      <div className="nz-centerContent">{props.centerContent}</div>
      <div className={classnames("nz-leftPanel", maximizedWidget.left)}>
        {props.leftPanel}
      </div>
      <div className={classnames("nz-rightPanel", maximizedWidget.right)}>
        {props.rightPanel}
      </div>
      <div className={classnames("nz-topPanel", maximizedWidget.top)}>
        {props.topPanel}
      </div>
      <div className={classnames("nz-bottomPanel", maximizedWidget.bottom)}>
        {props.bottomPanel}
      </div>
      <div className="nz-toolSettings">{props.toolSettings}</div>
      <div className="nz-statusBar">{props.statusBar}</div>
    </div>
  );
}

function usePinned() {
  const { contentAlwaysMaxSize } = usePreviewFeatures();
  const leftPinned = useLayout((state) => state.panels.left.pinned);
  const rightPinned = useLayout((state) => state.panels.right.pinned);
  const topPinned = useLayout((state) => state.panels.top.pinned);
  const bottomPinned = useLayout((state) => state.panels.bottom.pinned);
  return {
    "nz-pinned-left": leftPinned && !contentAlwaysMaxSize,
    "nz-pinned-right": rightPinned && !contentAlwaysMaxSize,
    "nz-pinned-top": topPinned && !contentAlwaysMaxSize,
    "nz-pinned-bottom": bottomPinned && !contentAlwaysMaxSize,
  };
}
