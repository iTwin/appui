/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { describe, expect, it } from "vitest";
import {
  applyNumericConstraints,
  getNumericConstraints,
  getStringConstraints,
} from "../../components-react/new-editors/ConstraintUtils.js";

describe("ConstraintUtils", () => {
  describe("getNumericConstraints", () => {
    it("returns min and max when constraints have minimumValue and maximumValue", () => {
      const result = getNumericConstraints({
        minimumValue: 0,
        maximumValue: 100,
      });
      expect(result).toEqual({ min: 0, max: 100 });
    });

    it("returns min only when constraints have minimumValue", () => {
      const result = getNumericConstraints({ minimumValue: 5 });
      expect(result).toEqual({ min: 5, max: undefined });
    });

    it("returns max only when constraints have maximumValue", () => {
      const result = getNumericConstraints({ maximumValue: 50 });
      expect(result).toEqual({ min: undefined, max: 50 });
    });

    it("returns undefined for both when constraints is undefined", () => {
      const result = getNumericConstraints(undefined);
      expect(result).toEqual({ min: undefined, max: undefined });
    });

    it("returns undefined for both when constraints don't have numeric keys", () => {
      const result = getNumericConstraints({ minimumLength: 1 });
      expect(result).toEqual({ min: undefined, max: undefined });
    });
  });

  describe("applyNumericConstraints", () => {
    it("clamps value below min to min", () => {
      expect(applyNumericConstraints({ value: -5, min: 0, max: 100 })).toBe(0);
    });

    it("clamps value above max to max", () => {
      expect(applyNumericConstraints({ value: 150, min: 0, max: 100 })).toBe(
        100
      );
    });

    it("returns value when within range", () => {
      expect(applyNumericConstraints({ value: 50, min: 0, max: 100 })).toBe(50);
    });

    it("returns value when no constraints", () => {
      expect(applyNumericConstraints({ value: 50 })).toBe(50);
    });

    it("clamps to min only when max is undefined", () => {
      expect(applyNumericConstraints({ value: -5, min: 0 })).toBe(0);
      expect(applyNumericConstraints({ value: 999, min: 0 })).toBe(999);
    });

    it("clamps to max only when min is undefined", () => {
      expect(applyNumericConstraints({ value: 999, max: 100 })).toBe(100);
      expect(applyNumericConstraints({ value: -5, max: 100 })).toBe(-5);
    });
  });

  describe("getStringConstraints", () => {
    it("returns minLength and maxLength when constraints have both", () => {
      const result = getStringConstraints({
        minimumLength: 2,
        maximumLength: 50,
      });
      expect(result).toEqual({ minLength: 2, maxLength: 50 });
    });

    it("returns minLength only when constraints have minimumLength", () => {
      const result = getStringConstraints({ minimumLength: 3 });
      expect(result).toEqual({ minLength: 3, maxLength: undefined });
    });

    it("returns maxLength only when constraints have maximumLength", () => {
      const result = getStringConstraints({ maximumLength: 100 });
      expect(result).toEqual({ minLength: undefined, maxLength: 100 });
    });

    it("returns undefined for both when constraints is undefined", () => {
      const result = getStringConstraints(undefined);
      expect(result).toEqual({ minLength: undefined, maxLength: undefined });
    });

    it("returns undefined for both when constraints don't have string keys", () => {
      const result = getStringConstraints({ minimumValue: 1 });
      expect(result).toEqual({ minLength: undefined, maxLength: undefined });
    });
  });
});
