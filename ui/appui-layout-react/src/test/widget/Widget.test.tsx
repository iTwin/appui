/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { act, fireEvent, render } from "@testing-library/react";
import * as React from "react";
import * as sinon from "sinon";
import {
  addFloatingWidget,
  addPanelWidget, addTab, createNineZoneState, NineZoneDispatch, PanelSideContext,
  PanelWidget, PanelWidgetDragStartAction, Widget, WidgetIdContext,
} from "../../appui-layout-react";
import * as NineZoneModule from "../../appui-layout-react/base/NineZone";
import { TestNineZoneProvider } from "../Providers";
import { defaultProps } from "./PanelWidget.test";

describe("PanelWidget", () => {
  describe("PANEL_WIDGET_DRAG_START", () => {
    it("should dispatch", () => {
      sinon.stub(NineZoneModule, "getUniqueId").returns("newId");
      const dispatch = sinon.stub<NineZoneDispatch>();
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      const { container } = render(
        <TestNineZoneProvider
          state={state}
          dispatch={dispatch}
        >
          <PanelSideContext.Provider value="left">
            <PanelWidget widgetId="w1" {...defaultProps} />
          </PanelSideContext.Provider>
        </TestNineZoneProvider>,
      );

      const titleBar = container.getElementsByClassName("nz-widget-tabBar")[0];
      const handle = titleBar.getElementsByClassName("nz-handle")[0];
      act(() => {
        fireEvent.mouseDown(handle);
        fireEvent.mouseMove(handle);
      });

      sinon.assert.calledOnceWithExactly(dispatch, sinon.match({
        type: "PANEL_WIDGET_DRAG_START",
        id: "w1",
        newFloatingWidgetId: "newId",
      }));
    });

    it("should adjust bounds to keep widget under pointer", () => {
      const dispatch = sinon.stub<NineZoneDispatch>();
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      const { container } = render(
        <TestNineZoneProvider
          state={state}
          dispatch={dispatch}
        >
          <PanelSideContext.Provider value="left">
            <PanelWidget widgetId="w1" {...defaultProps} />
          </PanelSideContext.Provider>
        </TestNineZoneProvider>,
      );

      const titleBar = container.getElementsByClassName("nz-widget-tabBar")[0];
      const handle = titleBar.getElementsByClassName("nz-handle")[0];
      act(() => {
        fireEvent.mouseDown(handle, { clientX: 230 });
        fireEvent.mouseMove(handle, { clientX: 230 });
      });

      sinon.assert.calledOnce(dispatch);
      dispatch.firstCall.args[0].type.should.eq("PANEL_WIDGET_DRAG_START");
      const action = dispatch.firstCall.args[0] as PanelWidgetDragStartAction;
      action.bounds.should.eql({
        top: 0,
        bottom: 200,
        left: 50,
        right: 250,
      });
    });

    it("should use preferredFloatingWidgetSize of active tab", () => {
      const dispatch = sinon.stub<NineZoneDispatch>();
      let state = createNineZoneState();
      state = addTab(state, "t1", {
        preferredFloatingWidgetSize: {
          height: 400,
          width: 500,
        },
      });
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      const { container } = render(
        <TestNineZoneProvider
          state={state}
          dispatch={dispatch}
        >
          <PanelSideContext.Provider value="left">
            <PanelWidget widgetId="w1" {...defaultProps} />
          </PanelSideContext.Provider>
        </TestNineZoneProvider>,
      );

      const titleBar = container.getElementsByClassName("nz-widget-tabBar")[0];
      const handle = titleBar.getElementsByClassName("nz-handle")[0];
      act(() => {
        fireEvent.mouseDown(handle);
        fireEvent.mouseMove(handle);
      });

      const action = dispatch.firstCall.args[0] as PanelWidgetDragStartAction;
      action.bounds.should.eql({
        top: 0,
        bottom: 400,
        left: 0,
        right: 500,
      });
    });
  });

  it("should measure widget bounds", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider
        state={state}
      >
        <PanelSideContext.Provider value="left">
          <PanelWidget widgetId="w1" {...defaultProps} />
        </PanelSideContext.Provider>
      </TestNineZoneProvider>,
    );

    const widget = container.getElementsByClassName("nz-widget-panelWidget")[0];
    const spy = sinon.spy(widget, "getBoundingClientRect");

    const tab = container.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.mouseDown(tab);
      fireEvent.mouseMove(document, { clientX: 10, clientY: 10 });
    });

    sinon.assert.calledOnce(spy);
  });

  it("should dispatch FLOATING_WIDGET_BRING_TO_FRONT", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider
        state={state}
        dispatch={dispatch}
      >
        <WidgetIdContext.Provider value="w1">
          <Widget />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>,
    );

    const widgetElement = container.getElementsByClassName("nz-widget-widget")[0];
    fireEvent.click(widgetElement);

    sinon.assert.calledOnceWithExactly(dispatch, {
      type: "FLOATING_WIDGET_BRING_TO_FRONT",
      id: "w1",
    });
  });
});
