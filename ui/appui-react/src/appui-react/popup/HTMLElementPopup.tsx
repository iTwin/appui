/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Popup
 */

import * as React from "react";
import type { OnCancelFunc, RelativePosition } from "@itwin/appui-abstract";
import type { Orientation } from "@itwin/components-react";
import {
  DivWithOutsideClick,
  MessageRenderer,
  Point,
  Size,
} from "@itwin/core-react";
import { CursorPopup } from "../cursor/cursorpopup/CursorPopup";
import type { PopupPropsBase } from "./PopupManager";
import { PopupManager } from "./PopupManager";
import { PositionPopup } from "./PositionPopup";
import type { SizeProps } from "../utils/SizeProps";

/** @alpha
 * @deprecated in 4.11.0. Please use {@link @itwin/appui-react#UiFramework.showComponent}.
 */
export interface HTMLElementPopupProps extends PopupPropsBase {
  element: HTMLElement;
  relativePosition: RelativePosition;
  orientation: Orientation;
  onCancel: OnCancelFunc;
}

/** @internal */
interface HTMLElementPopupState {
  size: Size;
}

/** Popup component for HTMLElement
 * @alpha
 * @deprecated in 4.11.0. Though this is alpha, the main interface to using it is not. Please use {@link @itwin/appui-react#UiFramework.showComponent}.
 */
export class HTMLElementPopup extends React.PureComponent<
  // eslint-disable-next-line deprecation/deprecation
  HTMLElementPopupProps,
  HTMLElementPopupState
> {
  public override readonly state = {
    size: new Size(-1, -1),
  };

  private _onSizeKnown = (newSize: SizeProps) => {
    if (!this.state.size.equals(newSize))
      this.setState({ size: Size.create(newSize) });
  };

  public override render() {
    let point = PopupManager.getPopupPosition(
      this.props.el,
      this.props.pt,
      new Point(),
      this.state.size
    );
    const popupRect = CursorPopup.getPopupRect(
      point,
      this.props.offset,
      this.state.size,
      this.props.relativePosition
    );
    point = new Point(popupRect.left, popupRect.top);

    return (
      <PositionPopup
        key={this.props.id}
        className="uifw-no-border"
        point={point}
        onSizeKnown={this._onSizeKnown}
      >
        {/* eslint-disable-next-line deprecation/deprecation */}
        <DivWithOutsideClick onOutsideClick={this.props.onCancel}>
          {/* eslint-disable-next-line deprecation/deprecation */}
          <MessageRenderer message={this.props.element} />
        </DivWithOutsideClick>
      </PositionPopup>
    );
  }
}
