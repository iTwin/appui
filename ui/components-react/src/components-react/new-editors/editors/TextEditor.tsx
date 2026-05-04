/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Input } from "@itwin/itwinui-react";
import type { EditorProps } from "../Types.js";
import type { TextValueMetadata } from "../values/Metadata.js";
import type { TextValue } from "../values/Values.js";
import { getStringConstraints } from "../ConstraintUtils.js";

/* v8 ignore start */

/**
 * Text value editor that renders `Input` component for changing value.
 * @internal
 */
export function TextEditor({
  metadata,
  value,
  onChange,
  size,
  disabled,
}: EditorProps<TextValueMetadata, TextValue>) {
  const currentValue = value ? value : { value: "" };
  const { maxLength, minLength } = getStringConstraints(metadata.constraints);

  return (
    <Input
      value={currentValue.value}
      onChange={(e) => onChange({ value: e.target.value })}
      maxLength={maxLength}
      minLength={minLength}
      size={size}
      disabled={disabled}
    />
  );
}

/* v8 ignore stop */
