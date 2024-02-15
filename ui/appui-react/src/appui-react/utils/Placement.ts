/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
type Side = "Left" | "Top" | "Right" | "Bottom";
type Corner = "TopLeft" | "TopRight" | "BottomLeft" | "BottomRight" | "RightTop" | "LeftTop"

/**
 * Identifies the placement of a given element.
 * @public
 */
export type Placement = Side | Corner;

/**
 * Copy of appui-abstract's RelativePosition for use in below utilities.
 * Should be removed N+1 major versions after the deprecation.
 */
enum RelativePosition {
  Left = 0,
  Top = 1,
  Right = 2,
  Bottom = 3,
  TopLeft = 4,
  TopRight = 5,
  BottomLeft = 6,
  BottomRight = 7,
  RightTop = 8,
  LeftTop = 9
}

/**
 * Union type used for transition away from appui-abstract.
 * Should be removed N+1 major versions after its deprecation.
 * @internal
 */
export type PlacementOrRelativePosition = Placement | RelativePosition;

/**
 * Utility for converting a Placement or RelativePosition to a RelativePosition.
 * Should be removed N+1 major versions after RelativePosition's deprecation.
 * @internal
 */
export function mapToRelativePosition(input: Placement | RelativePosition): RelativePosition {
  if (typeof input === 'string')
    return RelativePosition[input as keyof typeof RelativePosition];

  return input;
}

/**
 * Utility for converting a RelativePosition to a Placement.
 * Should most likely be removed N+1 major versions after RelativePosition's deprecation.
 * @internal
 */
export function mapRelativePositionToPlacement(input?: Placement | RelativePosition): Placement {
  if (!input) return "TopRight";

  if (typeof input === 'string')
    return input;

  return RelativePosition[input] as Placement;
}
