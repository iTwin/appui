/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Checkbox } from "@itwin/itwinui-react";
import type { EditorProps } from "../Types.js";
import type { ValueMetadata } from "../values/Metadata.js";
import type { BooleanValue } from "../values/Values.js";

/* v8 ignore start */

/**
 * Boolean value editor that renders `Checkbox` component for changing value.
 * @internal
 */
export function BooleanEditor({
  value,
  onChange,
  commit,
  disabled,
}: EditorProps<ValueMetadata, BooleanValue>) {
  const currentValue = value?.value ?? false;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = { value: e.target.checked };
    onChange(newValue);
    commit?.();
  };

  return (
    <Checkbox
      checked={currentValue}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}

/* v8 ignore stop */
