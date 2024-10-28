import type {
  EditorProps,
  SpecificEditorProps,
  TextValue,
  Value,
} from "../../Types.js";
import { isTextValue } from "../../Types.js";

/**
 *
 */
export function useTextEditorProps({
  value,
  onChange,
  ...rest
}: EditorProps): SpecificEditorProps<TextValue> {
  return {
    ...rest,
    value: getTextValue(value),
    onChange,
  };
}

function getTextValue(value: Value | undefined): TextValue {
  return value && isTextValue(value) ? value : { value: "" };
}
