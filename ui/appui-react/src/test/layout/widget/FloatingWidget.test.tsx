/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, fireEvent, render, renderHook } from "@testing-library/react";
import * as React from "react";
import { createLayoutStore } from "../../../appui-react/layout/base/LayoutStore.js";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone.js";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers.js";
import { addWidgetToolSettings } from "../../../appui-react/layout/state/internal/ToolSettingsStateHelpers.js";
import { addFloatingWidget } from "../../../appui-react/layout/state/internal/WidgetStateHelpers.js";
import {
  FloatingWidgetProvider,
  getResizeBy,
  useFloatingWidgetId,
  useWidgetAllowedToDock,
} from "../../../appui-react/layout/widget/FloatingWidget.js";
import { WidgetIdContext } from "../../../appui-react/layout/widget/Widget.js";
import { TestNineZoneProvider } from "../Providers.js";

describe("FloatingWidget", () => {
  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1" });
    state = addFloatingWidget(state, "w1", ["t1"]);
    const component = render(
      <TestNineZoneProvider defaultState={state}>
        <FloatingWidgetProvider id="w1" />
      </TestNineZoneProvider>
    );
    component.getByText("t1");
  });

  it("should render hidden when hideWithUiWhenFloating is true", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { hideWithUiWhenFloating: true });
    state = addFloatingWidget(state, "w1", ["t1"]);
    const component = render(
      <TestNineZoneProvider defaultState={state}>
        <FloatingWidgetProvider id="w1" />
      </TestNineZoneProvider>
    );
    const widget = component.container.getElementsByClassName(
      "nz-widget-floatingWidget nz-hidden"
    );
    expect(Array.from(widget)).to.have.lengthOf(1);
  });

  it("should render dragged", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"], undefined, {
      minimized: true,
    });
    const component = render(
      <TestNineZoneProvider defaultState={state}>
        <FloatingWidgetProvider id="w1" />
      </TestNineZoneProvider>
    );
    const titleBar =
      component.container.getElementsByClassName("nz-widget-tabBar")[0];
    const handle = titleBar.getElementsByClassName("nz-handle")[0];
    act(() => {
      fireEvent.mouseDown(handle);
      fireEvent.mouseMove(handle);
    });
    const widget = component.container.getElementsByClassName(
      "nz-widget-floatingWidget nz-dragged"
    );
    expect(Array.from(widget)).to.have.lengthOf(1);
  });

  it("should dispatch FLOATING_WIDGET_RESIZE", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(
      state,
      "w1",
      ["t1"],
      { resizable: true },
      {
        minimized: true,
      }
    );
    const { container } = render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <FloatingWidgetProvider id="w1" />
      </TestNineZoneProvider>
    );
    const handle = container.getElementsByClassName(
      "nz-widget-floatingWidget_handle"
    )[0];
    act(() => {
      fireEvent.mouseDown(handle);
      dispatch.mockReset();
      fireEvent.mouseMove(handle);
    });
    expect(dispatch).toHaveBeenCalledOnce();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "FLOATING_WIDGET_RESIZE",
        id: "w1",
      })
    );
  });

  it("tool settings should NOT have resize handles", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addFloatingWidget(
      state,
      "toolSettings",
      ["ts"],
      { resizable: true },
      {
        minimized: true,
      }
    );
    state = addWidgetToolSettings(state, "ts");
    const { container } = render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <FloatingWidgetProvider id="toolSettings" />
      </TestNineZoneProvider>
    );
    const handleList = container.getElementsByClassName(
      "nz-widget-floatingWidget_handle"
    );
    expect(handleList).toHaveLength(0);
  });
});

describe("getResizeBy", () => {
  it("top", () => {
    expect(getResizeBy("top", { x: 10, y: 20 })).toEqual({
      left: 0,
      top: -20,
      right: 0,
      bottom: 0,
    });
  });

  it("right", () => {
    expect(getResizeBy("right", { x: 10, y: 20 })).toEqual({
      left: 0,
      top: 0,
      right: 10,
      bottom: 0,
    });
  });

  it("bottom", () => {
    expect(getResizeBy("bottom", { x: 10, y: 20 })).toEqual({
      left: 0,
      top: 0,
      right: 0,
      bottom: 20,
    });
  });

  it("left", () => {
    expect(getResizeBy("left", { x: 10, y: 20 })).toEqual({
      left: -10,
      top: 0,
      right: 0,
      bottom: 0,
    });
  });

  it("topLeft", () => {
    expect(getResizeBy("topLeft", { x: 10, y: 20 })).toEqual({
      left: -10,
      top: -20,
      right: 0,
      bottom: 0,
    });
  });

  it("topRight", () => {
    expect(getResizeBy("topRight", { x: 10, y: 20 })).toEqual({
      left: 0,
      top: -20,
      right: 10,
      bottom: 0,
    });
  });

  it("bottomLeft", () => {
    expect(getResizeBy("bottomLeft", { x: 10, y: 20 })).toEqual({
      left: -10,
      top: 0,
      right: 0,
      bottom: 20,
    });
  });

  it("bottomRight", () => {
    expect(getResizeBy("bottomRight", { x: 10, y: 20 })).toEqual({
      left: 0,
      top: 0,
      right: 10,
      bottom: 20,
    });
  });
});

describe("useFloatingWidgetId", () => {
  it("should return floating widget id", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { result } = renderHook(() => useFloatingWidgetId(), {
      wrapper: (props: any) => (
        <TestNineZoneProvider layout={createLayoutStore(state)}>
          <WidgetIdContext.Provider value="w1" {...props} />
        </TestNineZoneProvider>
      ),
    });
    expect(result.current).toEqual("w1");
  });

  it("should return `undefined` if WidgetIdContext is not provided", () => {
    const { result } = renderHook(() => useFloatingWidgetId(), {
      wrapper: (props: any) => <TestNineZoneProvider {...props} />,
    });
    expect(result.current).toEqual(undefined);
  });
});

describe("useWidgetAllowedToDock", () => {
  it("should return true if floating widget is allowed to dock", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { result } = renderHook(() => useWidgetAllowedToDock(), {
      wrapper: (props: any) => (
        <TestNineZoneProvider layout={createLayoutStore(state)}>
          <WidgetIdContext.Provider value="w1" {...props} />
        </TestNineZoneProvider>
      ),
    });
    expect(result.current).toEqual(true);
  });

  it("should return false if floating widget is not allowed to dock", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { allowedPanelTargets: [] });
    state = addFloatingWidget(state, "test1", ["t1"]);

    const { result } = renderHook(() => useWidgetAllowedToDock(), {
      wrapper: (props: any) => (
        <TestNineZoneProvider layout={createLayoutStore(state)}>
          <WidgetIdContext.Provider value="test1" {...props} />
        </TestNineZoneProvider>
      ),
    });
    expect(result.current).toEqual(false);
  });
});
