/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { useRefs, useResizeObserver } from "@itwin/core-react";

type Orientation = "horizontal" | "vertical";

/** @internal */
export const useOverflow = <
  TContainer extends HTMLElement,
  TComponent extends HTMLElement
>(
  allItems: ReadonlyArray<string>,
  orientation: Orientation,
  getItemSize: (item: string) => number,
  getOverflowSize: () => number
) => {
  const [visible, setVisible] = React.useState(allItems.length);
  const [calculate, setCalculate] = React.useState(false);
  const componentRef = React.useRef<TComponent>();
  const containerSizeRef = React.useRef<number>();
  const componentSizeRef = React.useRef<number>();

  React.useLayoutEffect(() => {
    setCalculate(false);
    if (!calculate) return;

    const containerSize = containerSizeRef.current;
    if (containerSize === undefined) return;

    const componentSize = componentSizeRef.current;
    if (componentSize === undefined) return;

    const component = componentRef.current;
    if (!component) return;

    const itemSizes = allItems.map((item) => {
      const size = getItemSize(item);
      return size;
    });
    const overflowSize = getOverflowSize();

    const otherSize = itemSizes.reduce((acc, size) => acc + size, 0);
    if (otherSize < containerSize) {
      // No overflow.
      setVisible(itemSizes.length);
      return;
    }

    let totalSize = overflowSize;
    if (totalSize >= containerSize) {
      // Render only overflow.
      setVisible(0);
      return;
    }

    let newVisible = 0;
    for (const size of itemSizes) {
      totalSize += size;
      if (totalSize >= containerSize) {
        break;
      }
      newVisible++;
    }
    setVisible(newVisible);
  }, [calculate, allItems, getItemSize, getOverflowSize]);
  const containerRoRef = useResizeObserver<TContainer>(
    React.useCallback(
      (width, height) => {
        const newSize = getLength({ width, height }, orientation);
        if (newSize === containerSizeRef.current) return;
        containerSizeRef.current = newSize;
        setCalculate(true);
      },
      [orientation]
    )
  );
  const componentRoRef = useResizeObserver<TComponent>(
    React.useCallback(
      (width, height) => {
        const newSize = getLength({ width, height }, orientation);
        if (newSize === componentSizeRef.current) return;
        componentSizeRef.current = newSize;
        setCalculate(true);
      },
      [orientation]
    )
  );

  const componentRefs = useRefs(componentRoRef, componentRef);

  const overflow = calculate || visible < allItems.length;
  const visibleItems = calculate ? allItems.length : visible;
  return [containerRoRef, componentRefs, visibleItems, overflow] as const;
};

/** @internal */
export function getLength(
  size: { width: number; height: number },
  orientation: Orientation
) {
  return orientation === "horizontal" ? size.width : size.height;
}
