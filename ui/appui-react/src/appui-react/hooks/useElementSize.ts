import React, { useEffect, useRef, useState } from "react";

import debounce from "lodash/debounce.js";
import { useDeepCompareMemo } from "./useDeepCompareMemo.js";

/**
 * Breakpoint sizes.
 */
export type BreakpointSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Breakpoints interface.
 */
export interface Breakpoints extends Record<BreakpointSize, number> {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

/**
 * Return type of the useElementSize hook.
 */
export interface UseElementSizeReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  size: BreakpointSize;
  dimension: { width: number; height: number };
}

export const defaultBreakpoints: Breakpoints = {
  xs: 0,
  sm: 300,
  md: 600,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Custom hook to get the size and dimensions of an HTML element.
 *
 * @param {Partial<Breakpoints>} [breakpoints] - Optional breakpoints to override the default breakpoints.
 * @param {object} [options] - Optional options object.
 * @param {number} [options.debounceMs] - Debounce time in milliseconds for the resize event.
 * @returns {UseElementSizeReturn} The ref to attach to the element, the current breakpoint size, and the dimensions of the element.
 */
export function useElementSize(
  breakpoints: Partial<Breakpoints> = defaultBreakpoints,
  options: {
    debounceMs?: number;
  } = {}
): UseElementSizeReturn {
  const { debounceMs = 0 } = options;
  const elementRef = useRef<HTMLDivElement>(null);
  const breakpointsMemo = useDeepCompareMemo({ ...breakpoints, xs: 0 });
  const sortedBreakpoints = React.useMemo(
    () =>
      Object.entries(breakpointsMemo).sort(([, a], [, b]) => b - a) as [
        BreakpointSize,
        number
      ][],
    [breakpointsMemo]
  );
  const [size, setSize] = useState<BreakpointSize>(
    sortedBreakpoints[0]?.[0] ?? "xs"
  );
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const getSizeFromWidth = (width: number): BreakpointSize => {
      for (const [key, breakpoint] of sortedBreakpoints)
        if (width >= breakpoint) return key;

      // Return the smallest breakpoint if none match
      return sortedBreakpoints[sortedBreakpoints.length - 1]?.[0] ?? "xs";
    };

    const updateSize = (): void => {
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      if (width !== 0) {
        setSize(getSizeFromWidth(width));
        setDimension({ width, height });
      }
    };

    const debouncedUpdateSize = debounce(updateSize, debounceMs);

    // Initial size calculation (not debounced)
    updateSize();

    const resizeObserver = new ResizeObserver(debouncedUpdateSize);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [sortedBreakpoints, debounceMs]);

  return { ref: elementRef, size, dimension };
}
