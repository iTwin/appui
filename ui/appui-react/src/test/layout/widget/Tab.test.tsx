/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Rectangle } from "@itwin/core-react";
import { SvgPlaceholder } from "@itwin/itwinui-icons-react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import * as React from "react";
import * as sinon from "sinon";
import { Key } from "ts-key-enum";
import type { NineZoneDispatch } from "../../../appui-react/layout/base/NineZone";
import { ShowWidgetIconContext } from "../../../appui-react/layout/base/NineZone";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers";
import { addFloatingWidget } from "../../../appui-react/layout/state/internal/WidgetStateHelpers";
import { PanelSideContext } from "../../../appui-react/layout/widget-panels/Panel";
import { WidgetOverflowContext } from "../../../appui-react/layout/widget/Overflow";
import {
  WidgetTab,
  WidgetTabProvider,
} from "../../../appui-react/layout/widget/Tab";
import { WidgetTabsEntryContext } from "../../../appui-react/layout/widget/Tabs";
import {
  WidgetContext,
  WidgetIdContext,
} from "../../../appui-react/layout/widget/Widget";
import { TestNineZoneProvider } from "../Providers";

describe("WidgetTab", () => {
  it("should render active", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { hideWithUiWhenFloating: true });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetIdContext.Provider value="w1">
          <WidgetTabsEntryContext.Provider
            value={{
              lastNotOverflown: false,
            }}
          >
            <WidgetTabProvider id="t1" />
          </WidgetTabsEntryContext.Provider>
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render a menu tab", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetIdContext.Provider value="w1">
          <WidgetTabsEntryContext.Provider
            value={{
              lastNotOverflown: false,
            }}
          >
            <WidgetOverflowContext.Provider value={{ close: sinon.spy() }}>
              <WidgetTabProvider id="t1" />
            </WidgetOverflowContext.Provider>
          </WidgetTabsEntryContext.Provider>
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    container.getElementsByClassName("nz-widget-menuTab").length.should.eq(1);
  });

  it("should render minimized", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"], { minimized: true });
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetIdContext.Provider value="w1">
          <WidgetTabsEntryContext.Provider
            value={{
              lastNotOverflown: false,
            }}
          >
            <WidgetTabProvider id="t1" />
          </WidgetTabsEntryContext.Provider>
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render first inactive", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetIdContext.Provider value="w1">
          <WidgetTabsEntryContext.Provider
            value={{
              lastNotOverflown: false,
            }}
          >
            <WidgetTabProvider id="t1" firstInactive />
          </WidgetTabsEntryContext.Provider>
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render last not overflown", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetIdContext.Provider value="w1">
          <WidgetTabsEntryContext.Provider
            value={{
              lastNotOverflown: true,
            }}
          >
            <WidgetTabProvider id="t1" />
          </WidgetTabsEntryContext.Provider>
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render tab with icon only", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { iconSpec: <SvgPlaceholder /> });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <ShowWidgetIconContext.Provider value={true}>
          <WidgetIdContext.Provider value="w1">
            <WidgetTabsEntryContext.Provider
              value={{
                lastNotOverflown: true,
              }}
            >
              <WidgetTabProvider id="t1" showOnlyTabIcon={true} />
            </WidgetTabsEntryContext.Provider>
          </WidgetIdContext.Provider>
        </ShowWidgetIconContext.Provider>
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render tab with text and icon", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { iconSpec: <SvgPlaceholder /> });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider defaultState={state}>
        <ShowWidgetIconContext.Provider value={true}>
          <WidgetIdContext.Provider value="w1">
            <WidgetTabsEntryContext.Provider
              value={{
                lastNotOverflown: true,
              }}
            >
              <WidgetTabProvider id="t1" />
            </WidgetTabsEntryContext.Provider>
          </WidgetIdContext.Provider>
        </ShowWidgetIconContext.Provider>
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should render badge", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    const { container } = render(
      <TestNineZoneProvider
        defaultState={state}
        tab={<WidgetTab badge="Badge" />}
      >
        <WidgetIdContext.Provider value="w1">
          <WidgetTabsEntryContext.Provider
            value={{
              lastNotOverflown: false,
            }}
          >
            <WidgetTabProvider id="t1" />
          </WidgetTabsEntryContext.Provider>
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    container.firstChild!.should.matchSnapshot();
  });

  it("should dispatch WIDGET_TAB_CLICK on click", async () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value="w1">
            <WidgetTabsEntryContext.Provider
              value={{
                lastNotOverflown: false,
              }}
            >
              <WidgetTabProvider id="t1" />
            </WidgetTabsEntryContext.Provider>
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.mouseDown(tab);
      fireEvent.mouseUp(tab);
    });
    await waitFor(() => {
      sinon.assert.calledOnceWithExactly(
        dispatch,
        sinon.match({
          type: "WIDGET_TAB_CLICK",
          side: "left",
          widgetId: "w1",
          id: "t1",
        })
      );
    });
  });

  it("should dispatch WIDGET_TAB_CLICK on 'Enter'", async () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value={"w1"}>
            <WidgetTabsEntryContext.Provider
              value={{
                lastNotOverflown: false,
              }}
            >
              <WidgetTabProvider id={"t1"} />
            </WidgetTabsEntryContext.Provider>
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.keyDown(tab, { key: Key.Enter });
    });
    await waitFor(() => {
      sinon.assert.calledOnceWithExactly(
        dispatch,
        sinon.match({
          type: "WIDGET_TAB_CLICK",
          side: "left",
          widgetId: "w1",
          id: "t1",
        })
      );
    });
  });

  it("should dispatch WIDGET_TAB_CLICK on 'space'", async () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value={"w1"}>
            <WidgetTabsEntryContext.Provider
              value={{
                lastNotOverflown: false,
              }}
            >
              <WidgetTabProvider id={"t1"} />
            </WidgetTabsEntryContext.Provider>
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.keyDown(tab, { key: " " });
    });
    await waitFor(() => {
      sinon.assert.calledOnceWithExactly(
        dispatch,
        sinon.match({
          type: "WIDGET_TAB_CLICK",
          side: "left",
          widgetId: "w1",
          id: "t1",
        })
      );
    });
  });

  it("should not dispatch WIDGET_TAB_CLICK on other key", async () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value={"w1"}>
            <WidgetTabsEntryContext.Provider
              value={{
                lastNotOverflown: false,
              }}
            >
              <WidgetTabProvider id={"t1"} />
            </WidgetTabsEntryContext.Provider>
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.keyDown(tab, { key: "a" });
    });
    await waitFor(() => {
      sinon.assert.notCalled(dispatch);
    });
  });

  it("should dispatch WIDGET_TAB_DOUBLE_CLICK", async () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value="w1">
            <WidgetTabsEntryContext.Provider
              value={{
                lastNotOverflown: false,
              }}
            >
              <WidgetTabProvider id="t1" />
            </WidgetTabsEntryContext.Provider>
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.mouseDown(tab);
      fireEvent.mouseUp(tab);
      fireEvent.mouseDown(tab);
      fireEvent.mouseUp(tab);
    });
    await waitFor(() => {
      sinon.assert.calledOnceWithExactly(
        dispatch,
        sinon.match({
          type: "WIDGET_TAB_DOUBLE_CLICK",
          side: "left",
          widgetId: "w1",
          id: "t1",
        })
      );
    });
  });

  it("should dispatch WIDGET_TAB_DRAG_START on pointer move", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1", { hideWithUiWhenFloating: true });
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <WidgetContext.Provider value={{ measure: () => new Rectangle() }}>
          <WidgetIdContext.Provider value="w1">
            <WidgetTabProvider id="t1" />
          </WidgetIdContext.Provider>
        </WidgetContext.Provider>
      </TestNineZoneProvider>
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.mouseDown(tab);
      fireEvent.mouseMove(document, { clientX: 10, clientY: 10 });
    });
    sinon.assert.calledOnceWithExactly(
      dispatch,
      sinon.match({
        type: "WIDGET_TAB_DRAG_START",
        widgetId: "w1",
        id: "t1",
      })
    );
  });

  it("should not dispatch WIDGET_TAB_DRAG_START on pointer move if pointer moved less than 10px", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <WidgetIdContext.Provider value="w1">
          <WidgetTabProvider id="t1" />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.mouseDown(tab);
      fireEvent.mouseMove(document, { clientX: 5, clientY: 0 });
    });
    sinon.assert.notCalled(dispatch);
  });

  it("should dispatch FLOATING_WIDGET_BRING_TO_FRONT", () => {
    const dispatch = vi.fn<NineZoneDispatch>();
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    render(
      <TestNineZoneProvider defaultState={state} dispatch={dispatch}>
        <WidgetIdContext.Provider value="w1">
          <WidgetTabProvider id="t1" />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    const tab = document.getElementsByClassName("nz-widget-tab")[0];
    act(() => {
      fireEvent.touchStart(tab, {
        touches: [{}],
      });
    });
    sinon.assert.calledOnceWithExactly(
      dispatch,
      sinon.match({
        type: "FLOATING_WIDGET_BRING_TO_FRONT",
        id: "w1",
      })
    );
  });
});
