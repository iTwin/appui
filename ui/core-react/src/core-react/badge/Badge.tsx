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

type WEB_COMPONENT_PREFIX = "webSvg:";
type WebComponentIconSpec = `${WEB_COMPONENT_PREFIX}${string}`;

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
    const iconSpec: WebComponentIconSpec = `webSvg:${this.props.svg}`;
    return (
      <div
        className={classnames("core-badge", this.props.className)}
        style={this.props.style}
      >
        <Icon iconSpec={iconSpec} />
      </div>
    );
  }
}
