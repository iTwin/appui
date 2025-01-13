/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { EditorProps, RequiredProps } from "../../Types.js";
import type { DateValue } from "../../values/Values.js";
import { Value } from "../../values/Values.js";

/**
 * Hooks that converts generic `EditorProps` into editor props with date value. If value is not date time, it will be converted into current date.
 * @beta
 */
export function useDateEditorProps({
  value,
  onChange,
  ...rest
}: EditorProps): RequiredProps<EditorProps<DateValue>, "value"> {
  return {
    ...rest,
    value: getDateValue(value),
    onChange,
  };
}

function getDateValue(value: Value | undefined): DateValue {
  return value && Value.isDateValue(value) ? value : { value: new Date() };
}
