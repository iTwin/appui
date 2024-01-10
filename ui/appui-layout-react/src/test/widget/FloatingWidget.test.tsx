/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { act, fireEvent, render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import type { NineZoneDispatch } from "../../appui-layout-react";
import {
  createLayoutStore,
  createNineZoneState,
  FloatingWidgetProvider,
  getResizeBy,
  useFloatingWidgetId,
  useWidgetAllowedToDock,
  WidgetIdContext,
} from "../../appui-layout-react";
import { TestNineZoneProvider } from "../Providers";
import { addTab } from "../../appui-layout-react/state/internal/TabStateHelpers";
import { addWidgetToolSettings } from "../../appui-layout-react/state/internal/ToolSettingsStateHelpers";
import { addFloatingWidget } from "../../appui-layout-react/state/internal/WidgetStateHelpers";

describe("FloatingWidget", () => {
  it("should render", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <FloatingWidgetProvider id="w1" />
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render minimized", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"], undefined, {
      minimized: true,
    });
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <FloatingWidgetProvider id="w1" />
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render hidden when hideWithUiWhenFloating is true", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { hideWithUiWhenFloating: true });
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <FloatingWidgetProvider id="w1" />
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render dragged", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"], undefined, {
      minimized: true,
    });
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <FloatingWidgetProvider id="w1" />
      </TestNineZoneProvider>
    );
    const titleBar = container.getElementsByClassName("nz-widget-tabBar")[0];
    const handle = titleBar.getElementsByClassName("nz-handle")[0];
    act(() => {
      fireEvent.mouseDown(handle);
      fireEvent.mouseMove(handle);
    });
    container.firstChild!.should.matchSnapshot();
  });

  it("should dispatch FLOATING_WIDGET_RESIZE", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
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
      dispatch.reset();
      fireEvent.mouseMove(handle);
    });
    dispatch.calledOnceWithExactly(
      sinon.match({
        type: "FLOATING_WIDGET_RESIZE",
        id: "w1",
      })
    ).should.true;
  });

  it("tool settings should NOT have resize handles", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
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
    handleList.length.should.eq(0);
  });
});

describe("getResizeBy", () => {
  it("top", () => {
    getResizeBy("top", { x: 10, y: 20 }).should.eql({
      left: 0,
      top: -20,
      right: 0,
      bottom: 0,
    });
  });

  it("right", () => {
    getResizeBy("right", { x: 10, y: 20 }).should.eql({
      left: 0,
      top: 0,
      right: 10,
      bottom: 0,
    });
  });

  it("bottom", () => {
    getResizeBy("bottom", { x: 10, y: 20 }).should.eql({
      left: 0,
      top: 0,
      right: 0,
      bottom: 20,
    });
  });

  it("left", () => {
    getResizeBy("left", { x: 10, y: 20 }).should.eql({
      left: -10,
      top: 0,
      right: 0,
      bottom: 0,
    });
  });

  it("topLeft", () => {
    getResizeBy("topLeft", { x: 10, y: 20 }).should.eql({
      left: -10,
      top: -20,
      right: 0,
      bottom: 0,
    });
  });

  it("topRight", () => {
    getResizeBy("topRight", { x: 10, y: 20 }).should.eql({
      left: 0,
      top: -20,
      right: 10,
      bottom: 0,
    });
  });

  it("bottomLeft", () => {
    getResizeBy("bottomLeft", { x: 10, y: 20 }).should.eql({
      left: -10,
      top: 0,
      right: 0,
      bottom: 20,
    });
  });

  it("bottomRight", () => {
    getResizeBy("bottomRight", { x: 10, y: 20 }).should.eql({
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
      wrapper: (props) => (
        <TestNineZoneProvider layout={createLayoutStore(state)}>
          <WidgetIdContext.Provider value="w1" {...props} />
        </TestNineZoneProvider>
      ),
    });
    expect(result.current).to.eq("w1");
  });

  it("should return `undefined` if WidgetIdContext is not provided", () => {
    const { result } = renderHook(() => useFloatingWidgetId(), {
      wrapper: (props) => <TestNineZoneProvider {...props} />,
    });
    expect(result.current).to.be.undefined;
  });
});

describe("useWidgetAllowedToDock", () => {
  it("should return true if floating widget is allowed to dock", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { result } = renderHook(() => useWidgetAllowedToDock(), {
      wrapper: (props) => (
        <TestNineZoneProvider layout={createLayoutStore(state)}>
          <WidgetIdContext.Provider value="w1" {...props} />
        </TestNineZoneProvider>
      ),
    });
    expect(result.current).to.be.true;
  });

  it("should return false if floating widget is not allowed to dock", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { allowedPanelTargets: [] });
    state = addFloatingWidget(state, "test1", ["t1"]);

    const { result } = renderHook(() => useWidgetAllowedToDock(), {
      wrapper: (props) => (
        <TestNineZoneProvider layout={createLayoutStore(state)}>
          <WidgetIdContext.Provider value="test1" {...props} />
        </TestNineZoneProvider>
      ),
    });
    expect(result.current).to.be.false;
  });
});
