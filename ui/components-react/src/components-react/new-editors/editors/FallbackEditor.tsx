/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Input } from "@itwin/itwinui-react";
import type { EditorProps } from "../Types.js";
import type { Value } from "../values/Values.js";
import {
  isBoolean,
  isDate,
  isEnum,
  isInstanceKey,
  isNumeric,
  isText,
} from "../values/ValueUtilities.js";

/* v8 ignore start */

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
  if (isBoolean(value)) {
    return value.value ? "true" : "false";
  }
  if (isDate(value)) {
    return value.value.toDateString();
  }
  if (isEnum(value)) {
    return value.choice;
  }
  if (isNumeric(value)) {
    return value.displayValue;
  }
  if (isText(value)) {
    return value.value;
  }
  if (isInstanceKey(value)) {
    return value.label;
  }
  return "";
}

/* v8 ignore stop */
