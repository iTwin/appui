/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type {
  DateValue,
  EditorProps,
  SpecificEditorProps,
  Value,
} from "../../Types.js";
import { isDateTimeValue } from "../../Types.js";

/**
 *
 */
export function useDateTimeEditorProps({
  value,
  onChange,
  ...rest
}: EditorProps): SpecificEditorProps<DateValue> {
  return {
    ...rest,
    value: getDateTimeValue(value),
    onChange,
  };
}

function getDateTimeValue(value: Value | undefined): DateValue {
  return value && isDateTimeValue(value) ? value : { value: new Date() };
}
