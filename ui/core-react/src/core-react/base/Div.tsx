/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import classnames from "classnames";
import * as React from "react";
import type { CommonDivProps } from "../utils/Props";

/** Properties for the [[Div]] component
 * @public
 * @deprecated in 4.12.x. Props of deprecated component {@link Div}.
 */
export interface DivProps extends CommonDivProps {
  /** Main CSS class name */
  mainClassName: string;
}

/** Base div element React component
 * @public
 * @deprecated in 4.12.x. Use HTMLDivElement instead i.e. `<div />`.
 */
// eslint-disable-next-line deprecation/deprecation
export function Div(props: DivProps) {
  const { mainClassName, className, style, children, ...divProps } = props;

  return (
    <div
      {...divProps}
      className={classnames(mainClassName, className)}
      style={style}
    >
      {children}
    </div>
  );
}
