/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Widget */

import * as classnames from "classnames";
import * as React from "react";
import { CommonProps, NoChildrenProps } from "../../../utilities/Props";
import "./Separator.scss";

/** Properties of [[TabSeparator]] component. */
export interface TabSeparatorProps extends CommonProps, NoChildrenProps {
}

/** Rectangular widget tab separator. Used in [[Stacked]] component. */
export class TabSeparator extends React.PureComponent<TabSeparatorProps> {
  public render() {
    const className = classnames(
      "nz-widget-rectangular-tab-separator",
      this.props.className);

    return (
      <div
        className={className}
        style={this.props.style}
      />
    );
  }
}
