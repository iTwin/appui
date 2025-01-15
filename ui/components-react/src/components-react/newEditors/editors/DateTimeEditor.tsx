/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Button, DatePicker, Popover } from "@itwin/itwinui-react";
import type { EditorProps } from "../Types.js";
import type { ValueMetadata } from "../values/Metadata.js";
import type { DateValue } from "../values/Values.js";

/**
 * Date value editor that render `DatePicker` component for changing value.
 * @internal
 */
export function DateEditor({
  value,
  onChange,
  onFinish,
  size,
  disabled,
}: EditorProps<ValueMetadata, DateValue>) {
  const currentValue = value ?? { value: new Date() };
  const dateStr = currentValue.value.toLocaleDateString();

  return (
    <Popover
      content={
        <DatePicker
          date={currentValue.value}
          onChange={(e) => {
            onChange({ value: e });
          }}
          showDatesOutsideMonth={false}
        />
      }
      onVisibleChange={(visible) => {
        if (!visible) {
          onFinish();
        }
      }}
    >
      <Button size={size} disabled={disabled}>
        {dateStr}
      </Button>
    </Popover>
  );
}
