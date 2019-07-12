/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { Point2dTypeConverter, Point3dTypeConverter, ConvertedPrimitives } from "../../ui-components";
import TestUtils from "../TestUtils";

describe("Point2dTypeConverter", () => {

  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  let converter: Point2dTypeConverter;

  beforeEach(() => {
    converter = new Point2dTypeConverter();
  });

  describe("convertToString", () => {
    it("returns correct string for strings' array input", () => {
      expect(converter.convertToString(["50", "100"])).to.equal("50, 100");
    });

    it("returns correct string for numbers' array input", () => {
      expect(converter.convertToString([50, 100])).to.equal("50, 100");
    });

    it("returns correct string for object input", () => {
      expect(converter.convertToString({ x: 50, y: 100 })).to.equal("50, 100");
    });

    it("returns empty string if value is undefined", () => {
      expect(converter.convertToString(undefined)).to.equal("");
    });

    it("returns empty string if value is an empty array", () => {
      expect(converter.convertToString([])).to.equal("");
    });
  });

  describe("convertFromString", () => {
    it("returns correct object", () => {
      const point2d = converter.convertFromString("50, 100");
      expect(point2d).to.not.be.undefined;
      expect(point2d!.x).to.equal(50);
      expect(point2d!.y).to.equal(100);
    });

    it("returns undefined if string is wrong", () => {
      expect(converter.convertFromString("50, 100, 150")).to.be.undefined;
    });
  });

  describe("sortCompare", () => {
    it("returns less than 0 when first value is invalid", () => {
      expect(converter.sortCompare(["a", "b", "c"], ["1", "2"])).to.be.lessThan(0);
    });

    it("returns greater than 0 when second value is invalid", () => {
      expect(converter.sortCompare(["1", "2"], ["a", "b", "c"])).to.be.greaterThan(0);
    });

    it("returns 0 if points are mirrored", () => {
      expect(converter.sortCompare(["1", "1"], ["-1", "-1"])).to.be.eq(0);
    });

    it("returns less than 0 if second point is further from [0,0]", () => {
      expect(converter.sortCompare(["1", "1"], ["2", "2"])).to.be.lessThan(0);
    });

    it("returns greater than 0 if first point is further from [0,0]", () => {
      expect(converter.sortCompare(["2", "2"], ["1", "1"])).to.be.greaterThan(0);
    });
  });

});

describe("Point3dTypeConverter", () => {

  before(async () => {
    await TestUtils.initializeUiComponents();
  });

  let converter: Point3dTypeConverter;

  beforeEach(() => {
    converter = new Point3dTypeConverter();
  });

  describe("convertToString", () => {
    it("returns correct string for strings' array input", () => {
      expect(converter.convertToString(["50", "100", "150"])).to.equal("50, 100, 150");
    });

    it("returns correct string for numbers' array input", () => {
      expect(converter.convertToString([50, 100, 150])).to.equal("50, 100, 150");
    });

    it("returns correct string for object input", () => {
      expect(converter.convertToString({ x: 50, y: 100, z: 150 })).to.equal("50, 100, 150");
    });

    it("rounds values to 2 decimal places", () => {
      expect(converter.convertToString({ x: 50.123, y: 60.456, z: 70.101 })).to.equal("50.12, 60.46, 70.1");
    });

    it("returns empty string if value is undefined", () => {
      expect(converter.convertToString(undefined)).to.equal("");
    });
  });

  describe("convertFromString", () => {
    it("returns correct object", () => {
      const point3d = converter.convertFromString("50, 100, 150") as ConvertedPrimitives.Point3d;
      expect(point3d).to.not.be.undefined;
      expect(point3d.x).to.equal(50);
      expect(point3d.y).to.equal(100);
      expect(point3d.z).to.equal(150);
    });

    it("returns undefined if string is wrong", () => {
      expect(converter.convertFromString("50, 100")).to.be.undefined;
    });
  });

  describe("sortCompare", () => {
    it("returns less than 0 when first value is invalid", () => {
      expect(converter.sortCompare(["a", "b", "c"], ["1", "2", "1"])).to.be.lessThan(0);
    });

    it("returns 0 if points are mirrored", () => {
      expect(converter.sortCompare(["1", "1", "-2"], ["-1", "-1", "2"])).to.be.eq(0);
    });

    it("returns less than 0 if second point is further from [0,0,0]", () => {
      expect(converter.sortCompare(["1", "1", "1"], ["2", "2", "2"])).to.be.lessThan(0);
    });

    it("returns greater than 0 if first point is further from [0,0,0]", () => {
      expect(converter.sortCompare(["2", "2", "2"], ["1", "1", "1"])).to.be.greaterThan(0);
    });
  });
});
