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
import {
  isBoolean,
  isDate,
  isEnum,
  isInstanceKey,
  isNumeric,
  isText,
} from "../../components-react/new-editors/values/ValueUtilities.js";

describe("ValueUtilities", () => {
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
    expect(isText(textValue)).toBe(true);
    expect(isText(numericValue)).toBe(false);
    expect(isText(booleanValue)).toBe(false);
    expect(isText(dateValue)).toBe(false);
    expect(isText(enumValue)).toBe(false);
    expect(isText(instanceKeyValue)).toBe(false);
  });

  it("isNumeric returns correct result", () => {
    expect(isNumeric(textValue)).toBe(false);
    expect(isNumeric(numericValue)).toBe(true);
    expect(isNumeric(booleanValue)).toBe(false);
    expect(isNumeric(dateValue)).toBe(false);
    expect(isNumeric(enumValue)).toBe(false);
    expect(isNumeric(instanceKeyValue)).toBe(false);
  });

  it("isBoolean returns correct result", () => {
    expect(isBoolean(textValue)).toBe(false);
    expect(isBoolean(numericValue)).toBe(false);
    expect(isBoolean(booleanValue)).toBe(true);
    expect(isBoolean(dateValue)).toBe(false);
    expect(isBoolean(enumValue)).toBe(false);
    expect(isBoolean(instanceKeyValue)).toBe(false);
  });

  it("isDate returns correct result", () => {
    expect(isDate(textValue)).toBe(false);
    expect(isDate(numericValue)).toBe(false);
    expect(isDate(booleanValue)).toBe(false);
    expect(isDate(dateValue)).toBe(true);
    expect(isDate(enumValue)).toBe(false);
    expect(isDate(instanceKeyValue)).toBe(false);
  });

  it("isEnum returns correct result", () => {
    expect(isEnum(textValue)).toBe(false);
    expect(isEnum(numericValue)).toBe(false);
    expect(isEnum(booleanValue)).toBe(false);
    expect(isEnum(dateValue)).toBe(false);
    expect(isEnum(enumValue)).toBe(true);
    expect(isEnum(instanceKeyValue)).toBe(false);
  });

  it("isInstanceKey returns correct result", () => {
    expect(isInstanceKey(textValue)).toBe(false);
    expect(isInstanceKey(numericValue)).toBe(false);
    expect(isInstanceKey(booleanValue)).toBe(false);
    expect(isInstanceKey(dateValue)).toBe(false);
    expect(isInstanceKey(enumValue)).toBe(false);
    expect(isInstanceKey(instanceKeyValue)).toBe(true);
  });
});
