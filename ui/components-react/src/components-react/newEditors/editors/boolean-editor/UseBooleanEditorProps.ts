import type {
  BooleanValue,
  EditorProps,
  SpecificEditorProps,
  Value,
} from "../../Types.js";
import { isBooleanValue } from "../../Types.js";

/**
 *
 */
export function useBooleanEditorProps({
  value,
  onChange,
  ...rest
}: EditorProps): SpecificEditorProps<BooleanValue> {
  return {
    ...rest,
    value: getBooleanValue(value),
    onChange,
  };
}

function getBooleanValue(value: Value | undefined): BooleanValue {
  return value && isBooleanValue(value) ? value : { value: false };
}
