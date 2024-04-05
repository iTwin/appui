/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import { mergeRefs, useRefs } from "../../../core-react/utils/hooks/useRefs";

describe("useRefs", () => {
  it("should set ref objects and invoke ref callbacks", () => {
    let ref: React.MutableRefObject<string | null> = { current: null };
    let mutableRef: React.MutableRefObject<string | null> = { current: null };
    const callbackRef = vi.fn((_: string | null) => {});
    const { result } = renderHook(() => {
      ref = React.useRef<string>(null);
      mutableRef = React.useRef<string | null>(null);
      return useRefs(ref, mutableRef, callbackRef);
    });
    act(() => {
      result.current("abc");
    });

    expect(ref.current).toEqual("abc");
    expect(mutableRef.current).toEqual("abc");
    expect(callbackRef).toHaveBeenCalledWith("abc");
  });
});

describe("mergeRefs", () => {
  it("should set ref objects and invoke ref callbacks", () => {
    let ref: React.MutableRefObject<string | null> = { current: null };
    let mutableRef: React.MutableRefObject<string | null> = { current: null };
    const callbackRef = vi.fn((_: string | null) => {});
    const { result } = renderHook(() => {
      ref = React.useRef<string>(null);
      mutableRef = React.useRef<string | null>(null);
      return mergeRefs(ref, mutableRef, callbackRef);
    });
    act(() => {
      result.current("abc");
    });

    expect(ref.current).toEqual("abc");
    expect(mutableRef.current).toEqual("abc");
    expect(callbackRef).toHaveBeenCalledWith("abc");
  });
});
