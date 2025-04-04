/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { StandardEditorNames } from "@itwin/appui-abstract";
import type { EditorProps, EditorSpec } from "../../Types.js";
import { createEditorSpec } from "../../Types.js";
import type { OldEditorMetadata } from "../Metadata.js";
import { isOldEditorMetadata } from "../Metadata.js";
import type { NumericValue } from "../../values/Values.js";
import {
  useInputEditorSizeParams,
  useRangeEditorParams,
} from "./UseEditorParams.js";
import { Input } from "@itwin/itwinui-react";
import { isNumeric } from "../../values/ValueUtilities.js";

/* v8 ignore start */

/** @internal */
export const NumericInputEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is OldEditorMetadata =>
    isOldEditorMetadata(metadata) &&
    metadata.type === "number" &&
    metadata.preferredEditor === StandardEditorNames.NumericInput,
  isValueSupported: isNumeric,
  Editor: NumericInputEditor,
});

function NumericInputEditor({
  metadata,
  value,
  onChange,
  size,
  disabled,
}: EditorProps<OldEditorMetadata, NumericValue>) {
  const sizeParams = useInputEditorSizeParams(metadata);
  const rangeParams = useRangeEditorParams(metadata);
  const handleChange = (newValue: string) => {
    onChange({
      displayValue: newValue,
      rawValue: parseFloat(newValue),
    });
  };

  const style: React.CSSProperties | undefined =
    sizeParams?.size !== undefined
      ? {
          minWidth: `${sizeParams?.size * 0.75}em`,
        }
      : undefined;

  const inputProps = useNumericInput({
    min: rangeParams?.minimum,
    max: rangeParams?.maximum,
    precision: rangeParams?.precision,
    step: rangeParams?.step,
    maxLength: sizeParams?.maxLength,
    onChange: handleChange,
    value: value?.displayValue ?? "",
  });

  return (
    <Input style={style} size={size} disabled={disabled} {...inputProps} />
  );
}

interface UseNumericInputProps {
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  maxLength?: number;
  value: string;
  onChange: (newValue: string) => void;
}

function useNumericInput({
  min,
  max,
  step,
  precision,
  maxLength,
  value,
  onChange,
}: UseNumericInputProps) {
  const formatValue = (val: number) => {
    const appliedMin = min ?? Number.MIN_VALUE;
    const appliedMax = max ?? Number.MAX_VALUE;
    const valueInRange = Math.min(appliedMax, Math.max(appliedMin, val));

    return precision
      ? valueInRange.toFixed(precision)
      : valueInRange.toString();
  };

  const [formattedValue, setFormattedValue] = React.useState(() => {
    return value.length !== 0 ? formatValue(Number(value)) : value;
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    if (maxLength && currentValue.length > maxLength) {
      return;
    }
    setFormattedValue(currentValue);
    onChange(currentValue);
  };

  const handleBlur = () => {
    if (precision) {
      const newFormattedValue = formatValue(Number(formattedValue));
      if (newFormattedValue !== formattedValue) {
        setFormattedValue(newFormattedValue);
        onChange(newFormattedValue);
      }
    }
  };

  return {
    type: "number",
    min,
    max,
    step,
    value: formattedValue,
    onChange: handleChange,
    onBlur: handleBlur,
  };
}

/* v8 ignore stop */
