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
import { QuantityInput } from "./QuantityInput.js";

/* v8 ignore start */

/**
 * Editor specification for quantity values based on `IModelApp.quantityFormatter`.
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

function QuantityEditor({
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
  const handleChange = (newValue?: NumericValue) => {
    onChange(newValue, () => {
      if (
        newValue?.rawValue !== undefined &&
        (minimumValue !== undefined || maximumValue !== undefined)
      ) {
        const clamped = applyConstraints(
          newValue.rawValue,
          minimumValue,
          maximumValue
        );
        if (clamped !== newValue?.rawValue) {
          const formatted =
            defaultFormatter?.applyFormatting(clamped) ?? `${clamped}`;
          return { ...newValue, rawValue: clamped, displayValue: formatted };
        }
      }
      return newValue;
    });
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

function applyConstraints(
  numberValue: number,
  minimumValue?: number,
  maximumValue?: number
): number {
  let clamped = numberValue;
  if (minimumValue !== undefined) {
    clamped = Math.max(clamped, minimumValue);
  }
  if (maximumValue !== undefined) {
    clamped = Math.min(clamped, maximumValue);
  }
  return clamped;
}
