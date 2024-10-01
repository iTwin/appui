/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Point } from "../../core-react/utils/Point.js";

describe("Point", () => {
  it("unspecified coordinates should be 0", () => {
    const sut = new Point();
    expect(sut.x).toEqual(0);
    expect(sut.y).toEqual(0);
  });

  it("should specify coordinates in constructor", () => {
    const sut = new Point(5, 4);
    expect(sut.x).toEqual(5);
    expect(sut.y).toEqual(4);
  });

  it("should create point from point props", () => {
    const sut = Point.create({ x: 1, y: 2 });
    expect(sut.x).toEqual(1);
    expect(sut.y).toEqual(2);
  });

  it("should get Euclidean distance to other point", () => {
    const sut = new Point(1, 2).getDistanceTo({ x: -1, y: -2 });
    expect(sut).toBeCloseTo(4.472, 0.001);
  });

  it("should get offset to other point", () => {
    const sut = new Point(1, 2).getOffsetTo({ x: 5, y: 10 });
    expect(sut.x).toEqual(4);
    expect(sut.y).toEqual(8);
  });

  it("should return offsetted point", () => {
    const sut = new Point(1, 2).offset({ x: 5, y: 10 });
    expect(sut.x).toEqual(6);
    expect(sut.y).toEqual(12);
  });

  it("should offset by X", () => {
    const sut = new Point(1, 2).offsetX(3);
    expect(sut.x).toEqual(4);
    expect(sut.y).toEqual(2);
  });

  it("should offset by Y", () => {
    const sut = new Point(1, 2).offsetY(3);
    expect(sut.x).toEqual(1);
    expect(sut.y).toEqual(5);
  });

  it("should return true if other point is equal", () => {
    const sut = new Point(1, 2).equals({ x: 1, y: 2 });
    expect(sut).toEqual(true);
  });

  it("should return false if other point X is not equal", () => {
    const sut = new Point(2, 2).equals({ x: 1, y: 2 });
    expect(sut).toEqual(false);
  });

  it("should return false if other point Y is not equal", () => {
    const sut = new Point(1, 1).equals({ x: 1, y: 2 });
    expect(sut).toEqual(false);
  });

  it("should set x by returning a new point", () => {
    const point = new Point(1, 1);
    const sut = point.setX(10);

    expect(sut).not.toEqual(point);
    expect(sut.x).toEqual(10);
    expect(sut.y).toEqual(1);
  });

  it("should set y by returning a new point", () => {
    const point = new Point(1, 1);
    const sut = point.setY(10);

    expect(sut).not.toEqual(point);
    expect(sut.x).toEqual(1);
    expect(sut.y).toEqual(10);
  });

  it("should multiply point by a given factor", () => {
    const sut = new Point(2, 3).multiply(4);
    expect(sut.x).toEqual(8);
    expect(sut.y).toEqual(12);
  });

  it("should return {x,y} object", () => {
    const sut = new Point(1, 2).toProps();
    expect(Object.keys(sut)).toHaveLength(2);
    expect(sut.x).toEqual(1);
    expect(sut.y).toEqual(2);
  });
});
