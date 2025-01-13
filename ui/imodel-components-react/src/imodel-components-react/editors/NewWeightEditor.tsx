/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { StandardEditorNames } from "@itwin/appui-abstract";
import { WeightPickerButton } from "../lineweight/WeightPickerButton.js";
import {
  type EditorProps,
  type EditorSpec,
  type NumericValue,
  Value,
} from "@itwin/components-react";

/**
 * Editor specification for weight editor.
 * @beta
 */
export const WeightEditorSpec: EditorSpec = {
  applies: (metadata) =>
    metadata.type === "number" &&
    metadata.preferredEditor === StandardEditorNames.WeightPicker,
  Editor: WeightEditor,
};

function WeightEditor(props: EditorProps) {
  const { value, onChange, onFinish } = useWeightEditorProps(props);
  const activeWeight = value.rawValue ?? 0;

  return (
    <WeightPickerButton
      activeWeight={activeWeight}
      onLineWeightPick={(newWeight) => {
        const newValue = { rawValue: newWeight, displayValue: "" };
        onChange(newValue);
        onFinish();
      }}
      onBlur={() => onFinish()}
    />
  );
}

function useWeightEditorProps({ value, onChange, ...props }: EditorProps): Omit<
  EditorProps<NumericValue>,
  "value"
> & {
  value: NumericValue;
} {
  return {
    ...props,
    value:
      value === undefined || !Value.isNumericValue(value)
        ? { rawValue: 0, displayValue: "" }
        : value,
    onChange,
  };
}
