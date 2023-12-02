/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

import type { Connectable, Observable } from "rxjs";
import {
  asapScheduler,
  connectable,
  defer,
  EMPTY,
  finalize,
  iif,
  mergeMap,
  observeOn,
  onErrorResumeNextWith,
  queueScheduler,
  Subject,
  subscribeOn,
  tap,
} from "rxjs";

const MAX_CONCURRENT_SUBSCRIPTIONS = 1;

/**
 * Limits concurrent observable subscriptions to one.
 *
 * Scheduled observables are placed at the end of a queue. Each queued observable is subscribed to and awaited until the
 * completion.
 *
 * To schedule an observable, subscribe to the result of `scheduleSubscription()` call.
 * @internal
 */
export class SubscriptionScheduler<T> {
  private _scheduler = new Subject<Connectable<T>>();

  constructor() {
    this._scheduler
      .pipe(
        mergeMap(
          (sourceObservable) =>
            sourceObservable.pipe(
              // connect source observable when scheduler subscribes
              tap({
                subscribe: () => {
                  sourceObservable.connect();
                },
              }),
              // Guard against stack overflow when a lot of observables are scheduled. Without this operation `mergeMap`
              // will process each observable that is present in the pipeline recursively.
              observeOn(queueScheduler),
              // Delay the connection until another event loop task
              subscribeOn(asapScheduler),
              // Ignore errors in this pipeline without suppressing them for other subscribers
              onErrorResumeNextWith()
            ),
          MAX_CONCURRENT_SUBSCRIPTIONS
        )
      )
      // Start consuming scheduled observables
      .subscribe();
  }

  /**
   * Schedules `source` for subscription in the current scheduler.
   *
   * The actual scheduling is performed when the returned observable is subscribed to. To cancel, remove all subscribers
   * from the returned observable.
   *
   * @param source Input observable for which to schedule a subscription.
   * @returns Hot observable which starts emitting `source` values after subscription.
   */
  public scheduleSubscription(source: Observable<T>): Observable<T> {
    return defer(() => {
      let unsubscribed = false;
      // Do not subscribe to source observable if it was unsubscribed from before being processed by the scheduler
      const connectableObservable = connectable(
        iif(() => unsubscribed, EMPTY, source),
        {
          connector: () => new Subject<T>(),
          resetOnDisconnect: false,
        }
      );
      this._scheduler.next(connectableObservable);
      return connectableObservable.pipe(finalize(() => (unsubscribed = true)));
    });
  }
}

/**
 * Helper function for use as a `pipe()` argument with `rxjs` observables.
 * @internal
 */
export function scheduleSubscription<T>(
  scheduler: SubscriptionScheduler<T>
): (source: Observable<T>) => Observable<T> {
  return (source) => scheduler.scheduleSubscription(source);
}
