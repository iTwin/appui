/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { ConcreteEditorProps, EditorProps } from "../../Types.js";
import type { EnumValueMetadata } from "../../values/Metadata.js";
import type { EnumChoice, EnumValue, Value } from "../../values/Values.js";
import { isEnumValue } from "../../values/Values.js";

/**
 *
 */
export function useEnumEditorProps({
  metadata,
  value,
  onChange,
  ...rest
}: EditorProps): ConcreteEditorProps<EnumValue> & { choices: EnumChoice[] } {
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
