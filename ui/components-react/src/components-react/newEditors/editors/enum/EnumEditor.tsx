/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Select } from "@itwin/itwinui-react";
import type { EditorProps } from "../../Types.js";
import { useEnumEditorProps } from "./UseEnumEditorProps.js";

/**
 *
 */
export function EnumEditor(props: EditorProps) {
  const { value, onChange, onFinish, choices } = useEnumEditorProps(props);

  const handleChange = (newChoice: number | string) => {
    const choice = choices.find((c) => c.value === newChoice);
    const newValue = { choice: newChoice, label: choice?.label ?? "" };
    onChange(newValue);
    onFinish();
  };

  return (
    <Select
      size={props.size}
      value={value.choice}
      onChange={handleChange}
      options={choices.map((c) => ({ value: c.value, label: c.label }))}
    />
  );
}
