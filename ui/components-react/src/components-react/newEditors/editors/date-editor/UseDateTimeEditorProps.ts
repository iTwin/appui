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
