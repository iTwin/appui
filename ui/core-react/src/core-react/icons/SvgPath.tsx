/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Icon
 */

import "./SvgPath.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "../utils/Props.js";

/** Properties of [[SvgPath]] component.
 * @public
 * @deprecated in 4.15.0. Props of deprecated {@link SvgPath} component.
 */
// eslint-disable-next-line deprecation/deprecation
export interface SvgPathProps extends CommonProps {
  /** Svg graphics paths */
  paths: string[];
  /** Svg viewBox width */
  viewBoxWidth: number;
  /** Svg viewBox height */
  viewBoxHeight: number;
}

/** Svg element wrapper with specified Svg paths.
 * @public
 * @deprecated in 4.15.0. Not used by AppUI. Use `@itwin/itwinui-icons-react` package or svg element directly.
 */
// eslint-disable-next-line deprecation/deprecation
export class SvgPath extends React.PureComponent<SvgPathProps> {
  public override render() {
    const className = classnames("core-icons-svgPath", this.props.className);
    const viewBox = `0 0 ${this.props.viewBoxWidth} ${this.props.viewBoxHeight}`;

    return (
      <svg
        className={className}
        style={this.props.style}
        width="100%"
        height="100%"
        viewBox={viewBox}
      >
        <g>
          {this.props.paths.map((path: string, index: number) => {
            return <path d={path} key={index} />;
          })}
        </g>
      </svg>
    );
  }
}
