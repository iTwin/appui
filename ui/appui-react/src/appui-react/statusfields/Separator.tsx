/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import "./Separator.scss";
import * as React from "react";
import classnames from "classnames";
import { CommonProps } from "@itwin/core-react";

/** Component used to separate status fields in a footer.
 * @public
 */
export function FooterSeparator(props: CommonProps) {
  const className = classnames(
    "uifw-footer-separator",
    props.className
  );
  return (
    <div
      className={className}
      style={props.style}
    />
  );
}
