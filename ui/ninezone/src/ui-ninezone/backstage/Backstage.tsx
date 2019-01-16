/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Backstage */

import * as classnames from "classnames";
import * as React from "react";
import { CommonProps, NoChildrenProps } from "../utilities/Props";
import "./Backstage.scss";

/** Properties of [[Backstage]] component. */
export interface BackstageProps extends CommonProps, NoChildrenProps {
  /** Describes if the Backstage should be shown or not. */
  isOpen?: boolean;
  /** Backstage items and separators. See: [[BackstageItem]], [[BackstageSeparator]] */
  items?: React.ReactNode;
  /** Determine if a "ghosting" overlay is shown or not. */
  showOverlay?: boolean;
  /** Optional header content */
  header?: React.ReactNode;
  /** Optional footer content */
  footer?: React.ReactNode;
  /** Function called when backstage is closed. */
  onClose?: () => void;
}

/** Backstage component of 9-zone UI app. */
export class Backstage extends React.PureComponent<BackstageProps> {
  public static defaultProps: Partial<BackstageProps> = {
    showOverlay: true,
  };

  private _onClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  public componentDidMount(): void {
    document.body.addEventListener("keydown", this._onEsc, false);
  }

  public componentWillUnmount() {
    document.body.removeEventListener("keydown", this._onEsc, false);
  }

  private _onEsc = (event: KeyboardEvent): void => {
    if (this.props.isOpen) {
      if (event.key === "Escape") {
        this._onClose();
      }
    }
  }

  public render() {
    const overlayClassName = classnames("nz-backstage-backstage_Overlay", this.props.isOpen && "nz-open", this.props.showOverlay && "nz-show");
    const backstageClassName = classnames("nz-backstage-backstage", this.props.isOpen && "nz-open", this.props.className);
    return (
      <>
        <div className={overlayClassName} onClick={this._onClose} />
        <div className={backstageClassName}>
          {this.props.header &&
            <div className="nz-header">
              {this.props.header}
            </div>
          }
          <ul>
            {this.props.items}
          </ul>
          {this.props.footer &&
            <div className="nz-footer">
              {this.props.footer}
            </div>
          }
        </div>
      </>
    );
  }
}
