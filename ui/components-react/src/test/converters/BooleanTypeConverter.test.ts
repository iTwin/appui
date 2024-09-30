/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { BooleanTypeConverter } from "../../components-react.js";
import TestUtils from "../TestUtils.js";

describe("BooleanTypeConverter", () => {
  let converter: BooleanTypeConverter;

  beforeEach(() => {
    converter = new BooleanTypeConverter();
  });

  describe("convertToString", () => {
    it("returns parameter value if it's a localized boolean", () => {
      const trueString = TestUtils.i18n.getLocalizedString(
        "Components:general.true"
      );
      const falseString = TestUtils.i18n.getLocalizedString(
        "Components:general.false"
      );
      expect(converter.convertToString(trueString)).toEqual(trueString);
      expect(converter.convertToString(falseString)).toEqual(falseString);
    });

    it("returns localized boolean if parameter is boolean", () => {
      const trueString = TestUtils.i18n.getLocalizedString(
        "Components:general.true"
      );
      const falseString = TestUtils.i18n.getLocalizedString(
        "Components:general.false"
      );
      expect(converter.convertToString(true)).toEqual(trueString);
      expect(converter.convertToString(false)).toEqual(falseString);
    });

    it("returns localized true value if parameter is truthy", () => {
      const trueString = TestUtils.i18n.getLocalizedString(
        "Components:general.true"
      );
      expect(converter.convertToString("test")).toEqual(trueString);
      expect(converter.convertToString(5)).toEqual(trueString);
      expect(converter.convertToString({})).toEqual(trueString);
    });

    it("returns localized false value if parameter is falsy", () => {
      const falseString = TestUtils.i18n.getLocalizedString(
        "Components:general.false"
      );
      expect(converter.convertToString(0)).toEqual(falseString);
    });

    it("returns empty string if provided value is undefined", () => {
      expect(converter.convertToString(undefined)).toEqual("");
    });
  });

  describe("convertFromString", () => {
    it("returns true if parameter is localized true value", () => {
      const trueString = TestUtils.i18n.getLocalizedString(
        "Components:general.true"
      );
      expect(converter.convertFromString(trueString)).toEqual(true);
      expect(
        converter.convertFromString(trueString.toLocaleUpperCase())
      ).toEqual(true);
    });

    it("returns false if parameter is not localized true value", () => {
      expect(converter.convertFromString("test")).toEqual(false);
    });
  });

  describe("isBooleanType", () => {
    it("returns true", () => {
      expect(converter.isBooleanType).toEqual(true);
    });
  });

  describe("sortCompare", () => {
    it("returns 0 when boolean values are equal", () => {
      expect(converter.sortCompare(1, {})).toEqual(0);
      expect(converter.sortCompare({}, [])).toEqual(0);
      expect(converter.sortCompare([], "a")).toEqual(0);
    });

    it("returns greater than 0 when first boolean is true and second is false", () => {
      expect(converter.sortCompare(1, 0)).to.be.greaterThan(0);
      expect(converter.sortCompare("a", "")).to.be.greaterThan(0);
    });

    it("returns less than 0 when first boolean is true and second is false", () => {
      expect(converter.sortCompare(0, 1)).to.be.lessThan(0);
      expect(converter.sortCompare("", "a")).to.be.lessThan(0);
    });
  });
});
