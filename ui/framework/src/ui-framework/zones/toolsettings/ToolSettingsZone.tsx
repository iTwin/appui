/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module ToolSettings */

import * as React from "react";
import { CommonProps } from "@bentley/ui-core";
import {
  ToolSettings,
  ToolSettingsTab,
  RectangleProps,
  Zone,
  TitleBarButton,
} from "@bentley/ui-ninezone";
import { FrontstageManager, ToolActivatedEventArgs } from "../../frontstage/FrontstageManager";
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
  isPopoverOpen: boolean;
  isNestedPopoverOpen: boolean;
  toolId: string;
}

/** Properties for the [[ToolSettingsZone]] React component.
 * @internal
 */
export interface ToolSettingsZoneProps extends CommonProps {
  bounds: RectangleProps;
  isHidden: boolean;
}

/** Tool Settings Zone React component.
 * @internal
 */
export class ToolSettingsZone extends React.Component<ToolSettingsZoneProps, ToolSettingsZoneState> {
  private _toolSettingsLabel: string;

  /** @internal */
  public readonly state: Readonly<ToolSettingsZoneState> = {
    toolSettingsZoneContent: ToolSettingsZoneContent.ToolSettings,
    isPopoverOpen: false,
    isNestedPopoverOpen: false,
    toolId: "",
  };

  constructor(props: ToolSettingsZoneProps) {
    super(props);

    this._toolSettingsLabel = UiFramework.translate("general.toolSettings");
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
    const title = ToolUiManager.activeToolDescription + " " + this._toolSettingsLabel;
    if (this.state.toolSettingsZoneContent === ToolSettingsZoneContent.Closed)
      return (
        <ToolSettingsTab
          onClick={this._processClick}
          onKeyDown={this._handleKeyDown}
          title={title}
          onMouseEnter={UiShowHideManager.handleWidgetMouseEnter}
        >
          {this.getToolSettingsButton()}
        </ToolSettingsTab>
      );

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
        <i className="icon icon-settings" />
      );
    }

    return button;
  }
}
