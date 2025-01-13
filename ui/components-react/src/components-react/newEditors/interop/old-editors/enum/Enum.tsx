/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import type { EditorProps, EditorSpec } from "../../../Types.js";
import { useEnumMetadata } from "./UseEnumChoices.js";
import { EnumEditor as NewEnumEditor } from "../../../editors/enum/EnumEditor.js";
import { isOldEditorMetadata } from "../../Metadata.js";

export const EnumEditorSpec: EditorSpec = {
  applies: (metadata) =>
    isOldEditorMetadata(metadata) && metadata.type === "enum",
  Editor: EnumEditor,
};

function EnumEditor(props: EditorProps) {
  const newMetadata = useEnumMetadata(props.metadata);
  return <NewEnumEditor {...props} metadata={newMetadata} />;
}
