/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import classnames from "classnames";
import * as React from "react";
import type { CommonDivProps } from "../utils/Props.js";

/** Properties for the [[Div]] component
 * @public
 * @deprecated in 4.12.0. Props of deprecated component {@link Div}.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface DivProps extends CommonDivProps {
  /** Main CSS class name */
  mainClassName: string;
}

/** Base div element React component
 * @public
 * @deprecated in 4.12.0. Use HTMLDivElement instead i.e. `<div />`.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
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
