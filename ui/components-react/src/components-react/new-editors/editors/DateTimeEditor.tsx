/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import type { EditorProps } from "../Types.js";
import type { ValueMetadata } from "../values/Metadata.js";
import type { DateValue } from "../values/Values.js";
import { DateInput } from "./DateInput.js";

/* v8 ignore start */

/**
 * Date time value editor that render `DatePicker` component with time selector for changing value.
 * @internal
 */
export function DateTimeEditor({
  value,
  onChange,
  commit,
  size,
  disabled,
}: EditorProps<ValueMetadata, DateValue>) {
  return (
    <DateInput
      value={value?.value}
      onChange={(newValue) => {
        onChange({ value: newValue });
      }}
      onClose={commit}
      size={size}
      disabled={disabled}
      showTimePicker={true}
    />
  );
}

/* v8 ignore stop */
