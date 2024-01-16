/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type * as sinon from "sinon";
import { waitFor } from "@testing-library/react";

/** Options for waitForSpy test helper function */
export interface WaitForSpyOptions {
  timeout?: number;
  error?: string;
}

/** Wait for spy to be called. Throws on timeout (250 by default) */
export const waitForSpy = async (
  spy: sinon.SinonSpy,
  options?: WaitForSpyOptions
) => {
  const defaultValues: WaitForSpyOptions = {
    timeout: 250,
    error: "Waiting for spy timed out!",
  };
  const { timeout, error } = options
    ? { ...defaultValues, ...options }
    : defaultValues;

  return waitFor(
    () => {
      if (!spy.called) throw new Error(error);
    },
    { timeout, interval: 10 }
  );
};

/** Creates Promise */
export class ResolvablePromise<T> implements PromiseLike<T> {
  private _wrapped: Promise<T>;
  private _resolve!: (value: T) => void;
  public constructor() {
    this._wrapped = new Promise<T>((resolve: (value: T) => void) => {
      this._resolve = resolve;
    });
  }
  public then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | undefined
      | null,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | undefined
      | null
  ): PromiseLike<TResult1 | TResult2> {
    return this._wrapped.then(onfulfilled, onrejected);
  }
  public async resolve(result: T) {
    this._resolve(result);
    await new Promise<void>((resolve: () => void) => {
      setImmediate(resolve);
    });
  }
}

/** Stubs scrollIntoView. */
export function stubScrollIntoView() {
  const originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  const scrollIntoViewMock = function () {};

  beforeEach(() => {
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  afterEach(() => {
    window.HTMLElement.prototype.scrollIntoView = originalScrollIntoView;
  });
}
