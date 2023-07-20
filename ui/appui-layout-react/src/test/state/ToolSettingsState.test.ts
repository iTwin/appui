/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import {
  addDockedToolSettings,
  addPanelWidget,
  addTab,
  addWidgetToolSettings,
  createNineZoneState,
  removeToolSettings,
} from "../../appui-layout-react";
import { addTabs, handleMetaData } from "../Utils";

describe("addDockedToolSettings", () => {
  it("should add docked tool settings", () => {
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addDockedToolSettings(state, "ts");
    expect(state.toolSettings).to.eql({ tabId: "ts", type: "docked" });
  });

  it("should throw if tool settings are already added", () => {
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addDockedToolSettings(state, "ts");
    (() => addDockedToolSettings(state, "ts")).should.throw();
  });

  it("should throw if tab doesn't exist", () => {
    const state = createNineZoneState();
    handleMetaData(() => addDockedToolSettings(state, "ts")).should.throw();
  });

  it("should throw if tab is already in a widget", () => {
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addPanelWidget(state, "left", "w1", ["ts"]);
    handleMetaData(() => addDockedToolSettings(state, "ts")).should.throw();
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
    (() => addWidgetToolSettings(state, "ts")).should.throw();
  });

  it("should throw if tab doesn't exist", () => {
    const state = createNineZoneState();
    handleMetaData(() => addWidgetToolSettings(state, "ts")).should.throw();
  });

  it("should throw if tab is not in a widget", () => {
    let state = createNineZoneState();
    state = addTab(state, "ts");
    handleMetaData(() => addWidgetToolSettings(state, "ts")).should.throw();
  });
});

describe("removeToolSettings", () => {
  it("should remove tab from tool settings", () => {
    let state = createNineZoneState();
    state = addTab(state, "ts");
    state = addDockedToolSettings(state, "ts");
    state = removeToolSettings(state);
    expect(state.toolSettings).to.be.undefined;
  });

  it("should not remove tab if it not a tool settings tab", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["ts", "t1"]);
    state = addDockedToolSettings(state, "ts");
    state = removeToolSettings(state);
    expect(state.toolSettings).to.be.undefined;
  });
});
