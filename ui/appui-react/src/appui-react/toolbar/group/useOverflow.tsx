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
  allItems: React.ReactNode[],
  orientation: Orientation
) => {
  const [visible, setVisible] = React.useState(allItems.length);
  const [calculate, setCalculate] = React.useState(false);
  const containerSizeRef = React.useRef<number>();
  const componentSizeRef = React.useRef<number>();

  const getSize = React.useCallback(
    (width: number, height: number) => {
      return orientation === "horizontal" ? width : height;
    },
    [orientation]
  );

  React.useLayoutEffect(() => {
    setCalculate(false);
    if (!calculate) return;

    const containerSize = containerSizeRef.current;
    if (!containerSize) return;

    const componentSize = componentSizeRef.current;
    if (!componentSize) return;

    const component = componentRef.current;
    if (!component) return;

    const children = Array.from(component.children);
    const sizes = children.map((child) => {
      const bounds = child.getBoundingClientRect();
      const size = getSize(bounds.width, bounds.height);
      return size;
    });
    const overflowSize = sizes[sizes.length - 1];
    const otherSizes = sizes.slice(0, -1);

    const otherSize = otherSizes.reduce((acc, size) => acc + size, 0);
    if (otherSize < containerSize) {
      // No overflow.
      setVisible(otherSizes.length);
      return;
    }

    let totalSize = overflowSize;
    if (totalSize >= containerSize) {
      // Render only overflow.
      setVisible(0);
      return;
    }

    let newVisible = 0;
    for (const size of otherSizes) {
      totalSize += size;
      if (totalSize >= containerSize) {
        break;
      }
      newVisible++;
    }
    setVisible(newVisible);
  }, [calculate, getSize, allItems]);
  const containerRoRef = useResizeObserver<TContainer>(
    React.useCallback(
      (w, h) => {
        const newSize = getSize(w, h);
        if (newSize === containerSizeRef.current) return;
        containerSizeRef.current = newSize;
        setCalculate(true);
      },
      [getSize]
    )
  );
  const componentRoRef = useResizeObserver<TComponent>(
    React.useCallback(
      (w, h) => {
        const newSize = getSize(w, h);
        if (newSize === componentSizeRef.current) return;
        componentSizeRef.current = newSize;
        setCalculate(true);
      },
      [getSize]
    )
  );
  const componentRef = React.useRef<TContainer>();
  const componentRefs = useRefs(componentRoRef, componentRef);

  const overflow = calculate || visible < allItems.length;
  const visibleItems = calculate ? allItems.length : visible;
  return [containerRoRef, componentRefs, visibleItems, overflow] as const;
};
