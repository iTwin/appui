/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Input } from "@itwin/itwinui-react";
import type { EditorProps } from "../Types.js";
import type { ValueMetadata } from "../values/Metadata.js";
import type { TextValue } from "../values/Values.js";

/**
 * Text value editor that renders `Input` component for changing value.
 * @internal
 */
export function TextEditor({
  value,
  commit,
  onChange,
  size,
  disabled,
}: EditorProps<ValueMetadata, TextValue>) {
  const currentValue = value ? value : { value: "" };

  return (
    <Input
      value={currentValue.value}
      onChange={(e) => onChange({ value: e.target.value })}
      onBlur={commit}
      size={size}
      disabled={disabled}
    />
  );
}
