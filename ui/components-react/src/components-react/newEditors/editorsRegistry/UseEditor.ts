/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { EditorSpec } from "../Types.js";
import type { ValueMetadata } from "../values/Metadata.js";
import type { Value } from "../values/Values.js";
import { defaultEditors, interopEditors } from "./DefaultEditors.js";
import { editorsRegistryContext } from "./EditorsRegistryContext.js";

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
  const { editors } = React.useContext(editorsRegistryContext);

  const registeredEditor = editors.find((editor) =>
    editor.applies(metadata, value)
  )?.Editor;
  if (registeredEditor) {
    return registeredEditor;
  }

  const oldEditor = interopEditors.find((editor) =>
    editor.applies(metadata, value)
  )?.Editor;
  if (oldEditor) {
    return oldEditor;
  }

  const defaultEditor = defaultEditors.find((editor) =>
    editor.applies(metadata, value)
  )?.Editor;
  if (defaultEditor) {
    return defaultEditor;
  }

  throw new Error(`No editor found for metadata: ${JSON.stringify(metadata)}`);
}
