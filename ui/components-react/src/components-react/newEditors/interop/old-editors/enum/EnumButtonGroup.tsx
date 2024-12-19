/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import type { EditorProps, EditorSpec, RequiredProps } from "../../../Types.js";
import { type EnumValue, isEnumValue } from "../../../values/Values.js";
import type { ButtonGroupEditorParams } from "@itwin/appui-abstract";
import {
  type EnumerationChoice,
  type PropertyEditorParams,
  PropertyEditorParamTypes,
  StandardEditorNames,
} from "@itwin/appui-abstract";
import type { OldEditorMetadata } from "../../Metadata.js";
import { isOldEditorMetadata } from "../../Metadata.js";
import { ButtonGroup, IconButton } from "@itwin/itwinui-react";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { useEnumChoices } from "./UseEnumChoices.js";

export const EnumButtonGroupEditorSpec: EditorSpec = {
  applies: (metadata) =>
    isOldEditorMetadata(metadata) &&
    metadata.type === "enum" &&
    metadata.preferredEditor === StandardEditorNames.EnumButtonGroup,
  Editor: EnumButtonGroupEditor,
};

function EnumButtonGroupEditor(props: EditorProps) {
  const { value, onChange, choices, enumIcons, onFinish, size, disabled } =
    useEnumButtonGroupEditorProps(props);

  return (
    <ButtonGroup orientation="horizontal">
      {choices.map((choice) => {
        const icon = findIcon(enumIcons?.get(choice.value));
        return (
          <IconButton
            key={choice.value}
            onClick={() => {
              onChange({ choice: choice.value, label: choice.label });
              onFinish();
            }}
            label={choice.label}
            isActive={choice.value === value.choice}
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

function useEnumButtonGroupEditorProps(props: EditorProps): RequiredProps<
  EditorProps<EnumValue>,
  "value"
> & {
  choices: EnumerationChoice[];
  enumIcons?: Map<string | number, string>;
} {
  const { metadata, value, ...rest } = props;
  const choices = useEnumChoices(metadata);

  const firstChoice = choices[0] as EnumerationChoice | undefined;
  const currentValue =
    value && isEnumValue(value)
      ? value
      : { choice: firstChoice?.value ?? 0, label: firstChoice?.label ?? "" };

  return {
    ...rest,
    metadata,
    value: currentValue,
    choices,
    enumIcons: React.useMemo(() => {
      const params = findButtonGroupParams(
        (metadata as OldEditorMetadata).params
      );
      return params ? createIconsMap(choices, params) : undefined;
    }, [metadata, choices]),
  };
}

function findButtonGroupParams(params?: PropertyEditorParams[]) {
  if (!params) {
    return undefined;
  }

  const matchingParams = params.find(
    (param) => param.type === PropertyEditorParamTypes.ButtonGroupData.valueOf()
  );
  if (!matchingParams) {
    return undefined;
  }
  return matchingParams as ButtonGroupEditorParams;
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

// TODO: Move to the other place that could be shared between components that depend on font icons
function findIcon(iconName?: string) {
  if (!iconName) {
    return <SvgPlaceholder />;
  }

  const icon = webfontIconsMap[iconName];
  return icon ? icon : <SvgPlaceholder />;
}

const webfontIconsMap: {
  [key: string]: React.JSX.Element;
} = {
  "icon-select-single": (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="m15 7h-1.0922a6.0081 6.0081 0 0 0 -4.9078-4.9078v-1.0922a1 1 0 0 0 -2 0v1.0922a6.0081 6.0081 0 0 0 -4.9078 4.9078h-1.0922a1 1 0 0 0 0 2h1.0923a6.008 6.008 0 0 0 4.9077 4.9078v1.0922a1 1 0 0 0 2 0v-1.0922a6.008 6.008 0 0 0 4.9077-4.9078h1.0923a1 1 0 0 0 0-2zm-2.4769 1.923a4.6245 4.6245 0 0 1 -3.6 3.6 4.6572 4.6572 0 0 1 -1.8462 0 4.6245 4.6245 0 0 1 -3.6-3.6 4.6617 4.6617 0 0 1 0-1.8461 4.6243 4.6243 0 0 1 3.6-3.6 4.6622 4.6622 0 0 1 1.8462 0 4.6243 4.6243 0 0 1 3.6 3.6 4.6617 4.6617 0 0 1 0 1.8461z" />
    </svg>
  ),
  "icon-select-line": (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.35352,1.35352l-.707-.707L.64648,13.646481l.707,.707" />
    </svg>
  ),
  "icon-select-box": (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="m14 2v12h-12v-12zm1-1h-14v14h14z" />
    </svg>
  ),
  "icon-replace": (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="m0 0h7v7h-7zm16 16h-7v-7h7zm-6-1h5v-5h-5zm-6.8484-6.0734-.7425-.7424-1.7678 1.7677 1.0253.0354a3.87023 3.87023 0 0 0 1.096 3.5002 4 4 0 0 0 5.3033.3536l-.7071-.7071a3.02646 3.02646 0 0 1 -4.7023-3.076l1.6617.0354zm10.0932-6.9317a3.99992 3.99992 0 0 0 -5.2679-.3182l.7071.7071a3 3 0 0 1 3.8537.3182 2.85982 2.85982 0 0 1 .7778 2.8284h-1.4849l1.7678 1.7678 1.7678-1.7678h-.9899a4.16081 4.16081 0 0 0 -1.1315-3.5355" />
    </svg>
  ),
  "icon-select-plus": (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="m1 1v14h14v-14zm11 8h-3v3h-2v-3h-3v-2h3v-3h2v3h3z" />
    </svg>
  ),
  "icon-select-minus": (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="m8 0a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm5 9h-10v-2h10z" />
    </svg>
  ),
};
