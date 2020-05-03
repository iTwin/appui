/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import "./StagePanelHeader.scss";
import classnames from "classnames";
import * as React from "react";
import { StagePanelLocation } from "@bentley/ui-abstract";
import { CommonProps } from "@bentley/ui-core";
import { FrontstageManager } from "../frontstage/FrontstageManager";
import { StagePanelState } from "./StagePanelDef";

/** Properties of a [[StagePanelHeader]] component
 * @alpha
 */
export interface StagePanelHeaderProps extends CommonProps {
  /** Describes if the collapse button is visible. */
  collapseButton?: boolean;
  /** Title of collapse button (displayed when hovered). */
  collapseButtonTitle?: string;
  /** Describes stage panel location of this header. */
  location: StagePanelLocation;
  /** Header title. */
  title?: string;
}

/** Stage panel header React component.
 * @alpha
 */
export class StagePanelHeader extends React.PureComponent<StagePanelHeaderProps> {
  public render() {
    const className = classnames("uifw-stagepanelheader",
      this.props.className,
    );
    return (
      <div
        className={className}
        style={this.props.style}
      >
        <span>{this.props.title}</span>
        {this.props.collapseButton ? <i
          className="uifw-collapse icon icon-close"
          title={this.props.collapseButtonTitle}
          onClick={this._handleCollapseButtonClick}
        /> : undefined}
      </div>
    );
  }

  private _handleCollapseButtonClick = () => {
    const activeFrontstageDef = FrontstageManager.activeFrontstageDef;
    if (!activeFrontstageDef)
      return;
    const stagePanel = activeFrontstageDef.getStagePanelDef(this.props.location);
    if (!stagePanel)
      return;
    stagePanel.panelState = StagePanelState.Minimized;
  }
}
