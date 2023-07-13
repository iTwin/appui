/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useRef } from "react";

/**
 * Returns callbacks for persisting and restoring element's `scrollTop` property value.
 * This can be used to restore element's scroll position if it needs to be hidden and
 * later shown again without unmounting React component.
 * @internal
 */
export function useElementScrollStorage<T extends Element>(
  elementClassName: string
) {
  const ref = useRef<T>(null);
  const scrollTop = useRef(0);

  const getElement = () => {
    const elements = ref.current?.getElementsByClassName(elementClassName);
    if (!elements || !elements.length) {
      return undefined;
    }

    return elements[0];
  };

  /** Persists current `scrollTop` property value. */
  const persist = () => {
    const element = getElement();
    if (!element) {
      return;
    }
    scrollTop.current = element.scrollTop;
  };

  /** Restores `scrollTop` property value back. If `persist` was not called sets it to `0`. */
  const restore = () => {
    const element = getElement();
    if (!element) {
      return;
    }
    element.scrollTop = scrollTop.current;
  };

  return { ref, persist, restore };
}
