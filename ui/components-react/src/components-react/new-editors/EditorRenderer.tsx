/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import * as React from "react";
import type { EditorProps } from "./Types.js";
import { useEditor } from "./editors-registry/UseEditor.js";
import { StatusMessage } from "@itwin/itwinui-react";

interface EditorRendererProps extends EditorProps {
  /**
   * Status message shown under editor. If `string` is passed it will be rendered as `negative`
   * status message. To render different type of status message custom react component can be provided.
   */
  statusMessage?: React.ReactNode | string;
}

/**
 * Editor component that renders an editor based on the metadata and value.
 * @beta
 */
export function EditorRenderer({
  statusMessage,
  ...editorProps
}: EditorRendererProps) {
  const { metadata, value } = editorProps;
  const TypeEditor = useEditor(metadata, value);

  if (!TypeEditor) {
    return null;
  }

  return (
    <>
      <TypeEditor {...editorProps} />
      {statusMessage && typeof statusMessage === "string" ? (
        <StatusMessage status="negative">{statusMessage}</StatusMessage>
      ) : (
        statusMessage
      )}
    </>
  );
}
