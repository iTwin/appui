/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module SplitButton
 */

import "./SplitButton.scss";
import classnames from "classnames";
import * as React from "react";
import { ContextMenu } from "../contextmenu/ContextMenu";
import { Icon, IconSpec } from "../icons/IconComponent";
import { CommonProps } from "../utils/Props";

// TODO: implement
/** @internal */
export enum SplitButtonActionType {
  ContextMenu,
  List,
}

/** Properties for [[SplitButton]] component
 * @public
 */
export interface SplitButtonProps extends CommonProps {
  /** Label to display in click area. */
  label: string | React.ReactNode;
  /** Listens for click events on button area */
  onClick?: (event: any) => any;
  /** Specifies icon for Splitbutton component */
  icon?: IconSpec;
  /** Indicates whether to draw a border around the button */
  drawBorder?: boolean;
}

/** @internal */
interface SplitButtonState {
  expanded: boolean;
}

/**
 * SplitButton with an action button on the left and an arrow button that displays a context menu on the right.
 * @public
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
        <Icon iconSpec={this.props.icon} />
      );
    }

    const classNames = classnames(
      "core-split-button",
      this.props.className,
      this.state.expanded && "expanded",
      this.props.drawBorder && "core-split-button-border");

    return (
      <div data-testid="core-split-button-root"
        className={classNames}
        style={this.props.style}
      >
        <div data-testid="core-split-button-label" onClick={this.props.onClick} className={"core-split-button-label"}>{icon} {this.props.label}</div>
        <div className={classnames("core-split-button-divider", this.props.drawBorder && "core-split-button-border")} />
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
    // istanbul ignore else
    if (!this.state.expanded && !this._closing) {
      this.setState(
        { expanded: true },
        () => {
          // istanbul ignore else
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
    // istanbul ignore else
    if (this._arrowElement) {
      if (this.state.expanded && "target" in event && this._arrowElement.contains(event.target))
        this._closing = true;
      this.setState((_prevState) => ({ expanded: false }));
      this._arrowElement.focus();
    }
  }
}
