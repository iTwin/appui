/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import type { PropertyEditorParams } from "@itwin/appui-abstract";
import {
  type ColorEditorParams,
  PropertyEditorParamTypes,
  StandardEditorNames,
} from "@itwin/appui-abstract";
import {
  ColorPalette,
  ColorPicker,
  ColorSwatch,
  ColorValue,
  IconButton,
  Popover,
} from "@itwin/itwinui-react";
import type {
  EditorProps,
  EditorSpec,
  NumericValue,
  ValueMetadata,
} from "@itwin/components-react";
import { createEditorSpec, Value } from "@itwin/components-react";

/**
 * Editor specification for color editor.
 * @beta
 */
export const ColorEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is ColorValueMetadata =>
    "params" in metadata &&
    !!(metadata.params as PropertyEditorParams[]).find(
      (param) => param.type === PropertyEditorParamTypes.ColorData.valueOf()
    ),
  isValueSupported: Value.isNumericValue,
  applies: (metadata) =>
    metadata.type === "number" &&
    metadata.preferredEditor === StandardEditorNames.ColorPicker,
  Editor: ColorEditor,
});

/**
 * Metadata for color editor.
 * @beta
 */
export interface ColorValueMetadata extends ValueMetadata {
  params: PropertyEditorParams[];
}

function ColorEditor({
  value,
  metadata,
  onChange,
  onFinish,
  size,
}: EditorProps<ColorValueMetadata, NumericValue>) {
  const colorParams = metadata.params.find(
    (param) => param.type === PropertyEditorParamTypes.ColorData.valueOf()
  ) as ColorEditorParams;
  const colors = colorParams.colorValues;

  const currentValue = value
    ? value
    : { rawValue: colors[0], displayValue: "" };
  const colorsList = colors.map((color) => ColorValue.fromTbgr(color));
  const activeColor =
    currentValue.rawValue !== undefined
      ? ColorValue.fromTbgr(currentValue.rawValue)
      : colorsList[0];

  const onColorChanged = (color: ColorValue) => {
    onChange({ rawValue: color.toTbgr(), displayValue: "" });
  };

  return (
    <Popover
      content={
        <ColorPicker
          selectedColor={activeColor}
          onChangeComplete={onColorChanged}
        >
          <ColorPalette colors={colorsList} />
        </ColorPicker>
      }
      onVisibleChange={(visible) => {
        if (!visible) {
          onFinish();
        }
      }}
    >
      <IconButton size={size}>
        <ColorSwatch className="demo-color-swatch" color={activeColor} />
      </IconButton>
    </Popover>
  );
}
