/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as sinon from "sinon";
import { act, renderHook } from "@testing-library/react-hooks";
import { createDragInfo, createDragStartArgs, setRefValue } from "../Providers";
import { expect, should } from "chai";
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
      const spy =
        vi.fn<Parameters<DragManager["onDragStart"]["addListener"]>[0]>();
      sut.onDragStart.addListener(spy);
      sut.handleDragStart(createDragStartArgs());
      sinon.assert.calledOnceWithExactly(
        spy,
        sinon.match.any,
        sinon.match.any,
        undefined
      );
    });
  });
});

describe("useTabTarget", () => {
  it("should clear target when target changes", async () => {
    const dragManager = new DragManager();
    const spy = sinon.spy(dragManager, "handleTargetChanged");
    const { result } = renderHook(
      () =>
        useTabTarget({
          tabIndex: 0,
          widgetId: "w1",
        }),
      {
        wrapper: (props) => (
          <DragManagerContext.Provider value={dragManager} {...props} />
        ),
      }
    );

    const element = document.createElement("div");
    const elementFromPointStub = sinon
      .stub(document, "elementFromPoint")
      .returns(element);
    setRefValue(result.current[0], element);

    dragManager.handleDragStart(createDragStartArgs());
    dragManager.handleDrag(10, 20);
    await waitFor(() => {
      result.current[1].should.true;
    });

    spy.mockReset();
    elementFromPointStub.restore();
    sinon
      .stub(document, "elementFromPoint")
      .returns(document.createElement("div"));
    dragManager.handleDrag(10, 20);

    spy.calledOnceWithExactly(undefined).should.true;
    await waitFor(() => {
      result.current[1].should.false;
    });
  });

  it("should clear target when drag interaction ends", async () => {
    const dragManager = new DragManager();
    const stub =
      vi.fn<Parameters<DragManager["onTargetChanged"]["addListener"]>[0]>();
    dragManager.onTargetChanged.addListener(stub);
    const { result } = renderHook(
      () =>
        useTabTarget({
          tabIndex: 0,
          widgetId: "w1",
        }),
      {
        wrapper: (props) => (
          <DragManagerContext.Provider value={dragManager} {...props} />
        ),
      }
    );

    const element = document.createElement("div");
    const elementFromPointStub = sinon
      .stub(document, "elementFromPoint")
      .returns(element);
    setRefValue(result.current[0], element);

    dragManager.handleDragStart(createDragStartArgs());
    dragManager.handleDrag(10, 20);
    await waitFor(() => {
      result.current[1].should.true;
    });

    stub.mockReset();
    elementFromPointStub.restore();
    dragManager.handleDragEnd();

    sinon.assert.calledOnceWithExactly(stub, undefined);
    await waitFor(() => {
      result.current[1].should.false;
    });
  });
});

describe("usePanelTarget", () => {
  it("should clear target", () => {
    const dragManager = new DragManager();
    const spy = sinon.spy(dragManager, "handleTargetChanged");
    const { result } = renderHook(
      () =>
        usePanelTarget({
          side: "left",
          newWidgetId: "w1",
        }),
      {
        wrapper: (props) => (
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

    spy.calledOnceWithExactly(undefined).should.true;
  });
});

describe("useWidgetTarget", () => {
  it("should clear target", () => {
    const dragManager = new DragManager();
    const spy = sinon.spy(dragManager, "handleTargetChanged");
    const { result } = renderHook(
      () =>
        useTarget({
          type: "widget",
          widgetId: "0",
        }),
      {
        wrapper: (props) => (
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

    spy.calledOnceWithExactly(undefined).should.true;
  });
});

describe("useIsDraggedType", () => {
  it("should return true", async () => {
    const dragManager = new DragManager();
    const { result } = renderHook(() => useIsDraggedType("tab"), {
      wrapper: (props) => (
        <DragManagerContext.Provider value={dragManager} {...props} />
      ),
    });
    result.current.should.false;

    dragManager.handleDragStart({
      info: createDragInfo(),
      item: {
        type: "tab",
        id: "",
      },
    });
    await waitFor(() => {
      result.current.should.true;
    });
  });
});

describe("useDraggedItem", () => {
  it("should return dragged item", () => {
    const dragManager = new DragManager();
    const { result } = renderHook(() => useDraggedItem(), {
      wrapper: (props) => (
        <DragManagerContext.Provider value={dragManager} {...props} />
      ),
    });
    should().equal(result.current, undefined);

    act(() => {
      dragManager.handleDragStart({
        info: createDragInfo(),
        item: {
          type: "tab",
          id: "",
        },
      });
    });
    result.current!.should.eql({
      type: "tab",
      id: "",
    });

    act(() => {
      dragManager.handleDragUpdate({ type: "tab", id: "abc" });
    });
    result.current!.should.eql({
      type: "tab",
      id: "abc",
    });

    act(() => {
      dragManager.handleDragEnd();
    });
    should().equal(result.current, undefined);
  });
});

describe("useTargeted", () => {
  it("returns a targeted object", () => {
    const dragManager = new DragManager();
    const { result } = renderHook(() => useTargeted(), {
      wrapper: (props) => (
        <DragManagerContext.Provider value={dragManager} {...props} />
      ),
    });
    expect(result.current).to.be.undefined;

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

    result.current!.should.eql({ type: "window" });
  });
});
