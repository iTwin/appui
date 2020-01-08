/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @module SplitButton */

import * as React from "react";
import classnames from "classnames";

import { ContextMenu } from "../contextmenu/ContextMenu";
import { CommonProps } from "../utils/Props";

import "./SplitButton.scss";

// TODO: implement
/** @internal */
export enum SplitButtonActionType {
  ContextMenu,
  List,
}

/** Properties for [[SplitButton]] component
 * @beta
 */
export interface SplitButtonProps extends CommonProps {
  /** Label to display in click area. */
  label: string | React.ReactNode;
  /** Listens for click events on button area */
  onClick?: (event: any) => any;
  /** specifies icon for Splitbutton component */
  icon?: string;
}

/** @internal */
interface SplitButtonState {
  expanded: boolean;
}

/**
 * SplitButton with a button on the left and a context menu on the right.
 * @beta
 */
export class SplitButton extends React.Component<SplitButtonProps, SplitButtonState> {
  private _arrowElement: HTMLElement | null = null;
  private _menu: ContextMenu | null = null;
  private _closing: boolean = false;

  /** @internal */
  public readonly state: Readonly<SplitButtonState> = { expanded: false };

  constructor(props: SplitButtonProps) {
    super(props);
  }

  public render(): JSX.Element {
    let icon = (<></>);
    if (this.props.icon !== undefined) {
      icon = (
        <span className={classnames("icon", this.props.icon)} />
      );
    }
    return (
      <div data-testid="core-split-button-root"
        className={classnames("core-split-button", this.props.className, { expanded: this.state.expanded })}
        style={this.props.style}
      >
        <div data-testid="core-split-button-label" onClick={this.props.onClick} className={"core-split-button-label"}>{icon} {this.props.label}</div>
        <div className={"core-split-button-arrow"} ref={(el) => { this._arrowElement = el; }} onClick={this._handleClick} tabIndex={0} onKeyUp={this._handleKeyUp}>
          <div className={classnames("core-split-button-arrow-icon", "icon", "icon-chevron-down")} >
          </div>
          <ContextMenu
            ref={(el) => { this._menu = el; }}
            selectedIndex={0}
            onSelect={this._handleClose}
            onOutsideClick={this._handleClose}
            onEsc={this._handleClose}
            opened={this.state.expanded}
            autoflip={false}>
            {this.props.children}
          </ContextMenu>
        </div>
      </div>
    );
  }

  private _handleKeyUp = (event: any) => {
    if ((event.keyCode === 13 /*<Return>*/ || event.keyCode === 40 /*<Down>*/) && !this.state.expanded) {
      this._closing = false;
      this._open();
    }
  }

  private _open = () => {
    if (!this.state.expanded && !this._closing) {
      this.setState(
        { expanded: true },
        () => {
          if (this._menu && this.state.expanded)
            this._menu.focus();
        });
    } else {
      this._closing = false;
    }
  }

  private _handleClick = (event: any) => {
    if (this.state.expanded) {
      event.stopPropagation();
      this.setState({ expanded: false });
    } else {
      this._open();
    }
  }

  private _handleClose = (event: any) => {
    if (this._arrowElement) {
      if (this.state.expanded && "target" in event && this._arrowElement.contains(event.target))
        this._closing = true;
      this.setState((_prevState) => ({ expanded: false }));
      this._arrowElement.focus();
    }
  }
}
