/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { EditorProps } from "./Types.js";
import { useEditor } from "./editorsRegistry/UseEditor.js";

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

function noopOnFinish() {}
