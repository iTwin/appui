import * as React from "react";
import { Input } from "@itwin/itwinui-react";
import type { EditorProps } from "../../Types.js";
import { useNumericEditorProps } from "./UseNumericEditorProps.js";

/**
 *
 */
export function NumericEditor(props: EditorProps) {
  const { value, onChange, onFinish } = useNumericEditorProps(props);
  return (
    <Input
      type="number"
      value={value.displayValue}
      onChange={(e) =>
        onChange({
          rawValue: parseFloat(e.target.value),
          displayValue: e.target.value,
        })
      }
      onBlur={onFinish}
      size={props.size}
    />
  );
}
