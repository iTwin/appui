/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */
import * as React from "react";
import ResizeObserver from "resize-observer-polyfill";
import { useRefEffect } from "./useRefEffect";
import { useRefs } from "./useRefs";

/** Uses ResizeObserver API to notify about element bound changes.
 * @internal
 */
export function useResizeObserver<T extends Element>(onResize?: (width: number) => void) {
  const resizeObserverRef = React.useRef(new ResizeObserver((entries) => {
    entries.length === 1 && onResize && onResize(entries[0].contentRect.width);
  }));
  const observerRef = useRefEffect((instance: T | null) => {
    const resizeObserver = resizeObserverRef.current;
    instance && resizeObserver.observe(instance);
    return () => {
      instance && resizeObserver.unobserve(instance);
    };
  }, []);
  const handleRef = React.useCallback((instance: T | null) => {
    instance && onResize && onResize(instance.getBoundingClientRect().width);
  }, [onResize]);
  const ref = useRefs(handleRef, observerRef);
  return ref;
}
