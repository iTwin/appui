/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import * as React from "react";
import { type QuantityTypeArg } from "@itwin/core-frontend";
import { useQuantityInfo } from "./UseQuantityInfo.js";
import {
  createEditorSpec,
  type EditorProps,
  type EditorSpec,
  type NumericValue,
  type NumericValueMetadata,
  ValueUtilities,
} from "@itwin/components-react";
import { applyNumericConstraints } from "@itwin/components-react/internal";
import { QuantityInput } from "./QuantityInput.js";

/* v8 ignore start */

/**
 * Editor specification for quantity values based on `IModelApp.quantityFormatter`.
 *
 * **Note:** value provided to `onChange` might have mismatching `displayValue` and `rawValue`.
 * This can happen when input is invalid, some examples:
 * - input is not numeric. input `abc` -> { `displayValue`: "abc", `rawValue`: undefined }
 * - input is smaller than property constraints. input: `2 in`,  minimumValue is `1 m` -> { `displayValue`: `2 in`, `rawValue`: 1 }
 * - input is larger than property constraints. input: `6 m`,  maximumValue is `5 m` -> { `displayValue`: `6 m`, `rawValue`: 5 }
 * @beta
 */
export const QuantityEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is QuantityValueMetadata =>
    metadata.type === "number" &&
    "quantityType" in metadata &&
    metadata.quantityType !== undefined,
  isValueSupported: ValueUtilities.isNumeric,
  Editor: QuantityEditor,
});

/**
 * Metadata for quantity values.
 * @beta
 */
export interface QuantityValueMetadata extends NumericValueMetadata {
  quantityType: QuantityTypeArg;
}

/** @internal */
export function QuantityEditor({
  metadata,
  value,
  onChange,
  size,
}: EditorProps<QuantityValueMetadata, NumericValue>) {
  const { defaultFormatter, highPrecisionFormatter, parser } = useQuantityInfo({
    type: metadata.quantityType,
  });
  const [isEditing, setEditing] = React.useState(false);
  const currentValue = value
    ? value
    : { rawValue: undefined, displayValue: "" };

  const { minimumValue, maximumValue } = metadata.constraints ?? {
    minimumValue: undefined,
    maximumValue: undefined,
  };
  const handleChange = (newValue: NumericValue) => {
    if (!newValue?.rawValue) {
      onChange(newValue);
      return;
    }
    onChange({
      ...newValue,
      rawValue: applyNumericConstraints({
        value: newValue.rawValue,
        min: minimumValue,
        max: maximumValue,
      }),
    });
    return;
  };

  return (
    <QuantityInput
      value={currentValue}
      onChange={handleChange}
      size={size}
      formatter={isEditing ? highPrecisionFormatter : defaultFormatter}
      parser={parser}
      onBlur={() => setEditing(false)}
      onFocus={() => setEditing(true)}
    />
  );
}

/* v8 ignore stop */
