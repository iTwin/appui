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
  areEqual,
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

  describe("areEqual", () => {
    it("compares `undefined` value", () => {
      expect(areEqual(undefined, undefined)).toBe(true);
      expect(areEqual(undefined, { value: "text" })).toBe(false);
      expect(areEqual({ value: "text" }, undefined)).toBe(false);
    });

    it("compares text values", () => {
      expect(areEqual({ value: "text" }, { value: "text" })).toBe(true);
      expect(areEqual({ value: "text" }, { value: "different-text" })).toBe(
        false
      );
      expect(areEqual({ value: "different-text" }, { value: "text" })).toBe(
        false
      );
    });

    it("compares numeric values", () => {
      expect(
        areEqual(
          { rawValue: 1, displayValue: "1" },
          { rawValue: 1, displayValue: "1" }
        )
      ).toBe(true);
      expect(
        areEqual(
          { rawValue: 1, displayValue: "1" },
          { rawValue: 2, displayValue: "2" }
        )
      ).toBe(false);
      expect(
        areEqual(
          { rawValue: 2, displayValue: "2" },
          { rawValue: 1, displayValue: "1" }
        )
      ).toBe(false);
    });

    it("compares boolean values", () => {
      expect(areEqual({ value: true }, { value: true })).toBe(true);
      expect(areEqual({ value: true }, { value: false })).toBe(false);
      expect(areEqual({ value: false }, { value: true })).toBe(false);
    });

    it("compares date values", () => {
      const date = new Date("2025-01-01T00:00:00Z");
      const differentDate = new Date("2025-02-01T00:00:00Z");
      expect(areEqual({ value: date }, { value: date })).toBe(true);
      expect(areEqual({ value: date }, { value: differentDate })).toBe(false);
      expect(areEqual({ value: differentDate }, { value: date })).toBe(false);
    });

    it("compares enum values", () => {
      expect(areEqual({ choice: 1 }, { choice: 1 })).toBe(true);
      expect(areEqual({ choice: 1 }, { choice: 2 })).toBe(false);
      expect(areEqual({ choice: 2 }, { choice: 1 })).toBe(false);
    });

    it("compares instance key values", () => {
      expect(
        areEqual(
          { key: { id: "0x1", className: "Schema.Class" } },
          { key: { id: "0x1", className: "Schema.Class" } }
        )
      ).toBe(true);
      expect(
        areEqual(
          { key: { id: "0x1", className: "Schema.Class" } },
          { key: { id: "0x2", className: "Schema.Class" } }
        )
      ).toBe(false);
      expect(
        areEqual(
          { key: { id: "0x2", className: "Schema.Class" } },
          { key: { id: "0x1", className: "Schema.Class" } }
        )
      ).toBe(false);
      expect(
        areEqual(
          { key: { id: "0x1", className: "Schema.Class" } },
          { key: { id: "0x1", className: "Schema.DifferentClass" } }
        )
      ).toBe(false);
      expect(
        areEqual(
          { key: { id: "0x1", className: "Schema.DifferentClass" } },
          { key: { id: "0x1", className: "Schema.Class" } }
        )
      ).toBe(false);
    });
  });
});
