/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./ToolsArea.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps, NoChildrenProps } from "@itwin/core-react";
import type { ToolbarButtonProps } from "./tools/button/Button.js";

/** Properties of [[ToolsArea]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface ToolsAreaProps extends CommonProps, NoChildrenProps {
  /**
   * Button displayed between horizontal and vertical toolbars.
   * I.e. [[AppButton]] in ToolsArea zone.
   */
  button?: React.ReactNode;
  /** Horizontal toolbar. See [[Toolbar]] */
  horizontalToolbar?: React.ReactNode;
  /** Vertical toolbar. See [[Toolbar]] */
  verticalToolbar?: React.ReactNode;
  /** Handler for mouse enter */
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /** Handler for mouse leave */
  onMouseLeave?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

/** A component that renders toolbars in the top left corner of standard layout.
 * @internal
 */
export class ToolsArea extends React.PureComponent<ToolsAreaProps> {
  public override render() {
    const button = React.isValidElement<ToolbarButtonProps>(this.props.button)
      ? React.cloneElement(this.props.button, { small: true })
      : null; // ensure button is small
    const className = classnames("nz-tools-widget", this.props.className);

    return (
      <div className={className} style={this.props.style}>
        <div
          className="nz-app-button"
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
        >
          {button}
        </div>
        <div
          className={classnames(
            "nz-vertical-toolbar-container",
            !button && "nz-span"
          )}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
        >
          {this.props.verticalToolbar}
        </div>
        <div
          className="nz-horizontal-toolbar-container"
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
        >
          {this.props.horizontalToolbar}
        </div>
      </div>
    );
  }
}
