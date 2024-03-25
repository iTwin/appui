/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { Mock } from "vitest";
import type { IDisposable } from "@itwin/core-bentley";
import { renderHook } from "@testing-library/react-hooks";
import {
  useDisposable,
  useOptionalDisposable,
} from "../../../core-react/utils/hooks/useDisposable";

describe("useDisposable", () => {
  let disposeSpy: Mock;
  let createDisposable: () => IDisposable;

  beforeEach(() => {
    disposeSpy = vi.fn();
    createDisposable = () => ({ dispose: disposeSpy });
  });

  it("creates disposable and disposes it on unmount", () => {
    const { result, unmount } = renderHook(
      (props: { createDisposable: () => IDisposable }) =>
        // eslint-disable-next-line deprecation/deprecation
        useDisposable(props.createDisposable),
      { initialProps: { createDisposable } }
    );
    expect(result.current).to.not.be.undefined;

    unmount();
    expect(disposeSpy).toHaveBeenCalledOnce();
  });

  it("disposes old disposable when creating new one", () => {
    const { result, rerender } = renderHook(
      (props: { createDisposable: () => IDisposable }) =>
        // eslint-disable-next-line deprecation/deprecation
        useDisposable(props.createDisposable),
      { initialProps: { createDisposable } }
    );
    expect(result.current).to.not.be.undefined;

    const oldDisposable = result.current;
    const newDisposeSpy = vi.fn();
    const createNewDisposable = () => ({ dispose: newDisposeSpy });
    rerender({ createDisposable: createNewDisposable });

    expect(oldDisposable).to.not.be.eq(result.current);
    expect(disposeSpy).toHaveBeenCalledOnce();
    expect(newDisposeSpy).not.toBeCalled();
  });
});

describe("useOptionalDisposable", () => {
  let disposeSpy: Mock<any, any[]>;
  let createDisposable: () => IDisposable;

  beforeEach(() => {
    disposeSpy = vi.fn();
    createDisposable = () => ({ dispose: disposeSpy });
  });

  it("creates disposable and disposes it on unmount", () => {
    const { result, unmount } = renderHook(
      (props: { createDisposable: () => IDisposable }) =>
        useOptionalDisposable(props.createDisposable),
      { initialProps: { createDisposable } }
    );
    expect(result.current).to.not.be.undefined;

    unmount();
    expect(disposeSpy).toHaveBeenCalledOnce();
  });

  it("disposes old disposable when creating new one", () => {
    const { result, rerender } = renderHook(
      (props: { createDisposable: () => IDisposable }) =>
        useOptionalDisposable(props.createDisposable),
      { initialProps: { createDisposable } }
    );
    expect(result.current).to.not.be.undefined;

    const oldDisposable = result.current;
    const newDisposeSpy = vi.fn();
    const createNewDisposable = () => ({ dispose: newDisposeSpy });
    rerender({ createDisposable: createNewDisposable });

    expect(oldDisposable).to.not.be.eq(result.current);
    expect(disposeSpy).toHaveBeenCalledOnce();
    expect(newDisposeSpy).not.toBeCalled();
  });
});
