/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Input } from "@itwin/itwinui-react";
import type { EditorProps } from "../Types.js";
import type { NumericValueMetadata } from "../values/Metadata.js";
import type { NumericValue } from "../values/Values.js";
import {
  applyNumericConstraints,
  getNumericConstraints,
} from "../ConstraintUtils.js";
import { MERGED_VALUE } from "../values/ValueUtilities.js";

/* v8 ignore start */

/**
 * Numeric value editor that renders `Input` components for changing value.
 * @internal
 */
export function NumericEditor({
  metadata,
  value,
  onChange,
  size,
  disabled,
  id,
}: EditorProps<NumericValueMetadata, NumericValue>) {
  const currentValue = getNumericValue(value, metadata.isMerged);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <Input
      id={id}
      value={currentValue.displayValue}
      onChange={(e) => {
        const parsedValue = parseFloat(e.target.value);
        onChange({
          rawValue: Number.isNaN(parsedValue)
            ? undefined
            : applyNumericConstraints({
                ...getNumericConstraints(metadata.constraints),
                value: parsedValue,
              }),
          displayValue: e.target.value,
        });
      }}
      onFocus={handleFocus}
      size={size}
      disabled={disabled}
    />
  );
}

function getNumericValue(
  value: NumericValue | undefined,
  isMerged?: boolean
): NumericValue {
  return value
    ? value
    : { rawValue: undefined, displayValue: isMerged ? MERGED_VALUE : "" };
}

/* v8 ignore stop */
