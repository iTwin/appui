/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Loading
 */

import "./LoadingStatus.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "../utils/Props.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Properties for [[LoadingStatus]] component
 * @public
 * @deprecated in 4.12.0. Props of deprecated component {@link LoadingStatus}.
 */
export interface LoadingStatusProps extends CommonProps {
  /** Message (text) displayed */
  message: string;
  /** Percent displayed (as text) */
  percent: number;
}

/** A loading indicator that shows status text along with the percentage.
 * @public
 * @deprecated in 4.12.0. Use labeled {@link https://itwinui.bentley.com/docs/progressindicator iTwinUI progress indicator} instead.
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

  public override render() {
    const percent = `${this.inRange(this.props.percent)}%`;
    const containerClass = classnames(
      this.props.className,
      "loading-status-container"
    );
    return (
      <div className={containerClass} style={this.props.style}>
        <span className="loading-status-message">{this.props.message}</span>
        <span className="loading-status-percent">{percent}</span>
      </div>
    );
  }
}
