/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

import "./Branch.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "../utils/Props";

/** Properties for [[TreeBranch]] React component
 * @public
 * @deprecated in 4.15.0. Props of deprecated {@link TreeBranch} component.
 */
export interface TreeBranchProps extends CommonProps {
  /** Child nodes of the tree branch */
  children?: React.ReactNode;
}

/** Presentation React component for a Tree branch
 * @public
 * @deprecated in 4.15.0. Use {@link https://itwinui.bentley.com/docs/tree iTwinUI Tree} instead.
 */
// eslint-disable-next-line deprecation/deprecation
export class TreeBranch extends React.PureComponent<TreeBranchProps> {
  public override render() {
    const className = classnames("core-tree-branch", this.props.className);

    return (
      <div className={className} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}
