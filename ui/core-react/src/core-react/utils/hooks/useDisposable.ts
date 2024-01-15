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
 * @deprecated in 4.9.0. This hook is not compatible with React 18. Use [[useOptionalDisposable]] or `useState` + `useEffect` for
 * creating and disposing disposable resources.
 */
export function useDisposable<TDisposable extends IDisposable>(
  createDisposable: () => TDisposable
): TDisposable {
  const [value, setValue] = useState(createDisposable());
  // need to capture initial disposable created during render loop in order to dispose later
  const prevValue = useRef(value);
  const useInitialValue = useRef(true);

  useEffect(() => {
    // do not create new disposable on initial render. It was created during render loop.
    if (!useInitialValue.current) {
      prevValue.current = createDisposable();
      setValue(prevValue.current);
    }

    useInitialValue.current = false;
    return () => {
      prevValue.current.dispose();
    };
  }, [createDisposable]);

  return value;
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
  const [value, setValue] = useState<TDisposable | undefined>();

  useEffect(() => {
    const disposable = createDisposable();
    setValue(disposable);
    return () => {
      disposable?.dispose();
    };
  }, [createDisposable]);

  return value;
}
