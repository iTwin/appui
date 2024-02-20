import { RelativePosition } from "@itwin/appui-abstract";

/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * Identifies which side of a target an element should be placed.
 * Without an {@link Alignment}, the element center will be placed at the center of the target.
 */
type Side = "left" | "top" | "right" | "bottom";
type Alignment = "start" | "end"

/**
 * Identifies the placement of a given element.
 * @public
 */
export type Placement = Side | `${Side}-${Alignment}`

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
  if (!input) return "top-end";

  if (typeof input === 'string')
    return input;

  return RelativePosition[input] as Placement;
}
