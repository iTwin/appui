/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { renderHook } from "@testing-library/react-hooks";
import { useEffectSkipFirst } from "../../../core-react/utils/hooks/useEffectSkipFirst";

describe("useEffectSkipFirst", () => {
  it("does not invoke callback on first effect", () => {
    const spy = vi.fn();
    renderHook(
      (props: { callback: () => void; deps?: any[] }) =>
        useEffectSkipFirst(props.callback, props.deps),
      { initialProps: { callback: spy, deps: [true] } }
    );

    expect(spy).not.toBeCalled();
  });

  it("does not invoke cleanup if callback was not invoked", () => {
    const cleanupSpy = vi.fn();
    const callback = () => cleanupSpy;
    const { unmount } = renderHook(
      (props: { callback: () => void; deps?: any[] }) =>
        useEffectSkipFirst(props.callback, props.deps),
      { initialProps: { callback, deps: [true] } }
    );

    unmount();

    expect(cleanupSpy).not.toBeCalled();
  });

  it("invokes callback when dependencies change", () => {
    const spy = vi.fn();
    const { rerender } = renderHook(
      (props: { callback: () => void; deps?: any[] }) =>
        useEffectSkipFirst(props.callback, props.deps),
      { initialProps: { callback: spy, deps: [true] } }
    );

    expect(spy).not.toBeCalled();

    rerender({ callback: spy, deps: [false] });

    expect(spy).toHaveBeenCalledOnce();
  });

  it("invokes cleanup if callback was invoked", () => {
    const cleanupSpy = vi.fn();
    let callbackInvokeCount = 0;
    const callback = () => {
      callbackInvokeCount++;
      return cleanupSpy;
    };

    const { rerender, unmount } = renderHook(
      (props: { callback: () => void; deps?: any[] }) =>
        useEffectSkipFirst(props.callback, props.deps),
      { initialProps: { callback, deps: [true] } }
    );

    // first render, useEffect is skipped
    expect(callbackInvokeCount).toEqual(0);

    // second render, different dependencies
    // callback is invoked for first time
    rerender({ callback, deps: [false] });
    expect(callbackInvokeCount).toEqual(1);
    expect(cleanupSpy).not.toBeCalled();

    // unmounted
    // cleanup after callback invocation
    unmount();
    expect(callbackInvokeCount).toEqual(1);
    expect(cleanupSpy).toHaveBeenCalledOnce();
  });

  it("invokes cleanup if callback was invoked multiple times", () => {
    const cleanupSpy = vi.fn();
    let callbackInvokeCount = 0;
    const callback = () => {
      callbackInvokeCount++;
      return cleanupSpy;
    };

    const { rerender, unmount } = renderHook(
      (props: { callback: () => void; deps?: any[] }) =>
        useEffectSkipFirst(props.callback, props.deps),
      { initialProps: { callback, deps: [true] } }
    );

    // first render useEffect is skipped
    expect(callbackInvokeCount).toEqual(0);
    expect(cleanupSpy).not.toBeCalled();

    // second render different dependencies
    // callback is invoked first time
    rerender({ callback, deps: [false] });
    expect(callbackInvokeCount).toEqual(1);
    expect(cleanupSpy).not.toBeCalled();

    // third render different dependencies
    // cleanup after first callback invocation
    // invoke callback second time
    rerender({ callback, deps: [true] });
    expect(callbackInvokeCount).toEqual(2);
    expect(cleanupSpy).toHaveBeenCalledOnce();

    // unmount
    // cleanup after second callback invocation
    unmount();
    expect(callbackInvokeCount).toEqual(2);
    expect(cleanupSpy).toHaveBeenCalledTimes(2);
  });
});
