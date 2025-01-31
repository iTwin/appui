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
  if (Value.isBoolean(value)) {
    return value.value ? "true" : "false";
  }
  if (Value.isDate(value)) {
    return value.value.toDateString();
  }
  if (Value.isEnum(value)) {
    return value.label;
  }
  if (Value.isNumeric(value)) {
    return value.displayValue;
  }
  if (Value.isText(value)) {
    return value.value;
  }
  if (Value.isInstanceKey(value)) {
    return value.label;
  }
  return "";
}
