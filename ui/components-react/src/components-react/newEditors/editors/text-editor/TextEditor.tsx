import * as React from "react";
import { Input } from "@itwin/itwinui-react";
import type { EditorProps } from "../../Types.js";
import { useTextEditorProps } from "./UseTextEditorProps.js";

/**
 *
 */
export function TextEditor(props: EditorProps) {
  const { value, onChange, onFinish } = useTextEditorProps(props);
  return (
    <Input
      value={value.value}
      onChange={(e) => onChange({ value: e.target.value })}
      size={props.size}
      onBlur={onFinish}
    />
  );
}
