/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Toolbar */

import * as classnames from "classnames";
import * as React from "react";
import CommonProps, { NoChildrenProps } from "../../../../utilities/Props";
import "./BackArrow.scss";

/** Properties of [[BackArrow]] component. */
export interface BackArrowProps extends CommonProps, NoChildrenProps {
}

/** Back arrow used in [[NestedGroup]] component. */
export default class BackArrow extends React.Component<BackArrowProps> {
  public render() {
    const className = classnames(
      "nz-toolbar-item-expandable-group-backArrow",
      this.props.className);

    return (
      <div
        className={className}
        style={this.props.style}
      />
    );
  }
}
