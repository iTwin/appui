/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as sinon from "sinon";
import { act, fireEvent, render } from "@testing-library/react";
import {
  addPanelWidget, createNineZoneState, NineZoneDispatch, NineZoneProvider, PANEL_WIDGET_DRAG_START, PanelSideContext, PanelWidget, Widget,
  WidgetIdContext,
} from "../../ui-ninezone";
import * as NineZoneModule from "../../ui-ninezone/base/NineZone";
import { addTab, FLOATING_WIDGET_BRING_TO_FRONT } from "../../ui-ninezone/base/NineZoneState";
import { FloatingWidgetIdContext } from "../../ui-ninezone/widget/FloatingWidget";

describe("PanelWidget", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it("should dispatch PANEL_WIDGET_DRAG_START", () => {
    sandbox.stub(NineZoneModule, "getUniqueId").returns("newId");
    const dispatch = sinon.stub<NineZoneDispatch>();
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1");
    const { container } = render(
      <NineZoneProvider
        state={nineZone}
        dispatch={dispatch}
      >
        <PanelSideContext.Provider value="left">
          <PanelWidget widgetId="w1" />
        </PanelSideContext.Provider>
      </NineZoneProvider>,
    );

    const titleBar = container.getElementsByClassName("nz-widget-tabBar")[0];
    const handle = titleBar.getElementsByClassName("nz-handle")[0];
    act(() => {
      fireEvent.pointerDown(handle);
      fireEvent.pointerMove(handle);
    });

    dispatch.calledOnceWithExactly(sinon.match({
      type: PANEL_WIDGET_DRAG_START,
      id: "w1",
      newFloatingWidgetId: "newId",
    })).should.true;
  });

  it("should measure widget bounds", () => {
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1");
    nineZone = addTab(nineZone, "w1", "t1");
    const { container } = render(
      <NineZoneProvider
        state={nineZone}
        dispatch={sinon.spy()}
      >
        <PanelSideContext.Provider value="left">
          <PanelWidget widgetId="w1" />
        </PanelSideContext.Provider>
      </NineZoneProvider>,
    );

    const widget = container.getElementsByClassName("nz-widget-panelWidget")[0];
    const spy = sinon.spy(widget, "getBoundingClientRect");

    const tab = container.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.pointerDown(tab);

      const moveEvent = document.createEvent("MouseEvent");
      moveEvent.initEvent("pointermove");
      sinon.stub(moveEvent, "clientX").get(() => 10);
      sinon.stub(moveEvent, "clientY").get(() => 10);
      fireEvent(document, moveEvent);
    });

    spy.calledOnce.should.true;
  });

  it("should dispatch FLOATING_WIDGET_BRING_TO_FRONT", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1");
    const { container } = render(
      <NineZoneProvider
        state={nineZone}
        dispatch={dispatch}
      >
        <WidgetIdContext.Provider value="w1">
          <FloatingWidgetIdContext.Provider value="fw1">
            <Widget />
          </FloatingWidgetIdContext.Provider>
        </WidgetIdContext.Provider>
      </NineZoneProvider>,
    );

    const widgetElement = container.getElementsByClassName("nz-widget-widget")[0];
    fireEvent.click(widgetElement);

    dispatch.calledOnceWithExactly({
      type: FLOATING_WIDGET_BRING_TO_FRONT,
      id: "fw1",
    }).should.true;
  });
});
