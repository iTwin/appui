/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { expect } from "chai";
import { render } from "@testing-library/react";
import {
  addFloatingWidget, addPanelWidget, addTab, createNineZoneState, PanelSideContext,
  TabBarButtons, toolSettingsTabId, WidgetIdContext,
} from "../../appui-layout-react";
import { TestNineZoneProvider } from "../Providers";

describe("TabBarButtons", () => {
  it("Floating widget should render Sendback button", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1-label" });
    state = addFloatingWidget(state, "fw1", ["t1"]);
    const wrapper = render(
      <TestNineZoneProvider state={state}>
        <WidgetIdContext.Provider value="fw1">
          <TabBarButtons />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    expect(wrapper.container.querySelector("button.nz-widget-sendBack")).to.not.be.null;
  });

  it("Floating widget that canPopout should render Popout button", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1-label", canPopout: true });
    state = addFloatingWidget(state, "fw1", ["t1"]);
    const wrapper = render(
      <TestNineZoneProvider state={state}>
        <WidgetIdContext.Provider value="fw1">
          <TabBarButtons />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    expect(wrapper.container.querySelector("button.nz-widget-sendBack")).to.not.be.null;
    expect(wrapper.container.querySelector("button.nz-widget-popoutToggle")).to.not.be.null;
  });

  it("Floating ToolSettings should render Dock button", () => {
    let state = createNineZoneState();
    state = addFloatingWidget(state, "fw1", [toolSettingsTabId]);
    const wrapper = render(
      <TestNineZoneProvider state={state}>
        <WidgetIdContext.Provider value="fw1">
          <TabBarButtons />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    expect(wrapper.container.querySelector("button.nz-widget-dock")).to.not.be.null;
  });

  it("Main Panel widget should not render Pin buttons", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1-label", canPopout: false });
    state = addPanelWidget(state, "left", "w1", ["t1"], { activeTabId: "t1" });
    const wrapper = render(
      <TestNineZoneProvider state={state}>
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value="w1">
            <TabBarButtons />
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    expect(wrapper.container.querySelector("button.nz-widget-pinToggle")).to.not.be.null;
  });

  it("Main Panel widget that canPopout should render Popout and Pin buttons", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1-label", canPopout: true });
    state = addPanelWidget(state, "left", "w1", ["t1"], { activeTabId: "t1" });
    const wrapper = render(
      <TestNineZoneProvider state={state}>
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value="w1">
            <TabBarButtons />
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    expect(wrapper.container.querySelector("button.nz-widget-popoutToggle")).to.not.be.null;
    expect(wrapper.container.querySelector("button.nz-widget-pinToggle")).to.not.be.null;
  });

  it("should render popout button", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1-label", canPopout: true });
    state = addPanelWidget(state, "left", "w1", ["t1"], { activeTabId: "t1" });
    const wrapper = render(
      <TestNineZoneProvider state={state}>
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value="w1">
            <TabBarButtons />
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    expect(wrapper.container.querySelector("button.nz-widget-popoutToggle")).to.not.be.null;
  });
});
