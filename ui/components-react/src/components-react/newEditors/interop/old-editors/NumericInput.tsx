/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { StandardEditorNames } from "@itwin/appui-abstract";
import type { EditorProps, EditorSpec } from "../../Types.js";
import { createEditorSpec } from "../../Types.js";
import type { OldEditorMetadata } from "../Metadata.js";
import { isOldEditorMetadata } from "../Metadata.js";
import type { NumericValue } from "../../values/Values.js";
import { Value } from "../../values/Values.js";
import {
  useInputEditorSizeParams,
  useRangeEditorParams,
} from "./UseEditorParams.js";
import { Input } from "@itwin/itwinui-react";

/**
 * @internal
 */
export const NumericInputEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: isOldEditorMetadata,
  isValueSupported: Value.isNumericValue,
  applies: (metadata) =>
    metadata.preferredEditor === StandardEditorNames.NumericInput,
  Editor: NumericInputEditor,
});

function NumericInputEditor({
  metadata,
  value,
  onChange,
  size,
  disabled,
  onFinish,
}: EditorProps<OldEditorMetadata, NumericValue>) {
  const sizeParams = useInputEditorSizeParams(metadata);
  const rangeParams = useRangeEditorParams(metadata);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;
    onChange({
      displayValue: currentValue,
      rawValue: parseFloat(currentValue),
    });
  };

  const style: React.CSSProperties | undefined =
    sizeParams?.size !== undefined
      ? {
          minWidth: `${sizeParams?.size * 0.75}em`,
        }
      : undefined;

  return (
    <Input
      style={style}
      type="number"
      min={rangeParams?.minimum}
      max={rangeParams?.maximum}
      step={rangeParams?.step}
      onChange={handleChange}
      value={value?.displayValue}
      size={size}
      disabled={disabled}
      onBlur={onFinish}
    />
  );
}
