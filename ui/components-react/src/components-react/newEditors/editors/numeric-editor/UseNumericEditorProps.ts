import type {
  EditorProps,
  NumericValue,
  SpecificEditorProps,
  Value,
} from "../../Types.js";
import { isNumericValue } from "../../Types.js";

/**
 *
 */
export function useNumericEditorProps({
  value,
  onChange,
  ...rest
}: EditorProps): SpecificEditorProps<NumericValue> {
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
