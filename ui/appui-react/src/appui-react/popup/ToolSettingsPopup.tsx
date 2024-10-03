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
import { DivWithOutsideClick } from "@itwin/core-react";
import { FocusTrap, Point } from "@itwin/core-react/internal";
import { CursorPopup } from "../cursor/cursorpopup/CursorPopup.js";
import type { PopupPropsBase } from "./PopupManager.js";
import { PopupManager } from "./PopupManager.js";
import { PositionPopup, PositionPopupContent } from "./PositionPopup.js";
import { ComponentGenerator } from "../uiprovider/ComponentGenerator.js";
import { DialogGridContainer } from "../uiprovider/DefaultDialogGridContainer.js";
import type { SizeProps } from "../utils/SizeProps.js";

/** Props for defining a popup tool settings component
 * @beta */
export interface ToolSettingsPopupProps extends PopupPropsBase {
  dataProvider: DialogLayoutDataProvider;
  relativePosition: RelativePosition;
  orientation: Orientation;
  onCancel: OnCancelFunc;
}

interface ToolSettingsPopupState {
  size: SizeProps;
}

/** Popup component for Tool Settings
 * @beta
 */
export class ToolSettingsPopup extends React.PureComponent<
  ToolSettingsPopupProps,
  ToolSettingsPopupState
> {
  public override readonly state = {
    size: { width: -1, height: -1 },
  };

  constructor(props: ToolSettingsPopupProps) {
    super(props);
  }

  private _onSizeKnown = (newSize: SizeProps) => {
    if (
      newSize.height === this.state.size.height &&
      newSize.width === this.state.size.width
    )
      return;
    this.setState({ size: newSize });
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
