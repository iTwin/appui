/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

import * as React from "react";
import { from } from "rxjs";
import { isPromiseLike } from "@itwin/core-react";

/**
 * Custom hook for working with possibly async values.
 * @public
 */
export function useAsyncValue<T>(value: T | PromiseLike<T>): T | undefined {
  const [result, setResult] = React.useState(() => {
    if (isPromiseLike(value)) {
      return undefined;
    }
    return value;
  });

  React.useEffect(() => {
    if (isPromiseLike(value)) {
      const subscription = from(value).subscribe({
        next: (resolvedValue) => setResult(resolvedValue),
      });
      return () => subscription.unsubscribe();
    }

    setResult(value);
    return;
  }, [value]);

  return result;
}
