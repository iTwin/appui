/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, fireEvent } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { usePointerCaptor } from "../../../appui-react/layout/base/usePointerCaptor";
import { DragManagerProvider } from "../Providers";

describe("usePointerCaptor", () => {
  const wrapper = DragManagerProvider;

  it("should call onPointerDown", () => {
    const spy = vi.fn<NonNullable<Parameters<typeof usePointerCaptor>[0]>>();
    const { result } = renderHook(() => usePointerCaptor(spy));
    const element = document.createElement("div");
    act(() => {
      result.current(element);
    });

    fireEvent.mouseDown(element);

    expect(spy).toHaveBeenCalledOnce();
  });

  it("should call onPointerMove", () => {
    const spy = vi.fn<NonNullable<Parameters<typeof usePointerCaptor>[1]>>();
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
    const spy = vi.fn<NonNullable<Parameters<typeof usePointerCaptor>[2]>>();
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
    const spy = vi.fn<NonNullable<Parameters<typeof usePointerCaptor>[0]>>();
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
    const spy = vi.fn<NonNullable<Parameters<typeof usePointerCaptor>[1]>>();
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
    const spy = vi.fn<NonNullable<Parameters<typeof usePointerCaptor>[2]>>();
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
    const spy = vi.fn<NonNullable<Parameters<typeof usePointerCaptor>[0]>>();
    const { result } = renderHook(() => usePointerCaptor(spy));
    const element = document.createElement("div");
    act(() => {
      result.current(element);
      fireEvent.touchStart(element, {
        touches: [],
      });
    });

    spy.notCalled.should.true;
  });

  it("should not call onPointerMove when touches.length !== 1", () => {
    const spy = vi.fn<NonNullable<Parameters<typeof usePointerCaptor>[1]>>();
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

    spy.notCalled.should.true;
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
      vi.spyOn(touchStart, "target").get(() => ({}));
      vi.spyOn(touchStart, "touches").get(() => [{}]);
      element.dispatchEvent(touchStart);
    });

    spy.notCalled.should.true;
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
      vi.spyOn(touchEnd, "target").get(() => ({}));
      vi.spyOn(touchEnd, "touches").get(() => [{}]);
      element.dispatchEvent(touchEnd);
    });

    spy.notCalled.should.true;
  });

  it("should call onPointerMove for document touchmove", () => {
    const spy = vi.fn<NonNullable<Parameters<typeof usePointerCaptor>[1]>>();
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
    const spy = vi.fn<NonNullable<Parameters<typeof usePointerCaptor>[1]>>();
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
      vi.spyOn(touchEnd, "target").get(() => element);
      vi.spyOn(touchEnd, "touches").get(() => [{}]);
      document.dispatchEvent(touchEnd);
    });

    spy.notCalled.should.true;
  });

  it("should not handle document touchend if it was dispatched for touch target", () => {
    const spy = vi.fn<NonNullable<Parameters<typeof usePointerCaptor>[1]>>();
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
      vi.spyOn(touchEnd, "target").get(() => element);
      vi.spyOn(touchEnd, "touches").get(() => [{}]);
      document.dispatchEvent(touchEnd);
    });

    spy.notCalled.should.true;
  });
});
