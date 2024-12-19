/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Input } from "@itwin/itwinui-react";
import type { EditorProps } from "../../Types.js";
import { useTextEditorProps } from "./UseTextEditorProps.js";

/**
 *
 */
export function TextEditor(props: EditorProps) {
  const { value, onChange, onFinish, size, disabled } =
    useTextEditorProps(props);
  return (
    <Input
      value={value.value}
      onChange={(e) => onChange({ value: e.target.value })}
      onBlur={onFinish}
      size={size}
      disabled={disabled}
    />
  );
}
