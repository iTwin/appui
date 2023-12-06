/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  updateSavedTabState,
  updateTabState,
} from "../../../appui-layout-react/state/internal/TabStateHelpers";
import { addTab, createNineZoneState } from "../../../appui-layout-react";
import { expect } from "chai";

describe("updateTabState", () => {
  it("should throw if tab does not exist", () => {
    const state = createNineZoneState();
    (() =>
      updateTabState(state, "t1", (draft) => {
        draft.iconSpec = "test";
      })).should.throw("Tab does not exist");
  });

  it("should update `preferredFloatingWidgetSize`", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    const newState = updateTabState(state, "t1", (draft) => {
      draft.preferredFloatingWidgetSize = { height: 100, width: 200 };
    });
    expect(newState.tabs.t1.preferredFloatingWidgetSize).to.eql({
      height: 100,
      width: 200,
    });
  });
});

describe("updateSavedTabState", () => {
  it("should add a new entry", () => {
    let state = createNineZoneState();
    state = updateSavedTabState(state, "t1", () => {});
    expect(state.savedTabs.allIds).to.eql(["t1"]);
  });

  it("should add multiple entries", () => {
    let state = createNineZoneState();
    state = updateSavedTabState(state, "t1", () => {});
    state = updateSavedTabState(state, "t2", () => {});
    expect(state.savedTabs.allIds).to.eql(["t1", "t2"]);
  });

  it("should reorder when updating", () => {
    let state = createNineZoneState();
    state = updateSavedTabState(state, "t1", () => {});
    state = updateSavedTabState(state, "t2", () => {});
    state = updateSavedTabState(state, "t3", () => {});
    expect(state.savedTabs.allIds).to.eql(["t1", "t2", "t3"]);

    state = updateSavedTabState(state, "t2", () => {});
    expect(state.savedTabs.allIds).to.eql(["t1", "t3", "t2"]);
  });

  it("should update existing saved tab state", () => {
    let state = createNineZoneState();
    state = updateSavedTabState(state, "t1", () => {});
    expect(state.savedTabs.byId.t1?.popoutBounds).undefined;

    state = updateSavedTabState(state, "t1", (draft) => {
      draft.popoutBounds = {
        left: 1,
        top: 2,
        right: 30,
        bottom: 40,
      };
    });
    expect(state.savedTabs.allIds).to.eql(["t1"]);
    expect(state.savedTabs.byId.t1?.popoutBounds).to.eql({
      left: 1,
      top: 2,
      right: 30,
      bottom: 40,
    });
  });
});
