/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Base */

import * as React from "react";
import * as classnames from "classnames";
import { CommonDivProps } from "../utils/Props";

/** Properties for the [[Div]] component
 * @internal
 */
export interface DivProps extends CommonDivProps {
  /** Main CSS class name */
  mainClassName: string;
}

/** Base div element
 * @internal
 */
export class Div extends React.PureComponent<DivProps> {
  public render(): JSX.Element {
    const { mainClassName, className, style, children, ...props } = this.props;

    return (
      <div {...props} className={classnames(mainClassName, className)} style={style} >
        {children}
      </div>
    );
  }
}
