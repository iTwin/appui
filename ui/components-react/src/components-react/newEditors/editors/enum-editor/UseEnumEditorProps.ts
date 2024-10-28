import type {
  EditorProps,
  EnumChoice,
  EnumValue,
  EnumValueMetadata,
  SpecificEditorProps,
  Value,
} from "../../Types.js";
import { isEnumValue } from "../../Types.js";

/**
 *
 */
export function useEnumEditorProps({
  metadata,
  value,
  onChange,
  ...rest
}: EditorProps): SpecificEditorProps<EnumValue> & { choices: EnumChoice[] } {
  const choices =
    metadata.type === "enum" ? (metadata as EnumValueMetadata).choices : [];

  return {
    ...rest,
    metadata,
    value: getEnumValue(value, choices),
    onChange,
    choices,
  };
}

function getEnumValue(
  value: Value | undefined,
  choices: EnumChoice[]
): EnumValue {
  const defaultValue =
    choices.length > 0
      ? { choice: choices[0].value, label: choices[0].label }
      : { choice: 0, label: "" };
  return value && isEnumValue(value) ? value : defaultValue;
}
