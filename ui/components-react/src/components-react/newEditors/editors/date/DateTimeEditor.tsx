/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Button, DatePicker, Popover } from "@itwin/itwinui-react";
import type { EditorProps } from "../../Types.js";
import { useDateEditorProps } from "./UseDateEditorProps.js";

/**
 * Simple editor for editing date values.
 * @beta
 */
export function DateEditor(props: EditorProps) {
  const { value, onChange, onFinish, size, disabled } =
    useDateEditorProps(props);
  const dateStr = value.value.toLocaleDateString();

  return (
    <Popover
      content={
        <DatePicker
          date={value.value}
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
