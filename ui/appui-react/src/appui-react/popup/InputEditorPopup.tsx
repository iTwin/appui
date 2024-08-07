/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Popup
 */

import * as React from "react";
import type { Primitives, PropertyRecord } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import type { PropertyUpdatedArgs } from "@itwin/components-react";
import { EditorContainer } from "@itwin/components-react";
import { DivWithOutsideClick, Size } from "@itwin/core-react";
import type { PopupPropsBase } from "./PopupManager";
import { PopupManager } from "./PopupManager";
import { PositionPopup, PositionPopupContent } from "./PositionPopup";
import type { SizeProps } from "../utils/SizeProps";

/** @beta */
export class InputEditorCommitHandler {
  constructor(public readonly onCommit: (value: Primitives.Value) => void) {}

  public handleCommit = (args: PropertyUpdatedArgs) => {
    let newValue: Primitives.Value = 0;
    if (
      args.newValue.valueFormat === PropertyValueFormat.Primitive &&
      args.newValue.value !== undefined
    ) {
      newValue = args.newValue.value;
    }
    this.onCommit(newValue);
  };
}

/** Props for popup editor
 * @beta */
export interface InputEditorPopupProps extends PopupPropsBase {
  record: PropertyRecord;
  onCancel: () => void;
  commitHandler: InputEditorCommitHandler;
}

interface InputEditorPopupState {
  size: Size;
}

/** Popup component for Input Editor
 * @alpha
 */
export class InputEditorPopup extends React.PureComponent<
  InputEditorPopupProps,
  InputEditorPopupState
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
        onSizeKnown={this._onSizeKnown}
      >
        {/* eslint-disable-next-line deprecation/deprecation */}
        <DivWithOutsideClick onOutsideClick={this.props.onCancel}>
          <PositionPopupContent>
            <EditorContainer
              propertyRecord={this.props.record}
              onCommit={this.props.commitHandler.handleCommit}
              onCancel={this.props.onCancel}
              setFocus={true}
            />
          </PositionPopupContent>
        </DivWithOutsideClick>
      </PositionPopup>
    );
  }
}
