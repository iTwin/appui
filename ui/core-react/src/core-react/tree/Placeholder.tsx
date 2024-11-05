/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

import "./Placeholder.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "../utils/Props.js";
import { LEVEL_OFFSET } from "./Node.js";

/** Properties for the [[TreeNodePlaceholder]] React component
 * @public
 * @deprecated in 4.15.0. Props of deprecated {@link TreeNodePlaceholder} component.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface TreeNodePlaceholderProps extends CommonProps {
  level: number;
  minWidth?: number;
  maxWidth?: number;
  ["data-testid"]?: string;
}

/**
 * Presentation React component for a placeholder to be displayed instead of a node while it's being loaded
 * @public
 * @deprecated in 4.15.0. Use {@link https://itwinui.bentley.com/docs/tree iTwinUI Tree} instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class TreeNodePlaceholder extends React.PureComponent<TreeNodePlaceholderProps> {
  public override render() {
    const className = classnames("core-tree-placeholder", this.props.className);
    const offset = this.props.level * LEVEL_OFFSET;
    const min = this.props.minWidth || 50;
    const max = this.props.maxWidth || 200;
    const width = Math.floor(min + Math.random() * (max - min));
    const style = { ...this.props.style, paddingLeft: `${offset}px` };
    return (
      <div
        className={className}
        style={style}
        data-testid={this.props["data-testid"]}
      >
        <div className="contents" style={{ width: `${width}px` }} />
      </div>
    );
  }
}
