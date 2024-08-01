/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Popup
 */

import * as React from "react";
import { Key } from "ts-key-enum";
import type { RelativePosition } from "@itwin/appui-abstract";
import type { RequireAtLeastOne } from "@itwin/core-bentley";
import { DivWithOutsideClick, FocusTrap, Point, Size } from "@itwin/core-react";
import type { Orientation } from "@itwin/components-react";
import {
  Direction,
  ToolbarOpacitySetting,
  ToolbarPanelAlignment,
} from "@itwin/components-react";
import { CursorPopup } from "../cursor/cursorpopup/CursorPopup";
import type { PopupPropsBase } from "./PopupManager";
import { PopupManager } from "./PopupManager";
import { PositionPopup } from "./PositionPopup";
import type { ToolbarItem } from "../toolbar/ToolbarItem";
import { Toolbar } from "../toolbar/Toolbar";
import { WrapperContext } from "../configurableui/ConfigurableUiContent";
import { mapToPlacement, type Placement } from "../utils/Placement";
import type { SizeProps } from "../utils/SizeProps";

/** Props for a popup toolbar
 * @beta
 */
export type ToolbarPopupProps = Omit<PopupPropsBase, "el"> & {
  items: ToolbarItem[];
  orientation: Orientation;
  onCancel: () => void;
  onItemExecuted: (item: any) => void;
  el?: HTMLElement;
} & RequireAtLeastOne<{
    /** @deprecated in 4.16.0. Use `placement` property instead. */
    relativePosition: RelativePosition;
    placement: Placement;
  }>;

interface ToolbarPopupState {
  size: Size;
}

/** Popup component for Toolbar
 * @beta
 */
export class ToolbarPopup extends React.PureComponent<
  ToolbarPopupProps,
  ToolbarPopupState
> {
  /** @internal */
  public static override contextType = WrapperContext;
  /** @internal */
  public declare context: React.ContextType<typeof WrapperContext>;

  public override readonly state = {
    size: new Size(-1, -1),
  };

  private _onSizeKnown = (newSize: SizeProps) => {
    if (!this.state.size.equals(newSize))
      this.setState({ size: Size.create(newSize) });
  };

  private _handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    switch (event.key) {
      case Key.Escape.valueOf():
        this._cancel();
        break;
    }
  };

  private _cancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  public override render() {
    let point = PopupManager.getPopupPosition(
      this.props.el ?? this.context,
      this.props.pt,
      new Point(),
      this.state.size
    );
    const popupRect = CursorPopup.getPopupRect(
      point,
      this.props.offset,
      this.state.size,
      // eslint-disable-next-line deprecation/deprecation
      this.props.placement ?? mapToPlacement(this.props.relativePosition)
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
        <DivWithOutsideClick
          onOutsideClick={this.props.onCancel}
          onKeyDown={this._handleKeyDown}
        >
          <FocusTrap active={true} returnFocusOnDeactivate={true}>
            <Toolbar
              expandsTo={Direction.Bottom}
              panelAlignment={ToolbarPanelAlignment.Start}
              items={this.props.items}
              useDragInteraction={true}
              toolbarOpacitySetting={ToolbarOpacitySetting.Defaults}
              onItemExecuted={this.props.onItemExecuted}
            />
          </FocusTrap>
        </DivWithOutsideClick>
      </PositionPopup>
    );
  }
}
