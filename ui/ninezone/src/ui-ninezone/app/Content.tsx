/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module App */

import * as classnames from "classnames";
import * as React from "react";
import { CommonProps } from "../utilities/Props";
import "./Content.scss";

/** Properties of [[Content]] component. */
export interface ContentProps extends CommonProps {
  /** Actual app content here (i.e. viewport). */
  children?: React.ReactNode;
}

/** Content component of 9-Zone UI app. */
export class Content extends React.PureComponent<ContentProps> {
  public render() {
    const className = classnames(
      "nz-app-content",
      this.props.className);

    return (
      <div
        className={className}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}
