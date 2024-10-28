import * as React from "react";
import { Button, DatePicker, Popover } from "@itwin/itwinui-react";
import type { EditorProps } from "../../Types.js";
import { useDateTimeEditorProps } from "./UseDateTimeEditorProps.js";

/**
 *
 */
export function DateTimeEditor(props: EditorProps) {
  const { value, onChange, onFinish } = useDateTimeEditorProps(props);
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
      <Button size={props.size}>{dateStr}</Button>
    </Popover>
  );
}
