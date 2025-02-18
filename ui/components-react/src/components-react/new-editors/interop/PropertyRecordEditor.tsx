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
  onClick?: () => void;
  setFocus?: boolean;
  size?: "small" | "large";
  usedEditor?: "legacy" | "new";
}

/**
 * Editor component for editing property values represented by `PropertyRecord`.
 * @beta
 */
export function PropertyRecordEditor({
  propertyRecord,
  onCommit,
  onCancel,
  onClick,
  setFocus,
  size,
  usedEditor,
}: PropertyRecordEditorProps) {
  const { metadata, value } = EditorInterop.getMetadataAndValue(propertyRecord);
  if (usedEditor === "new" && metadata && value) {
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
        onClick={onClick}
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
      onClick={onClick}
      setFocus={setFocus}
    />
  );
}

function CommittingEditor({
  metadata,
  initialValue,
  onCancel,
  onCommit,
  onClick,
  disabled,
  size,
}: {
  metadata: ValueMetadata;
  initialValue?: Value;
  onCommit: (value?: Value) => void;
  onCancel: () => void;
  onClick?: () => void;
  disabled?: boolean;
  size?: "small" | "large";
}) {
  const { value, onChange, onKeydown, commit, cancel } = useCommittableValue({
    initialValue,
    onCommit,
    onCancel,
  });

  return (
    <div
      onKeyDown={onKeydown}
      onBlur={commit}
      onClick={onClick}
      role="presentation"
    >
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
