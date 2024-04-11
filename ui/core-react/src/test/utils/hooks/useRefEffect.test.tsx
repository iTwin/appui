/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, renderHook } from "@testing-library/react-hooks";
import { useRefEffect } from "../../../core-react/utils/hooks/useRefEffect";
import type { Mock } from "vitest";

describe("useRefEffect", () => {
  it("should invoke callback", () => {
    const callback = vi.fn((_: string | null) => {});
    const { result } = renderHook(() => useRefEffect(callback, []));
    act(() => {
      result.current("abc");
    });

    expect(callback).toHaveBeenCalledWith("abc");
  });

  it("should invoke cleanup", () => {
    const cleanups = new Array<{
      instance: string | null;
      cleanup: Mock<[], void>;
    }>();
    const createCleanup = (instance: string | null) => {
      const cleanup = vi.fn(() => {});
      cleanups.push({ instance, cleanup });
      return cleanup;
    };
    const callback = vi.fn((instance: string | null) => {
      const cleanup = createCleanup(instance);
      return cleanup;
    });
    const { result } = renderHook(() => useRefEffect(callback, []));
    act(() => {
      result.current("abc");
    });
    act(() => {
      result.current("abcd");
    });

    expect(cleanups).toHaveLength(2);
    expect(cleanups[0].instance).toEqual("abc");
    expect(cleanups[0].cleanup).toHaveBeenCalledOnce();

    expect(cleanups[1].instance).toEqual("abcd");
    expect(cleanups[1].cleanup).not.toBeCalled();
  });
});
