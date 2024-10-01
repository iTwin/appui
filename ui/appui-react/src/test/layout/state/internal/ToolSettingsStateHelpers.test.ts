/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { createNineZoneState } from "../../../../appui-react/layout/state/NineZoneState.js";
import { addPanelWidget } from "../../../../appui-react/layout/state/internal/PanelStateHelpers.js";
import { addTab } from "../../../../appui-react/layout/state/internal/TabStateHelpers.js";
import {
  addDockedToolSettings,
  addWidgetToolSettings,
} from "../../../../appui-react/layout/state/internal/ToolSettingsStateHelpers.js";
import { handleMetaData } from "../../Utils.js";

describe("addDockedToolSettings", () => {
  it("should add docked tool settings", () => {
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addDockedToolSettings(state, "ts");
    expect(state.toolSettings).to.eql({
      tabId: "ts",
      type: "docked",
      hidden: false,
    });
  });

  it("should throw if tool settings are already added", () => {
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addDockedToolSettings(state, "ts");
    expect(() => addDockedToolSettings(state, "ts")).toThrow();
  });

  it("should throw if tab doesn't exist", () => {
    const state = createNineZoneState();
    expect(handleMetaData(() => addDockedToolSettings(state, "ts"))).toThrow();
  });

  it("should throw if tab is already in a widget", () => {
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addPanelWidget(state, "left", "w1", ["ts"]);
    expect(handleMetaData(() => addDockedToolSettings(state, "ts"))).toThrow();
  });
});

describe("addWidgetToolSettings", () => {
  it("should add widget tool settings", () => {
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addPanelWidget(state, "left", "w1", ["ts"]);
    state = addWidgetToolSettings(state, "ts");
    expect(state.toolSettings).to.eql({ tabId: "ts", type: "widget" });
  });

  it("should throw if tool settings are already added", () => {
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addPanelWidget(state, "left", "w1", ["ts"]);
    state = addWidgetToolSettings(state, "ts");
    expect(() => addWidgetToolSettings(state, "ts")).toThrow();
  });

  it("should throw if tab doesn't exist", () => {
    const state = createNineZoneState();
    expect(handleMetaData(() => addWidgetToolSettings(state, "ts"))).toThrow();
  });

  it("should throw if tab is not in a widget", () => {
    let state = createNineZoneState();
    state = addTab(state, "ts");
    expect(handleMetaData(() => addWidgetToolSettings(state, "ts"))).toThrow();
  });
});
