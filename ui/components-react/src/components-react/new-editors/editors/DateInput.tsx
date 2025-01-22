/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Button, DatePicker, Popover } from "@itwin/itwinui-react";

interface DateInputProps {
  value?: Date;
  onChange: (value: Date) => void;
  onClose: () => void;
  size?: "small" | "large";
  disabled?: boolean;
  showTimePicker?: boolean;
}

/**
 * @internal
 */
export function DateInput({
  value,
  onChange,
  onClose,
  size,
  showTimePicker,
  disabled,
}: DateInputProps) {
  const currentValue = value ?? new Date();
  const dateStr = showTimePicker
    ? currentValue.toLocaleString()
    : currentValue.toLocaleDateString();

  return (
    <Popover
      placement="bottom"
      content={
        <DatePicker
          date={currentValue}
          onChange={onChange}
          showDatesOutsideMonth={false}
          showTime={showTimePicker}
        />
      }
      onVisibleChange={(visible) => {
        if (!visible) {
          onClose();
        }
      }}
    >
      <Button style={{ width: "100%" }} size={size} disabled={disabled}>
        {dateStr}
      </Button>
    </Popover>
  );
}
