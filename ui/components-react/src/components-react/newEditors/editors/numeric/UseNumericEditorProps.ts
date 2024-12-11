/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { ConcreteEditorProps, EditorProps } from "../../Types.js";
import type { NumericValue, Value } from "../../values/Values.js";
import { isNumericValue } from "../../values/Values.js";

/**
 *
 */
export function useNumericEditorProps({
  value,
  onChange,
  ...rest
}: EditorProps): ConcreteEditorProps<NumericValue> {
  return {
    ...rest,
    value: getNumericValue(value),
    onChange,
  };
}

function getNumericValue(value: Value | undefined): NumericValue {
  return value && isNumericValue(value)
    ? value
    : { rawValue: undefined, displayValue: "" };
}
