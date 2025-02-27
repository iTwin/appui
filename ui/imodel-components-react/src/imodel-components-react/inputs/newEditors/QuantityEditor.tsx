/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { type QuantityTypeArg } from "@itwin/core-frontend";
import { useQuantityInfo } from "./UseQuantityInfo.js";
import {
  createEditorSpec,
  type EditorProps,
  type EditorSpec,
  type NumericValue,
  Value,
  type ValueMetadata,
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
  isValueSupported: Value.isNumeric,
  Editor: QuantityEditor,
});

/**
 * Metadata for quantity values.
 * @beta
 */
export interface QuantityValueMetadata extends ValueMetadata {
  type: "number";
  quantityType: QuantityTypeArg;
}

function QuantityEditor({
  metadata,
  value,
  onChange,
  size,
}: EditorProps<QuantityValueMetadata, NumericValue>) {
  const { formatter, parser } = useQuantityInfo({
    type: metadata.quantityType,
  });
  const currentValue = value
    ? value
    : { rawValue: undefined, displayValue: "" };

  return (
    <QuantityInput
      value={currentValue}
      onChange={onChange}
      size={size}
      formatter={formatter}
      parser={parser}
    />
  );
}

/* v8 ignore stop */
