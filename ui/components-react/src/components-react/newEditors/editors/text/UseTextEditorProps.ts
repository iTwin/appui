/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { EditorProps, RequiredProps } from "../../Types.js";
import type { TextValue, Value } from "../../values/Values.js";
import { isTextValue } from "../../values/Values.js";

/**
 * Hooks that converts generic `EditorProps` into editor props with text value. If value is not text, it will be converted into empty text value.
 * @beta
 */
export function useTextEditorProps({
  value,
  onChange,
  ...rest
}: EditorProps): RequiredProps<EditorProps<TextValue>, "value"> {
  return {
    ...rest,
    value: getTextValue(value),
    onChange,
  };
}

function getTextValue(value: Value | undefined): TextValue {
  return value && isTextValue(value) ? value : { value: "" };
}
