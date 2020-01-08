/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Button */

import * as React from "react";
import classnames from "classnames";

import "./UnderlinedButton.scss";

/** Properties for the [[UnderlinedButton]] React component
 * @public
 */
export interface UnderlinedButtonProps {
  /** String that will be rendered by the button */
  children: string;
  /** Additional className */
  className?: string;
  /** Title of the button */
  title?: string;
  /** Callback to onClick event */
  onClick?: (e: React.MouseEvent) => void;
}

/** A React component that makes text clickable and underlined
 * @public
 */
export function UnderlinedButton(props: UnderlinedButtonProps) {
  const className = classnames(
    "core-underlined-button",
    props.className ? props.className : undefined,
  );

  return (
    <span
      className={className}
      title={props.title}
      onClick={props.onClick}
    >
      {props.children}
    </span>
  );
}
