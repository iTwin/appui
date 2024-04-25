/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import { createDragInfo, createDragStartArgs, setRefValue } from "../Providers";
import { waitFor } from "@testing-library/react";
import {
  DragManager,
  DragManagerContext,
  useDraggedItem,
  useIsDraggedType,
  usePanelTarget,
  useTabTarget,
  useTarget,
  useTargeted,
} from "../../../appui-react/layout/base/DragManager";

describe("DragManager", () => {
  describe("handleTargetChanged", () => {
    it("should not update target if not dragging", () => {
      const sut = new DragManager();
      sut.handleTargetChanged({
        type: "panel",
        side: "left",
        newWidgetId: "w1",
      });
      const spy = vi.fn();
      sut.onDragStart.addListener(spy);
      sut.handleDragStart(createDragStartArgs());
      expect(spy).toHaveBeenCalledOnce();
    });
  });
});

describe("useTabTarget", () => {
  it("should clear target when target changes", async () => {
    const dragManager = new DragManager();
    const spy = vi.spyOn(dragManager, "handleTargetChanged");
    const { result } = renderHook(
      () =>
        useTabTarget({
          tabIndex: 0,
          widgetId: "w1",
        }),
      {
        wrapper: (props: any) => (
          <DragManagerContext.Provider value={dragManager} {...props} />
        ),
      }
    );

    const element = document.createElement("div");
    const elementFromPointStub = vi
      .spyOn(document, "elementFromPoint")
      .mockReturnValue(element);
    setRefValue(result.current[0], element);

    dragManager.handleDragStart(createDragStartArgs());
    dragManager.handleDrag(10, 20);
    await waitFor(() => {
      expect(result.current[1]).toEqual(true);
    });

    spy.mockReset();
    elementFromPointStub.mockReset();
    vi.spyOn(document, "elementFromPoint").mockReturnValue(
      document.createElement("div")
    );
    dragManager.handleDrag(10, 20);

    expect(spy).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(result.current[1]).toEqual(false);
    });
  });

  it("should clear target when drag interaction ends", async () => {
    const dragManager = new DragManager();
    const stub = vi.fn();
    dragManager.onTargetChanged.addListener(stub);
    const { result } = renderHook(
      () =>
        useTabTarget({
          tabIndex: 0,
          widgetId: "w1",
        }),
      {
        wrapper: (props: any) => (
          <DragManagerContext.Provider value={dragManager} {...props} />
        ),
      }
    );

    const element = document.createElement("div");
    const elementFromPointStub = vi
      .spyOn(document, "elementFromPoint")
      .mockReturnValue(element);
    setRefValue(result.current[0], element);

    dragManager.handleDragStart(createDragStartArgs());
    dragManager.handleDrag(10, 20);
    await waitFor(() => {
      expect(result.current[1]).toEqual(true);
    });

    stub.mockReset();
    elementFromPointStub.mockReset();
    dragManager.handleDragEnd();

    expect(stub).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(result.current[1]).toEqual(false);
    });
  });
});

describe("usePanelTarget", () => {
  it("should clear target", () => {
    const dragManager = new DragManager();
    const spy = vi.spyOn(dragManager, "handleTargetChanged");
    const { result } = renderHook(
      () =>
        usePanelTarget({
          side: "left",
          newWidgetId: "w1",
        }),
      {
        wrapper: (props: any) => (
          <DragManagerContext.Provider value={dragManager} {...props} />
        ),
      }
    );

    const element = document.createElement("div");
    vi.spyOn(document, "elementFromPoint").mockReturnValue(element);
    setRefValue(result.current[0], element);

    dragManager.handleDragStart(createDragStartArgs());
    dragManager.handleDrag(10, 20);

    spy.mockReset();

    setRefValue(result.current[0], document.createElement("div"));
    dragManager.handleDrag(10, 20);

    expect(spy).toHaveBeenCalledOnce();
  });
});

describe("useWidgetTarget", () => {
  it("should clear target", () => {
    const dragManager = new DragManager();
    const spy = vi.spyOn(dragManager, "handleTargetChanged");
    const { result } = renderHook(
      () =>
        useTarget({
          type: "widget",
          widgetId: "0",
        }),
      {
        wrapper: (props: any) => (
          <DragManagerContext.Provider value={dragManager} {...props} />
        ),
      }
    );

    const element = document.createElement("div");
    vi.spyOn(document, "elementFromPoint").mockReturnValue(element);
    setRefValue(result.current[0], element);

    dragManager.handleDragStart(createDragStartArgs());
    dragManager.handleDrag(10, 20);

    spy.mockReset();

    setRefValue(result.current[0], document.createElement("div"));
    dragManager.handleDrag(10, 20);

    expect(spy).toHaveBeenCalledOnce();
  });
});

describe("useIsDraggedType", () => {
  it("should return true", async () => {
    const dragManager = new DragManager();
    const { result } = renderHook(() => useIsDraggedType("tab"), {
      wrapper: (props: any) => (
        <DragManagerContext.Provider value={dragManager} {...props} />
      ),
    });
    expect(result.current).toEqual(false);

    dragManager.handleDragStart({
      info: createDragInfo(),
      item: {
        type: "tab",
        id: "",
      },
    });
    await waitFor(() => {
      expect(result.current).toEqual(true);
    });
  });
});

describe("useDraggedItem", () => {
  it("should return dragged item", () => {
    const dragManager = new DragManager();
    const { result } = renderHook(() => useDraggedItem(), {
      wrapper: (props: any) => (
        <DragManagerContext.Provider value={dragManager} {...props} />
      ),
    });
    expect(result.current).toEqual(undefined);

    act(() => {
      dragManager.handleDragStart({
        info: createDragInfo(),
        item: {
          type: "tab",
          id: "",
        },
      });
    });
    expect(result.current).toEqual({
      type: "tab",
      id: "",
    });

    act(() => {
      dragManager.handleDragUpdate({ type: "tab", id: "abc" });
    });
    expect(result.current).toEqual({
      type: "tab",
      id: "abc",
    });

    act(() => {
      dragManager.handleDragEnd();
    });
    expect(result.current).toEqual(undefined);
  });
});

describe("useTargeted", () => {
  it("returns a targeted object", () => {
    const dragManager = new DragManager();
    const { result } = renderHook(() => useTargeted(), {
      wrapper: (props: any) => (
        <DragManagerContext.Provider value={dragManager} {...props} />
      ),
    });
    expect(result.current).toEqual(undefined);

    act(() => {
      dragManager.handleDragStart({
        info: createDragInfo(),
        item: {
          type: "tab",
          id: "",
        },
      });
      dragManager.handleTargetChanged({
        type: "window",
      });
    });

    expect(result.current).toEqual({ type: "window" });
  });
});
