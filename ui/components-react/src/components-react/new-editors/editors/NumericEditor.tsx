/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Input } from "@itwin/itwinui-react";
import type { EditorProps } from "../Types.js";
import type { ValueMetadata } from "../values/Metadata.js";
import type { NumericValue } from "../values/Values.js";

/**
 * Numeric value editor that renders `Input` components for changing value.
 * @internal
 */
export function NumericEditor({
  value,
  onChange,
  commit,
  size,
  disabled,
}: EditorProps<ValueMetadata, NumericValue>) {
  const currentValue = getNumericValue(value);
  return (
    <Input
      value={currentValue.displayValue}
      onChange={(e) =>
        onChange({
          rawValue: parseFloat(e.target.value),
          displayValue: e.target.value,
        })
      }
      onBlur={commit}
      size={size}
      disabled={disabled}
    />
  );
}

function getNumericValue(value: NumericValue | undefined): NumericValue {
  return value ? value : { rawValue: undefined, displayValue: "" };
}
