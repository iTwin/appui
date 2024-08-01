/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import * as React from "react";
import type { OnCancelFunc, OnNumberCommitFunc } from "@itwin/appui-abstract";
import { DivWithOutsideClick, Icon, Size } from "@itwin/core-react";
import type { PopupPropsBase } from "../popup/PopupManager";
import { PopupManager } from "../popup/PopupManager";
import { PositionPopup, PositionPopupContent } from "../popup/PositionPopup";
import { Calculator } from "./Calculator";
import type { SizeProps } from "../utils/SizeProps";
import { AccuDrawPopupManager } from "./AccuDrawPopupManager";

/**
 * @public
 * @deprecated in 4.16.0. Props of deprecated component {@link CalculatorPopup}.
 */
export interface CalculatorPopupProps extends PopupPropsBase {
  initialValue: number;
  resultIcon: string;
  onOk: OnNumberCommitFunc;
  onCancel: OnCancelFunc;
}

interface CalculatorPopupState {
  size: Size;
}

/** Popup component for Calculator
 * @public
 * @deprecated in 4.16.0. Use {@link Calculator} component with {@link https://itwinui.bentley.com/docs/popover iTwinUI Popover} or {@link AccuDrawPopupManager.showCalculator} method instead.
 */
export class CalculatorPopup extends React.PureComponent<
  // eslint-disable-next-line deprecation/deprecation
  CalculatorPopupProps,
  CalculatorPopupState
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
      <PositionPopup
        key={this.props.id}
        point={point}
        className="uifw-calculator-host"
        onSizeKnown={this._onSizeKnown}
      >
        {/* eslint-disable-next-line deprecation/deprecation */}
        <DivWithOutsideClick onOutsideClick={this.props.onCancel}>
          <PositionPopupContent>
            <Calculator
              initialValue={this.props.initialValue}
              resultIcon={
                // eslint-disable-next-line deprecation/deprecation
                <Icon iconSpec={this.props.resultIcon} />
              }
              onOk={this.props.onOk}
              onCancel={this.props.onCancel}
            />
          </PositionPopupContent>
        </DivWithOutsideClick>
      </PositionPopup>
    );
  }
}
