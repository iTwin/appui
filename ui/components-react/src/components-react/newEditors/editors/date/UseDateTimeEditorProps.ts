/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { ConcreteEditorProps, EditorProps } from "../../Types.js";
import type { DateValue, Value } from "../../values/Values.js";
import { isDateTimeValue } from "../../values/Values.js";

/**
 *
 */
export function useDateTimeEditorProps({
  value,
  onChange,
  ...rest
}: EditorProps): ConcreteEditorProps<DateValue> {
  return {
    ...rest,
    value: getDateTimeValue(value),
    onChange,
  };
}

function getDateTimeValue(value: Value | undefined): DateValue {
  return value && isDateTimeValue(value) ? value : { value: new Date() };
}
