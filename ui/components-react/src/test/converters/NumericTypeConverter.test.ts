/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  FloatTypeConverter,
  IntTypeConverter,
} from "../../components-react.js";

describe("IntTypeConverter", () => {
  let converter: IntTypeConverter;

  beforeEach(() => {
    converter = new IntTypeConverter();
  });

  describe("convertToString", () => {
    it("returns correct strings", () => {
      expect(converter.convertToString(100)).to.equal("100");
      expect(converter.convertToString("100")).to.equal("100");
      expect(converter.convertToString(100.4)).to.equal("100");
      expect(converter.convertToString(100.5)).to.equal("101");
      expect(converter.convertToString(100.6)).to.equal("101");
      expect(converter.convertToString("-")).to.equal("0");
    });

    it("returns empty string when value is undefined", () => {
      expect(converter.convertToString(undefined)).toEqual("");
    });

    it("returns default value when value is not a number", () => {
      expect(converter.convertToString("not a number")).toEqual("0");
    });
  });

  describe("convertFromString", () => {
    it("returns valid value", () => {
      expect(converter.convertFromString("100")).to.equal(100);
    });

    it("returns undefined if string is not a number", () => {
      expect(converter.convertFromString("not a number")).toEqual(undefined);
    });
  });

  it("sortCompare", () => {
    expect(converter.sortCompare(100, 99)).to.be.greaterThan(0);
    expect(converter.sortCompare(99, 100)).to.be.lessThan(0);
    expect(converter.sortCompare(100, 100)).to.equal(0);
  });

  it("isLessGreaterType", () => {
    expect(converter.isLessGreaterType).toEqual(true);
  });

  it("isLessThan", () => {
    expect(converter.isLessThan(0, 1)).toEqual(true);
    expect(converter.isLessThan(1, 0)).toEqual(false);
  });

  it("isLessThanOrEqualTo", () => {
    expect(converter.isLessThanOrEqualTo(0, 1)).toEqual(true);
    expect(converter.isLessThanOrEqualTo(0, 0)).toEqual(true);
    expect(converter.isLessThanOrEqualTo(1, 0)).toEqual(false);
  });

  it("isGreaterThan", () => {
    expect(converter.isGreaterThan(1, 0)).toEqual(true);
    expect(converter.isGreaterThan(0, 1)).toEqual(false);
  });

  it("isGreaterThanOrEqualTo", () => {
    expect(converter.isGreaterThanOrEqualTo(1, 0)).toEqual(true);
    expect(converter.isGreaterThanOrEqualTo(1, 1)).toEqual(true);
    expect(converter.isGreaterThanOrEqualTo(0, 1)).toEqual(false);
  });

  it("isEqualTo", () => {
    expect(converter.isEqualTo(0, 0)).toEqual(true);
    expect(converter.isEqualTo(1, 0)).toEqual(false);
  });

  it("isNotEqualTo", () => {
    expect(converter.isNotEqualTo(0, 0)).toEqual(false);
    expect(converter.isNotEqualTo(1, 0)).toEqual(true);
  });
});

describe("FloatTypeConverter", () => {
  let converter: FloatTypeConverter;

  beforeEach(() => {
    converter = new FloatTypeConverter();
  });

  describe("convertToString", () => {
    it("returns correct strings", () => {
      expect(converter.convertToString(100.0)).to.equal("100.0");
      expect(converter.convertToString(100.01)).to.equal("100.01");
      expect(converter.convertToString(100.004)).to.equal("100.0");
      expect(converter.convertToString(100.095)).to.equal("100.1");
      expect(converter.convertToString(100.006)).to.equal("100.01");
      expect(converter.convertToString(100.123)).to.equal("100.12");
      expect(converter.convertToString(100.456)).to.equal("100.46");
      expect(converter.convertToString("100")).to.equal("100.0");
      expect(converter.convertToString("-")).to.equal("0.0");
      expect(converter.convertToString(0)).to.equal("0.0");
    });

    it("returns empty string when value is undefined", () => {
      expect(converter.convertToString(undefined)).toEqual("");
    });

    it("returns default value when value is not a number", () => {
      expect(converter.convertToString("not a number")).toEqual("0.0");
    });
  });

  describe("convertFromString", () => {
    it("return valid value", () => {
      expect(converter.convertFromString("100.0")).to.equal(100.0);
    });

    it("returns undefined if string is not a number", () => {
      expect(converter.convertFromString("not a number")).toEqual(undefined);
    });
  });

  it("sortCompare", () => {
    expect(converter.sortCompare(100, 99)).to.be.greaterThan(0);
    expect(converter.sortCompare(99, 100)).to.be.lessThan(0);
    expect(converter.sortCompare(100, 100)).to.equal(0);
  });

  it("isLessGreaterType", () => {
    expect(converter.isLessGreaterType).toEqual(true);
  });

  it("isLessThan", () => {
    expect(converter.isLessThan(0, 1)).toEqual(true);
    expect(converter.isLessThan(1, 0)).toEqual(false);
  });

  it("isLessThanOrEqualTo", () => {
    expect(converter.isLessThanOrEqualTo(0, 1)).toEqual(true);
    expect(converter.isLessThanOrEqualTo(0, 0)).toEqual(true);
    expect(converter.isLessThanOrEqualTo(1, 0)).toEqual(false);
  });

  it("isGreaterThan", () => {
    expect(converter.isGreaterThan(1, 0)).toEqual(true);
    expect(converter.isGreaterThan(0, 1)).toEqual(false);
  });

  it("isGreaterThanOrEqualTo", () => {
    expect(converter.isGreaterThanOrEqualTo(1, 0)).toEqual(true);
    expect(converter.isGreaterThanOrEqualTo(1, 1)).toEqual(true);
    expect(converter.isGreaterThanOrEqualTo(0, 1)).toEqual(false);
  });
});
