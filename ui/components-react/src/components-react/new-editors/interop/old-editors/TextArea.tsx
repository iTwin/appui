/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Button, Popover, Textarea } from "@itwin/itwinui-react";
import { createEditorSpec, type EditorProps } from "../../Types.js";
import type { PropertyRecordEditorMetadata } from "../Metadata.js";
import { isPropertyRecordEditorMetadata } from "../Metadata.js";
import { type TextValue } from "../../values/Values.js";
import { StandardEditorNames } from "@itwin/appui-abstract";
import { isText } from "../../values/ValueUtilities.js";

/* v8 ignore start */

/** @internal */
export const MultilineEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is PropertyRecordEditorMetadata =>
    isPropertyRecordEditorMetadata(metadata) &&
    metadata.type === "string" &&
    metadata.preferredEditor === StandardEditorNames.MultiLine,
  isValueSupported: isText,
  Editor: TextAreaEditor,
});

function TextAreaEditor({
  value,
  onChange,
  commit,
  size,
  disabled,
  id,
}: EditorProps<PropertyRecordEditorMetadata, TextValue>) {
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
      <Button id={id} style={{ width: "100%" }} size={size} disabled={disabled}>
        {currentValue.value}
      </Button>
    </Popover>
  );
}

/* v8 ignore stop */
