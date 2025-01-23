/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import type { ValueMetadata } from "../values/Metadata.js";
import type { BooleanValue } from "../values/Values.js";
import type { EditorProps } from "../Types.js";
import { ToggleSwitch } from "@itwin/itwinui-react";

/**
 * Boolean value editor that renders `Checkbox` component for changing value.
 * @internal
 */
export function ToggleEditor({
  value,
  onChange,
  commit,
  disabled,
  size,
}: EditorProps<ValueMetadata, BooleanValue>) {
  const currentValue = value ?? { value: false };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = { value: e.target.checked };
    onChange(newValue);
    commit?.();
  };

  return (
    <ToggleSwitch
      checked={currentValue.value}
      onChange={handleChange}
      disabled={disabled}
      size={size === "small" ? "small" : undefined}
    />
  );
}
