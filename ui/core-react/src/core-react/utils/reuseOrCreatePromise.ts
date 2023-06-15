/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

/**
 * Return promise if created for the id, otherwise, create a new one and save it.
 * if the promise fail, remove it from cache so we'll try again.
 * @param id Identification for the promise
 * @param createPromise Function to create the promise if not already running.
 * @param cache Map<string, Promise<K>> object that will contain the cache. (Should be local to the file using this function, not global to the app)
 * @returns created promise
 * @internal
 */
export async function reuseOrCreatePromise<T>(
  id: string,
  createPromise: () => Promise<T>,
  cache: Map<string, Promise<T>>
): Promise<T> {
  let getPromise = cache.get(id);
  if (!getPromise) {
    getPromise = createPromise().catch((e) => {
      // Don't keep the cache if we fail, could be a temporary network error.
      cache.delete(id);
      throw e;
    });
    cache.set(id, getPromise);
  }

  return getPromise;
}
