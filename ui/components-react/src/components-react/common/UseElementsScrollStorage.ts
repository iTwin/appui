/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { Ref } from "react";
import { useRef } from "react";

/**
 * Returns callbacks for persisting and restoring elements `scrollTop` property value.
 * This can be used to restore elements scroll position if it needs to be hidden and
 * later shown again without unmounting React component.
 * @internal
 */
export function useElementsScrollStorage<T extends Element>(
  elementsClassName: string
): {
  ref: Ref<T>;
  persist: () => void;
  restore: () => void;
} {
  const ref = useRef<T>(null);
  const scrollTop = useRef<number[]>([]);

  const getElements = () => {
    if (!ref.current) {
      return [];
    }
    return ref.current.getElementsByClassName(elementsClassName);
  };

  /** Persists current `scrollTop` property value of elements. */
  const persist = () => {
    const elements = getElements();
    const offsets: number[] = [];
    for (const element of elements) {
      offsets.push(element.scrollTop);
    }
    scrollTop.current = offsets;
  };

  /** Restores `scrollTop` property values back. If `persist` was not called does nothing. */
  const restore = () => {
    const elements = getElements();
    if (elements.length !== scrollTop.current.length) {
      scrollTop.current = [];
      return;
    }

    for (let i = 0; i < scrollTop.current.length; i++) {
      elements[i].scrollTop = scrollTop.current[i];
    }
    scrollTop.current = [];
  };

  return { ref, persist, restore };
}
