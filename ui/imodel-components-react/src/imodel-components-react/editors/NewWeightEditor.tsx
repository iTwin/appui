import * as React from "react";
import { StandardEditorNames } from "@itwin/appui-abstract";
import { WeightPickerButton } from "../lineweight/WeightPickerButton.js";
import {
  type EditorProps,
  type EditorSpec,
  isNumericValue,
  type NumericValue,
  type SpecificEditorProps,
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
}: EditorProps): SpecificEditorProps<NumericValue> {
  return {
    ...props,
    value:
      value === undefined || !isNumericValue(value)
        ? { rawValue: 0, displayValue: "" }
        : value,
    onChange,
  };
}
