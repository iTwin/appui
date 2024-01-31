/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, should } from "chai";
import { createNineZoneState } from "../../../../appui-react/layout/state/NineZoneState";
import { addPanelWidget } from "../../../../appui-react/layout/state/internal/PanelStateHelpers";
import {
  addRemovedTab,
  addTab,
  addTabToWidget,
  insertTabToWidget,
  removeTab,
  removeTabFromWidget,
  updateSavedTabState,
  updateTabState,
} from "../../../../appui-react/layout/state/internal/TabStateHelpers";
import {
  addDockedToolSettings,
  addWidgetToolSettings,
} from "../../../../appui-react/layout/state/internal/ToolSettingsStateHelpers";
import {
  addFloatingWidget,
  addPopoutWidget,
  createFloatingWidgetState,
} from "../../../../appui-react/layout/state/internal/WidgetStateHelpers";
import { addTabs, handleMetaData } from "../../Utils";

describe("addTab", () => {
  it("should add a tab", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state.tabs.t1.should.exist;
  });

  it("should throw if tab is already added", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    (() => addTab(state, "t1")).should.throw();
  });
});

describe("addTabToWidget", () => {
  it("should add the tab", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2"]);
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = addTabToWidget(state, "t2", "w1");
    state.widgets.w1.tabs.should.eql(["t1", "t2"]);
  });
});

describe("insertTabToWidget", () => {
  it("should throw if tab does not exist", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1"]);
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    handleMetaData(() => insertTabToWidget(state, "t2", "w1", 1)).should.throw(
      "Tab does not exist"
    );
  });

  it("should throw if widget does not exist", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1"]);
    handleMetaData(() => insertTabToWidget(state, "t1", "w1", 1)).should.throw(
      "Widget does not exist"
    );
  });

  it("should throw if tab is already in one of the widgets", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2"]);
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    state = addPanelWidget(state, "left", "w2", ["t2"]);
    handleMetaData(() => insertTabToWidget(state, "t1", "w2", 1)).should.throw(
      "Tab is already in a widget"
    );
  });
});

describe("removeTab", () => {
  it("should throw if tab does not exist", () => {
    const state = createNineZoneState();
    (() => removeTab(state, "t1")).should.throw("Tab does not exist");
  });

  it("should update widget activeTabId", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2"]);
    state = addPanelWidget(state, "left", "w1", ["t1", "t2"]);
    const newState = removeTab(state, "t1");
    newState.widgets.w1.activeTabId.should.eq("t2");
  });

  it("should not update widget activeTabId", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2"]);
    state = addPanelWidget(state, "left", "w1", ["t1", "t2"]);
    const newState = removeTab(state, "t2");
    newState.widgets.w1.activeTabId.should.eq("t1");
    newState.widgets.w1.tabs.should.eql(["t1"]);
  });

  it("should remove popout widget", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1"]);
    state = addPopoutWidget(state, "pow1", ["t1"]);
    const newState = removeTab(state, "t1");

    should().not.exist(newState.popoutWidgets.byId.pow1);
    should().not.exist(newState.tabs.t1);
  });

  it("should remove docked tool settings tab", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1"]);
    state = addDockedToolSettings(state, "t1");
    const newState = removeTab(state, "t1");
    expect(newState.toolSettings).to.not.exist;
    expect(newState.tabs.t1).to.not.exist;
  });

  it("should remove widget tool settings tab", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1"]);
    state = addFloatingWidget(state, "w1", ["t1"]);
    state = addWidgetToolSettings(state, "t1");
    const newState = removeTab(state, "t1");

    expect(newState.tabs.t1).to.not.exist;
    expect(newState.toolSettings).to.not.exist;
  });

  it("should keep tool settings if other tab is removed", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2"]);
    state = addFloatingWidget(state, "w1", ["t1"]);
    state = addDockedToolSettings(state, "t2");
    const newState = removeTab(state, "t1");

    expect(newState.tabs.t2).to.exist;
    expect(newState.toolSettings).to.eql({
      type: "docked",
      tabId: "t2",
      hidden: false,
    });
  });
});

describe("removeTabFromWidget", () => {
  it("should not remove if tab is not in the widget", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1"]);
    const newState = removeTabFromWidget(state, "t1");
    should().exist(newState.tabs.t1);
    newState.should.eq(state);
  });
});

describe("addRemovedTab", () => {
  it("should throw if tab does not exist", () => {
    const state = createNineZoneState();
    handleMetaData(() => addRemovedTab(state, "t1")).should.throw(
      "Tab does not exist"
    );
  });

  it("should add tab to an existing widget", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2"]);
    state = addPanelWidget(state, "left", "w1", ["t2"]);
    state = updateSavedTabState(state, "t1", (draft) => {
      draft.home = {
        widgetId: "w1",
        side: "left",
        widgetIndex: 0,
        tabIndex: 0,
      };
    });

    const newState = addRemovedTab(state, "t1");
    expect(newState.widgets.w1.tabs).to.eql(["t1", "t2"]);
  });

  it("should add tab to a new floating widget", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1"]);
    state = updateSavedTabState(state, "t1", (draft) => {
      draft.home = {
        widgetId: "w1",
        floatingWidget: createFloatingWidgetState("w1"),
        tabIndex: 0,
      };
    });

    const newState = addRemovedTab(state, "t1");
    expect(newState.floatingWidgets.allIds).to.eql(["w1"]);
    expect(newState.widgets.w1.tabs).to.eql(["t1"]);
  });

  it("should add tab to an existing panel section", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2", "t3"]);
    state = addPanelWidget(state, "left", "w1", ["t3"]);
    state = addPanelWidget(state, "left", "w2", ["t2"]);

    const newState = addRemovedTab(state, "t1");
    expect(newState.panels.left.widgets).to.eql(["w1", "w2"]);
    expect(newState.widgets.w1.tabs).to.eql(["t1", "t3"]);
    expect(newState.widgets.w2.tabs).to.eql(["t2"]);
  });
});

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
