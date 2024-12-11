/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { StandardEditorNames } from "@itwin/appui-abstract";
import { WeightPickerButton } from "../lineweight/WeightPickerButton.js";
import type { ConcreteEditorProps } from "@itwin/components-react";
import {
  type EditorProps,
  type EditorSpec,
  isNumericValue,
  type NumericValue,
} from "@itwin/components-react";

export const WeightEditorSpec: EditorSpec = {
  applies: (metadata) =>
    metadata.type === "number" &&
    metadata.preferredEditor === StandardEditorNames.WeightPicker,
  Editor: NewWeightEditor,
};

/**
 *
 */
export function NewWeightEditor(props: EditorProps) {
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

function useWeightEditorProps({
  value,
  onChange,
  ...props
}: EditorProps): ConcreteEditorProps<NumericValue> {
  return {
    ...props,
    value:
      value === undefined || !isNumericValue(value)
        ? { rawValue: 0, displayValue: "" }
        : value,
    onChange,
  };
}
