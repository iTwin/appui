/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Message
 */

import "./Dialog.scss";
import classnames from "classnames";
import * as React from "react";
import { CommonProps } from "@itwin/core-react";

/** Properties of [[Dialog]] component.
 * @internal
 */
export interface DialogProps extends CommonProps {
  /** Dialog content.  */
  children?: React.ReactNode;
  /** Dialog title bar. See [[TitleBar]] */
  titleBar?: React.ReactNode;
}

/** Dialog used in footer indicators.
 * @note See [[MessageCenter]], [[ToolAssistance]]
 * @internal
 */
export function Dialog(props: DialogProps) {
  const className = classnames(
    "nz-footer-dialog-dialog",
    props.className);

  return (
    <div
      className={className}
      style={props.style}
    >
      <div>
        {props.titleBar}
      </div>
      <div>
        {props.children}
      </div>
    </div>
  );
}
