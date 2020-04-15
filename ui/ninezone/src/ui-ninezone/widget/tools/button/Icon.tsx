/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import classnames from "classnames";
import * as React from "react";
import { ToolbarButton, ToolbarButtonProps } from "./Button";
import "./Icon.scss";

/** Properties of [[ToolbarButton]] component.
 * @alpha
 */
export interface ToolbarIconProps extends ToolbarButtonProps {
  /** Button icon. */
  icon?: React.ReactNode;
  /** Indicates whether to use a small App button */
  small?: boolean;
  /** Opacity for the background color */
  backgroundOpacity?: number;
}

/** Toolbar button which displays icon. Used in [[Toolbar]] component.
 * @note See basic button: [[ToolbarButton]]
 * @alpha
 */
export class ToolbarIcon extends React.PureComponent<ToolbarIconProps> {
  public render() {
    const { className, small, ...props } = this.props;
    const buttonClassName = classnames(
      "nz-toolbar-button-icon",
      small && "nz-toolbar-button-icon-small",
      className);

    return (
      <ToolbarButton
        className={buttonClassName}
        small={small}
        {...props}
      >
        <div className="nz-icon">
          {this.props.icon}
        </div>
        {this.props.children}
      </ToolbarButton>
    );
  }
}
