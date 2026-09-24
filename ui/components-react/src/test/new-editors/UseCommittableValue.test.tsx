/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useCommittableValue } from "../../components-react/new-editors/UseCommittableValue.js";

describe("useCommittableValue", () => {
  it("commits changed value", () => {
    const onCommit = vi.fn();
    const onCancel = vi.fn();
    const { result } = renderHook(() =>
      useCommittableValue({
        initialValue: { value: "initial" },
        onCommit,
        onCancel,
      })
    );

    act(() => result.current.onChange({ value: "changed" }));
    act(() => result.current.commit?.());

    expect(onCommit).toHaveBeenCalledExactlyOnceWith({ value: "changed" });
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("cancels if value did not change", () => {
    const onCommit = vi.fn();
    const onCancel = vi.fn();
    const { result } = renderHook(() =>
      useCommittableValue({
        initialValue: { value: "initial" },
        onCommit,
        onCancel,
      })
    );

    act(() => result.current.commit?.());

    expect(onCancel).toHaveBeenCalledOnce();
    expect(onCommit).not.toHaveBeenCalled();
  });

  it("does not commit the same value twice", () => {
    const onCommit = vi.fn();
    const onCancel = vi.fn();
    const { result } = renderHook(() =>
      useCommittableValue({
        initialValue: { value: "initial" },
        onCommit,
        onCancel,
      })
    );

    act(() => result.current.onChange({ value: "changed" }));
    act(() => result.current.commit?.());
    act(() => result.current.commit?.());

    expect(onCommit).toHaveBeenCalledExactlyOnceWith({ value: "changed" });
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("commits value that changed after previous commit", () => {
    const onCommit = vi.fn();
    const onCancel = vi.fn();
    const { result } = renderHook(() =>
      useCommittableValue({
        initialValue: { value: "initial" },
        onCommit,
        onCancel,
      })
    );

    act(() => result.current.onChange({ value: "changed" }));
    act(() => result.current.commit?.());
    act(() => result.current.onChange({ value: "changed again" }));
    act(() => result.current.commit?.());

    expect(onCommit).toHaveBeenCalledTimes(2);
    expect(onCommit).toHaveBeenLastCalledWith({ value: "changed again" });
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("cancels when value is reverted to initial after commit", () => {
    const onCommit = vi.fn();
    const onCancel = vi.fn();
    const { result } = renderHook(() =>
      useCommittableValue({
        initialValue: { value: "initial" },
        onCommit,
        onCancel,
      })
    );

    act(() => result.current.onChange({ value: "changed" }));
    act(() => result.current.commit?.());
    act(() => result.current.onChange({ value: "initial" }));
    act(() => result.current.commit?.());

    expect(onCommit).toHaveBeenCalledExactlyOnceWith({ value: "changed" });
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("does not commit after cancel", () => {
    const onCommit = vi.fn();
    const onCancel = vi.fn();
    const { result } = renderHook(() =>
      useCommittableValue({
        initialValue: { value: "initial" },
        onCommit,
        onCancel,
      })
    );

    act(() => result.current.onChange({ value: "changed" }));
    act(() => result.current.cancel?.());
    act(() => result.current.commit?.());

    expect(onCancel).toHaveBeenCalledOnce();
    expect(onCommit).not.toHaveBeenCalled();
  });
});
