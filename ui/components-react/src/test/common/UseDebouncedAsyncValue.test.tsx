/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { render, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useDebouncedAsyncValue } from "../../components-react/common/UseDebouncedAsyncValue";
import { ResolvablePromise } from "../test-helpers/misc";
import { TestErrorBoundary } from "../TestUtils";

describe("useDebouncedAsyncValue", () => {
  it("returns immediately when given `undefined`", async () => {
    const { result } = renderHook(
      (props: { value: undefined }) => useDebouncedAsyncValue(props.value),
      { initialProps: { value: undefined } }
    );
    expect(result.current.inProgress).to.be.false;
    expect(result.current.value).to.be.undefined;
  });

  it("returns value when promise resolves", async () => {
    const value = "some value";
    const valuePromise = new ResolvablePromise<string>();
    const { result } = renderHook(
      (props: { value: () => Promise<string> }) =>
        useDebouncedAsyncValue(props.value),
      { initialProps: { value: async () => valuePromise } }
    );
    expect(result.current.inProgress).toEqual(true);
    expect(result.current.value).to.be.undefined;

    await valuePromise.resolve(value);
    await waitFor(() => expect(result.current.inProgress).to.be.false);
    expect(result.current.value).toEqual(value);
  });

  it("returns the last value when argument changes multiple times", async () => {
    const initialPromise = new ResolvablePromise<number>();
    const { result, rerender } = renderHook(
      (props: { value: () => Promise<number> }) =>
        useDebouncedAsyncValue(props.value),
      { initialProps: { value: async () => initialPromise } }
    );
    expect(result.current.inProgress).toEqual(true);
    expect(result.current.value).to.be.undefined;

    rerender({ value: async () => 1 });
    rerender({ value: async () => 2 });
    await initialPromise.resolve(0);

    await waitFor(() => expect(result.current.inProgress).to.be.false);
    expect(result.current.value).toEqual(2);
  });

  describe("rethrows exceptions capturable by react error boundary", () => {
    it("rethrows `Error` exceptions", async () => {
      const promise = Promise.reject(new Error("test error"));
      const asyncValue = async () => promise;
      function TestComponent() {
        useDebouncedAsyncValue(asyncValue);
        return null;
      }
      const errorSpy = vi.fn();
      render(
        <TestErrorBoundary onError={errorSpy}>
          <TestComponent />
        </TestErrorBoundary>
      );
      await waitFor(() => {
        expect(errorSpy).toHaveBeenCalledOnce();
        expect(errorSpy.mock.calls[0][0].message).toEqual("test error");
      });
    });

    it("throws generic `Error` when promise rejects with `undefined`", async () => {
      const promise = Promise.reject(undefined);
      const asyncValue = async () => promise;
      function TestComponent() {
        useDebouncedAsyncValue(asyncValue);
        return null;
      }
      const errorSpy = vi.fn();
      render(
        <TestErrorBoundary onError={errorSpy}>
          <TestComponent />
        </TestErrorBoundary>
      );
      await waitFor(() => {
        expect(errorSpy).toHaveBeenCalledOnce();
        expect(errorSpy.mock.calls[0][0].message).toEqual(
          "Exception in `useDebouncedAsyncValue`"
        );
      });
    });
  });
});
