/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { EditorProps, RequiredProps } from "../../Types.js";
import type { TextValue } from "../../values/Values.js";
import { Value } from "../../values/Values.js";

/**
 * Hooks that converts generic `EditorProps` into editor props with text value. If value is not text, it will be converted to text if possible.
 * @beta
 */
export function useTextEditorProps({
  value,
  onChange,
  ...rest
}: EditorProps): RequiredProps<EditorProps<TextValue>, "value"> {
  return {
    ...rest,
    value: getTextValue(value),
    onChange,
  };
}

function getTextValue(value: Value | undefined): TextValue {
  return value && Value.isTextValue(value)
    ? value
    : { value: convertToString(value) };
}

function convertToString(value: Value | undefined): string {
  if (value === undefined) {
    return "";
  }
  if (Value.isBooleanValue(value)) {
    return value.value ? "True" : "False";
  }
  if (Value.isDateValue(value)) {
    return value.value.toDateString();
  }
  if (Value.isEnumValue(value)) {
    return value.label;
  }
  if (Value.isNumericValue(value)) {
    return value.displayValue;
  }
  return "";
}
