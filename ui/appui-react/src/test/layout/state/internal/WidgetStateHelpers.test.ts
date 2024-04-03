/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { createNineZoneState } from "../../../../appui-react/layout/state/NineZoneState";
import { addPanelWidget } from "../../../../appui-react/layout/state/internal/PanelStateHelpers";
import { addTab } from "../../../../appui-react/layout/state/internal/TabStateHelpers";
import {
  addFloatingWidget,
  addPopoutWidget,
  addWidgetState,
  createWidgetState,
  getNewFloatingWidgetBounds,
  removeFloatingWidget,
  removePanelWidget,
  removePopoutWidget,
  removeWidget,
  removeWidgetState,
  setWidgetActiveTabId,
  updateFloatingWidgetState,
  updateWidgetState,
} from "../../../../appui-react/layout/state/internal/WidgetStateHelpers";
import { addTabs, handleMetaData } from "../../Utils";

describe("createWidgetState", () => {
  it("should throw w/o tabs", () => {
    expect(() => createWidgetState("w1", [])).toThrow();
  });
});

describe("updateWidgetState", () => {
  it("should throw if widget is not found", () => {
    const state = createNineZoneState();
    expect(() =>
      updateWidgetState(state, "w1", { activeTabId: "t1" })
    ).toThrow();
  });
});

describe("addWidgetState", () => {
  it("should throw if widget already exists", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2"]);
    state = addWidgetState(state, "w1", ["t1"]);
    expect(
      () => addWidgetState(state, "w1", ["t2"]),
      "Widget already exists"
    ).toThrow();
  });

  it("should throw if tab doesn't exist", () => {
    const state = createNineZoneState();
    expect(
      handleMetaData(() => addWidgetState(state, "w1", ["t1"])),
      "Tab does not exist"
    ).toThrow();
  });

  it("should throw if tab is already in another widget", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1"]);
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    expect(
      handleMetaData(() => addWidgetState(state, "w2", ["t1"])),
      "Tab is already in a widget"
    ).toThrow();
  });
});

describe("addFloatingWidget", () => {
  it("should throw if floating widget is already added", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2"]);
    state = addFloatingWidget(state, "fw1", ["t1"]);
    expect(() => addFloatingWidget(state, "fw1", ["t2"])).toThrow();
  });

  it("should set `resizable`", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { isFloatingWidgetResizable: true });
    state = addFloatingWidget(state, "fw1", ["t1"]);
    expect(state.floatingWidgets.byId.fw1.resizable.toEqual(true);
  });
});

describe("addPopoutWidget", () => {
  it("should throw with multiple tabs", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2"]);
    expect(
      handleMetaData(() => addPopoutWidget(state, "fw1", ["t1", "t2"]))
    ).toThrow();
  });
});

describe("removeWidget", () => {
  it("should throw if widget location is not found", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1"]);
    state = addWidgetState(state, "w1", ["t1"]);
    expect(() => removeWidget(state, "w1"), "Widget not found").toThrow();
  });
});

describe("removeWidgetState", () => {
  it("should throw if widget does not exist", () => {
    const state = createNineZoneState();
    expect(
      () => removeWidgetState(state, "w1"),
      "Widget does not exist"
    ).toThrow();
  });
});

describe("updateFloatingWidgetState", () => {
  it("should throw if widget does not exist", () => {
    const state = createNineZoneState();
    expect(
      () =>
        updateFloatingWidgetState(state, "fw1", {
          userSized: true,
        }),
      "Floating widget does not exist"
    ).toThrow();
  });

  it("should update `bounds`", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "w1", ["t1"]);
    const newState = updateFloatingWidgetState(state, "w1", {
      bounds: {
        bottom: 0,
        left: 10,
        right: 20,
        top: 40,
      },
    });
    expect(newState.floatingWidgets.byId.w1.bounds).to.eql({
      bottom: 0,
      left: 10,
      right: 20,
      top: 40,
    });
  });
});

describe("removeFloatingWidget", () => {
  it("should throw if widget does not exist", () => {
    const state = createNineZoneState();
    expect(() => removeFloatingWidget(state, "w1")).toThrow();
  });
});

describe("removePopoutWidget", () => {
  it("should throw if widget does not exist", () => {
    const state = createNineZoneState();
    expect(() => removePopoutWidget(state, "w1")).toThrow();
  });
});

describe("removePanelWidget", () => {
  it("should throw if widget is not found", () => {
    const state = createNineZoneState();
    expect(() => removePanelWidget(state, "w1")).toThrow();
  });
});

describe("setWidgetActiveTabId", () => {
  it("should throw if tab is not in a widget", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2"]);
    state = addPanelWidget(state, "left", "w1", ["t1"]);
    expect(() => setWidgetActiveTabId(state, "w1", "t2")).toThrow();
  });
});

describe("getNewFloatingWidgetBounds", () => {
  it("should return bounds relative to top left of last floating widget", () => {
    let state = createNineZoneState({
      size: {
        height: 1000,
        width: 1000,
      },
    });
    state = addTabs(state, ["t1", "t2"]);
    state = addFloatingWidget(state, "w1", ["t1"], {
      bounds: {
        left: 200,
        right: 400,
        top: 100,
        bottom: 220,
      },
    });
    const bounds = getNewFloatingWidgetBounds(state);
    expect(bounds).toEqual({
      left: 240,
      right: 240 + 200,
      top: 140,
      bottom: 140 + 120,
    });
  });

  it("should return bounds with bottom right corner outside of last floating widget", () => {
    let state = createNineZoneState({
      size: {
        height: 1000,
        width: 1000,
      },
    });
    state = addTabs(state, ["t1", "t2"]);
    state = addFloatingWidget(state, "w1", ["t1"], {
      bounds: {
        left: 200,
        right: 700,
        top: 100,
        bottom: 650,
      },
    });
    const bounds = getNewFloatingWidgetBounds(state);
    expect(bounds).toEqual({
      left: 700 + 40 - 200,
      right: 700 + 40,
      top: 650 + 40 - 120,
      bottom: 650 + 40,
    });
  });

  it("should return bounds (bottom overflow)", () => {
    let state = createNineZoneState({
      size: {
        height: 1000,
        width: 1000,
      },
    });
    state = addTabs(state, ["t1", "t2"]);
    state = addFloatingWidget(state, "w1", ["t1"], {
      bounds: {
        left: 200,
        right: 500,
        top: 600,
        bottom: 980,
      },
    });
    const bounds = getNewFloatingWidgetBounds(state);
    expect(bounds).toEqual({
      left: 540 - 200,
      right: 540,
      top: 20,
      bottom: 20 + 120,
    });
  });

  it("should return bounds (right overflow)", () => {
    let state = createNineZoneState({
      size: {
        height: 1000,
        width: 1000,
      },
    });
    state = addTabs(state, ["t1", "t2"]);
    state = addFloatingWidget(state, "w1", ["t1"], {
      bounds: {
        left: 700,
        right: 980,
        top: 400,
        bottom: 600,
      },
    });
    const bounds = getNewFloatingWidgetBounds(state);
    expect(bounds).toEqual({
      left: 20,
      right: 20 + 200,
      top: 20,
      bottom: 20 + 120,
    });
  });
});
