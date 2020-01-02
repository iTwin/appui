/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Toolbar */

import * as classnames from "classnames";
import * as React from "react";
import { CommonProps } from "@bentley/ui-core";
import "./Column.scss";

/** Properties of [[GroupColumn]] component.
 * @alpha
 */
export interface GroupColumnProps extends CommonProps {
  /** Actual content. I.e. tool items: [[GroupToolExpander]], [[GroupTool]] */
  children?: React.ReactNode;
}

/** Tool group column. Used in [[Group]], [[NestedGroup]] components.
 * @alpha
 */
export class GroupColumn extends React.PureComponent<GroupColumnProps> {
  public render() {
    const className = classnames(
      "nz-toolbar-item-expandable-group-column",
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
