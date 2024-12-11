/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { ToggleSwitch } from "@itwin/itwinui-react";
import type { EditorProps } from "../../Types.js";
import { useBooleanEditorProps } from "./UseBooleanEditorProps.js";

/**
 *
 */
export function BooleanEditor(props: EditorProps) {
  const { value, onChange, onFinish } = useBooleanEditorProps(props);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = { value: e.target.checked };
    onChange(newValue);
    onFinish();
  };

  return (
    <ToggleSwitch
      checked={value.value}
      onChange={handleChange}
      size={props.size === "small" ? "small" : undefined}
    />
  );
}
