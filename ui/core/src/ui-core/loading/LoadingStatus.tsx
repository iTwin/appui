/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Loading */

import * as React from "react";
import * as classnames from "classnames";
import { CommonProps } from "../utils/Props";
import "./LoadingStatus.scss";

/** Properties for [[LoadingStatus]] component
 * @beta
 */
export interface LoadingStatusProps extends CommonProps {
  /** Message (text) displayed */
  message: string;
  /** Percent displayed (as text) */
  percent: number;
}

/**
 * A loading indicator that shows status text along with the percentage.
 * @beta
 */
export class LoadingStatus extends React.PureComponent<LoadingStatusProps> {
  public static defaultProps: Partial<LoadingStatusProps> = {
    message: "",
    percent: 0,
  };

  // sanity check to keep percentage between 0 & 100
  private inRange(percent: number): number {
    let value = Math.min(percent, 100);
    value = Math.max(value, 0);
    return value;
  }

  public render() {
    const percent = this.inRange(this.props.percent) + "%";
    const containerClass = classnames(this.props.className, "loading-status-container");
    return (
      <div className={containerClass} style={this.props.style}>
        <span className="loading-status-message">{this.props.message}</span>
        <span className="loading-status-percent">{percent}</span>
      </div>
    );
  }
}
