/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { HexadecimalTypeConverter } from "../../components-react.js";

describe("HexadecimalTypeConverter", () => {
  let converter: HexadecimalTypeConverter;

  beforeEach(() => {
    converter = new HexadecimalTypeConverter();
  });

  describe("convertToString", () => {
    it("returns correct string", () => {
      expect(converter.convertToString("0xff")).to.equal("0xFF");
      expect(converter.convertToString("0xaabbcc")).to.equal("0xAABBCC");
      expect(converter.convertToString("0xaabbccff")).to.equal("0xAABBCCFF");
    });

    it("returns empty string when value is undefined", () => {
      expect(converter.convertToString(undefined)).to.equal("");
    });
  });

  describe("convertFromString", () => {
    it("returns correct values", () => {
      expect(converter.convertFromString("FF")).toEqual("0xff");
      expect(converter.convertFromString("0xFF")).toEqual("0xff");
      expect(converter.convertFromString("0x000000FF")).toEqual("0xff");
      // cspell:disable-next-line
      expect(converter.convertFromString("AABBCC")).toEqual("0xaabbcc");
      // cspell:disable-next-line
      expect(converter.convertFromString("AABBCCFF")).toEqual("0xaabbccff");
      expect(converter.convertFromString("0xAABBCCFF")).toEqual("0xaabbccff");
    });

    it("returns undefined when string is incorrect", () => {
      expect(converter.convertFromString("GFF")).toEqual(undefined);
    });
  });

  describe("sortCompare", () => {
    it("returns correct values when number is lower than 2^32", () => {
      expect(
        converter.sortCompare("0xff0000ff", "0x000000ff")
      ).to.be.greaterThan(0);
      expect(converter.sortCompare("0x000000ff", "0xff0000ff")).to.be.lessThan(
        0
      );
      expect(converter.sortCompare("0xff0000ff", "0xff0000ff")).to.equal(0);
    });

    it("returns correct values when number is bigger than 2^32", () => {
      expect(
        converter.sortCompare("0xff000000ff0000ff", "000000000x000000ff")
      ).to.be.greaterThan(0);
      expect(
        converter.sortCompare("0x00000000000000ff", "0xff000000ff0000ff")
      ).to.be.lessThan(0);
      expect(
        converter.sortCompare("0xff000000ff0000ff", "0xff000000ff0000ff")
      ).to.equal(0);
    });

    it("returns 0 even when strings are represented slightly differently", () => {
      expect(converter.sortCompare("0xff", "0x00ff")).to.equal(0);
      expect(converter.sortCompare("0xFF", "0xff")).to.equal(0);
      expect(converter.sortCompare("0xFF", "0x00ff")).to.equal(0);
    });
  });
});
