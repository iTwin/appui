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
  return (
    <div
      className={classnames("nz-standardLayout", props.className)}
      style={props.style}
    >
      <div className="nz-appContent">{props.children}</div>
      <div className="nz-centerContent">{props.centerContent}</div>
      <div className="nz-topPanel">{props.topPanel}</div>
      <div className="nz-leftPanel">{props.leftPanel}</div>
      <div className="nz-rightPanel">{props.rightPanel}</div>
      <div className="nz-bottomPanel">{props.bottomPanel}</div>
      <div className="nz-toolSettings">{props.toolSettings}</div>
      <div className="nz-statusBar">{props.statusBar}</div>
    </div>
  );
}
