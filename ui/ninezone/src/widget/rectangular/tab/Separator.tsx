/*---------------------------------------------------------------------------------------------
|  $Copyright: (c) 2018 Bentley Systems, Incorporated. All rights reserved. $
 *--------------------------------------------------------------------------------------------*/
/** @module Widget */

import * as classnames from "classnames";
import * as React from "react";
import Props from "../../../utilities/Props";
import "./Separator.scss";

export default class TabSeparator extends React.Component<Props> {
  public render() {
    const className = classnames(
      "nz-widget-rectangular-tab-separator",
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
