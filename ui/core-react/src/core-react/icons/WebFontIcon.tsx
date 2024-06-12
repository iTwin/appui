/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Icon
 */

import "./WebFontIcon.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "../utils/Props";

/** Properties for the [[WebFontIcon]] React component
 * @public
 * @deprecated in 4.15.0. Props of deprecated {@link WebFontIcon} component.
 */
// eslint-disable-next-line deprecation/deprecation
export interface WebFontIconProps extends CommonProps {
  /** Bentley Web Font icon name */
  iconName: string;
  /** Click event handler */
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  /** Text that will be shown when hovered on the icon. */
  title?: string;
  /** Size of the icon */
  iconSize?: "x-small" | "small" | "medium" | "large" | "x-large";
  /** Class name of icon used for custom font-family icons */
  iconClassName?: string;
}

/** WebFontIcon React component
 * @public
 * @deprecated in 4.15.0. Not used by AppUI. Use `@itwin/itwinui-icons-react` package.
 */
// eslint-disable-next-line deprecation/deprecation
export function WebFontIcon(props: WebFontIconProps) {
  const className = classnames(
    props.iconClassName || "bui-webfont-icon",
    props.iconName,
    props.iconSize ? `uicore-icons-${props.iconSize}` : undefined,
    props.className
  );

  return (
    <span
      className={className}
      title={props.title}
      style={props.style}
      onClick={props.onClick}
      role="presentation"
    />
  );
}
