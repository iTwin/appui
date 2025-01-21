/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { EditorSpec } from "../Types.js";
import type { ValueMetadata } from "../values/Metadata.js";
import type { Value } from "../values/Values.js";
import { defaultEditorSpecs, interopEditorSpecs } from "./DefaultEditors.js";
import { EditorsRegistryContext } from "./EditorsRegistryContext.js";
import { FallbackEditor } from "../editors/FallbackEditor.js";

/**
 * Custom hooks that returns editor for specified metadata and value. It uses `EditorsRegistry` context to find registered editors.
 * If no registered editor is found, it will use applicable default editor.
 *
 * @beta
 */
export function useEditor(
  metadata: ValueMetadata,
  value: Value | undefined
): EditorSpec["Editor"] | undefined {
  const { editors } = React.useContext(EditorsRegistryContext);

  const registeredEditor = editors.find((editor) =>
    editor.applies(metadata, value)
  )?.Editor;
  if (registeredEditor) {
    return registeredEditor;
  }

  const oldEditor = interopEditorSpecs.find((editor) =>
    editor.applies(metadata, value)
  )?.Editor;
  if (oldEditor) {
    return oldEditor;
  }

  const defaultEditor = defaultEditorSpecs.find((editor) =>
    editor.applies(metadata, value)
  )?.Editor;
  if (defaultEditor) {
    return defaultEditor;
  }

  return FallbackEditor;
}
