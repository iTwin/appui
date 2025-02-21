/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { EditorProps } from "./Types.js";
import { useEditor } from "./editors-registry/UseEditor.js";

/**
 * Editor component that renders an editor based on the metadata and value.
 * @beta
 */
export function EditorRenderer(props: EditorProps) {
  const { metadata, value } = props;
  const TypeEditor = useEditor(metadata, value);

  if (!TypeEditor) {
    return null;
  }

  return <TypeEditor {...props} />;
}
