/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module ToolSettings */

import * as React from "react";
import { CommonProps, RectangleProps } from "@bentley/ui-core";
import {
  ToolSettings,
  ToolSettingsTab,
  Zone,
  TitleBarButton,
} from "@bentley/ui-ninezone";
import { FrontstageManager } from "../../frontstage/FrontstageManager";
import { ToolUiManager } from "../toolsettings/ToolUiManager";
import { KeyboardShortcutManager } from "../../keyboardshortcut/KeyboardShortcut";
import { UiFramework } from "../../UiFramework";
import { UiShowHideManager } from "../../utils/UiShowHideManager";

/** State for the ToolSettingsZone content.
 */
enum ToolSettingsZoneContent {
  Closed,
  ToolSettings,
}

/** State for the [[ToolSettingsZone]].
 */
interface ToolSettingsZoneState {
  toolSettingsZoneContent: ToolSettingsZoneContent;
}

/** Properties for the [[ToolSettingsZone]] React component.
 * @internal
 */
export interface ToolSettingsZoneProps extends CommonProps {
  bounds: RectangleProps;
  isHidden: boolean;
  isClosed: boolean;
}

/** Tool Settings Zone React component.
 * @internal
 */
export class ToolSettingsZone extends React.PureComponent<ToolSettingsZoneProps, ToolSettingsZoneState> {
  private _settingsSuffix: string;

  /** @internal */
  public readonly state: Readonly<ToolSettingsZoneState>;

  constructor(props: ToolSettingsZoneProps) {
    super(props);

    this._settingsSuffix = UiFramework.translate("general.settings");
    this.state = {
      toolSettingsZoneContent: this.props.isClosed ? ToolSettingsZoneContent.Closed : ToolSettingsZoneContent.ToolSettings,
    };
  }

  public componentDidMount(): void {
    FrontstageManager.onToolActivatedEvent.addListener(this._handleToolActivatedEvent);
  }

  public componentWillUnmount(): void {
    FrontstageManager.onToolActivatedEvent.removeListener(this._handleToolActivatedEvent);
  }

  private _handleToolActivatedEvent = () => {
    this.forceUpdate();
  }

  public render(): React.ReactNode {
    if (FrontstageManager.activeToolSettingsNode) {
      const divStyle: React.CSSProperties = {
        display: "grid",
        justifyItems: "center",
        gridAutoRows: "min-content auto",
      };

      return (
        <Zone
          className={this.props.className}
          style={this.props.style}
          bounds={this.props.bounds}
          isHidden={this.props.isHidden}
        >
          <div style={divStyle} >
            {this.getToolSettingsWidget()}
          </div>
        </Zone>
      );
    }

    return null;
  }

  private _processClick = () => {
    this.setState((prevState) => {
      let toolSettingsZoneContent = ToolSettingsZoneContent.Closed;

      if (prevState.toolSettingsZoneContent === ToolSettingsZoneContent.Closed)
        toolSettingsZoneContent = ToolSettingsZoneContent.ToolSettings;
      return {
        toolSettingsZoneContent,
      };
    });
  }

  private _handleKeyDown = (e: React.KeyboardEvent): void => {
    // istanbul ignore else
    if (e.key === "Escape") {
      KeyboardShortcutManager.setFocusToHome();
    }
  }

  private getToolSettingsWidget(): React.ReactNode {
    if (this.state.toolSettingsZoneContent === ToolSettingsZoneContent.Closed) {
      const tooltip = `${ToolUiManager.activeToolLabel} - ${this._settingsSuffix}`;

      return (
        <ToolSettingsTab
          onClick={this._processClick}
          onKeyDown={this._handleKeyDown}
          title={tooltip}
          onMouseEnter={UiShowHideManager.handleWidgetMouseEnter}
        >
          {this.getToolSettingsButton()}
        </ToolSettingsTab>
      );
    }

    return (
      <ToolSettings
        buttons={[
          <TitleBarButton key="0" onClick={this._processClick} title={UiFramework.translate("general.minimize")}>
            <i className={"icon icon-chevron-up"} />
          </TitleBarButton>,
        ]}
        title={ToolUiManager.activeToolLabel}
        onMouseEnter={UiShowHideManager.handleWidgetMouseEnter}
      >
        {FrontstageManager.activeToolSettingsNode}
      </ToolSettings>
    );
  }

  private getToolSettingsButton(): React.ReactNode {
    let button: React.ReactNode;

    // istanbul ignore else
    if (FrontstageManager.activeToolSettingsNode) {
      button = (
        <i className="icon icon-settings" />
      );
    }

    return button;
  }
}
