/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
  createEditorSpec,
  type EditorProps,
  type EditorSpec,
} from "../../Types.js";
import { EnumEditor as NewEnumEditor } from "../../editors/EnumEditor.js";
import type { OldEditorMetadata } from "../Metadata.js";
import { isOldEditorMetadata } from "../Metadata.js";
import type { EnumValue } from "../../values/Values.js";
import { Value } from "../../values/Values.js";
import { useEnumMetadata } from "./UseEnumMetadata.js";

export const EnumEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is OldEditorMetadata =>
    isOldEditorMetadata(metadata) && metadata.type === "enum",
  isValueSupported: Value.isEnum,
  Editor: EnumEditor,
});

function EnumEditor(props: EditorProps<OldEditorMetadata, EnumValue>) {
  const newMetadata = useEnumMetadata(props.metadata);
  return <NewEnumEditor {...props} metadata={newMetadata} />;
}
