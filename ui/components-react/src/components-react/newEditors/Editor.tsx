import * as React from "react";
import { defaultEditors } from "./DefaultEditors.js";
import { useEditorsRegistry } from "./editorsRegistry/EditorsRegistry.js";
import type { EditorProps, EditorSpec, Value, ValueMetadata } from "./Types.js";

function noopOnFinish() {}

/**
 *
 */
export function Editor({
  metadata,
  value,
  onChange,
  onFinish,
  size,
}: EditorProps) {
  const TypeEditor = useEditor(metadata, value);

  if (!TypeEditor) {
    return null;
  }

  return (
    <TypeEditor
      metadata={metadata}
      value={value}
      onChange={onChange}
      size={size}
      onFinish={onFinish ?? noopOnFinish}
    />
  );
}

function useEditor(
  metadata: ValueMetadata,
  value: Value | undefined
): EditorSpec["Editor"] | undefined {
  const { editors } = useEditorsRegistry();

  const registeredEditor = editors.find((editor) =>
    editor.applies(metadata, value)
  )?.Editor;
  if (registeredEditor) {
    return registeredEditor;
  }

  const defaultEditor = defaultEditors.find((editor) =>
    editor.applies(metadata, value)
  )?.Editor;
  if (defaultEditor) {
    return defaultEditor;
  }

  throw new Error(`No editor found for metadata: ${JSON.stringify(metadata)}`);
}
