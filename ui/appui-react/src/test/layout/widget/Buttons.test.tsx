/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers";
import { addWidgetToolSettings } from "../../../appui-react/layout/state/internal/ToolSettingsStateHelpers";
import { addFloatingWidget } from "../../../appui-react/layout/state/internal/WidgetStateHelpers";
import { PanelSideContext } from "../../../appui-react/layout/widget-panels/Panel";
import { TabBarButtons } from "../../../appui-react/layout/widget/Buttons";
import { WidgetIdContext } from "../../../appui-react/layout/widget/Widget";
import { TestNineZoneProvider } from "../Providers";

describe("TabBarButtons", () => {
  it("should render SendBack button in a floating widget", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1-label" });
    state = addFloatingWidget(state, "fw1", ["t1"]);
    const wrapper = render(
      <TestNineZoneProvider
        defaultState={state}
        labels={{ sendWidgetHomeTitle: "Send back" }}
      >
        <WidgetIdContext.Provider value="fw1">
          <TabBarButtons />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    wrapper.getByRole("button", { name: "Send back" });
  });

  it("should render PopoutToggle in a floating widget that canPopout ", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1-label", canPopout: true });
    state = addFloatingWidget(state, "fw1", ["t1"]);
    const wrapper = render(
      <TestNineZoneProvider
        defaultState={state}
        labels={{ popoutActiveTab: "Popout" }}
      >
        <WidgetIdContext.Provider value="fw1">
          <TabBarButtons />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    wrapper.getByRole("button", { name: "Popout" });
  });

  it("should render Dock button in floating ToolSettings", () => {
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addFloatingWidget(state, "fw1", ["ts"]);
    state = addWidgetToolSettings(state, "ts");
    const wrapper = render(
      <TestNineZoneProvider
        defaultState={state}
        labels={{
          dockToolSettingsTitle: "Dock",
        }}
      >
        <WidgetIdContext.Provider value="fw1">
          <TabBarButtons />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    wrapper.getByRole("button", { name: "Dock" });
  });

  it("should render PinToggle in main panel widget", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1-label", canPopout: false });
    state = addPanelWidget(state, "left", "w1", ["t1"], { activeTabId: "t1" });
    const wrapper = render(
      <TestNineZoneProvider
        defaultState={state}
        labels={{ unpinPanelTitle: "Unpin panel" }}
      >
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value="w1">
            <TabBarButtons />
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    wrapper.getByRole("button", { name: "Unpin panel" });
  });

  it("should render PopoutToggle in main panel widget that canPopout", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1-label", canPopout: true });
    state = addPanelWidget(state, "left", "w1", ["t1"], { activeTabId: "t1" });
    const wrapper = render(
      <TestNineZoneProvider
        defaultState={state}
        labels={{ popoutActiveTab: "Popout widget" }}
      >
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value="w1">
            <TabBarButtons />
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    wrapper.getByRole("button", { name: "Popout widget" });
  });

  it("should render popout button", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1-label", canPopout: true });
    state = addPanelWidget(state, "left", "w1", ["t1"], { activeTabId: "t1" });
    const wrapper = render(
      <TestNineZoneProvider
        defaultState={state}
        labels={{ popoutActiveTab: "Popout" }}
      >
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value="w1">
            <TabBarButtons />
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    wrapper.getByRole("button", { name: "Popout" });
  });
});
