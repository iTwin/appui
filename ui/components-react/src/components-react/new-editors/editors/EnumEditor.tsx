/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Select } from "@itwin/itwinui-react";
import type { EditorProps } from "../Types.js";
import type { EnumChoice, EnumValueMetadata } from "../values/Metadata.js";
import type { EnumValue } from "../values/Values.js";

/**
 * Enum value editor that renders `Select` component for changing value.
 * @internal
 */
export function EnumEditor({
  metadata,
  value,
  onChange,
  commit,
  size,
  disabled,
}: EditorProps<EnumValueMetadata, EnumValue>) {
  const choices = metadata.choices;
  const currentValue = getEnumValue(value, choices);

  const handleChange = (newChoice: number | string) => {
    const choice = choices.find((c) => c.value === newChoice);
    const newValue = { choice: newChoice, label: choice?.label ?? "" };
    onChange(newValue);
    commit?.();
  };

  return (
    <Select
      size={size}
      value={currentValue.choice}
      onChange={handleChange}
      options={choices.map((c) => ({ value: c.value, label: c.label }))}
      disabled={disabled}
    />
  );
}

function getEnumValue(
  value: EnumValue | undefined,
  choices: EnumChoice[]
): EnumValue {
  const defaultValue =
    choices.length > 0
      ? { choice: choices[0].value, label: choices[0].label }
      : { choice: "", label: "" };
  return value ? value : defaultValue;
}
