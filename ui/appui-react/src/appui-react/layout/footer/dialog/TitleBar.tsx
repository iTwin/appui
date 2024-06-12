/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Message
 */

import "./TitleBar.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";

/** Properties of [[TitleBar]] component.
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
export interface TitleBarProps extends CommonProps {
  /** Title bar buttons. I.e. [[TitleBarButton]] */
  children?: React.ReactNode;
  /** Title bar title. */
  title?: string;
}

/** Title bar of [[Dialog]] component.
 * @note Use [StatusBarDialog.TitleBar]($appui-react) instead
 * @internal
 */
export function TitleBar(props: TitleBarProps) {
  const className = classnames("nz-footer-dialog-titleBar", props.className);

  return (
    <div className={className} style={props.style}>
      <span className="nz-title">{props.title}</span>
      {props.children}
    </div>
  );
}
