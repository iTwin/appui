/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Button
 */

import "./UnderlinedButton.scss";
import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";

/** Properties for the [[UnderlinedButton]] React component
 * @public
 * @deprecated in 4.12.0. Props of deprecated component {@link UnderlinedButton}.
 */
export interface UnderlinedButtonProps {
  /** String that will be rendered by the button */
  children: string | React.ReactNode;
  /** Additional className */
  className?: string;
  /** Title of the button */
  title?: string;
  /** Callback to onClick event */
  onClick?: (e: React.MouseEvent) => void;
  /** Callback to activate */
  onActivate?: () => void;
}

/** A React component that makes text clickable and underlined
 * @public
 * @deprecated in 4.13.0. Use {@link https://itwinui.bentley.com/docs/anchor iTwinUI anchor} or {@link https://itwinui.bentley.com/docs/button button} instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export function UnderlinedButton(props: UnderlinedButtonProps) {
  const handleKeyUp = React.useCallback(
    (event: React.KeyboardEvent) => {
      const key = event.key;

      switch (key) {
        case Key.Enter.valueOf():
        case " ":
          props.onActivate && props.onActivate();
          break;
      }
    },
    [props]
  );

  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      props.onClick && props.onClick(e);
      props.onActivate && props.onActivate();
    },
    [props]
  );

  const className = classnames(
    "core-underlined-button",
    props.className ? props.className : undefined
  );

  return (
    <span
      className={className}
      title={props.title}
      onClick={handleClick}
      onKeyUp={handleKeyUp}
      tabIndex={0}
      role="link"
    >
      {props.children}
    </span>
  );
}
