/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { describe, it } from "vitest";
import type {
  BooleanValue,
  DateValue,
  EnumValue,
  InstanceKeyValue,
  NumericValue,
  TextValue,
} from "../../components-react/new-editors/values/Values.js";
import { Value } from "../../components-react/new-editors/values/Values.js";

describe("Value", () => {
  const textValue: TextValue = { value: "test" };
  const numericValue: NumericValue = { rawValue: 1, displayValue: "1" };
  const booleanValue: BooleanValue = { value: true };
  const dateValue: DateValue = { value: new Date() };
  const enumValue: EnumValue = { choice: 1 };
  const instanceKeyValue: InstanceKeyValue = {
    key: { id: "0x1", className: "Schema.Class" },
    label: "Instance Label",
  };

  it("isText returns correct result", () => {
    expect(Value.isText(textValue)).toBe(true);
    expect(Value.isText(numericValue)).toBe(false);
    expect(Value.isText(booleanValue)).toBe(false);
    expect(Value.isText(dateValue)).toBe(false);
    expect(Value.isText(enumValue)).toBe(false);
    expect(Value.isText(instanceKeyValue)).toBe(false);
  });

  it("isNumeric returns correct result", () => {
    expect(Value.isNumeric(textValue)).toBe(false);
    expect(Value.isNumeric(numericValue)).toBe(true);
    expect(Value.isNumeric(booleanValue)).toBe(false);
    expect(Value.isNumeric(dateValue)).toBe(false);
    expect(Value.isNumeric(enumValue)).toBe(false);
    expect(Value.isNumeric(instanceKeyValue)).toBe(false);
  });

  it("isBoolean returns correct result", () => {
    expect(Value.isBoolean(textValue)).toBe(false);
    expect(Value.isBoolean(numericValue)).toBe(false);
    expect(Value.isBoolean(booleanValue)).toBe(true);
    expect(Value.isBoolean(dateValue)).toBe(false);
    expect(Value.isBoolean(enumValue)).toBe(false);
    expect(Value.isBoolean(instanceKeyValue)).toBe(false);
  });

  it("isDate returns correct result", () => {
    expect(Value.isDate(textValue)).toBe(false);
    expect(Value.isDate(numericValue)).toBe(false);
    expect(Value.isDate(booleanValue)).toBe(false);
    expect(Value.isDate(dateValue)).toBe(true);
    expect(Value.isDate(enumValue)).toBe(false);
    expect(Value.isDate(instanceKeyValue)).toBe(false);
  });

  it("isEnum returns correct result", () => {
    expect(Value.isEnum(textValue)).toBe(false);
    expect(Value.isEnum(numericValue)).toBe(false);
    expect(Value.isEnum(booleanValue)).toBe(false);
    expect(Value.isEnum(dateValue)).toBe(false);
    expect(Value.isEnum(enumValue)).toBe(true);
    expect(Value.isEnum(instanceKeyValue)).toBe(false);
  });

  it("isInstanceKey returns correct result", () => {
    expect(Value.isInstanceKey(textValue)).toBe(false);
    expect(Value.isInstanceKey(numericValue)).toBe(false);
    expect(Value.isInstanceKey(booleanValue)).toBe(false);
    expect(Value.isInstanceKey(dateValue)).toBe(false);
    expect(Value.isInstanceKey(enumValue)).toBe(false);
    expect(Value.isInstanceKey(instanceKeyValue)).toBe(true);
  });
});
