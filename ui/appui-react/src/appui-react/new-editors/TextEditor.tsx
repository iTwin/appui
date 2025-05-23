/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { InputWithDecorations } from "@itwin/itwinui-react";
import type {
  EditorProps,
  TextValue,
  ValueMetadata,
} from "@itwin/components-react";
import { createEditorSpec, ValueUtilities } from "@itwin/components-react";
import { LockButtonInputDecoration } from "../editors/LockProvider.js";

/* v8 ignore start */

/** @internal */
export const TextEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is ValueMetadata =>
    metadata.type === "string",
  isValueSupported: ValueUtilities.isText,
  Editor: TextEditor,
});

function TextEditor({
  value,
  onChange,
  size,
  disabled,
}: EditorProps<ValueMetadata, TextValue>) {
  const currentValue = value ? value : { value: "" };

  return (
    <InputWithDecorations size={size}>
      <InputWithDecorations.Input
        value={currentValue.value}
        onChange={(e) => onChange({ value: e.target.value })}
        size={size}
        disabled={disabled}
      />
      <LockButtonInputDecoration />
    </InputWithDecorations>
  );
}

/* v8 ignore stop */
