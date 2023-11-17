/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import "./Badge.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "../utils/Props";
import { Icon } from "../icons/IconComponent";

/** Properties for the [[Badge]] React component
 * @internal
 */
export interface BadgeProps extends CommonProps {
  svg: any;
}

/** Beta Badge React component
 * @internal
 */
export class Badge extends React.PureComponent<BadgeProps> {
  public override render(): React.ReactElement {
    return (
      <div
        className={classnames("core-badge", this.props.className)}
        style={this.props.style}
      >
        <Icon iconSpec={this.props.svg} />
      </div>
    );
  }
}
