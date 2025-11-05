/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { useRefs, useResizeObserver } from "@itwin/core-react/internal";

type Orientation = "horizontal" | "vertical";

/** @internal */
export const useOverflow = <TContainer extends HTMLElement>(
  orientation: Orientation
) => {
  const itemsRef = React.useRef(new Map<string, HTMLElement>());
  const [calculate, setCalculate] = React.useState(true);
  const [overflowItemIndex, setOverflowItemIndex] = React.useState<
    number | undefined
  >(undefined);

  const [prevOrientation, setPrevOrientation] = React.useState(orientation);
  if (prevOrientation !== orientation) {
    setPrevOrientation(orientation);
    setCalculate(true);
  }

  React.useLayoutEffect(() => {
    if (!calculate) return;
    setCalculate(false);

    const containerEl = containerRef.current;
    if (!containerEl) return;

    const containerBounds = containerEl.getBoundingClientRect();
    const containerEdge = getEdge(containerBounds, orientation);

    const itemEntries = Array.from(itemsRef.current.entries());
    const firstOverflownItemIndex = itemEntries.findIndex(([_, item]) => {
      const itemBounds = item.getBoundingClientRect();
      const itemEdge = getEdge(itemBounds, orientation);
      return itemEdge > containerEdge;
    });
    if (firstOverflownItemIndex === -1) {
      setOverflowItemIndex(undefined);
      return;
    }

    const newOverflowItemIndex = Math.max(firstOverflownItemIndex - 1, 0); // Reserve space for the overflow item.
    setOverflowItemIndex(newOverflowItemIndex);
  }, [calculate, orientation]);

  const containerRef = React.useRef<TContainer>(null);
  const containerRoRef = useResizeObserver(
    React.useCallback(() => {
      setCalculate(true);
    }, [])
  );

  return [
    itemsRef,
    useRefs(containerRef, containerRoRef),
    calculate ? undefined : overflowItemIndex,
  ] as const;
};

function getEdge(rect: DOMRect, orientation: Orientation) {
  return orientation === "horizontal" ? rect.right : rect.bottom;
}
