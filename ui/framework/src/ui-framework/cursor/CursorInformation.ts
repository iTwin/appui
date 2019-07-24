/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Cursor */

import { RelativePosition } from "@bentley/imodeljs-frontend";
import { UiEvent } from "@bentley/ui-core";
import { Point } from "@bentley/ui-ninezone";

/** @alpha */
export enum CursorDirectionParts {
  Top = 0x1000,
  Left = 0x0100,
  Right = 0x0010,
  Bottom = 0x0001,
}

/** @alpha */
export enum CursorDirection {
  None = 0,
  Top = CursorDirectionParts.Top,
  Left = CursorDirectionParts.Left,
  Right = CursorDirectionParts.Right,
  Bottom = CursorDirectionParts.Bottom,
  TopLeft = CursorDirectionParts.Top | CursorDirectionParts.Left,
  TopRight = CursorDirectionParts.Top | CursorDirectionParts.Right,
  BottomLeft = CursorDirectionParts.Bottom | CursorDirectionParts.Left,
  BottomRight = CursorDirectionParts.Bottom | CursorDirectionParts.Right,
}

/** Cursor Updated Event Args interface.
 * @alpha
 */
export interface CursorUpdatedEventArgs {
  oldPt: Point;
  newPt: Point;
  direction: CursorDirection;
}

/** Cursor Updated Event class.
 * @alpha
 */
export class CursorUpdatedEvent extends UiEvent<CursorUpdatedEventArgs> { }

/** Cursor CursorInformation
 * @alpha
 */
export class CursorInformation {
  private static _cursorPosition: Point = new Point();
  private static _cursorDirection: CursorDirection = CursorDirection.BottomRight;

  private static _cursorDirections = new Array<CursorDirection>();

  public static set cursorPosition(pt: Point) { this._cursorPosition = pt; }
  public static get cursorPosition(): Point { return this._cursorPosition; }
  public static get cursorX(): number { return this._cursorPosition.x; }
  public static get cursorY(): number { return this._cursorPosition.y; }

  public static get cursorDirection(): CursorDirection { return this._cursorDirection; }

  public static readonly onCursorUpdatedEvent = new CursorUpdatedEvent();

  public static handleMouseMove(point: Point): void {
    const oldPt = CursorInformation.cursorPosition;
    const direction = this._determineMostFrequentDirection(this._cursorDirections, this.cursorPosition, point);

    this.cursorPosition = point;
    this._cursorDirection = direction;

    this.onCursorUpdatedEvent.emit({ oldPt, newPt: point, direction });
  }

  private static _determineMostFrequentDirection(cursorDirections: CursorDirection[], oldPt: Point, newPt: Point): CursorDirection {
    const cursorDirection = this._determineCursorDirection(oldPt, newPt);
    cursorDirections.push(cursorDirection);
    if (cursorDirections.length > 10)
      cursorDirections.shift();
    return this._mostFrequent(cursorDirections);
  }

  private static _mostFrequent(array: CursorDirection[]): CursorDirection {
    const hashMap = new Map<CursorDirection, number>();
    let maxCount = 0, mostFrequent = CursorDirection.None;

    array.forEach((value: CursorDirection) => {
      const key = value;
      let frequency = hashMap.get(key);

      if (frequency !== undefined)
        frequency++;
      else
        frequency = 1;

      hashMap.set(key, frequency);

      if (frequency > maxCount) {
        mostFrequent = key;
        maxCount = frequency;
      }
    });

    return mostFrequent;
  }

  private static _determineCursorDirection(oldPt: Point, newPt: Point): CursorDirection {
    let directionParts: number = 0;

    if (newPt.x < oldPt.x)
      directionParts |= CursorDirectionParts.Left;
    else if (newPt.x > oldPt.x)
      directionParts |= CursorDirectionParts.Right;

    if (newPt.y < oldPt.y)
      directionParts |= CursorDirectionParts.Top;
    else if (newPt.y > oldPt.y)
      directionParts |= CursorDirectionParts.Bottom;

    const direction = directionParts as CursorDirection;

    return direction;
  }

  public static getRelativePositionFromCursorDirection(cursorDirection: CursorDirection): RelativePosition {
    let relativePosition: RelativePosition = RelativePosition.BottomRight;

    switch (cursorDirection) {
      case CursorDirection.Top:
        relativePosition = RelativePosition.Top;
        break;
      case CursorDirection.Left:
        relativePosition = RelativePosition.Left;
        break;
      case CursorDirection.Right:
        relativePosition = RelativePosition.Right;
        break;
      case CursorDirection.Bottom:
        relativePosition = RelativePosition.Bottom;
        break;
      case CursorDirection.TopLeft:
        relativePosition = RelativePosition.TopLeft;
        break;
      case CursorDirection.TopRight:
        relativePosition = RelativePosition.TopRight;
        break;
      case CursorDirection.BottomLeft:
        relativePosition = RelativePosition.BottomLeft;
        break;
      case CursorDirection.BottomRight:
        relativePosition = RelativePosition.BottomRight;
        break;
    }

    return relativePosition;
  }

  /** @internal - for testing */
  public static clearCursorDirections(): void {
    this._cursorDirections.length = 0;
  }
}
