/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

import { useEffect, useMemo, useState } from "react";
import { defer } from "rxjs/internal/observable/defer";
import { publish } from "rxjs/internal/operators/publish";
import { refCount } from "rxjs/internal/operators/refCount";
import {
  scheduleSubscription,
  SubscriptionScheduler,
} from "./SubscriptionScheduler";

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
  const scheduler = useMemo(() => new SubscriptionScheduler<TReturn>(), []);

  const [value, setValue] = useState<TReturn>();
  const [inProgress, setInProgress] = useState(false);
  const [errorState, setErrorState] = useState<{
    error: Error | undefined;
    hasError: boolean;
  }>({
    error: undefined,
    hasError: false,
  });

  useEffect(() => {
    if (!valueToBeResolved) {
      setValue(undefined);
      setInProgress(false);
      return;
    }

    setInProgress(true);
    // schedule and subscribe to the observable emitting value from valueToBeResolved promise
    const subscription = defer(valueToBeResolved)
      .pipe(publish(), refCount(), scheduleSubscription(scheduler))
      .subscribe({
        next: (data) => {
          setValue(data);
          setInProgress(false);
        },
        error: (err) => {
          setErrorState({ error: err, hasError: true });
          setInProgress(false);
        },
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [valueToBeResolved, scheduler]);

  if (errorState.hasError)
    throw (
      errorState.error ?? new Error("Exception in `useDebouncedAsyncValue`")
    );

  return { value, inProgress };
}
