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
import { PropertyRecordEditor } from "@itwin/components-react";
import { DivWithOutsideClick } from "@itwin/core-react";
import type { PopupPropsBase } from "./PopupManager.js";
import { PopupManager } from "./PopupManager.js";
import { PositionPopup, PositionPopupContent } from "./PositionPopup.js";
import type { SizeProps } from "../utils/SizeProps.js";
import { useMemo } from "react";
import { useToolSettingsNewEditors } from "../preview/tool-settings-new-editors/useToolSettingsNewEditors.js";

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

/** Popup component for Input Editor
 * @alpha
 */
export function InputEditorPopup(props: InputEditorPopupProps) {
  const { id, el, pt, offset, record, commitHandler, onCancel } = props;
  const [size, setSize] = React.useState<SizeProps>({ width: -1, height: -1 });
  const newEditors = useToolSettingsNewEditors();

  const _onSizeKnown = (newSize: SizeProps) => {
    if (newSize.height === size.height && newSize.width === size.width) return;
    setSize(newSize);
  };

  const point = useMemo(
    () => PopupManager.getPopupPosition(el, pt, offset, size),
    [el, pt, offset, size]
  );

  return (
    <PositionPopup key={id} point={point} onSizeKnown={_onSizeKnown}>
      {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
      <DivWithOutsideClick onOutsideClick={onCancel}>
        <PositionPopupContent>
          <PropertyRecordEditor
            propertyRecord={record}
            onCommit={commitHandler.handleCommit}
            onCancel={onCancel}
            setFocus={true}
            // eslint-disable-next-line @typescript-eslint/no-deprecated
            editorSystem={newEditors ? "new" : "legacy"}
          />
        </PositionPopupContent>
      </DivWithOutsideClick>
    </PositionPopup>
  );
}
