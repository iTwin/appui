/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import "./DockedBar.scss";
import type { CommonDivProps } from "@itwin/core-react";
import classnames from "classnames";

/** Properties of [[DockedBar]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface DockedBarProps extends CommonDivProps {
  /** Placement of the bar. */
  placement?: "top" | "bottom";
}

/** @internal */
export function DockedBar(props: DockedBarProps) {
  const { className, placement, ...otherProps } = props;
  const divClassName = classnames("uifw-dockedBar", className);
  return (
    <div {...otherProps} className={divClassName} data-placement={placement}>
      {props.children}
    </div>
  );
}
