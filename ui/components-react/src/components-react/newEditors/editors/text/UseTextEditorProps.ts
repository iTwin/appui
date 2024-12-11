/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { ConcreteEditorProps, EditorProps } from "../../Types.js";
import type { TextValue, Value } from "../../values/Values.js";
import { isTextValue } from "../../values/Values.js";

/**
 *
 */
export function useTextEditorProps({
  value,
  onChange,
  ...rest
}: EditorProps): ConcreteEditorProps<TextValue> {
  return {
    ...rest,
    value: getTextValue(value),
    onChange,
  };
}

function getTextValue(value: Value | undefined): TextValue {
  return value && isTextValue(value) ? value : { value: "" };
}
