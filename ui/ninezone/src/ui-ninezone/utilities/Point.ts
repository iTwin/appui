/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Utilities */

/** Describes [[Point]].
 * @beta
 */
export interface PointProps {
  readonly x: number;
  readonly y: number;
}

/** Describes and provides methods to work with 2d points.
 * @alpha
 */
export class Point implements PointProps {
  /** Creates point from [[PointProps]]. */
  public static create(pointProps: PointProps) {
    return new Point(pointProps.x, pointProps.y);
  }

  /** Creates a new point. */
  public constructor(public readonly x = 0, public readonly y = 0) {
  }

  /** Calculates distance to other point. */
  public getDistanceTo(other: PointProps): number {
    const offset = this.getOffsetTo(other);
    return Math.sqrt(Math.pow(offset.x, 2) + Math.pow(offset.y, 2));
  }

  /** Gets offset to other point. */
  public getOffsetTo(other: PointProps) {
    return new Point(other.x - this.x, other.y - this.y);
  }

  /** @returns New [[Point]] that is offset along the X and Y axes. */
  public offset(offset: PointProps) {
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
  public equals(other: PointProps) {
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
}
