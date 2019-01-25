/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module ConfigurableUi */

import * as React from "react";
import { connect } from "react-redux";
import { ModalDialogRenderer } from "../ModalDialogManager";
import { FrontstageComposer } from "../frontstage/FrontstageComposer";
import { ElementTooltip } from "../feedback/ElementTooltip";
import PointerMessage from "../messages/Pointer";
import { UiFramework } from "../UiFramework";
import { KeyboardShortcutManager } from "../keyboardshortcut/KeyboardShortcut";
import { KeyboardShortcutMenu } from "../keyboardshortcut/KeyboardShortcutMenu";

/** Properties for [[ConfigurableUiContent]] */
export interface ConfigurableUiContentProps {
  placeholder: string;
  appBackstage?: React.ReactNode;
}

function mapStateToProps(state: any) {
  const frameworkState = state[UiFramework.frameworkStateKey];  // since app sets up key, don't hard-code name
  // istanbul ignore if
  if (!frameworkState)
    return undefined;

  return { placeholder: frameworkState.configurableUiState.placeHolder };
}

const mapDispatch = {
};

/** The ConfigurableUiContent component is the high order component the pages specified using ConfigurableUi */
class ConfigurableUiContentClass extends React.Component<ConfigurableUiContentProps> {

  public constructor(props: ConfigurableUiContentProps) {
    super(props);
  }

  public componentDidMount() {
    window.addEventListener("keydown", this._handleKeyDown);

    KeyboardShortcutManager.setFocusToHome();
  }

  public componentWillUnmount() {
    window.removeEventListener("keydown", this._handleKeyDown);
  }

  public render(): JSX.Element | undefined {
    const wrapperStyle: React.CSSProperties = {
      position: "relative" as "relative",
      left: "0px",
      width: "100%",
      top: "0px",
      height: "100%",
      zIndex: 0,
      overflow: "hidden",
    };
    return (
      <div id="configurableui-wrapper" style={wrapperStyle} onMouseMove={this._handleMouseMove} >
        {this.props.appBackstage}
        <FrontstageComposer style={{ position: "relative", height: "100%" }} />
        <ModalDialogRenderer />
        <ElementTooltip />
        <PointerMessage />
        <KeyboardShortcutMenu />
      </div>
    );
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    const element = document.activeElement as HTMLElement;

    if (element === document.body && e.key !== "Escape") {
      KeyboardShortcutManager.processKey(e.key, e.altKey, e.ctrlKey, e.shiftKey);
    }
  }

  // private _handleFocusIn(e: Event): void {
  //   // tslint:disable-next-line:no-console
  //   console.log("focusin: ", e.target);
  // }

  private _handleMouseMove(e: React.MouseEvent): void {
    KeyboardShortcutManager.cursorX = e.clientX;
    KeyboardShortcutManager.cursorY = e.clientY;
  }
}

/** The ConfigurableUiContent component is the high order component the pages specified using ConfigurableUi */
export const ConfigurableUiContent = connect(mapStateToProps, mapDispatch)(ConfigurableUiContentClass); // tslint:disable-line:variable-name
