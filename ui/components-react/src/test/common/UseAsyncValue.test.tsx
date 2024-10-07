/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { renderHook, waitFor } from "@testing-library/react";
import { useAsyncValue } from "../../components-react/common/UseAsyncValue.js";
import { ResolvablePromise } from "../test-helpers/misc.js";

describe("useAsyncValue", () => {
  it("returns synchronous value", () => {
    const value = "some value";
    const { result } = renderHook(
      (props: { value: string }) => useAsyncValue(props.value),
      { initialProps: { value } }
    );
    expect(result.current).toEqual(value);
  });

  it("returns value when promise resolves", async () => {
    const value = "some value";
    const valuePromise = Promise.resolve(value);
    const { result } = renderHook(
      (props: { value: Promise<string> }) => useAsyncValue(props.value),
      { initialProps: { value: valuePromise } }
    );
    expect(result.current).toEqual(undefined);
    await valuePromise;
    await waitFor(() => expect(result.current).toEqual(value));
  });

  it("returns correct value from multiple promises", async () => {
    const initialPromise = new ResolvablePromise<string>();
    const updatePromise = new ResolvablePromise<string>();
    const { result, rerender } = renderHook(
      (props: { value: PromiseLike<string> }) => useAsyncValue(props.value),
      { initialProps: { value: initialPromise } }
    );
    expect(result.current).toEqual(undefined);
    rerender({ value: updatePromise });
    expect(result.current).toEqual(undefined);
    await updatePromise.resolve("updated value");
    await waitFor(() => expect(result.current).toEqual("updated value"));
    await initialPromise.resolve("initial value");
    expect(result.current).toEqual("updated value");
  });
});
