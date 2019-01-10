/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Backstage */

import * as classnames from "classnames";
import * as React from "react";
import { CommonProps } from "../utilities/Props";
import "./Item.scss";

/** Properties of [[BackstageItem]] component. */
export interface BackstageItemProps extends CommonProps {
  /** Optional icon. */
  icon?: React.ReactChild;
  /** Optional label. */
  label?: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Describes if the item is active. */
  isActive?: boolean;
  /** Describes if the item is disabled. */
  isDisabled?: boolean;
  /** Function called when item is clicked. */
  onClick?: () => void;
}

/** Item in the [[Backstage]]. */
export class BackstageItem extends React.PureComponent<BackstageItemProps> {
  public render() {
    const className = classnames(
      "nz-backstage-item",
      this.props.isActive && "nz-is-active",
      this.props.isDisabled && "nz-is-disabled",
      this.props.className);

    return (
      <li className={className} style={this.props.style} onClick={this.props.onClick}>
        {this.props.icon}
        <div>
          <span>{this.props.label}</span>
          {this.props.subtitle && <span>{this.props.subtitle}</span>}
        </div>
      </li>
    );
  }
}
