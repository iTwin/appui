/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Button, Popover, Textarea } from "@itwin/itwinui-react";
import { createEditorSpec, type EditorProps } from "../../Types.js";
import { isOldEditorMetadata, type OldEditorMetadata } from "../Metadata.js";
import { type TextValue, Value } from "../../values/Values.js";
import { StandardEditorNames } from "@itwin/appui-abstract";

/* v8 ignore start */

/** @internal */
export const MultilineEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is OldEditorMetadata =>
    isOldEditorMetadata(metadata) &&
    metadata.type === "string" &&
    metadata.preferredEditor === StandardEditorNames.MultiLine,
  isValueSupported: Value.isText,
  Editor: TextAreaEditor,
});

function TextAreaEditor({
  value,
  onChange,
  commit,
  size,
  disabled,
}: EditorProps<OldEditorMetadata, TextValue>) {
  const currentValue = value ?? { value: "" };

  return (
    <Popover
      placement="bottom"
      content={
        <Textarea
          value={currentValue.value}
          onChange={(e) => {
            const newValue = e.currentTarget.value;
            onChange({ value: newValue });
          }}
        />
      }
      onVisibleChange={(visible) => {
        if (!visible) {
          commit?.();
        }
      }}
    >
      <Button style={{ width: "100%" }} size={size} disabled={disabled}>
        {currentValue.value}
      </Button>
    </Popover>
  );
}

/* v8 ignore stop */
