/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
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
import type { EditorProps, EditorSpec } from "../../Types.js";
import { createEditorSpec } from "../../Types.js";
import type { OldEditorMetadata } from "../Metadata.js";
import { isOldEditorMetadata } from "../Metadata.js";
import type { NumericValue } from "../../values/Values.js";
import { useColorEditorParams } from "./UseEditorParams.js";
import { isNumeric } from "../../values/ValueUtilities.js";

/* v8 ignore start */

/**
 * Editor specification for color editor.
 * @internal
 */
export const ColorEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is OldEditorMetadata =>
    isOldEditorMetadata(metadata) &&
    metadata.type === "number" &&
    !!metadata.params?.find(
      (param) => param.type === PropertyEditorParamTypes.ColorData.valueOf()
    ) &&
    metadata.preferredEditor === StandardEditorNames.ColorPicker,
  isValueSupported: isNumeric,
  Editor: ColorEditor,
});

function ColorEditor({
  value,
  metadata,
  onChange,
  commit,
  size,
}: EditorProps<OldEditorMetadata, NumericValue>) {
  const colorParams = useColorEditorParams(metadata);
  const colors = colorParams?.colorValues ?? [];

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
          commit?.();
        }
      }}
    >
      <IconButton size={size}>
        <ColorSwatch color={activeColor} />
      </IconButton>
    </Popover>
  );
}

/* v8 ignore stop */
