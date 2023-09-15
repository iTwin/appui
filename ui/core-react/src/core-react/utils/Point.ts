/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import type { XAndY } from "@itwin/core-geometry";

/** Describes and provides methods to work with 2d points.
 * @internal
 */
export class Point implements XAndY {
  /** Creates point from [[Geometry.XAndY]]. */
  public static create(XAndY: XAndY) {
    return new Point(XAndY.x, XAndY.y);
  }

  /** Creates a new point. */
  public constructor(public readonly x = 0, public readonly y = 0) {}

  /** Calculates Euclidean distance to other point. */
  public getDistanceTo(other: XAndY): number {
    const offset = this.getOffsetTo(other);
    return Math.sqrt(Math.pow(offset.x, 2) + Math.pow(offset.y, 2));
  }

  /** Calculates grid-like distance to other point. */
  public getManhattanDistanceTo(other: XAndY): number {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
  }

  /** Gets offset to other point. */
  public getOffsetTo(other: XAndY) {
    return new Point(other.x - this.x, other.y - this.y);
  }

  /** @returns New [[Point]] that is offset along the X and Y axes. */
  public offset(offset: XAndY) {
    return new Point(this.x + offset.x, this.y + offset.y);
  }

  /** @returns New [[Point]] that is offset along the X axis. */
  public offsetX(offset: number) {
    return new Point(this.x + offset, this.y);
  }

  /** @returns New [[Point]] that is offset along the Y axis. */
  public offsetY(offset: number) {
    return new Point(this.x, this.y + offset);
  }

  /** @returns True if position of this and other points are equal. */
  public equals(other: XAndY) {
    return other.x === this.x && other.y === this.y;
  }

  /** @returns New [[Point]] with modified x value. */
  public setX(x: number) {
    return new Point(x, this.y);
  }

  /** @returns New [[Point]] with modified y value. */
  public setY(y: number) {
    return new Point(this.x, y);
  }

  /** @returns New [[Point]] with coordinates multiplied by specified factor. */
  public multiply(factor: number) {
    return new Point(this.x * factor, this.y * factor);
  }

  /** @returns [[Geometry.XAndY]] object for this point. */
  public toProps(): XAndY {
    return {
      x: this.x,
      y: this.y,
    };
  }
}
