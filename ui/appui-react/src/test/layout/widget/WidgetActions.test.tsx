/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from "@testing-library/react";
import * as React from "react";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState.js";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { addTab } from "../../../appui-react/layout/state/internal/TabStateHelpers.js";
import { addWidgetToolSettings } from "../../../appui-react/layout/state/internal/ToolSettingsStateHelpers.js";
import { addFloatingWidget } from "../../../appui-react/layout/state/internal/WidgetStateHelpers.js";
import { PanelSideContext } from "../../../appui-react/layout/widget-panels/Panel.js";
import { WidgetActions } from "../../../appui-react/layout/widget/WidgetActions.js";
import { WidgetIdContext } from "../../../appui-react/layout/widget/Widget.js";
import { TestNineZoneProvider } from "../Providers.js";

describe("WidgetActions", () => {
  it("should render SendBack button in a floating widget", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1-label" });
    state = addFloatingWidget(state, "fw1", ["t1"]);
    const wrapper = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetIdContext.Provider value="fw1">
          <WidgetActions />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    wrapper.getByRole("button", { name: "widget.tooltips.sendHome" });
  });

  it("should render PopoutToggle in a floating widget that canPopout ", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1-label", canPopout: true });
    state = addFloatingWidget(state, "fw1", ["t1"]);
    const wrapper = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetIdContext.Provider value="fw1">
          <WidgetActions />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    wrapper.getByRole("button", { name: "widget.tooltips.popoutActiveTab" });
  });

  it("should render Dock button in floating ToolSettings", () => {
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addFloatingWidget(state, "fw1", ["ts"]);
    state = addWidgetToolSettings(state, "ts");
    const wrapper = render(
      <TestNineZoneProvider defaultState={state}>
        <WidgetIdContext.Provider value="fw1">
          <WidgetActions />
        </WidgetIdContext.Provider>
      </TestNineZoneProvider>
    );
    wrapper.getByRole("button", { name: "widget.tooltips.dockToolSettings" });
  });

  it("should render PinToggle in main panel widget", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1-label", canPopout: false });
    state = addPanelWidget(state, "left", "w1", ["t1"], { activeTabId: "t1" });
    const wrapper = render(
      <TestNineZoneProvider defaultState={state}>
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value="w1">
            <WidgetActions />
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    wrapper.getByRole("button", { name: "widget.tooltips.unpinPanel" });
  });

  it("should render PopoutToggle in main panel widget that canPopout", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1-label", canPopout: true });
    state = addPanelWidget(state, "left", "w1", ["t1"], { activeTabId: "t1" });
    const wrapper = render(
      <TestNineZoneProvider defaultState={state}>
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value="w1">
            <WidgetActions />
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    wrapper.getByRole("button", { name: "widget.tooltips.popoutActiveTab" });
  });

  it("should render popout button", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { label: "t1-label", canPopout: true });
    state = addPanelWidget(state, "left", "w1", ["t1"], { activeTabId: "t1" });
    const wrapper = render(
      <TestNineZoneProvider defaultState={state}>
        <PanelSideContext.Provider value="left">
          <WidgetIdContext.Provider value="w1">
            <WidgetActions />
          </WidgetIdContext.Provider>
        </PanelSideContext.Provider>
      </TestNineZoneProvider>
    );
    wrapper.getByRole("button", { name: "widget.tooltips.popoutActiveTab" });
  });
});
