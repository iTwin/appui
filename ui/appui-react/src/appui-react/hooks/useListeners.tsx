/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import * as React from "react";
import { useLatestRef } from "./useLatestRef.js";

/** Utility to add/remove listeners to multiple items.
 * @internal
 */
export function useListeners<T>(
  items: T[],
  addListener: (item: T) => () => void
) {
  const addListenerRef = useLatestRef(addListener);
  React.useEffect(() => {
    const removeListeners = items.reduce<Array<() => void>>((acc, item) => {
      acc.push(addListenerRef.current(item));
      return acc;
    }, []);
    return () => {
      removeListeners.forEach((remove) => remove());
    };
  }, [items, addListenerRef]);
}
