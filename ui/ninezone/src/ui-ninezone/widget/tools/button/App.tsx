/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Toolbar */

import * as classnames from "classnames";
import * as React from "react";
import { OmitChildrenProp, NoChildrenProps } from "../../../utilities/Props";
import { ToolbarIcon, ToolbarIconProps } from "./Icon";
import "./App.scss";

/** Properties of [[BackButton]] component.
 * @alpha
 */
export interface AppButtonProps extends OmitChildrenProp<ToolbarIconProps>, NoChildrenProps {
}

/** App button which displays icon. Used in [[Toolbar]] component.
 * @note See basic button: [[ToolbarButton]]
 * @alpha
 */
export class AppButton extends React.PureComponent<AppButtonProps> {
  public render() {
    const { className, ...props } = this.props;
    const buttonClassName = classnames(
      "nz-toolbar-button-app",
      className);

    return (
      <ToolbarIcon
        className={buttonClassName}
        icon={this.props.icon}
        {...props}
      >
        <div className="nz-bars">
          <div className="nz-bar" />
          <div className="nz-bar" />
          <div className="nz-bar" />
        </div>
      </ToolbarIcon>
    );
  }
}
