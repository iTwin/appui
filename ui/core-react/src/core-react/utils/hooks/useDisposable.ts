/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import { useEffect, useRef, useState } from "react";
import type { IDisposable } from "@itwin/core-bentley";

/**
 * A custom hook which creates a disposable object and manages its disposal on unmount
 * or factory method change.
 * @public
 */
export function useDisposable<TDisposable extends IDisposable>(
  createDisposable: () => TDisposable
): TDisposable {
  return useOptionalDisposable(createDisposable)!;
}

/**
 * A custom hook which calls the factory method to create a disposable object
 * which might as well be undefined. If the result was a disposable object, the
 * hook takes care of disposing it when necessary.
 * @public
 */
export function useOptionalDisposable<TDisposable extends IDisposable>(
  createDisposable: () => TDisposable | undefined
): TDisposable | undefined {
  const [value, setValue] = useState(() => createDisposable());
  const initialValue = useRef(true);

  useEffect(() => {
    if (!initialValue.current) {
      setValue(createDisposable());
    }

    initialValue.current = false;
    return () => {
      setValue((prev) => {
        prev && prev.dispose();
        return prev;
      });
    };
  }, [createDisposable]);

  return value;
}
