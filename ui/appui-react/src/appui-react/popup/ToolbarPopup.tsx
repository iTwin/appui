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
import { DivWithOutsideClick } from "@itwin/core-react";
import { FocusTrap, Point } from "@itwin/core-react/internal";
import type { Orientation } from "@itwin/components-react";
import {
  Direction,
  ToolbarOpacitySetting,
  ToolbarPanelAlignment,
} from "@itwin/components-react";
import { CursorPopup } from "../cursor/cursorpopup/CursorPopup.js";
import type { PopupPropsBase } from "./PopupManager.js";
import { PopupManager } from "./PopupManager.js";
import { PositionPopup } from "./PositionPopup.js";
import type { ToolbarItem } from "../toolbar/ToolbarItem.js";
import { Toolbar } from "../toolbar/Toolbar.js";
import { WrapperContext } from "../configurableui/ConfigurableUiContent.js";
import { mapToPlacement, type Placement } from "../utils/Placement.js";
import type { SizeProps } from "../utils/SizeProps.js";

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
  size: SizeProps;
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
    size: { width: -1, height: -1 },
  };

  private _onSizeKnown = (newSize: SizeProps) => {
    if (
      this.state.size.width === newSize.width &&
      this.state.size.height === newSize.height
    )
      return;
    this.setState({ size: newSize });
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
      // eslint-disable-next-line @typescript-eslint/no-deprecated
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
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
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
