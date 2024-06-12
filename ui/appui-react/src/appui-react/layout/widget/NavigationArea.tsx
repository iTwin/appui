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
// eslint-disable-next-line deprecation/deprecation
export interface NavigationAreaProps extends CommonProps, NoChildrenProps {
  /**
   * Button displayed between horizontal and vertical toolbars.
   * I.e. [[AppButton]] in NavigationArea zone or navigation aid control in Navigation zone.
   */
  navigationAid?: React.ReactNode;
  /** Horizontal toolbar. See [[Toolbar]] */
  horizontalToolbar?: React.ReactNode;
  /** Vertical toolbar. See [[Toolbar]] */
  verticalToolbar?: React.ReactNode;
  /** Handler for mouse enter */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /** Handler for mouse leave */
  onMouseLeave?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

/** NavigationArea widget is used in NavigationArea (Zone 1) and Navigation (Zone 3???) zones of 9-Zone UI.
 * @note Should be placed in [[Zone]] component.
 * @internal
 */
export function NavigationArea(props: NavigationAreaProps) {
  const className = classnames("nz-widget-navigationArea", props.className);
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
        className="nz-vertical-toolbar-container"
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        {props.verticalToolbar}
      </div>
    </div>
  );
}
