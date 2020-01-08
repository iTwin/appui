/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Toolbar */

import * as classnames from "classnames";
import * as React from "react";
import { CommonProps } from "@bentley/ui-core";
import "./Button.scss";

/** Properties of [[ToolbarButton]] component.
 * @alpha
 */
export interface ToolbarButtonProps extends CommonProps {
  /** Button content. */
  children?: React.ReactNode;
  /** Function called when the button is clicked. */
  onClick?: () => void;
}

/** Basic toolbar button. Used in [[Toolbar]] component.
 * @alpha
 */
export class ToolbarButton extends React.PureComponent<ToolbarButtonProps> {
  public render() {
    const className = classnames(
      "nz-toolbar-button-button",
      this.props.className);

    return (
      <button
        className={className}
        style={this.props.style}
        onClick={this.props.onClick}
      >
        <div className="nz-gradient" />
        {this.props.children}
      </button>
    );
  }
}
