/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Observable, Subscription } from "rxjs";
import { ResolvablePromise } from "../test-helpers/misc";

/** Expects observable to emit nodes in a specific order. The order is defined by the sequence of groups of emitted node ids, e.g. `[[0], [1, 2]]`. */
export async function extractSequence<T>(
  observable: Observable<T>
): Promise<T[]> {
  const sequence: T[] = [];
  await waitForUnsubscription(
    observable.subscribe((value) => sequence.push(value))
  );
  return sequence;
}

/** Subscribes to observable and starts collecting emitted values in sequence*/
export function startExtractingSequence<T>(observable: Observable<T>) {
  const current: { sequence: T[] } = {
    sequence: [],
  };
  const waitForComplete = waitForUnsubscription(
    observable.subscribe((value) => {
      current.sequence.push(value);
    })
  );
  return {
    current,
    waitForComplete,
  };
}

/** Returns a promise which is resolved when the input subscription is disposed. */
export async function waitForUnsubscription(
  subscription: Subscription
): Promise<void> {
  const promise = new ResolvablePromise<void>();
  subscription.add(async () => promise.resolve());
  return promise;
}
