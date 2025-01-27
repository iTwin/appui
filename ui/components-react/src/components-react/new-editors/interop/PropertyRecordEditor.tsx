/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
  type PropertyRecord,
  PropertyValueFormat,
} from "@itwin/appui-abstract";
import { EditorInterop } from "./EditorInterop.js";
import {
  EditorContainer,
  type PropertyUpdatedArgs,
} from "../../editors/EditorContainer.js";
import { useCommittableValue } from "../UseCommittableValue.js";
import { EditorRenderer } from "../EditorRenderer.js";
import type { ValueMetadata } from "../values/Metadata.js";
import type { Value } from "../values/Values.js";

interface PropertyRecordEditorProps {
  propertyRecord: PropertyRecord;
  onCommit: (args: PropertyUpdatedArgs) => void;
  onCancel: () => void;
  size?: "small" | "large";
}

/**
 * Editor component for editing property values represented by `PropertyRecord`.
 * @beta
 */
export function PropertyRecordEditor({
  propertyRecord,
  onCommit,
  onCancel,
  size,
}: PropertyRecordEditorProps) {
  const { metadata, value } = EditorInterop.getMetadataAndValue(propertyRecord);
  if (metadata && value) {
    return (
      <CommittingEditor
        metadata={metadata}
        initialValue={value}
        onCommit={(newValue) => {
          onCommit({
            propertyRecord,
            newValue:
              newValue === undefined
                ? { valueFormat: PropertyValueFormat.Primitive }
                : EditorInterop.convertToPrimitiveValue(newValue),
          });
        }}
        onCancel={onCancel}
        disabled={propertyRecord.isDisabled || propertyRecord.isReadonly}
        size={size}
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

function CommittingEditor({
  metadata,
  initialValue,
  onCancel,
  onCommit,
  disabled,
  size,
}: {
  metadata: ValueMetadata;
  initialValue?: Value;
  onCommit: (value?: Value) => void;
  onCancel: () => void;
  disabled?: boolean;
  size?: "small" | "large";
}) {
  const { value, onChange, onKeydown, commit, cancel } = useCommittableValue({
    initialValue,
    onCommit,
    onCancel,
  });

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div onKeyDown={onKeydown}>
      <EditorRenderer
        metadata={metadata}
        value={value}
        onChange={onChange}
        commit={commit}
        cancel={cancel}
        disabled={disabled}
        size={size}
      />
    </div>
  );
}
