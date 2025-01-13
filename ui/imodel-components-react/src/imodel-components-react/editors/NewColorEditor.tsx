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
import { Value } from "@itwin/components-react";

/**
 * Editor specification for color editor.
 * @beta
 */
export const ColorEditorSpec: EditorSpec = {
  applies: (metadata) =>
    metadata.type === "number" &&
    metadata.preferredEditor === StandardEditorNames.ColorPicker &&
    (metadata as ColorValueMetadata).params !== undefined,
  Editor: ColorEditor,
};

/**
 * Metadata for color editor.
 * @beta
 */
export interface ColorValueMetadata extends ValueMetadata {
  params: PropertyEditorParams[];
}

function ColorEditor(props: EditorProps) {
  const { value, onChange, onFinish, colors, size } =
    useColorEditorProps(props);

  const colorsList = colors.map((color) => ColorValue.fromTbgr(color));
  const activeColor =
    value.rawValue !== undefined
      ? ColorValue.fromTbgr(value.rawValue)
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

function useColorEditorProps({
  metadata,
  value,
  onChange,
  ...props
}: EditorProps): Omit<EditorProps<NumericValue>, "value"> & {
  colors: number[];
  value: NumericValue;
} {
  const colorParams = (metadata as ColorValueMetadata).params.find(
    (param: PropertyEditorParams) =>
      param.type === PropertyEditorParamTypes.ColorData.valueOf()
  ) as ColorEditorParams;
  const colors = colorParams.colorValues;

  return {
    ...props,
    metadata,
    colors,
    value:
      value === undefined || !Value.isNumericValue(value)
        ? { rawValue: colors[0], displayValue: "" }
        : value,
    onChange,
  };
}
