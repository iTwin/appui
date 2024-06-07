/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Message
 */

import "./Button.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "@itwin/core-react";

/** Properties of [[TitleBarButton]] component.
 * @internal
 */
// eslint-disable-next-line deprecation/deprecation
export interface TitleBarButtonProps extends CommonProps {
  /** Button content. */
  children?: React.ReactNode;
  /** Function called when button is clicked. */
  onClick?: () => void;
  /** Button title. */
  title?: string;
}

/** Button used in [[TitleBar]] component.
 * @note Use [StatusBarDialog.TitleBarButton]($appui-react) instead
 * @internal
 */
export function TitleBarButton(props: TitleBarButtonProps) {
  const className = classnames("nz-footer-dialog-button", props.className);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={className}
      onClick={props.onClick}
      style={props.style}
      title={props.title}
      role="button"
      tabIndex={-1}
    >
      {props.children}
    </div>
  );
}
