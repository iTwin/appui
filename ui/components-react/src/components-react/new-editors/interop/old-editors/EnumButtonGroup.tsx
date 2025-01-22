/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import type { ButtonGroupEditorParams } from "@itwin/appui-abstract";
import {
  type EnumerationChoice,
  StandardEditorNames,
} from "@itwin/appui-abstract";
import type { EditorProps, EditorSpec } from "../../Types.js";
import { createEditorSpec } from "../../Types.js";
import type { OldEditorMetadata } from "../Metadata.js";
import { isOldEditorMetadata } from "../Metadata.js";
import type { EnumValue } from "../../values/Values.js";
import { Value } from "../../values/Values.js";
import { useEnumMetadata } from "./UseEnumMetadata.js";
import { useButtonGroupEditorParams } from "./UseEditorParams.js";
import { ButtonGroup, IconButton } from "@itwin/itwinui-react";
import { findIcon } from "../IconsRegistry.js";

export const EnumButtonGroupEditorSpec: EditorSpec = createEditorSpec({
  isMetadataSupported: (metadata): metadata is OldEditorMetadata =>
    isOldEditorMetadata(metadata) && metadata.type === "enum",
  isValueSupported: Value.isEnum,
  applies: (metadata) =>
    metadata.preferredEditor === StandardEditorNames.EnumButtonGroup,
  Editor: EnumButtonGroupEditor,
});

function EnumButtonGroupEditor({
  value,
  onChange,
  onFinish,
  size,
  disabled,
  metadata,
}: EditorProps<OldEditorMetadata, EnumValue>) {
  const enumMetadata = useEnumMetadata(metadata);
  const buttonGroupParams = useButtonGroupEditorParams(metadata);

  const enumIcons = React.useMemo(() => {
    return buttonGroupParams
      ? createIconsMap(enumMetadata.choices, buttonGroupParams)
      : undefined;
  }, [enumMetadata, buttonGroupParams]);

  const firstChoice = enumMetadata.choices[0] as EnumerationChoice | undefined;
  const currentValue = value
    ? value
    : { choice: firstChoice?.value ?? "", label: firstChoice?.label ?? "" };

  return (
    <ButtonGroup orientation="horizontal">
      {enumMetadata.choices.map((choice) => {
        const icon = findIcon(enumIcons?.get(choice.value));
        return (
          <IconButton
            key={choice.value}
            onClick={() => {
              onChange({ choice: choice.value, label: choice.label });
              onFinish();
            }}
            label={choice.label}
            isActive={choice.value === currentValue.choice}
            size={size}
            disabled={disabled}
          >
            {icon}
          </IconButton>
        );
      })}
    </ButtonGroup>
  );
}

function createIconsMap(
  choices: EnumerationChoice[],
  params: ButtonGroupEditorParams
) {
  const icons = new Map<string | number, string>();
  for (let i = 0; i < choices.length; i++) {
    const iconDef = params.buttons[i];
    icons.set(choices[i].value, iconDef.iconSpec);
  }
  return icons;
}
