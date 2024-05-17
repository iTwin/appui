/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, fireEvent, renderHook } from "@testing-library/react";
import { usePointerCaptor } from "../../../appui-react/layout/base/usePointerCaptor";
import { DragManagerProvider } from "../Providers";

describe("usePointerCaptor", () => {
  const wrapper = DragManagerProvider;

  it("should call onPointerDown", () => {
    const spy = vi.fn();
    const { result } = renderHook(() => usePointerCaptor(spy));
    const element = document.createElement("div");
    act(() => {
      result.current(element);
    });

    fireEvent.mouseDown(element);

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should call onPointerMove", () => {
    const spy = vi.fn();
    const { result } = renderHook(() => usePointerCaptor(undefined, spy));
    const element = document.createElement("div");
    act(() => {
      result.current(element);
    });

    fireEvent.mouseDown(element);
    fireEvent.mouseMove(document);

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should call onPointerUp", () => {
    const spy = vi.fn();
    const { result } = renderHook(() =>
      usePointerCaptor(undefined, undefined, spy)
    );
    const element = document.createElement("div");
    act(() => {
      result.current(element);
    });

    fireEvent.mouseDown(element);
    fireEvent.mouseUp(document);

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should call onPointerDown for touchstart", () => {
    const spy = vi.fn();
    const { result } = renderHook(() => usePointerCaptor(spy), { wrapper });
    const element = document.createElement("div");
    act(() => {
      result.current(element);
      fireEvent.touchStart(element, {
        touches: [{}],
      });
    });

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should call onPointerMove for touchmove", () => {
    const spy = vi.fn();
    const { result } = renderHook(() => usePointerCaptor(undefined, spy), {
      wrapper,
    });
    const element = document.createElement("div");
    act(() => {
      result.current(element);
      fireEvent.touchStart(element, {
        touches: [{}],
      });
      fireEvent.touchMove(element, {
        touches: [{}],
      });
    });

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should call onPointerUp for touchend", () => {
    const spy = vi.fn();
    const { result } = renderHook(
      () => usePointerCaptor(undefined, undefined, spy),
      { wrapper }
    );
    const element = document.createElement("div");
    act(() => {
      result.current(element);
      fireEvent.touchStart(element, {
        touches: [{}],
      });
      fireEvent.touchEnd(element, {
        touches: [{}],
      });
    });
    expect(spy).toHaveBeenCalledOnce();

    act(() => {
      result.current(null);
    });
  });

  it("should not call onPointerDown when touches.length !== 1", () => {
    const spy = vi.fn();
    const { result } = renderHook(() => usePointerCaptor(spy));
    const element = document.createElement("div");
    act(() => {
      result.current(element);
      fireEvent.touchStart(element, {
        touches: [],
      });
    });

    expect(spy).not.toBeCalled();
  });

  it("should not call onPointerMove when touches.length !== 1", () => {
    const spy = vi.fn();
    const { result } = renderHook(() => usePointerCaptor(undefined, spy), {
      wrapper,
    });
    const element = document.createElement("div");
    act(() => {
      result.current(element);
      fireEvent.touchStart(element, {
        touches: [{}],
      });
      fireEvent.touchMove(element, {
        touches: [],
      });
    });

    expect(spy).not.toBeCalled();
  });

  it("should not add target touch listeners", () => {
    const { result } = renderHook(() => usePointerCaptor(), { wrapper });
    const element = document.createElement("div");

    act(() => {
      result.current(element);
    });

    const spy = vi.spyOn(HTMLElement.prototype, "addEventListener");
    act(() => {
      const touchStart = new TouchEvent("touchstart");
      vi.spyOn(touchStart, "target", "get").mockImplementation(
        () => ({} as any)
      );
      vi.spyOn(touchStart, "touches", "get").mockImplementation(
        () => [{}] as any
      );
      element.dispatchEvent(touchStart);
    });

    expect(spy).not.toBeCalled();
  });

  it("should not remove target touch listeners", () => {
    const { result } = renderHook(() => usePointerCaptor(), { wrapper });
    const element = document.createElement("div");

    act(() => {
      result.current(element);
      fireEvent.touchStart(element, {
        touches: [{}],
      });
    });

    const spy = vi.spyOn(HTMLElement.prototype, "removeEventListener");
    act(() => {
      const touchEnd = new TouchEvent("touchend");
      vi.spyOn(touchEnd, "target", "get").mockImplementation(() => ({} as any));
      vi.spyOn(touchEnd, "touches", "get").mockImplementation(
        () => [{}] as any
      );
      element.dispatchEvent(touchEnd);
    });

    expect(spy).not.toBeCalled();
  });

  it("should call onPointerMove for document touchmove", () => {
    const spy = vi.fn();
    const { result } = renderHook(() => usePointerCaptor(undefined, spy), {
      wrapper,
    });
    const element = document.createElement("div");
    act(() => {
      result.current(element);

      fireEvent.touchStart(element, {
        touches: [{}],
      });

      fireEvent.touchMove(document, {
        touches: [{}],
      });
    });

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should not handle document touchmove if it was dispatched for touch target", () => {
    const spy = vi.fn();
    const { result } = renderHook(() => usePointerCaptor(undefined, spy), {
      wrapper,
    });
    const element = document.createElement("div");
    act(() => {
      result.current(element);

      fireEvent.touchStart(element, {
        touches: [{}],
      });

      const touchEnd = new TouchEvent("touchmove");
      vi.spyOn(touchEnd, "target", "get").mockImplementation(() => element);
      vi.spyOn(touchEnd, "touches", "get").mockImplementation(
        () => [{}] as any
      );
      document.dispatchEvent(touchEnd);
    });

    expect(spy).not.toBeCalled();
  });

  it("should not handle document touchend if it was dispatched for touch target", () => {
    const spy = vi.fn();
    const { result } = renderHook(() => usePointerCaptor(undefined, spy), {
      wrapper,
    });
    const element = document.createElement("div");
    act(() => {
      result.current(element);

      fireEvent.touchStart(element, {
        touches: [{}],
      });

      const touchEnd = new TouchEvent("touchend");
      vi.spyOn(touchEnd, "target", "get").mockImplementation(() => element);
      vi.spyOn(touchEnd, "touches", "get").mockImplementation(
        () => [{}] as any
      );
      document.dispatchEvent(touchEnd);
    });

    expect(spy).not.toBeCalled();
  });
});
