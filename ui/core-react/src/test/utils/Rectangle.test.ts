/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { RectangleProps } from "../../core-react.js";
import { Point } from "../../core-react/utils/Point.js";
import { Corner, Rectangle } from "../../core-react/utils/Rectangle.js";

describe("Rectangle", () => {
  it("unspecified bounds should be 0", () => {
    const sut = new Rectangle();
    expect(sut.left).toEqual(0);
    expect(sut.top).toEqual(0);
    expect(sut.right).toEqual(0);
    expect(sut.bottom).toEqual(0);
  });

  it("should specify bounds while constructing", () => {
    const sut = new Rectangle(1, 2, 3, 4);
    expect(sut.left).toEqual(1);
    expect(sut.top).toEqual(2);
    expect(sut.right).toEqual(3);
    expect(sut.bottom).toEqual(4);
  });

  it("should create from size with left top at (0, 0)", () => {
    const sut = Rectangle.createFromSize({ width: 10, height: 15 });
    expect(sut.left).toEqual(0);
    expect(sut.top).toEqual(0);
    expect(sut.right).toEqual(10);
    expect(sut.bottom).toEqual(15);
  });

  it("should get size of this rectangle", () => {
    const sut = new Rectangle(-5, 2, 5, 4).getSize();
    expect(sut.width).toEqual(10);
    expect(sut.height).toEqual(2);
  });

  it("should get top left corner", () => {
    const sut = new Rectangle(-5, 2, 5, 4).getCorner(Corner.TopLeft);
    expect(sut.x).toEqual(-5);
    expect(sut.y).toEqual(2);
  });

  it("should get top right corner", () => {
    const sut = new Rectangle(-5, 2, 5, 4).getCorner(Corner.TopRight);
    expect(sut.x).toEqual(5);
    expect(sut.y).toEqual(2);
  });

  it("should get bottom left corner", () => {
    const sut = new Rectangle(-5, 2, 5, 4).getCorner(Corner.BottomLeft);
    expect(sut.x).toEqual(-5);
    expect(sut.y).toEqual(4);
  });

  it("should get bottom right corner", () => {
    const sut = new Rectangle(-5, 2, 5, 4).getCorner(Corner.BottomRight);
    expect(sut.x).toEqual(5);
    expect(sut.y).toEqual(4);
  });

  it("should return offset rectangle", () => {
    const sut = new Rectangle(-5, 2, 5, 4).offset({ x: 2, y: 3 });
    expect(sut.left).toEqual(-3);
    expect(sut.top).toEqual(5);
    expect(sut.right).toEqual(7);
    expect(sut.bottom).toEqual(7);
  });

  it("should X offset rectangle", () => {
    const sut = new Rectangle(-5, 2, 5, 4).offsetX(3);
    expect(sut.left).toEqual(-2);
    expect(sut.top).toEqual(2);
    expect(sut.right).toEqual(8);
    expect(sut.bottom).toEqual(4);
  });

  it("should Y offset rectangle", () => {
    const sut = new Rectangle(-5, 2, 5, 4).offsetY(3);
    expect(sut.left).toEqual(-5);
    expect(sut.top).toEqual(5);
    expect(sut.right).toEqual(5);
    expect(sut.bottom).toEqual(7);
  });

  it("should return rectangle with specified height, but with same left and top bounds", () => {
    const sut = new Rectangle(-5, 2, 5, 8).setHeight(1);
    expect(sut.left).toEqual(-5);
    expect(sut.top).toEqual(2);
    expect(sut.right).toEqual(5);
    expect(sut.bottom).toEqual(3);
  });

  it("should return rectangle with new size", () => {
    const sut = new Rectangle(-5, 2, 5, 8).setSize({
      height: 100,
      width: 150,
    });
    expect(sut.left).toEqual(-5);
    expect(sut.top).toEqual(2);
    expect(sut.right).toEqual(145);
    expect(sut.bottom).toEqual(102);
  });

  it("should return true if other rectangle is equal", () => {
    const sut = new Rectangle(-5, 2, 5, 8).equals({
      left: -5,
      top: 2,
      right: 5,
      bottom: 8,
    });
    expect(sut).toEqual(true);
  });

  it("should return false if left bound of other rectangle is not equal", () => {
    const sut = new Rectangle(-5, 2, 5, 8).equals({
      left: 5,
      top: 2,
      right: 5,
      bottom: 8,
    });
    expect(sut).toEqual(false);
  });

  it("should return false if top bound of other rectangle is not equal", () => {
    const sut = new Rectangle(-5, 2, 5, 8).equals({
      left: 5,
      top: 6,
      right: 5,
      bottom: 8,
    });
    expect(sut).toEqual(false);
  });

  it("should return false if right bound of other rectangle is not equal", () => {
    const sut = new Rectangle(-5, 2, 5, 8).equals({
      left: 5,
      top: 6,
      right: 6,
      bottom: 8,
    });
    expect(sut).toEqual(false);
  });

  it("should return false if bottom bound of other rectangle is not equal", () => {
    const sut = new Rectangle(-5, 2, 5, 8).equals({
      left: 5,
      top: 6,
      right: 5,
      bottom: 10,
    });
    expect(sut).toEqual(false);
  });

  it("should return true if rectangle contains the point", () => {
    const sut = new Rectangle(-5, 2, 5, 8).containsPoint({ x: 2, y: 2 });
    expect(sut).toEqual(true);
  });

  it("should return false if rectangle does not contain the point", () => {
    const sut = new Rectangle(-5, 0, 5, 1).containsPoint({ x: 2, y: 2 });
    expect(sut).toEqual(false);
  });

  it("should return true if rectangle contains the x,y", () => {
    const sut = new Rectangle(-5, 2, 5, 8).containsXY(2, 2);
    expect(sut).toEqual(true);
  });

  it("should return false if rectangle does not contain the x,y", () => {
    const sut = new Rectangle(-5, 0, 5, 1).containsXY(2, 2);
    expect(sut).toEqual(false);
  });

  it("should return true if rectangle contains other rectangle", () => {
    const sut = new Rectangle(-5, 2, 5, 7).contains({
      left: -4,
      top: 3,
      right: 4,
      bottom: 6,
    });
    expect(sut).toEqual(true);
  });

  it("should return false if rectangle does not contain other rectangle", () => {
    const other: RectangleProps = {
      left: -4,
      top: 3,
      right: 4,
      bottom: 8,
    };
    const sut = new Rectangle(-5, 2, 5, 7).contains(other);
    expect(sut).toEqual(false);
  });

  it("should get top left point", () => {
    const sut = new Rectangle(-5, 2, 5, 4).topLeft();
    expect(sut.x).toEqual(-5);
    expect(sut.y).toEqual(2);
  });

  it("should return true if rectangle intersects other rectangle", () => {
    const sut = new Rectangle(-5, 2, 5, 7).intersects({
      left: -4,
      top: 3,
      right: 4,
      bottom: 8,
    });
    expect(sut).toEqual(true);
  });

  it("should return false if rectangle does not intersect other rectangle", () => {
    const sut = new Rectangle(-5, 2, 5, 7).intersects({
      left: -4,
      top: 3,
      right: 4,
      bottom: 6,
    });
    expect(sut).toEqual(true);
  });

  it("should outer merge with other rectangle", () => {
    const rect = new Rectangle(0, 5, 10, 20);
    const other: RectangleProps = {
      left: 0,
      top: 20,
      right: 10,
      bottom: 30,
    };
    const sut = rect.outerMergeWith(other);
    expect(sut.left).toEqual(0);
    expect(sut.top).toEqual(5);
    expect(sut.right).toEqual(10);
    expect(sut.bottom).toEqual(30);
  });

  it("should return new positioned rectangle", () => {
    const rect = new Rectangle(0, 5, 10, 20);
    const sut = rect.setPosition({ x: 10, y: 1 });

    expect(sut).not.toEqual(rect);
    expect(sut.left).toEqual(10);
    expect(sut.top).toEqual(1);
    expect(sut.right).toEqual(20);
    expect(sut.bottom).toEqual(16);
  });

  it("should contain vertically in rectangle", () => {
    const sut = new Rectangle(1, 5, 11, 17).containVerticallyIn({
      left: 2,
      top: 8,
      right: 10,
      bottom: 12,
    });

    expect(sut.left).toEqual(1);
    expect(sut.right).toEqual(11);
    expect(sut.top).toEqual(8);
    expect(sut.bottom).toEqual(20);
  });

  it("should contain horizontally in rectangle", () => {
    const sut = new Rectangle(1, 5, 11, 17).containHorizontallyIn({
      left: 2,
      top: 8,
      right: 10,
      bottom: 12,
    });

    expect(sut.left).toEqual(2);
    expect(sut.right).toEqual(12);
    expect(sut.top).toEqual(5);
    expect(sut.bottom).toEqual(17);
  });

  it("create should create rectangle", () => {
    const sut = Rectangle.create({ left: 1, top: 2, right: 3, bottom: 4 });
    expect(sut.left).toEqual(1);
    expect(sut.top).toEqual(2);
    expect(sut.right).toEqual(3);
    expect(sut.bottom).toEqual(4);
  });

  it("inset should return updated rectangle", () => {
    const sut = new Rectangle(0, 0, 10, 10).inset(1, 2, 3, 4);
    expect(sut.left).toEqual(1);
    expect(sut.top).toEqual(2);
    expect(sut.right).toEqual(7);
    expect(sut.bottom).toEqual(6);
  });

  it("setWidth should update width", () => {
    const sut = new Rectangle(0, 0, 10, 10).setWidth(20);
    expect(sut.right).toEqual(20);
  });

  it("containIn should return correct rectangle", () => {
    const rect1 = Rectangle.create({ left: 0, top: 0, right: 10, bottom: 10 });
    const rect2 = Rectangle.create({ left: 5, top: 5, right: 20, bottom: 20 });
    const sut = rect1.containIn(rect2);
    expect(sut.equals(new Rectangle(5, 5, 15, 15))).toEqual(true);
  });

  it("center should return correct point", () => {
    const sut = new Rectangle(0, 0, 10, 10).center();
    expect(sut.equals(new Point(5, 5))).toEqual(true);
  });

  it("toProps should return correct props", () => {
    const sut = new Rectangle(0, 5, 10, 20).toProps();
    expect(sut.left).toEqual(0);
    expect(sut.top).toEqual(5);
    expect(sut.right).toEqual(10);
    expect(sut.bottom).toEqual(20);
  });

  it("getVerticalSegmentBounds should return correct point", () => {
    const rect = new Rectangle(0, 0, 30, 30);
    let sut = rect.getVerticalSegmentBounds(0, 3);
    expect(sut.equals(new Rectangle(0, 0, 30, 10))).toEqual(true);
    sut = rect.getVerticalSegmentBounds(1, 3);
    expect(sut.equals(new Rectangle(0, 10, 30, 20))).toEqual(true);
    sut = rect.getVerticalSegmentBounds(2, 3);
    expect(sut.equals(new Rectangle(0, 20, 30, 30))).toEqual(true);
  });

  it("getHorizontalSegmentBounds should return correct point", () => {
    const rect = new Rectangle(0, 0, 30, 30);
    let sut = rect.getHorizontalSegmentBounds(0, 3);
    expect(sut.equals(new Rectangle(0, 0, 10, 30))).toEqual(true);
    sut = rect.getHorizontalSegmentBounds(1, 3);
    expect(sut.equals(new Rectangle(10, 0, 20, 30))).toEqual(true);
    sut = rect.getHorizontalSegmentBounds(2, 3);
    expect(sut.equals(new Rectangle(20, 0, 30, 30))).toEqual(true);
  });

  it("getShortestDistanceToPoint should return correct distance", () => {
    const rect = new Rectangle(10, 10, 30, 30);

    let sut = rect.getShortestDistanceToPoint(new Point(10, 0));
    expect(sut).toEqual(10);
    sut = rect.getShortestDistanceToPoint(new Point(30, 0));
    expect(sut).toEqual(10);
    sut = rect.getShortestDistanceToPoint(new Point(0, 10));
    expect(sut).toEqual(10);
    sut = rect.getShortestDistanceToPoint(new Point(40, 10));
    expect(sut).toEqual(10);
    sut = rect.getShortestDistanceToPoint(new Point(10, 40));
    expect(sut).toEqual(10);
    sut = rect.getShortestDistanceToPoint(new Point(30, 40));
    expect(sut).toEqual(10);

    sut = rect.getShortestDistanceToPoint(new Point(0, 20));
    expect(sut).toEqual(10);
    sut = rect.getShortestDistanceToPoint(new Point(40, 20));
    expect(sut).toEqual(10);
    sut = rect.getShortestDistanceToPoint(new Point(20, 0));
    expect(sut).toEqual(10);
    sut = rect.getShortestDistanceToPoint(new Point(40, 20));
    expect(sut).toEqual(10);

    const isoscelesLength = 14.142135623730951;
    sut = rect.getShortestDistanceToPoint(new Point(0, 0));
    expect(sut).toEqual(isoscelesLength);
    sut = rect.getShortestDistanceToPoint(new Point(40, 0));
    expect(sut).toEqual(isoscelesLength);
    sut = rect.getShortestDistanceToPoint(new Point(0, 40));
    expect(sut).toEqual(isoscelesLength);
    sut = rect.getShortestDistanceToPoint(new Point(40, 40));
    expect(sut).toEqual(isoscelesLength);

    sut = rect.getShortestDistanceToPoint(new Point(20, 20));
    expect(sut).toEqual(0);
  });
});
