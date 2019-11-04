/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Toolbar */

import * as classnames from "classnames";
import * as React from "react";
import { CommonProps } from "@bentley/ui-core";
import { OrthogonalDirectionHelpers, OrthogonalDirection } from "../utilities/Direction";
import "./Items.scss";

/** Properties of [[Items]] component.
 * @alpha
 */
export interface ItemsProps extends CommonProps {
  /** Toolbar items. */
  children?: React.ReactNode;
  /** Toolbar items direction. */
  direction: OrthogonalDirection;
}

/** Toolbar items container. Used in [[Toolbar]] component.
 * @alpha
 */
export class Items extends React.PureComponent<ItemsProps> {
  public render() {
    const className = classnames(
      "nz-toolbar-items",
      OrthogonalDirectionHelpers.getCssClassName(this.props.direction),
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
