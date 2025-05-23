/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
  PropertyEditorParamTypes,
  StandardEditorNames,
} from "@itwin/appui-abstract";
import { InputWithDecorations } from "@itwin/itwinui-react";
import type { EditorProps } from "../../Types.js";
import { createEditorSpec } from "../../Types.js";
import type { OldEditorMetadata } from "../Metadata.js";
import { isOldEditorMetadata } from "../Metadata.js";
import type { NumericValue } from "../../values/Values.js";
import {
  useCustomFormattedNumberParams,
  useIconEditorParams,
  useInputEditorSizeParams,
} from "./UseEditorParams.js";
import { findIcon } from "../IconsRegistry.js";
import { isNumeric } from "../../values/ValueUtilities.js";

/* v8 ignore start */

/** @internal */
export const CustomNumberEditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is OldEditorMetadata =>
    isOldEditorMetadata(metadata) &&
    metadata.type === "number" &&
    !!metadata.params?.find(
      (param) =>
        param.type === PropertyEditorParamTypes.CustomFormattedNumber.valueOf()
    ) &&
    metadata.preferredEditor === StandardEditorNames.NumberCustom,
  isValueSupported: isNumeric,
  Editor: CustomNumberEditor,
});

interface CustomNumberEditorProps
  extends EditorProps<OldEditorMetadata, NumericValue> {
  decoration?: React.ReactNode;
}

/** @internal */
export function CustomNumberEditor({
  metadata,
  value,
  onChange,
  size,
  disabled,
  decoration,
}: CustomNumberEditorProps) {
  const formatParams = useCustomFormattedNumberParams(metadata);
  const sizeParams = useInputEditorSizeParams(metadata);
  const iconParams = useIconEditorParams(metadata);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState(() => {
    return value?.rawValue !== undefined && formatParams
      ? formatParams.formatFunction(value.rawValue)
      : "";
  });

  if (!formatParams) {
    return null;
  }

  const style: React.CSSProperties | undefined =
    sizeParams?.size !== undefined
      ? {
          minWidth: `${sizeParams?.size * 0.75}em`,
        }
      : undefined;
  const icon =
    iconParams?.definition?.iconSpec !== undefined
      ? findIcon(iconParams.definition.iconSpec)
      : undefined;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    const result = formatParams.parseFunction(currentValue);
    const parsedValue =
      typeof result.value === "number" ? result.value : undefined;

    setInputValue(currentValue);

    onChange({
      rawValue: parsedValue,
      displayValue: currentValue,
    });
  };

  return (
    <InputWithDecorations size={size}>
      {icon !== undefined ? (
        <InputWithDecorations.Icon>{icon}</InputWithDecorations.Icon>
      ) : null}
      <InputWithDecorations.Input
        ref={inputRef}
        style={style}
        disabled={disabled}
        onChange={handleChange}
        value={inputValue}
      />
      {decoration}
    </InputWithDecorations>
  );
}

/* v8 ignore stop */
