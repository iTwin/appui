/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import * as React from "react";
import { useResizeObserver } from "@itwin/core-react/internal";
import type { SizeProps } from "../../utils/SizeProps.js";

type Orientation = "horizontal" | "vertical";

/** @internal */
export const useOverflow = <
  TContainer extends HTMLElement,
  TComponent extends HTMLElement
>(
  allItems: ReadonlyArray<string>,
  orientation: Orientation,
  getItemSize: (item: string) => SizeProps,
  getOverflowSize: () => SizeProps
) => {
  const [visible, setVisible] = React.useState(allItems.length);
  const [calculate, setCalculate] = React.useState(false);
  const containerSizeRef = React.useRef<SizeProps>();
  const componentSizeRef = React.useRef<SizeProps>();

  const [prevOrientation, setPrevOrientation] = React.useState(orientation);
  if (prevOrientation !== orientation) {
    setPrevOrientation(orientation);
    setCalculate(true);
  }

  React.useLayoutEffect(() => {
    setCalculate(false);
    if (!calculate) return;

    const containerSize = containerSizeRef.current
      ? getLength(containerSizeRef.current, orientation)
      : undefined;
    if (containerSize === undefined) return;

    const componentSize = componentSizeRef.current
      ? getLength(componentSizeRef.current, orientation)
      : undefined;
    if (componentSize === undefined) return;

    const itemSizes = allItems.map((item) => {
      const size = getItemSize(item);
      return getLength(size, orientation);
    });
    const overflowSize = getLength(getOverflowSize(), orientation);

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
  }, [calculate, allItems, getItemSize, getOverflowSize, orientation]);
  const containerRoRef = useResizeObserver<TContainer>(
    React.useCallback(
      (width: number, height: number) => {
        const length = containerSizeRef.current
          ? getLength(containerSizeRef.current, orientation)
          : undefined;
        containerSizeRef.current = { width, height };
        const newLength = getLength(containerSizeRef.current, orientation);

        if (newLength === length) return;
        setCalculate(true);
      },
      [orientation]
    )
  );
  const componentRoRef = useResizeObserver<TComponent>(
    React.useCallback(
      (width: number, height: number) => {
        const length = componentSizeRef.current
          ? getLength(componentSizeRef.current, orientation)
          : undefined;
        componentSizeRef.current = { width, height };
        const newLength = getLength(componentSizeRef.current, orientation);

        if (newLength === length) return;
        setCalculate(true);
      },
      [orientation]
    )
  );

  const overflow = calculate || visible < allItems.length;
  const visibleItems = calculate ? allItems.length : visible;
  return [containerRoRef, componentRoRef, visibleItems, overflow] as const;
};

function getLength(
  size: { width: number; height: number },
  orientation: Orientation
) {
  return orientation === "horizontal" ? size.width : size.height;
}
