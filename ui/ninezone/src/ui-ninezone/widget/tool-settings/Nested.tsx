/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module ToolSettings */

import * as classnames from "classnames";
import * as React from "react";
import { ToolSettings, ToolSettingsProps } from "./Settings";
import "./Nested.scss";

/** Properties of [[Nested]] component. */
export interface NestedProps extends ToolSettingsProps {
  /** Nested settings label. */
  label?: string;
  /** Back button icon. */
  backButton?: React.ReactNode;
}

/** Nested tool settings component. Used as content of [[ToolSettings]]. */
export class Nested extends React.PureComponent<NestedProps> {
  public render() {
    const className = classnames(
      "nz-widget-toolSettings-nested",
      this.props.className);

    return (
      <ToolSettings
        className={className}
        style={this.props.style}
      >
        <div className="nz-header">
          <div className="nz-button">
            {this.props.backButton}
          </div>
          <div className="nz-label">
            {this.props.label}
          </div>
        </div>
        {this.props.children}
      </ToolSettings>
    );
  }
}
