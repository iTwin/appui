/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Input } from "@itwin/itwinui-react";
import type { EditorProps } from "../Types.js";
import { Value } from "../values/Values.js";

/**
 * Fallback editor that renders readonly value if no editor is found.
 * @internal
 */
export function FallbackEditor({ value, size }: EditorProps) {
  return <Input readOnly value={getTextValue(value)} size={size} />;
}

function getTextValue(value?: Value) {
  if (value === undefined) {
    return value;
  }
  if (Value.isBooleanValue(value)) {
    return value.value ? "true" : "false";
  }
  if (Value.isDateValue(value)) {
    return value.value.toDateString();
  }
  if (Value.isEnumValue(value)) {
    return value.label;
  }
  if (Value.isNumericValue(value)) {
    return value.displayValue;
  }
  if (Value.isTextValue(value)) {
    return value.value;
  }
  if (Value.isInstanceKeyValue(value)) {
    return value.label;
  }
  return "";
}
