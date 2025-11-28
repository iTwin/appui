/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./NavigationArea.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps, NoChildrenProps } from "@itwin/core-react";

/** Properties of [[NavigationArea]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface NavigationAreaProps extends CommonProps, NoChildrenProps {
  /**
   * Button displayed between horizontal and vertical toolbars.
   * I.e. [[AppButton]] in NavigationArea zone or navigation aid control in Navigation zone.
   */
  navigationAid?: React.ReactNode;
  /** Horizontal toolbar. Positioned at the top-right. */
  horizontalToolbar?: React.ReactNode;
  /** Vertical toolbar. Positioned at the top-right. */
  verticalToolbar?: React.ReactNode;
  /** Secondary horizontal toolbar. Positioned at the bottom-right. */
  secondaryHorizontalToolbar?: React.ReactNode;
  /** Secondary vertical toolbar. Positioned at the bottom-right. */
  secondaryVerticalToolbar?: React.ReactNode;
  /** Handler for mouse enter */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /** Handler for mouse leave */
  onMouseLeave?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  hidden?: boolean;
}

/** A component that renders toolbars in the top right corner of standard layout.
 * @internal
 */
export function NavigationArea(props: NavigationAreaProps) {
  const className = classnames(
    "nz-widget-navigationArea",
    props.hidden && "nz-hidden",
    props.className
  );
  return (
    <div className={className} style={props.style}>
      <div
        className="nz-horizontal-toolbar-container"
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        {props.horizontalToolbar}
      </div>
      {props.navigationAid && (
        <div
          className="nz-navigation-aid-container"
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        >
          {props.navigationAid}
        </div>
      )}
      <div
        className={classnames(
          "nz-vertical-toolbar-container",
          !props.navigationAid && "nz-span"
        )}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        {props.verticalToolbar}
        <div style={{ marginTop: "6px" }}>{props.secondaryVerticalToolbar}</div>
      </div>
      {props.secondaryHorizontalToolbar && (
        <div
          className="nz-secondary-horizontal-toolbar-container"
          onMouseEnter={props.onMouseEnter}
          onMouseLeave={props.onMouseLeave}
        >
          {props.secondaryHorizontalToolbar}
        </div>
      )}
    </div>
  );
}
