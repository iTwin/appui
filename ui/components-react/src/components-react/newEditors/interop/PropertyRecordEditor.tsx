/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import type { PropertyRecord } from "@itwin/appui-abstract";
import { EditorInterop } from "./EditorInterop.js";
import { CommittingEditor } from "../CommittingEditor.js";
import {
  EditorContainer,
  type PropertyUpdatedArgs,
} from "../../editors/EditorContainer.js";

interface PropertyRecordEditorProps {
  propertyRecord: PropertyRecord;
  onCommit: (args: PropertyUpdatedArgs) => void;
  onCancel: () => void;
  disabled?: boolean;
}

/**
 * Editor component for editing property values represented by `PropertyRecord`.
 * @beta
 */
export function PropertyRecordEditor({
  propertyRecord,
  onCommit,
  onCancel,
  disabled,
}: PropertyRecordEditorProps) {
  const { metadata, value } = EditorInterop.getMetadataAndValue(propertyRecord);
  if (metadata && value) {
    return (
      <CommittingEditor
        metadata={metadata}
        value={value}
        onCommit={(newValue) => {
          onCommit({
            propertyRecord,
            newValue: EditorInterop.convertToPrimitiveValue(newValue),
          });
        }}
        onCancel={onCancel}
        disabled={disabled}
      />
    );
  }

  return (
    <EditorContainer
      propertyRecord={propertyRecord}
      onCommit={onCommit}
      onCancel={onCancel}
    />
  );
}
