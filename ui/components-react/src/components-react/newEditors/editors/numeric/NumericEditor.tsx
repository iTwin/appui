/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Input } from "@itwin/itwinui-react";
import type { EditorProps } from "../../Types.js";
import { useNumericEditorProps } from "./UseNumericEditorProps.js";

/**
 * Simple editor for editing numeric values.
 * @beta
 */
export function NumericEditor(props: EditorProps) {
  const { value, onChange, onFinish, size, disabled } =
    useNumericEditorProps(props);

  return (
    <Input
      value={value.displayValue}
      onChange={(e) =>
        onChange({
          rawValue: parseFloat(e.target.value),
          displayValue: e.target.value,
        })
      }
      onBlur={onFinish}
      size={size}
      disabled={disabled}
    />
  );
}
