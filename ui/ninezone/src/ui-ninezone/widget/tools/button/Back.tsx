/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module Toolbar */

import * as classnames from "classnames";
import * as React from "react";
import { OmitChildrenProp, NoChildrenProps } from "@bentley/ui-core";
import { ToolbarIcon, ToolbarIconProps } from "./Icon";
import "./Back.scss";

/** Properties of [[BackButton]] component.
 * @alpha
 */
export interface BackButtonProps extends OmitChildrenProp<ToolbarIconProps>, NoChildrenProps {
}

/** Back button which displays icon. Used in [[Toolbar]] component.
 * @note See basic button: [[ToolbarButton]]
 * @alpha
 */
export class BackButton extends React.PureComponent<BackButtonProps> {
  public render() {
    const { className, ...props } = this.props;
    const buttonClassName = classnames(
      "nz-toolbar-button-back",
      className);

    return (
      <ToolbarIcon
        className={buttonClassName}
        {...props}
      />
    );
  }
}
