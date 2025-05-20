/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { InputWithDecorations } from "@itwin/itwinui-react";
import type {
  EditorProps,
  NumericValue,
  ValueMetadata,
} from "@itwin/components-react";
import { createEditorSpec, ValueUtilities } from "@itwin/components-react";
import { LockButtonInputDecoration } from "../editors/LockProvider.js";

/* v8 ignore start */

/** @internal */
export const NumericEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is ValueMetadata =>
    metadata.type === "number",
  isValueSupported: ValueUtilities.isNumeric,
  Editor: NumericEditor,
});

function NumericEditor({
  value,
  onChange,
  size,
  disabled,
}: EditorProps<ValueMetadata, NumericValue>) {
  const currentValue = getNumericValue(value);
  return (
    <InputWithDecorations size={size}>
      <InputWithDecorations.Input
        value={currentValue.displayValue}
        onChange={(e) => {
          const parsedValue = parseFloat(e.target.value);
          onChange({
            rawValue: Number.isNaN(parsedValue)
              ? undefined
              : parseFloat(e.target.value),
            displayValue: e.target.value,
          });
        }}
        size={size}
        disabled={disabled}
      />
      <LockButtonInputDecoration />
    </InputWithDecorations>
  );
}

function getNumericValue(value: NumericValue | undefined): NumericValue {
  return value ? value : { rawValue: undefined, displayValue: "" };
}

/* v8 ignore stop */
