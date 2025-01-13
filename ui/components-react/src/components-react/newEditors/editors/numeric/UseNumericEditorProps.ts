/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { EditorProps, RequiredProps } from "../../Types.js";
import type { NumericValue } from "../../values/Values.js";
import { Value } from "../../values/Values.js";

/**
 * Hooks that converts generic `EditorProps` into editor props with numeric value. If value is not numeric, it will be converted into empty numeric value.
 * @beta
 */
export function useNumericEditorProps({
  value,
  onChange,
  ...rest
}: EditorProps): RequiredProps<EditorProps<NumericValue>, "value"> {
  return {
    ...rest,
    value: getNumericValue(value),
    onChange,
  };
}

function getNumericValue(value: Value | undefined): NumericValue {
  return value && Value.isNumericValue(value)
    ? value
    : { rawValue: undefined, displayValue: "" };
}
