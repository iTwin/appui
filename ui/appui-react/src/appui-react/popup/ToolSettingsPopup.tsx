/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Popup
 */

import * as React from "react";
import { Key } from "ts-key-enum";
import type {
  DialogLayoutDataProvider,
  OnCancelFunc,
  RelativePosition,
} from "@itwin/appui-abstract";
import type { Orientation } from "@itwin/components-react";
import { DivWithOutsideClick, FocusTrap, Point, Size } from "@itwin/core-react";
import { CursorPopup } from "../cursor/cursorpopup/CursorPopup";
import type { PopupPropsBase } from "./PopupManager";
import { PopupManager } from "./PopupManager";
import { PositionPopup, PositionPopupContent } from "./PositionPopup";
import { ComponentGenerator } from "../uiprovider/ComponentGenerator";
import { DialogGridContainer } from "../uiprovider/DefaultDialogGridContainer";
import type { SizeProps } from "../utils/SizeProps";

/** Props for defining a popup tool settings component
 * @beta */
export interface ToolSettingsPopupProps extends PopupPropsBase {
  dataProvider: DialogLayoutDataProvider;
  relativePosition: RelativePosition;
  orientation: Orientation;
  onCancel: OnCancelFunc;
}

/** @internal */
interface ToolSettingsPopupState {
  size: Size;
}

/** Popup component for Tool Settings
 * @beta
 */
export class ToolSettingsPopup extends React.PureComponent<
  ToolSettingsPopupProps,
  ToolSettingsPopupState
> {
  /** @internal */
  public override readonly state = {
    size: new Size(-1, -1),
  };

  constructor(props: ToolSettingsPopupProps) {
    super(props);
  }

  private _onSizeKnown = (newSize: SizeProps) => {
    if (!this.state.size.equals(newSize))
      this.setState({ size: Size.create(newSize) });
  };

  private _handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case Key.Escape.valueOf():
        if (this.props.onCancel) this.props.onCancel();
        break;
    }
  };

  public override render() {
    const componentGenerator = new ComponentGenerator(
      this.props.dataProvider,
      this.props.onCancel
    );
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
        point={point}
        onSizeKnown={this._onSizeKnown}
      >
        {/* eslint-disable-next-line deprecation/deprecation */}
        <DivWithOutsideClick
          onOutsideClick={this.props.onCancel}
          onKeyDown={this._handleKeyDown}
        >
          <PositionPopupContent>
            <FocusTrap active={true} returnFocusOnDeactivate={true}>
              {componentGenerator && (
                <DialogGridContainer componentGenerator={componentGenerator} />
              )}
            </FocusTrap>
          </PositionPopupContent>
        </DivWithOutsideClick>
      </PositionPopup>
    );
  }
}
