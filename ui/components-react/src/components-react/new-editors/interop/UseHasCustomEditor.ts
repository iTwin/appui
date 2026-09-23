/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module PropertyEditors
 */

import * as React from "react";
import type { PropertyRecord } from "@itwin/appui-abstract";
import { hasRegisteredEditor } from "../../editors/PropertyEditorManager.js";
import { EditorsRegistryContext } from "../editors-registry/EditorsRegistryContext.js";
import { EditorInterop } from "./EditorInterop.js";

/**
 * Checks if a custom editor is registered for the given property record. Editors are looked up the same way
 * as in `PropertyRecordEditor`: the new editors registry is used when the record maps onto editor metadata,
 * otherwise the legacy editors registry is used.
 * @internal
 */
export function useHasCustomEditor(
  propertyRecord: PropertyRecord,
  editorSystem: "legacy" | "new"
): boolean {
  const { editors } = React.useContext(EditorsRegistryContext);

  const { metadata, value } = EditorInterop.getMetadataAndValue(propertyRecord);
  if (editorSystem === "new" && metadata) {
    return editors.some((editor) => editor.applies(metadata, value));
  }

  return hasRegisteredEditor(
    propertyRecord.property.typename,
    propertyRecord.property.editor?.name
  );
}
