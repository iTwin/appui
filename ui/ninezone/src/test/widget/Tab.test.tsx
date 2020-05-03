/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as sinon from "sinon";
import { act, fireEvent, render } from "@testing-library/react";
import {
  addPanelWidget, addTab, createNineZoneState, NineZoneDispatch, NineZoneProvider, WIDGET_TAB_CLICK, WIDGET_TAB_DOUBLE_CLICK, WIDGET_TAB_DRAG_START,
  WidgetStateContext, WidgetTab,
} from "../../ui-ninezone";
import { PanelSideContext } from "../../ui-ninezone/widget-panels/Panel";
import { WidgetTabsEntryContext } from "../../ui-ninezone/widget/Tabs";
import { WidgetContext } from "../../ui-ninezone/widget/Widget";

describe("WidgetTab", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it("should render active", () => {
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", { activeTabId: "t1" });
    nineZone = addTab(nineZone, "w1", "t1");
    const { container } = render(
      <NineZoneProvider
        state={nineZone}
        dispatch={sinon.spy()}
      >
        <WidgetStateContext.Provider value={nineZone.widgets.w1}>
          <WidgetTabsEntryContext.Provider value={{
            lastNotOverflown: false,
          }}>
            <WidgetTab tab={nineZone.tabs.t1} />
          </WidgetTabsEntryContext.Provider>
        </WidgetStateContext.Provider>
      </NineZoneProvider>,
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render overflown", () => {
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1");
    nineZone = addTab(nineZone, "w1", "t1");
    const { container } = render(
      <NineZoneProvider
        state={nineZone}
        dispatch={sinon.spy()}
      >
        <WidgetStateContext.Provider value={nineZone.widgets.w1}>
          <WidgetTabsEntryContext.Provider value={{
            lastNotOverflown: false,
          }}>
            <WidgetTab tab={nineZone.tabs.t1} />
          </WidgetTabsEntryContext.Provider>
        </WidgetStateContext.Provider>
      </NineZoneProvider>,
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render minimized", () => {
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", { minimized: true });
    nineZone = addTab(nineZone, "w1", "t1");
    const { container } = render(
      <NineZoneProvider
        state={nineZone}
        dispatch={sinon.spy()}
      >
        <WidgetStateContext.Provider value={nineZone.widgets.w1}>
          <WidgetTabsEntryContext.Provider value={{
            lastNotOverflown: false,
          }}>
            <WidgetTab tab={nineZone.tabs.t1} />
          </WidgetTabsEntryContext.Provider>
        </WidgetStateContext.Provider>
      </NineZoneProvider>,
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render first inactive", () => {
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", { activeTabId: "t1" });
    nineZone = addTab(nineZone, "w1", "t1");
    const { container } = render(
      <NineZoneProvider
        state={nineZone}
        dispatch={sinon.spy()}
      >
        <WidgetStateContext.Provider value={nineZone.widgets.w1}>
          <WidgetTabsEntryContext.Provider value={{
            lastNotOverflown: false,
          }}>
            <WidgetTab tab={nineZone.tabs.t1} firstInactive />
          </WidgetTabsEntryContext.Provider>
        </WidgetStateContext.Provider>
      </NineZoneProvider>,
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render last not overflown", () => {
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1", { activeTabId: "t1" });
    nineZone = addTab(nineZone, "w1", "t1");
    const { container } = render(
      <NineZoneProvider
        state={nineZone}
        dispatch={sinon.spy()}
      >
        <WidgetStateContext.Provider value={nineZone.widgets.w1}>
          <WidgetTabsEntryContext.Provider value={{
            lastNotOverflown: true,
          }}>
            <WidgetTab tab={nineZone.tabs.t1} />
          </WidgetTabsEntryContext.Provider>
        </WidgetStateContext.Provider>
      </NineZoneProvider>,
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should dispatch WIDGET_TAB_CLICK", () => {
    const fakeTimers = sandbox.useFakeTimers();
    const dispatch = sinon.stub<NineZoneDispatch>();
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1");
    nineZone = addTab(nineZone, "w1", "t1");
    render(
      <NineZoneProvider
        state={nineZone}
        dispatch={dispatch}
      >
        <PanelSideContext.Provider value="left">
          <WidgetStateContext.Provider value={nineZone.widgets.w1}>
            <WidgetTabsEntryContext.Provider value={{
              lastNotOverflown: false,
            }}>
              <WidgetTab tab={nineZone.tabs.t1} />
            </WidgetTabsEntryContext.Provider>
          </WidgetStateContext.Provider>
        </PanelSideContext.Provider>
      </NineZoneProvider>,
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.pointerDown(tab);
      fireEvent.pointerUp(tab);
      fakeTimers.tick(300);
    });
    dispatch.calledOnceWithExactly(sinon.match({
      type: WIDGET_TAB_CLICK,
      side: "left",
      widgetId: "w1",
      id: "t1",
    })).should.true;
  });

  it("should dispatch WIDGET_TAB_DOUBLE_CLICK", () => {
    const fakeTimers = sandbox.useFakeTimers();
    const dispatch = sinon.stub<NineZoneDispatch>();
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1");
    nineZone = addTab(nineZone, "w1", "t1");
    render(
      <NineZoneProvider
        state={nineZone}
        dispatch={dispatch}
      >
        <PanelSideContext.Provider value="left">
          <WidgetStateContext.Provider value={nineZone.widgets.w1}>
            <WidgetTabsEntryContext.Provider value={{
              lastNotOverflown: false,
            }}>
              <WidgetTab tab={nineZone.tabs.t1} />
            </WidgetTabsEntryContext.Provider>
          </WidgetStateContext.Provider>
        </PanelSideContext.Provider>
      </NineZoneProvider>,
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.pointerDown(tab);
      fireEvent.pointerUp(tab);
      fireEvent.pointerDown(tab);
      fireEvent.pointerUp(tab);
      fakeTimers.tick(300);
    });
    dispatch.calledOnceWithExactly(sinon.match({
      type: WIDGET_TAB_DOUBLE_CLICK,
      side: "left",
      widgetId: "w1",
      id: "t1",
    })).should.true;
  });

  it("should dispatch WIDGET_TAB_DRAG_START on pointer move", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1");
    nineZone = addTab(nineZone, "w1", "t1");
    render(
      <NineZoneProvider
        state={nineZone}
        dispatch={dispatch}
      >
        <WidgetContext.Provider value={{ measure: () => ({ height: 0, width: 0 }) }}>
          <WidgetStateContext.Provider value={nineZone.widgets.w1}>
            <WidgetTab tab={nineZone.tabs.t1} />
          </WidgetStateContext.Provider>
        </WidgetContext.Provider>
      </NineZoneProvider>,
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.pointerDown(tab);

      const moveEvent = document.createEvent("MouseEvent");
      moveEvent.initEvent("pointermove");
      sinon.stub(moveEvent, "clientX").get(() => 10);
      sinon.stub(moveEvent, "clientY").get(() => 10);
      fireEvent(document, moveEvent);
    });
    dispatch.calledOnceWithExactly(sinon.match({
      type: WIDGET_TAB_DRAG_START,
      widgetId: "w1",
      id: "t1",
    })).should.true;
  });

  it("should not dispatch WIDGET_TAB_DRAG_START on pointer move if pointer moved less than 10px", () => {
    const dispatch = sinon.stub<NineZoneDispatch>();
    let nineZone = createNineZoneState();
    nineZone = addPanelWidget(nineZone, "left", "w1");
    nineZone = addTab(nineZone, "w1", "t1");
    render(
      <NineZoneProvider
        state={nineZone}
        dispatch={dispatch}
      >
        <WidgetStateContext.Provider value={nineZone.widgets.w1}>
          <WidgetTab tab={nineZone.tabs.t1} />
        </WidgetStateContext.Provider>
      </NineZoneProvider>,
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.pointerDown(tab);

      const moveEvent = document.createEvent("MouseEvent");
      moveEvent.initEvent("pointermove");
      sinon.stub(moveEvent, "clientX").get(() => 5);
      sinon.stub(moveEvent, "clientY").get(() => 0);
      fireEvent(document, moveEvent);
    });
    dispatch.notCalled.should.true;
  });
});
