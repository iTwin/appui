/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
  act,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from "@testing-library/react";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone.js";
import * as NineZoneModule from "../../../appui-react/layout/base/NineZone.js";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers.js";
import { addFloatingWidget } from "../../../appui-react/layout/state/internal/WidgetStateHelpers.js";
import { PanelTarget } from "../../../appui-react/layout/target/PanelTarget.js";
import { TabTarget } from "../../../appui-react/layout/target/TabTarget.js";
import { TabIdContext } from "../../../appui-react/layout/widget/ContentRenderer.js";
import { FloatingWidgetProvider } from "../../../appui-react/layout/widget/FloatingWidget.js";
import { useDrag } from "../../../appui-react/layout/widget/TabBar.js";
import { WidgetIdContext } from "../../../appui-react/layout/widget/Widget.js";
import { TestNineZoneProvider } from "../Providers.js";
import { addTabs } from "../Utils.js";

describe("WidgetTitleBar", () => {
  it("should dispatch WIDGET_DRAG_END", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <FloatingWidgetProvider id="w1" />
      </TestNineZoneProvider>
    );
    const titleBar = container.getElementsByClassName("nz-widget-tabBar")[0];
    const handle = titleBar.getElementsByClassName("nz-handle")[0];
    act(() => {
      fireEvent.mouseDown(handle);
      fireEvent.mouseMove(document);
      dispatch.mockReset();
      fireEvent.mouseUp(document);
    });
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "WIDGET_DRAG_END",
        floatingWidgetId: "w1",
        target: {
          type: "window",
        },
      })
    );
  });

  it("should dispatch FLOATING_WIDGET_CLEAR_USER_SIZED", async () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <FloatingWidgetProvider id="w1" />
      </TestNineZoneProvider>
    );
    const titleBar = container.getElementsByClassName("nz-widget-tabBar")[0];
    const handle = titleBar.getElementsByClassName("nz-handle")[0];

    act(() => {
      fireEvent.mouseDown(handle);
      fireEvent.mouseUp(handle);
      fireEvent.mouseDown(handle);
      dispatch.mockReset();
      fireEvent.mouseUp(handle);
    });

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: "FLOATING_WIDGET_CLEAR_USER_SIZED",
        id: "w1",
      });
    });
  });

  it("should dispatch WIDGET_DRAG_END with tab target", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2"]);
    state = addFloatingWidget(state, "w1", ["t1"]);
    state = addPanelWidget(state, "left", "w2", ["t2"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <FloatingWidgetProvider id="w1" />
        <WidgetIdContext.Provider value="w2">
          <TabIdContext.Provider value="t2">
            <TabTarget />
          </TabIdContext.Provider>
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    const titleBar = container.getElementsByClassName("nz-widget-tabBar")[0];
    const handle = titleBar.getElementsByClassName("nz-handle")[0];
    const targets = container.getElementsByClassName("nz-target-tabTarget");
    const target = targets[targets.length - 1];

    vi.spyOn(document, "elementFromPoint").mockReturnValue(target);

    act(() => {
      fireEvent.mouseDown(handle);
      fireEvent.mouseMove(target);
      dispatch.mockReset();
      fireEvent.mouseUp(document);
    });
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "WIDGET_DRAG_END",
        floatingWidgetId: "w1",
        target: expect.objectContaining({
          tabIndex: 0,
          type: "tab",
          widgetId: "w2",
        }),
      })
    );
  });

  it("should dispatch WIDGET_DRAG_END with panel target", () => {
    vi.spyOn(NineZoneModule, "getUniqueId").mockReturnValue("newId");
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <FloatingWidgetProvider id="w1" />
        <PanelTarget side="right" />
      </TestNineZoneProvider>
    );
    const titleBar = container.getElementsByClassName("nz-widget-tabBar")[0];
    const handle = titleBar.getElementsByClassName("nz-handle")[0];
    const target = container.getElementsByClassName("nz-target-panelTarget")[0];
    vi.spyOn(document, "elementFromPoint").mockReturnValue(target);
    act(() => {
      fireEvent.mouseDown(handle);
      fireEvent.mouseMove(target);
      dispatch.mockReset();
      fireEvent.mouseUp(document);
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "WIDGET_DRAG_END",
      floatingWidgetId: "w1",
      target: {
        newWidgetId: "newId",
        side: "right",
        type: "panel",
      },
    });
  });

  it("should dispatch FLOATING_WIDGET_BRING_TO_FRONT", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <FloatingWidgetProvider id="w1" />
      </TestNineZoneProvider>
    );
    const titleBar = container.getElementsByClassName("nz-widget-tabBar")[0];
    const handle = titleBar.getElementsByClassName("nz-handle")[0];
    act(() => {
      dispatch.mockReset();
      fireEvent.touchStart(handle, {
        touches: [{}],
      });
    });
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "FLOATING_WIDGET_BRING_TO_FRONT",
        id: "w1",
      })
    );
  });
});

describe("useDrag", () => {
  it("should start drag on pointer move", () => {
    const spy = vi.fn<Required<Parameters<typeof useDrag>>[0]>();
    const { result } = renderHook(() => useDrag(spy));
    act(() => {
      const instance = document.createElement("div");
      result.current(instance);
      fireEvent.mouseDown(instance);
      fireEvent.mouseMove(document);
    });
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should not start drag on subsequent pointer move", () => {
    const spy = vi.fn<Required<Parameters<typeof useDrag>>[0]>();
    const { result } = renderHook(() => useDrag(spy));
    act(() => {
      const instance = document.createElement("div");
      result.current(instance);
      fireEvent.mouseDown(instance);
      fireEvent.mouseMove(document);
      spy.mockReset();
      fireEvent.mouseMove(document);
    });
    expect(spy).not.toBeCalled();
  });

  it("should report drag action", () => {
    const spy = vi.fn<Required<Parameters<typeof useDrag>>[1]>();
    const { result } = renderHook(() => useDrag(undefined, spy));
    act(() => {
      const instance = document.createElement("div");
      result.current(instance);
      fireEvent.mouseDown(instance);
      fireEvent.mouseMove(document);
      fireEvent.mouseMove(document);
    });
    expect(spy).toHaveBeenCalledOnce();
  });

  it("should report drag end action", () => {
    const spy = vi.fn<Required<Parameters<typeof useDrag>>[2]>();
    const { result } = renderHook(() => useDrag(undefined, undefined, spy));
    act(() => {
      const instance = document.createElement("div");
      result.current(instance);
      fireEvent.mouseDown(instance);
      fireEvent.mouseUp(document);
    });
    expect(spy).toHaveBeenCalledOnce();
  });
});
