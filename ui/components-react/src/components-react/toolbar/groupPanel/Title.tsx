/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./Title.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";

/** Properties of [[Title]] component.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface TitleProps extends CommonProps {
  /** Actual title. */
  children?: React.ReactNode;
}

/** Tool group title.
 * @internal
 */
export function Title(props: TitleProps) {
  const className = classnames(
    "components-toolbar-item-expandable-group-title",
    props.className
  );

  return (
    <div className={className} style={props.style}>
      {props.children}
    </div>
  );
}
