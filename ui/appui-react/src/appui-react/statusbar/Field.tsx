/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StatusBar
 */

import type { CommonProps } from "@itwin/core-react";
import classnames from "classnames";
import * as React from "react";
import "./Field.scss";

/** Properties of [[StatusBarField]] component.
 * @beta
 * @deprecated in 4.13.0. Props of deprecated component {@link StatusBarField}.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface StatusBarFieldProps extends CommonProps {
  /** Field content. */
  children?: React.ReactNode;
  /** Function called when field is clicked. */
  onClick?: () => void;
  /** Title of a field. */
  title?: string;
}

/** Field component used in [[StatusBar]] component.
 * @beta
 * @deprecated in 4.13.0. Use [iTwinUI Button](https://itwinui.bentley.com/docs/button) instead.
 */
export const StatusBarField = React.forwardRef<
  HTMLDivElement,
  StatusBarFieldProps // eslint-disable-line @typescript-eslint/no-deprecated
>(function StatusBarField(props, ref) {
  const hasClickAction = !!props.onClick;
  const classNames = classnames(
    "uifw-statusbar-field",
    hasClickAction && "uifw-action",
    props.className
  );
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      ref={ref}
      className={classNames}
      title={props.title}
      style={props.style}
      onClick={props.onClick}
      {...{
        role: "button",
        tabIndex: -1,
      }}
    >
      {props.children}
    </div>
  );
});
