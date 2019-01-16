/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { ShortDateTypeConverter, DateTimeTypeConverter } from "../../ui-components";
import TestUtils from "../TestUtils";

describe("ShortDateTypeConverter", () => {

  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  let converter: ShortDateTypeConverter;

  beforeEach(() => {
    converter = new ShortDateTypeConverter();
  });

  describe("convertToString", () => {
    it("returns correct string", () => {
      // NEEDSWORK: localization
      const date = new Date(2018, 0, 1);
      const dateString = converter.convertToString(date);
      expect(dateString).to.have.length.greaterThan(0);
      expect(new Date(dateString).toDateString()).to.be.eq(date.toDateString());
    });

    it("returns empty string if date is undefined", () => {
      expect(converter.convertToString(undefined)).to.be.eq("");
    });

    it("returns the same string if date is a string", () => {
      expect(converter.convertToString("2015 - 06 - 11")).to.be.eq("2015 - 06 - 11");
    });
  });

  describe("convertFromString", () => {
    it("returns correct string when proper date string is provided", () => {
      const testDate = new Date(2018, 0, 1);
      const convertedDate = converter.convertFromString("1/1/2018");
      expect(convertedDate).to.not.be.undefined;
      expect(convertedDate!.valueOf()).to.eq(testDate.valueOf());
    });

    it("returns undefined when empty date string is provided", () => {
      const convertedDate = converter.convertFromString("");
      expect(convertedDate).to.be.undefined;
    });

    it("returns undefined when wrong date string is provided", () => {
      const convertedDate = converter.convertFromString("MayFifteenthTwoThousandAndTwo");
      expect(convertedDate).to.be.undefined;
    });
  });

  it("sortCompare", () => {
    expect(converter.sortCompare(new Date(2018, 0, 1), new Date(2017, 0, 1))).to.be.greaterThan(0);
    expect(converter.sortCompare(new Date(2017, 0, 1), new Date(2018, 0, 1))).to.be.lessThan(0);
    expect(converter.sortCompare(new Date(2018, 0, 1), new Date(2018, 0, 1))).to.be.equal(0);
  });

  it("isLessGreaterType", () => {
    expect(converter.isLessGreaterType).to.be.true;
  });

  it("isLessThan", () => {
    expect(converter.isLessThan(new Date(2017, 0, 1), new Date(2018, 0, 1))).to.be.true;
    expect(converter.isLessThan(new Date(2018, 0, 1), new Date(2017, 0, 1))).to.be.false;
  });

  it("isLessThanOrEqualTo", () => {
    expect(converter.isLessThanOrEqualTo(new Date(2017, 0, 1), new Date(2018, 0, 1))).to.be.true;
    expect(converter.isLessThanOrEqualTo(new Date(2018, 0, 1), new Date(2018, 0, 1))).to.be.true;
    expect(converter.isLessThanOrEqualTo(new Date(2018, 0, 1), new Date(2017, 0, 1))).to.be.false;
  });

  it("isGreaterThan", () => {
    expect(converter.isGreaterThan(new Date(2018, 0, 1), new Date(2017, 0, 1))).to.be.true;
    expect(converter.isGreaterThan(new Date(2017, 0, 1), new Date(2018, 0, 1))).to.be.false;
  });

  it("isGreaterThanOrEqualTo", () => {
    expect(converter.isGreaterThanOrEqualTo(new Date(2018, 0, 1), new Date(2017, 0, 1))).to.be.true;
    expect(converter.isGreaterThanOrEqualTo(new Date(2018, 0, 1), new Date(2018, 0, 1))).to.be.true;
    expect(converter.isGreaterThanOrEqualTo(new Date(2017, 0, 1), new Date(2018, 0, 1))).to.be.false;
  });

  it("isEqualTo", () => {
    expect(converter.isEqualTo(new Date(2018, 0, 1), new Date(2017, 0, 1))).to.be.false;
    expect(converter.isEqualTo(new Date(2018, 0, 1), new Date(2018, 0, 1))).to.be.true;
  });

  it("isNotEqualTo", () => {
    expect(converter.isNotEqualTo(new Date(2018, 0, 1), new Date(2017, 0, 1))).to.be.true;
    expect(converter.isNotEqualTo(new Date(2018, 0, 1), new Date(2018, 0, 1))).to.be.false;
  });

  it("isLessGreaterType returns true", () => {
    expect(converter.isLessGreaterType).to.be.true;
  });
});

describe("DateTimeTypeConverter", () => {
  let converter: DateTimeTypeConverter;

  beforeEach(() => {
    converter = new DateTimeTypeConverter();
  });

  it("convertFromString", () => {
    const testDate = new Date(2018, 0, 1, 1, 15, 30);
    const convertedDate = converter.convertFromString("1/1/2018 1:15:30 AM");
    expect(convertedDate).to.not.be.undefined;
    expect(convertedDate!.valueOf()).to.eq(testDate.valueOf());
  });

});
