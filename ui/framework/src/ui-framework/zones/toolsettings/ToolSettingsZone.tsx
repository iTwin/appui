/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module ToolSettings */

import * as React from "react";
import { FrontstageManager, ToolActivatedEventArgs } from "../../frontstage/FrontstageManager";
import { ToolUiManager } from "../toolsettings/ToolUiManager";

import { ToolSettingsWidget, ToolSettingsTab, ToolSettings, CommonProps, RectangleProps, TabIcon, ZoneComponent } from "@bentley/ui-ninezone";
import { KeyboardShortcutManager } from "../../keyboardshortcut/KeyboardShortcut";
import UiFramework from "../../UiFramework";

/** State for the ToolSettingsZone content.
 */
export enum ToolSettingsZoneContent {
  Closed,
  ToolSettings,
}

/** State for the ToolSettingsZone.
 */
export interface ToolSettingsZoneState {
  toolSettingsZoneContent: ToolSettingsZoneContent;
  isPopoverOpen: boolean;
  isNestedPopoverOpen: boolean;
  toolId: string;
}

/** Properties for the [[ToolSettingsZone]] React component.
 */
export interface ToolSettingsZoneProps extends CommonProps {
  bounds: RectangleProps;
}

/** Tool Settings Zone React component.
 */
export class ToolSettingsZone extends React.Component<ToolSettingsZoneProps, ToolSettingsZoneState> {
  private _toolSettingsLabel: string;

  /** @hidden */
  public readonly state: Readonly<ToolSettingsZoneState> = {
    toolSettingsZoneContent: ToolSettingsZoneContent.ToolSettings,
    isPopoverOpen: false,
    isNestedPopoverOpen: false,
    toolId: "",
  };

  constructor(props: ToolSettingsZoneProps) {
    super(props);

    this._toolSettingsLabel = UiFramework.i18n.translate("UiFramework:general.toolSettings");
  }

  public componentDidMount(): void {
    FrontstageManager.onToolActivatedEvent.addListener(this._handleToolActivatedEvent);
  }

  public componentWillUnmount(): void {
    FrontstageManager.onToolActivatedEvent.removeListener(this._handleToolActivatedEvent);
  }

  private _handleToolActivatedEvent = (args: ToolActivatedEventArgs) => {
    this.setState((_prevState, _props) => ({ toolId: args.toolId }));
  }

  public render(): React.ReactNode {
    if (FrontstageManager.activeToolAssistanceNode || FrontstageManager.activeToolSettingsNode) {
      const divStyle: React.CSSProperties = {
        display: "grid",
        justifyItems: "center",
        gridAutoRows: "min-content auto",
      };

      return (
        <ZoneComponent
          bounds={this.props.bounds}
        >
          <div style={divStyle} >
            {this.getToolSettingsWidget()}
          </div>
        </ZoneComponent>
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
    const title = ToolUiManager.activeToolDescription + " " + this._toolSettingsLabel;

    const tab = (
      <ToolSettingsTab
        onClick={this._processClick}
        onKeyDown={this._handleKeyDown}
        isActive={this.state.toolSettingsZoneContent === ToolSettingsZoneContent.ToolSettings}
        title={title}
      >
        {this.getToolSettingsButton()}
        {/*this.getToolAssistanceButton()*/}
      </ToolSettingsTab>
    );

    let widget: React.ReactNode;

    switch (this.state.toolSettingsZoneContent) {
      case ToolSettingsZoneContent.ToolSettings: {
        // istanbul ignore else
        if (FrontstageManager.activeToolSettingsNode) {
          const settingsStyle: React.CSSProperties = {
            borderWidth: "thin",
            borderStyle: "solid",
            borderRadius: "3px",
            paddingLeft: "10px",
            paddingRight: "10px",
          };

          widget = (
            <ToolSettingsWidget
              tab={tab}
              content={
                <ToolSettings style={settingsStyle} >
                  <div className="nz-widget-toolSettings-title">{ToolUiManager.activeToolLabel}</div>
                  {FrontstageManager.activeToolSettingsNode}
                </ToolSettings>
              }
            />
          );
        }
        break;
      }
      case ToolSettingsZoneContent.Closed: {
        widget = (
          <ToolSettingsWidget
            tab={tab}
          />
        );
      }
    }

    return widget;
  }

  // private getToolAssistanceButton() {
  //   if (FrontstageManager.activeToolAssistanceNode) {
  //     return (
  //       <Item
  //         key="1"
  //         isActive={this.state.toolSettingsZoneContent === ToolSettingsZoneContent.ToolAssistance}
  //         onClick={
  //           () => {
  //             this.setState((prevState) => {
  //               let toolSettingsZoneContent = ToolSettingsZoneContent.Closed;

  //               if (prevState.toolSettingsZoneContent === ToolSettingsZoneContent.Closed ||
  //                 prevState.toolSettingsZoneContent === ToolSettingsZoneContent.ToolSettings)
  //                 toolSettingsZoneContent = ToolSettingsZoneContent.ToolAssistance;

  //               return {
  //                 toolSettingsZoneContent,
  //               };
  //             });
  //           }
  //         }
  //       >
  //         <i className="icon icon-help" />
  //       </Item>
  //     );
  //   }

  //   return null;
  // }

  private getToolSettingsButton(): React.ReactNode {
    let button: React.ReactNode;

    // istanbul ignore else
    if (FrontstageManager.activeToolSettingsNode) {
      button = (
        <TabIcon iconSpec="icon-settings" isActive={this.state.toolSettingsZoneContent === ToolSettingsZoneContent.ToolSettings} />
      );
    }

    return button;
  }
}
