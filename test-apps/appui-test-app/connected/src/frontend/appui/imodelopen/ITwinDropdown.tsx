/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./ITwinDropdown.scss";
import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";
import { RelativePosition } from "@itwin/appui-abstract";
import { Popup } from "@itwin/core-react";
import { ITwin } from "@itwin/itwins-client";

/** Properties for the [[ITwinDropdown]] component */
export interface ITwinDropdownProps {
  numVisibleITwins?: number;
  recentITwins?: ITwin[];
  currentITwin?: ITwin;
  onITwinClicked: (iTwin: ITwin) => any;
}

interface ITwinDropdownState {
  isDropdownOpen: boolean;
  showITwinsDialog: boolean;
}

/**
 * List of iTwins in a dropdown
 */
export class ITwinDropdown extends React.Component<
  ITwinDropdownProps,
  ITwinDropdownState
> {
  private _itemHeight: number = 3.25; // each item (iTwin) height is (n-em) in the dropdown
  private _target: HTMLElement | null = null;

  public static defaultProps: Partial<ITwinDropdownProps> = {
    numVisibleITwins: 5, // default number of visible iTwin to 5
  };

  constructor(props: ITwinDropdownProps, context?: any) {
    super(props, context);
    this.state = { isDropdownOpen: false, showITwinsDialog: false };
  }

  private _onItemClick(iTwin: ITwin) {
    this.closeDropdown();
    this.props.onITwinClicked(iTwin);
  }

  private _onKeyUp(event: React.KeyboardEvent, iTwin: ITwin) {
    const key = event.key;

    switch (key) {
      case Key.Enter:
      case " ":
        this.closeDropdown();
        this.props.onITwinClicked(iTwin);
        break;
    }
  }

  private _onSplitterKeyUp(event: React.KeyboardEvent) {
    const key = event.key;

    switch (key) {
      case Key.Enter:
      case " ":
        this.setState((prevState) => ({
          isDropdownOpen: !prevState.isDropdownOpen,
        }));
        break;
    }
  }

  private _onITwinSelected = (iTwin: ITwin) => {
    this.closeDialog();
    this.props.onITwinClicked(iTwin);
  };

  private _splitterClicked = (_event: React.MouseEvent<HTMLElement>) => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };

  private _handleOnOutsideClick = () => {
    this.closeDropdown();
  };

  private closeDropdown() {
    this.setState({ isDropdownOpen: false });
  }

  private closeDialog() {
    this.setState({ showITwinsDialog: false });
  }

  private getITwins(): ITwin[] {
    if (this.props.recentITwins) {
      return this.props.recentITwins;
    }
    return [];
  }

  private renderITwins() {
    const iTwins: ITwin[] = this.getITwins();
    const ulStyle: React.CSSProperties = {
      height: `${this.props.numVisibleITwins! * this._itemHeight}em`,
    };
    const liStyle: React.CSSProperties = {
      height: `${this._itemHeight}em`,
    };

    if (iTwins && iTwins.length === 0) {
      return (
        <div className="ip-no-mru" style={ulStyle}>
          <p>Most recently used iTwins appear here.</p>
        </div>
      );
    } else {
      return (
        <ul style={ulStyle}>
          {iTwins &&
            iTwins.map((iTwin: ITwin, i: number) => (
              <div
                style={liStyle}
                key={i}
                onClick={() => this._onItemClick(iTwin)}
                onKeyUp={(e) => this._onKeyUp(e, iTwin)}
                role="button"
                tabIndex={0}
              >
                <span className="ip-icon icon icon-placeholder" />
                <div className="ip-details">
                  <span>{iTwin.class}</span>
                  <span>{iTwin.displayName}</span>
                </div>
              </div>
            ))}
        </ul>
      );
    }
  }

  private renderDropdown() {
    return (
      <Popup
        isOpen={this.state.isDropdownOpen}
        position={RelativePosition.Bottom}
        onClose={this._handleOnOutsideClick}
        target={this._target}
      >
        <div className="ip-dropdown">{this.renderITwins()}</div>
      </Popup>
    );
  }

  public override render() {
    const splitterClassName = classnames(
      "ip-splitter icon icon-chevron-down",
      this.state.isDropdownOpen && "opened"
    );
    return (
      <div className="ip">
        <div
          className="ip-content"
          onClick={this._splitterClicked}
          onKeyUp={(e) => this._onSplitterKeyUp(e)}
          ref={(element) => {
            this._target = element;
          }}
          role="button"
          tabIndex={0}
        >
          <div>
            <span className="number">
              {this.props.currentITwin ? this.props.currentITwin.number : ""}
            </span>
            <span className="name">
              {this.props.currentITwin
                ? this.props.currentITwin.displayName
                : ""}
            </span>
          </div>
          <span className={splitterClassName} />
        </div>
        <div className="ip-highlight" />
        {this.renderDropdown()}
      </div>
    );
  }
}
