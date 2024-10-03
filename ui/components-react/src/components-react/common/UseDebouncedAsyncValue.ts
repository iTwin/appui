/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

import { useEffect, useState } from "react";
import { defer, share } from "rxjs";
import {
  scheduleSubscription,
  SubscriptionScheduler,
} from "./SubscriptionScheduler.js";

/**
 * Custom hook for working with promise values.
 * Promises are debounced using trailing and leading edge.
 * The first promise will always be executed.
 * Any promises following the first while it is executing will be scheduled (and unscheduled), leaving only the last promise to be resolved.
 * Once the first promise finishes resolving, the last passed promise starts resolving.
 * @throws if/when `valueToBeResolved` promise is rejected. The error is thrown in the React's render loop, so it can be caught using an error boundary.
 * @beta
 */
export function useDebouncedAsyncValue<TReturn>(
  valueToBeResolved: undefined | (() => Promise<TReturn>)
) {
  const [scheduler] = useState(() => new SubscriptionScheduler<TReturn>());

  const [{ result, inProgress }, setState] = useState<{
    result: TReturn | ErrorResult | undefined;
    inProgress: boolean;
  }>({
    result: undefined,
    inProgress: false,
  });

  useEffect(() => {
    if (!valueToBeResolved) {
      setState((prev) => ({ ...prev, result: undefined, inProgress: false }));
      return;
    }

    setState((prev) => ({
      ...prev,
      inProgress: true,
    }));
    // schedule and subscribe to the observable emitting value from valueToBeResolved promise
    const subscription = defer(valueToBeResolved)
      .pipe(
        share({
          resetOnError: false,
          resetOnComplete: false,
          resetOnRefCountZero: true,
        }),
        scheduleSubscription(scheduler)
      )
      .subscribe({
        next: (data) => {
          setState((prev) => ({ ...prev, result: data, inProgress: false }));
        },
        error: (err) => {
          setState((prev) => ({
            ...prev,
            result: { error: err, hasError: true },
            inProgress: false,
          }));
        },
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [valueToBeResolved, scheduler]);

  if (isErrorResult(result)) {
    throw result.error ?? new Error("Exception in `useDebouncedAsyncValue`");
  }

  return { value: result, inProgress };
}

interface ErrorResult {
  error: Error | undefined;
  hasError: boolean;
}

function isErrorResult<TResult>(
  obj?: TResult | ErrorResult
): obj is ErrorResult {
  return obj !== undefined && (obj as ErrorResult).hasError;
}
