/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Annulus, Circle, Line } from "../../core-react/radialmenu/Annulus.js";
import { Point } from "../../core-react/utils/Point.js";

describe("Annulus", () => {
  describe("Point", () => {
    it("should default correctly", () => {
      const point = new Point();
      const point2 = new Point(0, 0);
      expect(point.equals(point2)).toEqual(true);
    });
  });

  describe("Line", () => {
    it("should default correctly", () => {
      const line = new Line();
      const line2 = new Line(new Point(), new Point());
      expect(line.equals(line2)).toEqual(true);
    });
  });

  describe("Circle", () => {
    it("should default correctly", () => {
      const circle = new Circle();
      const circle2 = new Circle(new Point(), 0);
      expect(circle.center.equals(circle2.center)).toEqual(true);
      expect(circle.radius).toEqual(circle2.radius);
    });
  });

  describe("Annulus ", () => {
    it("should default correctly", () => {
      const annulus = new Annulus();
      const annulus2 = new Annulus(new Point(), 0, 0);
      expect(annulus.center.equals(annulus2.center)).toEqual(true);
      expect(annulus.inner.center.equals(annulus2.inner.center)).toEqual(true);
      expect(annulus.inner.radius).toEqual(annulus2.inner.radius);
      expect(annulus.outer.center.equals(annulus2.outer.center)).toEqual(true);
      expect(annulus.outer.radius).toEqual(annulus2.outer.radius);
    });
  });
});
