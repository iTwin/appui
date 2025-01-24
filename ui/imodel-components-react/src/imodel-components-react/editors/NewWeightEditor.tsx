/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { StandardEditorNames } from "@itwin/appui-abstract";
import { WeightPickerButton } from "../lineweight/WeightPickerButton.js";
import type { ValueMetadata } from "@itwin/components-react";
import {
  createEditorSpec,
  type EditorProps,
  type EditorSpec,
  type NumericValue,
  Value,
} from "@itwin/components-react";

/**
 * Editor specification for weight editor.
 * @beta
 */
export const WeightEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: (_metadata): _metadata is ValueMetadata => true,
  isValueSupported: Value.isNumeric,
  applies: (metadata) =>
    metadata.type === "number" &&
    metadata.preferredEditor === StandardEditorNames.WeightPicker,
  Editor: WeightEditor,
});

function WeightEditor({
  value,
  onChange,
  commit,
}: EditorProps<ValueMetadata, NumericValue>) {
  const currentValue = value ? value : { rawValue: 0, displayValue: "" };

  return (
    <WeightPickerButton
      activeWeight={currentValue.rawValue ?? 0}
      onLineWeightPick={(newWeight) => {
        const newValue = { rawValue: newWeight, displayValue: "" };
        onChange(newValue);
        commit?.();
      }}
    />
  );
}
