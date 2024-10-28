import * as React from "react";
import type { ComponentType } from "react";
import type { FormatOverrides } from "./FormatOverrides.js";
import type { EditorProps } from "./Types.js";

/**
 *
 */
export interface EditorPropsWithFormatOverrides extends EditorProps {
  formatOverrides?: FormatOverrides;
}

/**
 *
 */
export function withFormatOverrides(
  BaseEditor: ComponentType<EditorPropsWithFormatOverrides>,
  formatOverrides: FormatOverrides
) {
  return function EditorWithFormatOverrides(props: EditorProps) {
    return <BaseEditor {...props} formatOverrides={formatOverrides} />;
  };
}
