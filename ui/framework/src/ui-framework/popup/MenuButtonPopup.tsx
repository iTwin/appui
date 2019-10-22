/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Popup */

import * as React from "react";

import { SizeProps, Size } from "@bentley/ui-core";

import { PopupManager, PopupPropsBase } from "./PopupManager";
import { MenuButton } from "../accudraw/MenuButton";

/** @alpha */
export interface MenuButtonPopupProps extends PopupPropsBase {
  content: React.ReactNode;
}

/** @internal */
interface MenuButtonPopupState {
  size: Size;
}

/** Popup component for Menu Buttons
 * @alpha
 */
export class MenuButtonPopup extends React.PureComponent<MenuButtonPopupProps, MenuButtonPopupState> {
  /** @internal */
  public readonly state = {
    size: new Size(-1, -1),
  };

  private _onSizeKnown = (newSize: SizeProps) => {
    // istanbul ignore else
    if (!this.state.size.equals(newSize))
      this.setState({ size: Size.create(newSize) });
  }

  /** @internal */
  public render() {
    const point = PopupManager.getPopupPosition(this.props.el, this.props.pt, this.props.offset, this.state.size);

    return (
      <MenuButton key={this.props.id}
        point={point}
        onSizeKnown={this._onSizeKnown}
      >
        {this.props.content}
      </MenuButton>
    );
  }
}
