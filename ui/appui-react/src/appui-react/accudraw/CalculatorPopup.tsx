/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import * as React from "react";
import type { OnCancelFunc, OnNumberCommitFunc } from "@itwin/appui-abstract";
import { DivWithOutsideClick, Icon } from "@itwin/core-react";
import type { PopupPropsBase } from "../popup/PopupManager.js";
import { PopupManager } from "../popup/PopupManager.js";
import { PositionPopup, PositionPopupContent } from "../popup/PositionPopup.js";
import { Calculator } from "./Calculator.js";
import type { SizeProps } from "../utils/SizeProps.js";
import { AccuDrawPopupManager } from "./AccuDrawPopupManager.js";

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
  size: SizeProps;
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
    size: { width: -1, height: -1 },
  };

  private _onSizeKnown = (newSize: SizeProps) => {
    if (
      newSize.height === this.state.size.height &&
      newSize.width === this.state.size.width
    )
      return;
    this.setState({ size: newSize });
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
