/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { ConcreteEditorProps, EditorProps } from "../../Types.js";
import type { BooleanValue, Value } from "../../values/Values.js";
import { isBooleanValue } from "../../values/Values.js";

/**
 *
 */
export function useBooleanEditorProps({
  value,
  onChange,
  ...rest
}: EditorProps): ConcreteEditorProps<BooleanValue> {
  return {
    ...rest,
    value: getBooleanValue(value),
    onChange,
  };
}

function getBooleanValue(value: Value | undefined): BooleanValue {
  return value && isBooleanValue(value) ? value : { value: false };
}
