/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { EditorProps, RequiredProps } from "../../Types.js";
import type { BooleanValue, Value } from "../../values/Values.js";
import { isBooleanValue } from "../../values/Values.js";

/**
 * Hooks that converts generic `EditorProps` into editor props with boolean value. If value is not boolean, it will be converted into `false`.
 * @beta
 */
export function useBooleanEditorProps({
  value,
  onChange,
  ...rest
}: EditorProps): RequiredProps<EditorProps<BooleanValue>, "value"> {
  return {
    ...rest,
    value: getBooleanValue(value),
    onChange,
  };
}

function getBooleanValue(value: Value | undefined): BooleanValue {
  return value && isBooleanValue(value) ? value : { value: false };
}
