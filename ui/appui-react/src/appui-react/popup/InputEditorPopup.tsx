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
import { DivWithOutsideClick } from "@itwin/core-react";
import type { PopupPropsBase } from "./PopupManager.js";
import { PopupManager } from "./PopupManager.js";
import { PositionPopup, PositionPopupContent } from "./PositionPopup.js";
import type { SizeProps } from "../utils/SizeProps.js";

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
  size: SizeProps;
}

/** Popup component for Input Editor
 * @alpha
 */
export class InputEditorPopup extends React.PureComponent<
  InputEditorPopupProps,
  InputEditorPopupState
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
