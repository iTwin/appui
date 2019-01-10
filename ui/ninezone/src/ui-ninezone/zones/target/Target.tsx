/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Zone */

import * as classnames from "classnames";
import * as React from "react";
import { CommonProps } from "../../utilities/Props";
import "./Target.scss";

/** Properties of [[Target]] component. */
export interface MergeTargetProps extends CommonProps {
  /** Function called when is targeted state of the target changes. */
  onTargetChanged?: (isTargeted: boolean) => void;
}

/**
 * Basic target component used in merge zone interactions.
 * @note Available targets: [[Back]], [[Merge]]
 */
export class MergeTarget extends React.PureComponent<MergeTargetProps> {
  private _isTargeted = false;

  public componentWillUnmount() {
    if (this._isTargeted)
      this.props.onTargetChanged && this.props.onTargetChanged(false);
  }

  public render() {
    const className = classnames(
      "nz-zones-target-target",
      this.props.className);

    return (
      <div
        className={className}
        style={this.props.style}
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}
      >
        {this.props.children}
      </div>
    );
  }

  private _handleMouseEnter = () => {
    this._isTargeted = true;
    this.props.onTargetChanged && this.props.onTargetChanged(true);
  }

  private _handleMouseLeave = () => {
    this._isTargeted = false;
    this.props.onTargetChanged && this.props.onTargetChanged(false);
  }
}
