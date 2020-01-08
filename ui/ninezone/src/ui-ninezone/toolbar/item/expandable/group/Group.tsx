/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Toolbar */

import * as classnames from "classnames";
import * as React from "react";
import { CommonProps, NoChildrenProps } from "@bentley/ui-core";
import { Panel } from "./Panel";
import { Columns } from "./Columns";
import { Title } from "./Title";

/** Properties of [[Group]] component.
 * @alpha
 */
export interface GroupProps extends CommonProps, NoChildrenProps {
  /** Tool group title. */
  title?: string;
  /** Columns of tool group. I.e. [[GroupColumn]]  */
  columns?: React.ReactNode;
}

/** Tool group component. Used in [[ExpandableItem]] component.
 * @alpha
 */
export class Group extends React.PureComponent<GroupProps> {
  public render() {
    const className = classnames(
      "nz-toolbar-item-expandable-group-group",
      this.props.className);

    return (
      <Panel className={className} style={this.props.style}>
        {this.props.title &&
          <Title>
            {this.props.title}
          </Title>
        }
        {this.props.columns &&
          <Columns>
            {this.props.columns}
          </Columns>
        }
      </Panel>
    );
  }
}
