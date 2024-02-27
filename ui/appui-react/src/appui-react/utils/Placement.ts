/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import { RelativePosition } from "@itwin/appui-abstract";

/**
 * Identifies which side of a target an element should be placed.
 * Without an {@link Alignment}, the element center will be placed at the center of the target.
 */
type Side = "left" | "top" | "right" | "bottom";
type Alignment = "start" | "end";

/**
 * Identifies the placement of a given element.
 * @public
 */
export type Placement = Side | `${Side}-${Alignment}`;

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
export function mapToRelativePosition(
  input: Placement | RelativePosition
): RelativePosition {
  if (typeof input === "string") return placementToRelativePositionMap[input];

  return input;
}

/**
 * Utility for converting a RelativePosition to a Placement.
 * Should most likely be removed N+1 major versions after RelativePosition's deprecation.
 * @internal
 */
export function mapToPlacement(
  input?: Placement | RelativePosition
): Placement {
  if (!input) return "top-end";

  if (typeof input === "string") return input;

  return relativePositionToPlacementMap[input];
}

const placementToRelativePositionMap: { [key in Placement]: RelativePosition } =
{
  left: RelativePosition.Left,
  top: RelativePosition.Top,
  right: RelativePosition.Right,
  bottom: RelativePosition.Bottom,
  "left-start": RelativePosition.LeftTop,
  "left-end": RelativePosition.Left,
  "right-start": RelativePosition.RightTop,
  "right-end": RelativePosition.Right,
  "top-start": RelativePosition.TopLeft,
  "top-end": RelativePosition.TopRight,
  "bottom-start": RelativePosition.BottomLeft,
  "bottom-end": RelativePosition.BottomRight,
};

const relativePositionToPlacementMap: { [key in RelativePosition]: Placement } =
{
  [RelativePosition.Left]: "left",
  [RelativePosition.Top]: "top",
  [RelativePosition.Right]: "right",
  [RelativePosition.Bottom]: "bottom",
  [RelativePosition.LeftTop]: "left-start",
  [RelativePosition.RightTop]: "right-start",
  [RelativePosition.TopLeft]: "top-start",
  [RelativePosition.TopRight]: "top-end",
  [RelativePosition.BottomLeft]: "bottom-start",
  [RelativePosition.BottomRight]: "bottom-end",
};
