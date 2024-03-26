/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import type { OutsideClickEvent } from "../../../core-react";
import { useOnOutsideClick } from "../../../core-react";

function setRefValue<T>(ref: React.Ref<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    (ref as React.MutableRefObject<T | null>).current = value;
  }
}

describe.only("useOnOutsideClick", () => {
  beforeEach(() => {
    (global as any).PointerEvent = global.MouseEvent;
  });

  describe("PointerEvent", () => {
    it("should call onOutsideClick", () => {
      const spy = vi.fn<[], void>();
      const { result } = renderHook(() => useOnOutsideClick(spy));
      const element = document.createElement("div");
      act(() => {
        setRefValue(result.current, element);
      });

      const pointerDown = new PointerEvent("pointerdown");
      document.dispatchEvent(pointerDown);

      const pointerUp = new PointerEvent("pointerup");
      document.dispatchEvent(pointerUp);

      expect(spy).toHaveBeenCalledOnce();
    });

    it("should respect outside event predicate", () => {
      const spy = vi.fn<[], void>();
      const predicate = vi.fn(() => {
        return false;
      });

      const { result } = renderHook(() => useOnOutsideClick(spy, predicate));
      const element = document.createElement("div");
      act(() => {
        setRefValue(result.current, element);
      });

      const pointerDown = new PointerEvent("pointerdown");
      document.dispatchEvent(pointerDown);

      const pointerUp = new PointerEvent("pointerup");
      document.dispatchEvent(pointerUp);

      expect(predicate).toHaveBeenCalledWith(pointerDown);
      expect(spy).not.toBeCalled();
    });

    it("should respect outside event predicate", async () => {
      const spy = vi.fn<[], void>();
      const onOutsideClick = vi.fn((ev: OutsideClickEvent) => {
        if (ev.type === "pointerup") return false;
        return true;
      });
      const { result } = renderHook(() =>
        useOnOutsideClick(spy, onOutsideClick)
      );
      const element = document.createElement("div");

      act(() => {
        setRefValue(result.current, element);
      });

      const pointerDown = new PointerEvent("pointerdown");
      const pointerUp = new PointerEvent("pointerup");
      document.dispatchEvent(pointerDown);
      document.dispatchEvent(pointerUp);

      expect(onOutsideClick).toBeCalledTimes(2);
      expect(onOutsideClick).toBeCalledWith(pointerDown);
      expect(onOutsideClick).toBeCalledWith(pointerUp);
      expect(spy).not.toBeCalled();
    });
  });

  it("should call onOutsideClick for touch", () => {
    const spy = vi.fn<[], void>();
    global.PointerEvent = undefined!;
    const { result } = renderHook(() => useOnOutsideClick(spy));
    const element = document.createElement("div");
    act(() => {
      setRefValue(result.current, element);
    });

    fireEvent.touchStart(document);
    fireEvent.touchEnd(document);

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should remove touch and mouse event listeners", () => {
    global.PointerEvent = undefined!;
    const { unmount } = renderHook(() => useOnOutsideClick());

    const spy = vi.spyOn(document, "removeEventListener");
    unmount();

    expect(spy).toHaveBeenCalledTimes(4);
  });

  it("should not handle mouse event after touch event", () => {
    const spy = vi.fn<[], void>();
    global.PointerEvent = undefined!;
    const { result } = renderHook(() => useOnOutsideClick(spy));
    const element = document.createElement("div");
    act(() => {
      setRefValue(result.current, element);
    });

    fireEvent.touchStart(document);
    fireEvent.touchEnd(document);
    fireEvent.mouseDown(document);
    fireEvent.mouseUp(document);

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should continue handling mouse events after timeout", () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    global.PointerEvent = undefined!;
    const { result } = renderHook(() => useOnOutsideClick(spy));
    const element = document.createElement("div");
    act(() => {
      setRefValue(result.current, element);
    });

    fireEvent.touchStart(document);
    fireEvent.touchEnd(document);

    vi.advanceTimersByTime(1000);

    fireEvent.mouseDown(document);
    fireEvent.mouseUp(document);

    expect(spy).toBeCalledTimes(2);
  });
});
