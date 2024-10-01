/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import * as React from "react";
import { Size } from "@itwin/core-react";
import type { PopupPropsBase } from "../popup/PopupManager.js";
import { PopupManager } from "../popup/PopupManager.js";
import { MenuButton } from "./MenuButton.js";
import type { SizeProps } from "../utils/SizeProps.js";

/** @public */
export interface MenuButtonPopupProps extends PopupPropsBase {
  content: React.ReactNode;
}

interface MenuButtonPopupState {
  size: Size;
}

/** Popup component for Menu Buttons
 * @public
 */
export class MenuButtonPopup extends React.PureComponent<
  MenuButtonPopupProps,
  MenuButtonPopupState
> {
  public override readonly state = {
    size: new Size(-1, -1),
  };

  private _onSizeKnown = (newSize: SizeProps) => {
    if (!this.state.size.equals(newSize))
      this.setState({ size: Size.create(newSize) });
  };

  public override render() {
    const point = PopupManager.getPopupPosition(
      this.props.el,
      this.props.pt,
      this.props.offset,
      this.state.size
    );

    return (
      <MenuButton
        key={this.props.id}
        point={point}
        onSizeKnown={this._onSizeKnown}
      >
        {this.props.content}
      </MenuButton>
    );
  }
}
