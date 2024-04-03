/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { produce } from "immer";
import { Point, Rectangle } from "@itwin/core-react";
import { addTabs } from "../Utils";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { NineZoneStateReducer } from "../../../appui-react/layout/state/NineZoneStateReducer";
import type {
  NineZoneAction,
  WidgetDefAddAction,
} from "../../../appui-react/layout/state/NineZoneAction";
import {
  addFloatingWidget,
  addPopoutWidget,
  createFloatingWidgetState,
} from "../../../appui-react/layout/state/internal/WidgetStateHelpers";
import {
  addPanelWidget,
  updatePanelState,
} from "../../../appui-react/layout/state/internal/PanelStateHelpers";
import {
  addDockedToolSettings,
  addWidgetToolSettings,
} from "../../../appui-react/layout/state/internal/ToolSettingsStateHelpers";
import {
  addTab,
  createDraggedTabState,
  updateSavedTabState,
} from "../../../appui-react/layout/state/internal/TabStateHelpers";
import { getUniqueId } from "../../../appui-react/layout/base/NineZone";

describe("NineZoneStateReducer", () => {
  it("should not update for unhandled action", () => {
    const state = createNineZoneState();
    const newState = NineZoneStateReducer(state, {
      type: "UNKNOWN",
    } as unknown as NineZoneAction);
    expect(newState).toStrictEqual(state);
  });

  describe("RESIZE", () => {
    it("should resize", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "RESIZE",
        size: {
          height: 200,
          width: 300,
        },
      });
      expect(newState.size).toEqual({ height: 200, width: 300 });
    });

    it("should contain floating widgets", () => {
      let state = createNineZoneState({
        size: {
          height: 200,
          width: 300,
        },
      });
      state = addTabs(state, ["t1"]);
      state = addFloatingWidget(state, "fw1", ["t1"], {
        bounds: {
          top: 0,
          bottom: 150,
          left: 100,
          right: 200,
        },
      });
      const newState = NineZoneStateReducer(state, {
        type: "RESIZE",
        size: {
          height: 200,
          width: 160,
        },
      });
      expect(newState.floatingWidgets.byId.fw1.bounds).toEqual({
        top: 0,
        bottom: 150,
        left: 60,
        right: 160,
      });
    });

    it("should update panel size", () => {
      let state = createNineZoneState();
      state = updatePanelState(state, "left", (draft) => {
        draft.maxSize = { percentage: 50 };
        draft.size = 400;
      });

      const newState = NineZoneStateReducer(state, {
        type: "RESIZE",
        size: {
          height: 200,
          width: 500,
        },
      });
      expect(newState.panels.left.size).toEqual(250);
    });
  });

  describe("PANEL_TOGGLE_COLLAPSED", () => {
    it("should toggle collapsed property of panel", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_TOGGLE_COLLAPSED",
        side: "left",
      });
      expect(newState.panels.left.collapsed).not.toEqual(
        state.panels.left.collapsed
      );
    });
  });

  describe("PANEL_SET_COLLAPSED", () => {
    it("should collapse panel", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_SET_COLLAPSED",
        side: "left",
        collapsed: true,
      });
      expect(newState.panels.left.collapsed).toEqual(true);
    });
  });

  describe("PANEL_SET_SIZE", () => {
    it("should set panel size", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_SET_SIZE",
        side: "left",
        size: 400,
      });
      expect(newState.panels.left.size).toEqual(400);
    });

    it("should reset panel size", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_SET_SIZE",
        side: "left",
        size: undefined,
      });
      expect(newState.panels.left.size).toEqual(undefined);
    });
  });

  describe("PANEL_SET_MIN_SIZE", () => {
    it("should set", () => {
      let state = createNineZoneState();
      state = updatePanelState(state, "left", (draft) => {
        draft.minSize = 100;
        draft.size = 200;
        draft.maxSize = 400;
      });

      const newState = NineZoneStateReducer(state, {
        type: "PANEL_SET_MIN_SIZE",
        side: "left",
        minSize: 50,
      });
      expect(newState.panels.left.minSize).toEqual(50);
      expect(newState.panels.left.size).toEqual(200);
    });

    it("should update size", () => {
      let state = createNineZoneState();
      state = updatePanelState(state, "left", (draft) => {
        draft.minSize = 100;
        draft.size = 200;
        draft.maxSize = 400;
      });

      const newState = NineZoneStateReducer(state, {
        type: "PANEL_SET_MIN_SIZE",
        side: "left",
        minSize: 300,
      });
      expect(newState.panels.left.minSize).toEqual(300);
      expect(newState.panels.left.size).toEqual(300);
    });
  });

  describe("PANEL_SET_MAX_SIZE", () => {
    it("should set", () => {
      let state = createNineZoneState();
      state = updatePanelState(state, "left", (draft) => {
        draft.minSize = 100;
        draft.size = 200;
        draft.maxSize = 600;
      });

      const newState = NineZoneStateReducer(state, {
        type: "PANEL_SET_MAX_SIZE",
        side: "left",
        maxSize: 800,
      });
      expect(newState.panels.left.size).toEqual(200);
      expect(newState.panels.left.maxSize).toEqual(800);
    });

    it("should update size", () => {
      let state = createNineZoneState();
      state = updatePanelState(state, "left", (draft) => {
        draft.minSize = 100;
        draft.size = 200;
        draft.maxSize = 400;
      });

      const newState = NineZoneStateReducer(state, {
        type: "PANEL_SET_MAX_SIZE",
        side: "left",
        maxSize: 150,
      });
      expect(newState.panels.left.size).toEqual(150);
      expect(newState.panels.left.maxSize).toEqual(150);
    });
  });

  describe("PANEL_SET_SPLITTER_VALUE", () => {
    it("should set panel split percent", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_SET_SPLITTER_VALUE",
        side: "left",
        percent: 40,
      });
      expect(newState.panels.left.splitterPercent).toEqual(40);
    });
  });

  describe("PANEL_SET_RESIZABLE", () => {
    it("should set", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_SET_RESIZABLE",
        side: "left",
        resizable: false,
      });
      expect(newState.panels.left.resizable).toEqual(false);
    });
  });

  describe("PANEL_TOGGLE_SPAN", () => {
    it("should toggle span property of panel", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_TOGGLE_SPAN",
        side: "top",
      });
      expect(newState.panels.top.span).not.toEqual(state.panels.top.span);
    });
  });

  describe("PANEL_SET_PINNED", () => {
    it("should set pinned property of panel", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_SET_PINNED",
        side: "top",
        pinned: false,
      });
      expect(newState.panels.top.pinned).toEqual(false);
    });
  });

  describe("PANEL_TOGGLE_PINNED", () => {
    it("should toggle pinned property of panel", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_TOGGLE_PINNED",
        side: "top",
      });
      expect(newState.panels.top.pinned).not.toEqual(state.panels.top.pinned);
    });
  });

  describe("PANEL_INITIALIZE", () => {
    it("should initialize", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_INITIALIZE",
        side: "left",
        size: 300,
      });
      expect(newState.panels.left.size).toEqual(300);
    });
  });

  describe("PANEL_WIDGET_DRAG_START", () => {
    it("should move widget to floating state", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_WIDGET_DRAG_START",
        bounds: new Rectangle().toProps(),
        id: "w1",
        newFloatingWidgetId: "newId",
        side: "left",
      });
      expect(newState.floatingWidgets.byId.newId).toBeTruthy();
      expect(newState.panels.left.widgets).toHaveLength(0);
    });

    it("should keep one widget expanded", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      state = addPanelWidget(state, "left", "w2", ["t2"], { minimized: true });
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_WIDGET_DRAG_START",
        bounds: new Rectangle().toProps(),
        id: "w1",
        newFloatingWidgetId: "newId",
        side: "left",
      });
      expect(newState.widgets.w2.minimized).toEqual(false);
    });
  });

  describe("WIDGET_DRAG", () => {
    it("should move floating widget", () => {
      let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
      state = addTabs(state, ["t1"]);
      state = addFloatingWidget(state, "fw1", ["t1"], {
        bounds: new Rectangle(0, 100, 200, 400),
      });
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_DRAG",
        dragBy: new Point(10, 20).toProps(),
        floatingWidgetId: "fw1",
      });
      expect(newState.floatingWidgets.byId.fw1.bounds).toEqual({
        left: 10,
        top: 120,
        right: 210,
        bottom: 420,
      });
    });
  });

  describe("WIDGET_DRAG_END", () => {
    describe("no target", () => {
      it("should not remove floating widget", () => {
        let state = createNineZoneState({
          size: { height: 1000, width: 1600 },
        });
        state = addTabs(state, ["t1"]);
        state = addFloatingWidget(state, "fw1", ["t1"]);
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_DRAG_END",
          floatingWidgetId: "fw1",
          target: {
            type: "window",
          },
        });
        expect(newState.floatingWidgets.byId.fw1).toBeTruthy();
      });

      it("should contain minimized", () => {
        let state = createNineZoneState({
          size: {
            height: 1000,
            width: 2000,
          },
        });
        state = addTabs(state, ["t1"]);
        state = addFloatingWidget(
          state,
          "w1",
          ["t1"],
          {
            bounds: {
              left: 2500,
              top: 990,
              right: 2700,
              bottom: 1100,
            },
          },
          {
            minimized: true,
          }
        );
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_DRAG_END",
          floatingWidgetId: "w1",
          target: {
            type: "window",
          },
        });
        expect(newState.floatingWidgets.byId.w1.bounds).toEqual({
          left: 1800,
          top: 965,
          right: 2000,
          bottom: 1075,
        });
      });
    });

    describe("tab target", () => {
      it("should add dragged tab", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["t1", "t2", "t3", "fwt1"]);
        state = addPanelWidget(state, "left", "w1", ["t1", "t2", "t3"]);
        state = addFloatingWidget(state, "fw1", ["fwt1"]);
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_DRAG_END",
          floatingWidgetId: "fw1",
          target: {
            type: "tab",
            tabIndex: 1,
            widgetId: "w1",
          },
        });
        expect(newState.widgets.w1.tabs).toEqual(["t1", "fwt1", "t2", "t3"]);
      });

      it("should update home of tool settings floating widget", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["t2", "ts"]);
        state = addFloatingWidget(state, "fw1", ["ts"]);
        state = addFloatingWidget(state, "fw2", ["t2"], {
          home: {
            side: "bottom",
            widgetId: "",
            widgetIndex: 0,
          },
        });
        state = addWidgetToolSettings(state, "ts");
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_DRAG_END",
          floatingWidgetId: "fw2",
          target: {
            type: "tab",
            tabIndex: 0,
            widgetId: "fw1",
          },
        });
        expect(newState.floatingWidgets.byId.fw1.home).not.toEqual(
          state.floatingWidgets.byId.fw1.home
        );
        expect(newState.floatingWidgets.byId.fw1.home).toEqual({
          side: "bottom",
          widgetId: "",
          widgetIndex: 0,
        });
      });
    });

    describe("section target", () => {
      it("should add a section", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["t1", "t2", "fwt1"]);
        state = addPanelWidget(state, "left", "w1", ["t1"]);
        state = addPanelWidget(state, "left", "w2", ["t2"]);
        state = addFloatingWidget(state, "fw1", ["fwt1"]);
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_DRAG_END",
          floatingWidgetId: "fw1",
          target: {
            type: "section",
            newWidgetId: "newId",
            side: "left",
            sectionIndex: 1,
          },
        });
        expect(newState.panels.left.widgets).toEqual(["w1", "newId", "w2"]);
      });
    });

    describe("widget target", () => {
      it("should add tabs to a section widget", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["t1", "t2", "fwt1"]);
        state = addPanelWidget(state, "left", "w1", ["t1"]);
        state = addPanelWidget(state, "left", "w2", ["t2"]);
        state = addFloatingWidget(state, "fw1", ["fwt1"]);
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_DRAG_END",
          floatingWidgetId: "fw1",
          target: {
            type: "widget",
            widgetId: "w2",
          },
        });
        expect(newState.widgets.w2.tabs).toEqual(["t2", "fwt1"]);
      });

      it("should add tabs to a floating widget", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["fwt1", "fwt2"]);
        state = addFloatingWidget(state, "fw1", ["fwt1"]);
        state = addFloatingWidget(state, "fw2", ["fwt2"]);
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_DRAG_END",
          floatingWidgetId: "fw1",
          target: {
            type: "widget",
            widgetId: "fw2",
          },
        });
        expect(newState.widgets.fw2.tabs).toEqual(["fwt2", "fwt1"]);
      });
    });

    describe("panel target", () => {
      it("should add panel", () => {
        let state = createNineZoneState();
        state = addTab(state, "fwt1");
        state = addFloatingWidget(state, "fw1", ["fwt1"]);
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_DRAG_END",
          floatingWidgetId: "fw1",
          target: {
            type: "panel",
            newWidgetId: "leftStart",
            side: "left",
          },
        });
        expect(newState.panels.left.widgets).toEqual(["leftStart"]);
      });
    });
  });

  describe("FLOATING_WIDGET_SEND_BACK", () => {
    it("should send back to specified `left` panel widget", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "fwt1", "fwt2"]);
      state = addPanelWidget(state, "left", "leftStart", ["t1"]);
      state = addFloatingWidget(state, "fw1", ["fwt1", "fwt2"], {
        home: {
          side: "left",
          widgetId: "leftStart",
          widgetIndex: 0,
        },
      });
      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_SEND_BACK",
        id: "fw1",
      });
      expect(newState.widgets.leftStart.tabs).toEqual(["t1", "fwt1", "fwt2"]);
      expect(newState.widgets.fw1).not.to.exist;
      expect(newState.floatingWidgets.byId.fw1).not.to.exist;
    });

    it("should send back to specified `right` panel widget", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t0", "t1", "t2"]);
      state = addPanelWidget(state, "right", "w1", ["t0"]);
      state = addFloatingWidget(state, "fw1", ["t1", "t2"], {
        home: {
          side: "right",
          widgetId: "w1",
          widgetIndex: 0,
        },
      });
      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_SEND_BACK",
        id: "fw1",
      });
      expect(newState.widgets.w1.tabs).toEqual(["t0", "t1", "t2"]);
      expect(newState.widgets.fw1).not.to.exist;
      expect(newState.floatingWidgets.byId.fw1).not.to.exist;
    });

    it("should send back to widget container named same as floating widget when widgetId is undefined", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2", "t3"]);
      state = addPanelWidget(state, "left", "leftStart", ["t1"]);
      state = addFloatingWidget(state, "fw1", ["t2", "t3"], {
        home: {
          side: "left",
          widgetId: "",
          widgetIndex: 1,
        },
      });

      expect(state.panels.left.widgets).toEqual(["leftStart"]);

      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_SEND_BACK",
        id: "fw1",
      });

      expect(newState.panels.left.widgets).toEqual(["leftStart", "leftEnd"]);
      expect(newState.widgets.leftStart.tabs).toEqual(["t1"]);
      expect(newState.widgets.leftEnd.tabs).toEqual(["t2", "t3"]);
      expect(newState.widgets.fw1).not.to.exist;
      expect(newState.floatingWidgets.byId.fw1).not.to.exist;
    });

    it("should send back to widget container by index when widgetId is undefined", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2", "t3"]);
      state = addPanelWidget(state, "left", "leftEnd", ["t1"]);
      state = addFloatingWidget(state, "fw1", ["t2", "t3"], {
        home: {
          side: "left",
          widgetId: "",
          widgetIndex: 0,
        },
      });

      expect(state.panels.left.widgets).toEqual(["leftEnd"]);

      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_SEND_BACK",
        id: "fw1",
      });

      expect(newState.panels.left.widgets).toEqual(["leftStart", "leftEnd"]);
      expect(newState.widgets.leftEnd.tabs).toEqual(["t1"]);
      expect(newState.widgets.leftStart.tabs).toEqual(["t2", "t3"]);
      expect(newState.floatingWidgets.byId.fw1).not.to.exist;
    });

    it("should send back to a newly created widget container if the container no longer exists because all widget tabs were floated", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addPanelWidget(state, "left", "w2", ["t2"]);
      state = addFloatingWidget(state, "fw1", ["t1"], {
        home: {
          side: "left",
          widgetId: "w1",
          widgetIndex: 0,
        },
      });

      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_SEND_BACK",
        id: "fw1",
      });

      expect(newState.panels.left.widgets).toEqual(["w1", "w2"]);
      expect(newState.widgets.w1.tabs).toEqual(["t1"]);
      expect(newState.widgets.w2.tabs).toEqual(["t2"]);
      expect(newState.widgets.fw1).not.to.exist;
      expect(newState.floatingWidgets.byId.fw1).not.to.exist;
    });

    it("should re-dock floating insert to provided widgetIndex", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2", "t3", "fwt1", "fwt2"]);
      state = addPanelWidget(state, "left", "leftStart", ["t1", "t2"]);
      state = addPanelWidget(state, "left", "leftEnd", ["t3"]);
      state = addFloatingWidget(state, "fw1", ["fwt1", "fwt2"], {
        home: {
          side: "left",
          widgetId: "",
          widgetIndex: 1,
        },
      });
      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_SEND_BACK",
        id: "fw1",
      });

      expect(newState.panels.left.widgets).toEqual(["leftStart", "leftEnd"]);
      expect(newState.widgets.leftStart.tabs).toEqual(["t1", "t2"]);
      expect(newState.widgets.leftEnd.tabs).toEqual(["t3", "fwt1", "fwt2"]);
      expect(newState.widgets.fw1).not.to.exist;
      expect(newState.floatingWidgets.byId.fw1).not.to.exist;
    });

    it("should send back to existing panel section", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addFloatingWidget(state, "fw1", ["t1"], {
        home: {
          side: "left",
          widgetId: "",
          widgetIndex: 0,
        },
      });
      state = addFloatingWidget(state, "fw2", ["t2"], {
        home: {
          side: "left",
          widgetId: "",
          widgetIndex: 0,
        },
      });
      let newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_SEND_BACK",
        id: "fw1",
      });
      newState = NineZoneStateReducer(newState, {
        type: "FLOATING_WIDGET_SEND_BACK",
        id: "fw2",
      });
      expect(newState.panels.left.widgets).toEqual(["leftStart"]);
      expect(newState.widgets.leftStart.tabs).toEqual(["t1", "t2"]);
    });

    it("should send back to existing panel section ('maxWidgetCount' limit)", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2", "ft1"]);
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      state = addPanelWidget(state, "left", "w2", ["t2"]);
      state = addFloatingWidget(state, "fw1", ["ft1"], {
        home: {
          side: "left",
          widgetId: "",
          widgetIndex: 0,
        },
      });
      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_SEND_BACK",
        id: "fw1",
      });
      expect(newState.widgets.w1.tabs).toEqual(["t1", "ft1"]);
      expect(newState.widgets.w2.tabs).toEqual(["t2"]);
    });
  });

  describe("FLOATING_WIDGET_RESIZE", () => {
    it("should resize widget", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addFloatingWidget(state, "fw1", ["t1"], {
        bounds: new Rectangle(0, 100, 200, 400).toProps(),
      });
      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_RESIZE",
        id: "fw1",
        resizeBy: new Rectangle(0, 10, 20, 40).toProps(),
      });
      expect(newState.floatingWidgets.byId.fw1.bounds).toEqual({
        left: 0,
        top: 90,
        right: 220,
        bottom: 440,
      });
    });

    it("should set preferredFloatingWidgetSize of active tab", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1", { isFloatingWidgetResizable: true });
      state = addFloatingWidget(state, "fw1", ["t1"], {
        bounds: new Rectangle(0, 100, 200, 400).toProps(),
      });
      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_RESIZE",
        id: "fw1",
        resizeBy: new Rectangle(0, 10, 20, 40).toProps(),
      });
      expect(newState.tabs.t1.preferredFloatingWidgetSize).toEqual({
        width: 220,
        height: 350,
      });
    });

    it("should set user sized flag", () => {
      let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
      state = addTabs(state, ["t1"]);
      state = addFloatingWidget(state, "fw1", ["t1"], {
        bounds: new Rectangle(0, 100, 200, 400).toProps(),
      });
      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_RESIZE",
        id: "fw1",
        resizeBy: new Rectangle(10).toProps(),
      });
      expect(newState.floatingWidgets.byId.fw1.userSized).toEqual(true);
    });

    it("should maintain min size when resizing (top-left)", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addFloatingWidget(state, "fw1", ["t1"], {
        bounds: new Rectangle(100, 300, 500, 900),
      });
      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_RESIZE",
        id: "fw1",
        resizeBy: new Rectangle(-800, -800),
      });
      expect(newState.floatingWidgets.byId.fw1.bounds).toEqual({
        left: 500 - 200, // 200 is widget min width
        top: 900 - 120, // 120 is widget min height
        right: 500,
        bottom: 900,
      });
    });

    it("should maintain min size when resizing (bottom-right)", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addFloatingWidget(state, "fw1", ["t1"], {
        bounds: new Rectangle(100, 300, 500, 900),
      });
      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_RESIZE",
        id: "fw1",
        resizeBy: new Rectangle(0, 0, -800, -800),
      });
      expect(newState.floatingWidgets.byId.fw1.bounds).toEqual({
        left: 100,
        top: 300,
        right: 100 + 200,
        bottom: 300 + 120,
      });
    });
  });

  describe("FLOATING_WIDGET_SET_BOUNDS", () => {
    it("should set floating widget bounds", () => {
      let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
      state = addTabs(state, ["t1"]);
      state = addFloatingWidget(state, "fw1", ["t1"], {
        bounds: new Rectangle(0, 100, 200, 400).toProps(),
      });
      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_SET_BOUNDS",
        id: "fw1",
        bounds: { top: 50, left: 30, bottom: 250, right: 350 },
      });
      expect(newState.floatingWidgets.byId.fw1.bounds).toEqual({
        left: 30,
        top: 50,
        right: 350,
        bottom: 250,
      });
    });
  });

  describe("FLOATING_WIDGET_BRING_TO_FRONT", () => {
    it("should bring widget to front", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addFloatingWidget(state, "fw1", ["t1"]);
      state = addFloatingWidget(state, "fw2", ["t2"]);
      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_BRING_TO_FRONT",
        id: "fw1",
      });
      expect(newState.floatingWidgets.allIds).toEqual(["fw2", "fw1"]);
    });
  });

  describe("FLOATING_WIDGET_CLEAR_USER_SIZED", () => {
    it("should clear user sized flag", () => {
      let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
      state = addTab(state, "t1", { userSized: true });
      state = addFloatingWidget(state, "fw1", ["t1"], {
        userSized: true,
      });
      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_CLEAR_USER_SIZED",
        id: "fw1",
      });
      expect(newState.floatingWidgets.byId.fw1.userSized).toEqual(false);
      expect(newState.tabs.t1.userSized).toEqual(false);
    });
  });

  describe("FLOATING_WIDGET_SET_USER_SIZED", () => {
    it("should set user sized flag", () => {
      let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
      state = addTabs(state, ["t1"]);
      state = addFloatingWidget(state, "fw1", ["t1"]);
      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_SET_USER_SIZED",
        id: "fw1",
        userSized: true,
      });
      expect(newState.floatingWidgets.byId.fw1.userSized).toEqual(true);
    });
  });

  describe("WIDGET_TAB_CLICK", () => {
    it("should activate tab", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_CLICK",
        side: "left",
        widgetId: "w1",
        id: "t1",
      });
      expect(newState.widgets.w1.activeTabId).toEqual("t1");
    });

    it("should set tab active", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2", "t3"]);
      state = addPanelWidget(state, "left", "w1", ["t1", "t3"]);
      state = addPanelWidget(state, "left", "w2", ["t2"]);
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_CLICK",
        side: "left",
        widgetId: "w1",
        id: "t1",
      });
      expect(newState.widgets.w1.minimized).toEqual(false);
      expect(newState.widgets.w1.activeTabId).to.be.eql("t1");

      const newState2 = NineZoneStateReducer(newState, {
        type: "WIDGET_TAB_CLICK",
        side: "left",
        widgetId: "w1",
        id: "t3",
      });
      expect(newState2.widgets.w1.activeTabId).to.be.eql("t3");
    });

    it("should maximize minimized floating widget", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addFloatingWidget(state, "w1", ["t1"], undefined, {
        minimized: true,
      });
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_CLICK",
        side: undefined,
        widgetId: "w1",
        id: "t1",
      });
      expect(newState.widgets.w1.minimized).toEqual(false);
    });

    it("should update preferredFloatingWidgetSize of a tab", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1", { isFloatingWidgetResizable: true });
      state = addFloatingWidget(state, "w1", ["t1"], {
        bounds: new Rectangle(0, 100, 200, 400).toProps(),
      });
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_CLICK",
        side: undefined,
        widgetId: "w1",
        id: "t1",
      });
      expect(newState.tabs.t1.preferredFloatingWidgetSize).toEqual({
        height: 300,
        width: 200,
      });
    });
  });

  describe("WIDGET_TAB_DOUBLE_CLICK", () => {
    it("should not minimize panel section", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_DOUBLE_CLICK",
        side: "left",
        widgetId: "w1",
        id: "t1",
        floatingWidgetId: undefined,
      });
      expect(newState).toEqual(state);
    });

    it("should minimize floating widget", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addFloatingWidget(state, "fw1", ["t1"]);
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_DOUBLE_CLICK",
        id: "t1",
        side: undefined,
        widgetId: "fw1",
        floatingWidgetId: "fw1",
      });
      expect(newState.widgets.fw1.minimized).toEqual(true);
    });

    it("should activate tab in floating widget", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addFloatingWidget(state, "fw1", ["t1", "t2"]);
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_DOUBLE_CLICK",
        id: "t2",
        side: undefined,
        widgetId: "fw1",
        floatingWidgetId: "fw1",
      });
      expect(newState.widgets.fw1.activeTabId).toEqual("t2");
    });
  });

  describe("WIDGET_TAB_FLOAT", () => {
    it("should not update if already floating", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addFloatingWidget(state, "w1", ["t1"]);
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_FLOAT",
        id: "t1",
      });
      expect(newState).toEqual(state);
    });

    it("should throw if tab does not exist", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addPanelWidget(state, "left", "leftStart", ["t1"]);

      expect(() =>
        NineZoneStateReducer(state, {
          type: "WIDGET_TAB_FLOAT",
          id: "t0",
        })
      ).toThrow();
    });

    it("should apply position", () => {
      let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
      state = addTabs(state, ["t1"]);
      state = addPanelWidget(state, "right", "rightStart", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_FLOAT",
        id: "t1",
        position: { x: 55, y: 105 },
      });

      const floatingWidgetId = newState.floatingWidgets.allIds[0];
      const floatingWidget = newState.floatingWidgets.byId[floatingWidgetId];
      expect(floatingWidget.bounds).toEqual({
        left: 55,
        top: 105,
        bottom: 105 + 400,
        right: 55 + 400,
      });
    });

    it("should apply position and size", () => {
      let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
      state = addTabs(state, ["t1"]);
      state = addPanelWidget(state, "right", "rightStart", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_FLOAT",
        id: "t1",
        size: { height: 200, width: 200 },
        position: { x: 55, y: 105 },
      });

      const floatingWidgetId = newState.floatingWidgets.allIds[0];
      const floatingWidget = newState.floatingWidgets.byId[floatingWidgetId];
      expect(floatingWidget.bounds).toEqual({
        left: 55,
        top: 105,
        bottom: 105 + 200,
        right: 55 + 200,
      });
    });

    it("should apply preferred size", () => {
      let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
      state = addTab(state, "t1", {
        preferredFloatingWidgetSize: { height: 222, width: 222 },
      });
      state = addPanelWidget(state, "right", "rightStart", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_FLOAT",
        id: "t1",
        position: { x: 55, y: 105 },
      });

      const floatingWidgetId = newState.floatingWidgets.allIds[0];
      const floatingWidget = newState.floatingWidgets.byId[floatingWidgetId];
      expect(floatingWidget.bounds).toEqual({
        left: 55,
        top: 105,
        bottom: 105 + 222,
        right: 55 + 222,
      });
    });

    it("should apply default position and default size", () => {
      let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
      state = addTabs(state, ["t1"]);
      state = addPanelWidget(state, "right", "rightStart", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_FLOAT",
        id: "t1",
      });

      const floatingWidgetId = newState.floatingWidgets.allIds[0];
      const floatingWidget = newState.floatingWidgets.byId[floatingWidgetId];
      expect(floatingWidget.bounds).toEqual({
        left: 50,
        top: 100,
        bottom: 100 + 400,
        right: 50 + 400,
      });
    });

    it("should float a single tab of a panel", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addPanelWidget(state, "right", "rightStart", ["t1", "t2"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_FLOAT",
        id: "t1",
      });

      expect(newState.floatingWidgets.allIds).lengthOf(1);
      const floatingWidgetId = newState.floatingWidgets.allIds[0];
      expect(newState.widgets[floatingWidgetId].tabs).to.eql(["t1"]);
      expect(newState.widgets.rightStart.tabs).to.eql(["t2"]);
    });

    it("should float a popout", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addPopoutWidget(state, "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_FLOAT",
        id: "t1",
      });
      expect(newState.popoutWidgets.allIds).lengthOf(0);
      expect(newState.floatingWidgets.allIds).lengthOf(1);
    });

    it("should float a popout (persists home state)", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addPopoutWidget(state, "w1", ["t1"], {
        home: {
          floatingWidget: createFloatingWidgetState("fw1", {
            home: {
              side: "left",
              widgetId: "w2",
              widgetIndex: 1,
            },
          }),
          widgetId: "fw1",
        },
      });

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_FLOAT",
        id: "t1",
      });
      expect(newState.popoutWidgets.allIds).lengthOf(0);
      expect(newState.floatingWidgets.allIds).lengthOf(1);
      const widgetId = newState.floatingWidgets.allIds[0];
      expect(newState.floatingWidgets.byId[widgetId].home).to.eql({
        side: "left",
        widgetId: "w2",
        widgetIndex: 1,
      });
    });

    it("should float a docked tool settings tab", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addDockedToolSettings(state, "t1");

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_FLOAT",
        id: "t1",
      });
      assert(newState.toolSettings?.type === "widget");
      expect(newState.floatingWidgets.allIds).lengthOf(1);
    });
  });

  describe("WIDGET_TAB_DRAG_START", () => {
    it("should set dragged tab", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_DRAG_START",
        floatingWidgetId: undefined,
        id: "t1",
        position: new Point(100, 200).toProps(),
        side: "left",
        widgetId: "w1",
      });
      expect(newState.draggedTab).toBeTruthy();
    });

    it("should remove tab from widget", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addPanelWidget(state, "left", "w1", ["t1", "t2"]);
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_DRAG_START",
        floatingWidgetId: undefined,
        id: "t1",
        position: new Point(100, 200).toProps(),
        side: "left",
        widgetId: "w1",
      });
      expect(newState.widgets.w1.tabs).toEqual(["t2"]);
    });

    it("should remove widget from panel", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_DRAG_START",
        floatingWidgetId: undefined,
        id: "t1",
        position: new Point(100, 200).toProps(),
        side: "left",
        widgetId: "w1",
      });
      expect(newState.panels.left.widgets).toHaveLength(0);
    });

    it("should remove widget", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_DRAG_START",
        floatingWidgetId: undefined,
        id: "t1",
        position: new Point(100, 200).toProps(),
        side: "left",
        widgetId: "w1",
      });
      expect(newState.widgets.w1).not.to.exist;
    });

    it("should remove floating widget", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addFloatingWidget(state, "fw1", ["t1"]);
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_DRAG_START",
        floatingWidgetId: "fw1",
        id: "t1",
        position: new Point(100, 200).toProps(),
        side: undefined,
        widgetId: "fw1",
      });
      expect(newState.floatingWidgets.byId.fw1).not.to.exist;
    });

    it("should keep active tab", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addFloatingWidget(state, "fw1", ["t1", "t2"], undefined, {
        activeTabId: "t2",
      });
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_DRAG_START",
        floatingWidgetId: "fw1",
        id: "t2",
        position: new Point(100, 200).toProps(),
        side: undefined,
        widgetId: "fw1",
      });
      expect(newState.widgets.fw1.activeTabId).toEqual("t1");
    });

    it("should keep one widget expanded", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      state = addPanelWidget(state, "left", "w2", ["t2"], { minimized: true });
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_DRAG_START",
        floatingWidgetId: undefined,
        id: "t1",
        position: new Point(100, 200).toProps(),
        side: "left",
        widgetId: "w1",
      });
      expect(newState.widgets.w2.minimized).toEqual(false);
    });
  });

  describe("WIDGET_TAB_DRAG", () => {
    it("should update tab position", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "dt"]);
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      state = produce(state, (draft) => {
        draft.draggedTab = createDraggedTabState("dt", {
          position: new Point(100, 200).toProps(),
        });
      });
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_DRAG",
        dragBy: new Point(10, 20).toProps(),
      });
      expect(newState.draggedTab!.position).toEqual({
        x: 110,
        y: 220,
      });
    });
  });

  describe("WIDGET_TAB_DRAG_END", () => {
    describe("tab target", () => {
      it("should add tab to leftStart", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["t1", "t2"]);
        state = addPanelWidget(state, "left", "leftStart", ["t1", "t2"]);
        state = produce(state, (draft) => {
          draft.draggedTab = createDraggedTabState("dt", {
            position: new Point(100, 200).toProps(),
          });
        });
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_TAB_DRAG_END",
          id: "dt",
          target: {
            type: "tab",
            tabIndex: 1,
            widgetId: "leftStart",
          },
        });
        expect(newState.widgets.leftStart.tabs).toEqual(["t1", "dt", "t2"]);
      });

      it("should add tab to leftEnd", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["t1", "t2", "dt"]);
        state = addPanelWidget(state, "left", "leftEnd", ["t1", "t2"]);
        state = produce(state, (draft) => {
          draft.draggedTab = createDraggedTabState("dt", {
            position: new Point(100, 200).toProps(),
          });
        });
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_TAB_DRAG_END",
          id: "dt",
          target: {
            type: "tab",
            tabIndex: 1,
            widgetId: "leftEnd",
          },
        });
        expect(newState.widgets.leftEnd.tabs).toEqual(["t1", "dt", "t2"]);
      });

      it("should update home of tool settings floating widget", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["dt", "ts"]);
        state = produce(state, (draft) => {
          draft.draggedTab = createDraggedTabState("dt", {
            position: new Point(100, 200).toProps(),
            home: {
              side: "bottom",
              widgetId: "",
              widgetIndex: 0,
            },
          });
        });
        state = addFloatingWidget(state, "fw1", ["ts"]);
        state = addWidgetToolSettings(state, "ts");
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_TAB_DRAG_END",
          id: "d2",
          target: {
            type: "tab",
            tabIndex: 0,
            widgetId: "fw1",
          },
        });
        expect(newState.floatingWidgets.byId.fw1.home).not.toEqual(
          state.floatingWidgets.byId.fw1.home
        );
        expect(newState.floatingWidgets.byId.fw1.home).toEqual({
          side: "bottom",
          widgetId: "",
          widgetIndex: 0,
        });
      });
    });

    describe("section target", () => {
      it("should add widget", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["t1", "dt"]);
        state = addPanelWidget(state, "left", "leftStart", ["t1"]);
        state = produce(state, (draft) => {
          draft.draggedTab = createDraggedTabState("dt", {
            position: new Point(100, 200).toProps(),
          });
        });
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_TAB_DRAG_END",
          id: "dt",
          target: {
            type: "section",
            newWidgetId: "leftEnd",
            side: "left",
            sectionIndex: 1,
          },
        });
        expect(newState.panels.left.widgets).toEqual(["leftStart", "leftEnd"]);
      });

      it("should add widget to new end panel section", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["t1", "dt"]);
        state = addPanelWidget(state, "left", "leftStart", ["t1"]);
        state = produce(state, (draft) => {
          draft.draggedTab = createDraggedTabState("dt", {
            position: new Point(100, 200).toProps(),
          });
        });
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_TAB_DRAG_END",
          id: "dt",
          target: {
            type: "section",
            newWidgetId: "nw1",
            side: "left",
            sectionIndex: 1,
          },
        });
        expect(newState.panels.left.widgets).toEqual(["leftStart", "nw1"]);
      });

      it("should add widget to new panel start section", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["dt", "t1"]);
        state = addPanelWidget(state, "left", "leftEnd", ["t1"]);
        state = produce(state, (draft) => {
          draft.draggedTab = createDraggedTabState("dt", {
            position: new Point(100, 200).toProps(),
          });
        });
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_TAB_DRAG_END",
          id: "dt",
          target: {
            type: "section",
            newWidgetId: "nw1",
            side: "left",
            sectionIndex: 0,
          },
        });
        expect(newState.panels.left.widgets).toEqual(["nw1", "leftEnd"]);
      });
    });

    describe("widget target", () => {
      it("should add widget to existing end panel section", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["dt", "t1"]);
        state = addPanelWidget(state, "left", "leftEnd", ["t1"]);
        state = produce(state, (draft) => {
          draft.draggedTab = createDraggedTabState("dt", {
            position: new Point(100, 200).toProps(),
          });
        });
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_TAB_DRAG_END",
          id: "dt",
          target: {
            type: "widget",
            widgetId: "leftEnd",
          },
        });
        expect(newState.panels.left.widgets).toEqual(["leftEnd"]);
      });

      it("should add widget to existing panel start section", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["t1", "dt"]);
        state = addPanelWidget(state, "left", "leftStart", ["t1"]);
        state = produce(state, (draft) => {
          draft.draggedTab = createDraggedTabState("dt", {
            position: new Point(100, 200).toProps(),
          });
        });
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_TAB_DRAG_END",
          id: "dt",
          target: {
            type: "widget",
            widgetId: "leftStart",
          },
        });
        expect(newState.panels.left.widgets).toEqual(["leftStart"]);
      });

      it("should add tabs to a floating widget", () => {
        let state = createNineZoneState();
        state = addTabs(state, ["dt", "fwt1"]);
        state = addFloatingWidget(state, "fw1", ["fwt1"]);
        state = produce(state, (draft) => {
          draft.draggedTab = createDraggedTabState("dt", {
            position: new Point(100, 200).toProps(),
          });
        });
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_TAB_DRAG_END",
          id: "dt",
          target: {
            type: "widget",
            widgetId: "fw1",
          },
        });
        expect(newState.widgets.fw1.tabs).toEqual(["fwt1", "dt"]);
      });
    });

    describe("panel target", () => {
      it("should add widget", () => {
        let state = createNineZoneState();
        state = addTab(state, "dt");
        state = produce(state, (draft) => {
          draft.draggedTab = createDraggedTabState("dt", {
            position: new Point(100, 200).toProps(),
          });
        });
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_TAB_DRAG_END",
          id: "dt",
          target: {
            type: "panel",
            newWidgetId: "newId",
            side: "left",
          },
        });
        expect(newState.panels.left.widgets).toEqual(["newId"]);
      });
    });

    describe("floating widget target", () => {
      it("should add floating widget", () => {
        let state = createNineZoneState();
        state = addTab(state, "dt");
        state = produce(state, (draft) => {
          draft.draggedTab = createDraggedTabState("dt", {
            position: new Point(100, 200).toProps(),
          });
        });
        const newState = NineZoneStateReducer(state, {
          type: "WIDGET_TAB_DRAG_END",
          id: "dt",
          target: {
            type: "floatingWidget",
            newFloatingWidgetId: "newId",
            size: {
              height: 200,
              width: 200,
            },
          },
        });
        expect(newState.floatingWidgets.byId.newId).toBeTruthy();
      });
    });
  });

  describe("WIDGET_TAB_POPOUT", () => {
    it("should popout a tab", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addPanelWidget(state, "left", "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_POPOUT",
        id: "t1",
      });
      expect(newState.popoutWidgets.allIds).toHaveLength(1);
    });

    it("should skip if already in a popout", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addPopoutWidget(state, "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_POPOUT",
        id: "t1",
      });

      expect(newState).toEqual(state);
    });

    it("should use saved bounds", () => {
      let state = createNineZoneState({
        savedTabs: {
          allIds: ["t1"],
          byId: {
            t1: {
              id: "t1",
              popoutBounds: {
                top: 10,
                left: 20,
                right: 300,
                bottom: 400,
              },
            },
          },
        },
      });
      state = addTabs(state, ["t1"]);
      state = addPanelWidget(state, "right", "rightStart", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_POPOUT",
        id: "t1",
      });
      const popoutWidgetId = newState.popoutWidgets.allIds[0];
      const popoutWidget = newState.popoutWidgets.byId[popoutWidgetId];
      expect(popoutWidget.bounds).to.eql({
        top: 10,
        left: 20,
        right: 300,
        bottom: 400,
      });
    });

    it("should popout with default size and location", () => {
      let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
      state = addTabs(state, ["t1"]);
      state = addPanelWidget(state, "right", "rightStart", ["t1"]);
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_POPOUT",
        id: "t1",
      });
      expect(newState.popoutWidgets.allIds).lengthOf(1);
      const popoutWidgetId = newState.popoutWidgets.allIds[0];
      expect(newState.popoutWidgets.byId[popoutWidgetId].bounds).toEqual({
        left: 0,
        top: 0,
        bottom: 800,
        right: 600,
      });
    });

    it("should popout with specified size and location", () => {
      let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
      state = addTabs(state, ["t1", "ta", "tb"]);
      state = addPanelWidget(state, "right", "rightStart", ["t1", "ta", "tb"], {
        minimized: true,
      });
      const bounds = Rectangle.createFromSize({
        width: 100,
        height: 200,
      }).offset({
        x: 5,
        y: 10,
      });
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_POPOUT",
        id: "t1",
        size: bounds.getSize(),
        position: bounds.topLeft(),
      });
      expect(newState.popoutWidgets.allIds).lengthOf(1);
      const popoutWidgetId = newState.popoutWidgets.allIds[0];
      expect(newState.popoutWidgets.byId[popoutWidgetId].bounds).toEqual({
        left: 5,
        top: 10,
        bottom: 10 + 200,
        right: 5 + 100,
      });
    });

    it("should popout multiple tabs", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addPanelWidget(state, "right", "rightStart", ["t1", "t2"]);

      let newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_POPOUT",
        id: "t1",
      });
      expect(newState.popoutWidgets.allIds).lengthOf(1);

      newState = NineZoneStateReducer(newState, {
        type: "WIDGET_TAB_POPOUT",
        id: "t2",
      });
      expect(newState.popoutWidgets.allIds).lengthOf(2);
    });

    it("should popout tab from a panel", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addPanelWidget(state, "right", "rightStart", ["t1", "t2"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_POPOUT",
        id: "t1",
      });
      expect(newState.popoutWidgets.allIds).lengthOf(1);
      const popoutWidgetId = newState.popoutWidgets.allIds[0];
      const popoutWidget = newState.popoutWidgets.byId[popoutWidgetId];
      expect(popoutWidget.home).to.eql({
        side: "right",
        widgetId: "rightStart",
        widgetIndex: 0,
      });
    });

    it("should popout tab from a floating widget", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addFloatingWidget(state, "w1", ["t1"], {
        home: {
          side: "bottom",
          widgetId: "w2",
          widgetIndex: 0,
        },
      });

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_POPOUT",
        id: "t1",
      });
      expect(newState.popoutWidgets.allIds).lengthOf(1);
      const popoutWidgetId = newState.popoutWidgets.allIds[0];
      const popoutWidget = newState.popoutWidgets.byId[popoutWidgetId];
      expect(popoutWidget.home).to.eql({
        widgetId: "w1",
        floatingWidget: state.floatingWidgets.byId.w1,
      });
    });

    it("should popout a hidden tab", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_POPOUT",
        id: "t1",
      });
      expect(newState.popoutWidgets.allIds).lengthOf(1);
      const popoutWidgetId = newState.popoutWidgets.allIds[0];
      const popoutWidget = newState.popoutWidgets.byId[popoutWidgetId];
      expect(popoutWidget.home).to.eql({
        side: "left",
        widgetId: "",
        widgetIndex: 0,
      });
    });

    it("should popout a tab and fit to preferredFloatingWidgetSize if bounds are not set", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1", {
        preferredFloatingWidgetSize: { width: 50, height: 50 },
      });
      state = addPanelWidget(state, "left", "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_POPOUT",
        id: "t1",
      });
      expect(newState.popoutWidgets.allIds).toHaveLength(1);
      const popoutWidgetId = newState.popoutWidgets.allIds[0];
      expect(newState.popoutWidgets.byId[popoutWidgetId].bounds).toEqual({
        left: 0,
        top: 0,
        bottom: 50,
        right: 50,
      });
    });

    it("should popout a tab and fit to content container if preferredFloatingWidgetSize is not set", () => {
      let state = createNineZoneState();

      const blankHTML = document.createElement("div");

      vi.spyOn(document, "getElementById").mockReturnValue(blankHTML);
      state = addTab(state, "t1");
      state = addPanelWidget(state, "left", "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_POPOUT",
        id: "t1",
      });

      expect(newState.popoutWidgets.allIds).toHaveLength(1);
      const popoutWidgetId = newState.popoutWidgets.allIds[0];

      expect(newState.popoutWidgets.byId[popoutWidgetId].bounds).toEqual({
        left: 0,
        top: 0,
        bottom: 20,
        right: 20,
      });
    });
  });

  describe("WIDGET_TAB_HIDE", () => {
    it("should skip if tab is not visible", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_HIDE",
        id: "t1",
      });
      expect(newState).toEqual(state);
    });

    it("should hide docked tool settings tab", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addDockedToolSettings(state, "t1");

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_HIDE",
        id: "t1",
      });

      assert(newState.toolSettings?.type === "docked");
      expect(newState.toolSettings.hidden).toEqual(true);
    });

    it("should hide widget tool settings tab", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addFloatingWidget(state, "w1", ["t1"]);
      state = addWidgetToolSettings(state, "t1");

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_HIDE",
        id: "t1",
      });

      expect(newState.toolSettings?.type).toEqual("widget");
      expect(newState.toolSettings?.tabId).toEqual("t1");
      expect(newState.floatingWidgets.allIds).lengthOf(0);
      expect(newState.savedTabs.byId.t1?.home).to.eql({
        widgetId: "w1",
        tabIndex: 0,
        floatingWidget: state.floatingWidgets.byId.w1,
      });
    });

    it("should hide tab in a floating widget", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addFloatingWidget(state, "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_HIDE",
        id: "t1",
      });
      expect(newState.floatingWidgets.allIds).lengthOf(0);
      expect(newState.savedTabs.byId.t1?.home).to.eql({
        widgetId: "w1",
        tabIndex: 0,
        floatingWidget: state.floatingWidgets.byId.w1,
      });
    });

    it("should hide tab in a panel", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addPanelWidget(state, "left", "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_HIDE",
        id: "t1",
      });
      expect(newState.panels.left.widgets).lengthOf(0);
      expect(newState.savedTabs.byId.t1?.home).to.eql({
        widgetId: "w1",
        side: "left",
        widgetIndex: 0,
        tabIndex: 0,
      });
    });

    it("should hide tab in a popout widget", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addPopoutWidget(state, "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_HIDE",
        id: "t1",
      });
      expect(newState.popoutWidgets.allIds).lengthOf(0);
      expect(newState.savedTabs.byId.t1).toEqual(undefined);
    });
  });

  describe("WIDGET_TAB_REMOVE", () => {
    it("should save state and remove the tab", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addPanelWidget(state, "right", "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_REMOVE",
        id: "t1",
      });
      expect(newState.savedTabs.byId.t1).to.eql({
        id: "t1",
        home: {
          side: "right",
          tabIndex: 0,
          widgetId: "w1",
          widgetIndex: 0,
        },
      });
      expect(newState.tabs.t1).to.not.exist;
    });
  });

  describe("WIDGET_TAB_SET_LABEL", () => {
    it("should update label", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_SET_LABEL",
        id: "t1",
        label: "Tab 1",
      });
      expect(newState.tabs.t1.label).toEqual("Tab 1");
    });
  });

  describe("WIDGET_TAB_SET_OPEN", () => {
    it("should update label", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_SET_LABEL",
        id: "t1",
        label: "Tab 1",
      });
      expect(newState.tabs.t1.label).toEqual("Tab 1");
    });
  });

  describe("WIDGET_TAB_OPEN", () => {
    it("should open docked tool settings tab", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addDockedToolSettings(state, "t1", true);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_OPEN",
        id: "t1",
      });
      assert(newState.toolSettings?.type === "docked");
      expect(newState.toolSettings.hidden).toEqual(false);
      expect(newState.widgets).to.eql({});
    });

    it("should open hidden tab", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_OPEN",
        id: "t1",
      });
      expect(newState.panels.left.widgets).lengthOf(1);
      const widgetId = newState.panels.left.widgets[0];
      const widget = newState.widgets[widgetId];
      expect(widget.activeTabId).toEqual("t1");
    });

    it("should skip if tab is in a popout widget", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addPopoutWidget(state, "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_OPEN",
        id: "t1",
      });
      expect(newState).toEqual(state);
    });
  });

  describe("WIDGET_TAB_CLOSE", () => {
    it("should skip docked tool settings tab", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addDockedToolSettings(state, "t1");

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_CLOSE",
        id: "t1",
      });
      expect(newState).toEqual(state);
    });

    it("should minimize floating widget if tab is active", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addFloatingWidget(state, "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_CLOSE",
        id: "t1",
      });
      expect(newState.widgets.w1.minimized).toEqual(true);
    });
  });

  describe("WIDGET_TAB_SET_POPOUT_BOUNDS", () => {
    it("should update bounds", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_SET_POPOUT_BOUNDS",
        id: "t1",
        bounds: {
          left: 10,
          top: 20,
          right: 300,
          bottom: 400,
        },
      });
      expect(newState.savedTabs.byId.t1?.popoutBounds).to.eql({
        left: 10,
        top: 20,
        right: 300,
        bottom: 400,
      });
    });
  });

  describe("WIDGET_TAB_SHOW", () => {
    it("should skip docked tool settings tab", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addDockedToolSettings(state, "t1");

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_SHOW",
        id: "t1",
      });
      expect(newState).toEqual(state);
    });

    it("should bring floating widget to front", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addFloatingWidget(state, "w1", ["t1"]);
      state = addFloatingWidget(state, "w2", ["t2"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_SHOW",
        id: "t1",
      });
      expect(state.floatingWidgets.allIds).to.eql(["w1", "w2"]);
      expect(newState.floatingWidgets.allIds).to.eql(["w2", "w1"]);
    });

    it("should expand panel", () => {
      let state = createNineZoneState();
      state = updatePanelState(state, "left", (draft) => {
        draft.collapsed = true;
      });
      state = addTabs(state, ["t1"]);
      state = addPanelWidget(state, "left", "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_SHOW",
        id: "t1",
      });
      expect(newState.panels.left.collapsed).toEqual(false);
    });
  });

  describe("WIDGET_TAB_UNLOAD", () => {
    it("should hide a tab and set `unloaded` flag to `true`", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addPanelWidget(state, "left", "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_UNLOAD",
        id: "t1",
      });
      expect(newState.panels.left.widgets).lengthOf(0);
      expect(newState.tabs.t1.unloaded).toEqual(true);
    });
  });

  describe("WIDGET_TAB_UPDATE", () => {
    it("should update `label`", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_UPDATE",
        id: "t1",
        overrides: {
          label: "test",
        },
      });
      expect(newState.tabs.t1.label).toEqual("test");
    });
  });

  describe("WIDGET_TAB_EXPAND", () => {
    it("should expand a panel section", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      state = addPanelWidget(state, "left", "w2", ["t2"]);

      let newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_EXPAND",
        id: "t1",
      });
      expect(newState.panels.left.splitterPercent).toEqual(100);

      newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_EXPAND",
        id: "t2",
      });
      expect(newState.panels.left.splitterPercent).toEqual(0);
    });
  });

  describe("TOOL_SETTINGS_DOCK", () => {
    it("should skip if no tool settings", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "TOOL_SETTINGS_DOCK",
      });
      expect(newState).toEqual(state);
    });

    it("should skip if tool settings is not a widget", () => {
      let state = createNineZoneState();
      state = addTab(state, "ts");
      state = addDockedToolSettings(state, "ts");
      const newState = NineZoneStateReducer(state, {
        type: "TOOL_SETTINGS_DOCK",
      });
      expect(newState).toEqual(state);
    });

    it("should dock from panel widget", () => {
      let state = createNineZoneState();
      state = addTab(state, "ts");
      state = addPanelWidget(state, "left", "w1", ["ts"]);
      state = addWidgetToolSettings(state, "ts");
      const newState = NineZoneStateReducer(state, {
        type: "TOOL_SETTINGS_DOCK",
      });
      expect(newState.toolSettings?.type).toEqual("docked");
      expect(newState.widgets.w1).not.to.exist;
    });

    it("should dock from floating widget", () => {
      let state = createNineZoneState();
      state = addTab(state, "ts");
      state = addFloatingWidget(state, "w1", ["ts"]);
      state = addWidgetToolSettings(state, "ts");
      const newState = NineZoneStateReducer(state, {
        type: "TOOL_SETTINGS_DOCK",
      });
      expect(newState.toolSettings?.type).toEqual("docked");

      expect(newState.widgets.w1).not.to.exist;
      expect(newState.floatingWidgets.byId.w1).not.to.exist;
    });
  });

  describe("TOOL_SETTINGS_DRAG_START", () => {
    it("should skip if no tool settings", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "TOOL_SETTINGS_DRAG_START",
        newFloatingWidgetId: "new-fw1",
      });
      expect(newState).toEqual(state);
    });

    it("should skip if not docked", () => {
      let state = createNineZoneState();
      state = addTab(state, "ts");
      state = addFloatingWidget(state, "w1", ["ts"]);
      state = addWidgetToolSettings(state, "ts");
      const newState = NineZoneStateReducer(state, {
        type: "TOOL_SETTINGS_DRAG_START",
        newFloatingWidgetId: "new-fw1",
      });
      expect(newState).toEqual(state);
    });

    it("should convert to floating widget", () => {
      let state = createNineZoneState();
      state = addTab(state, "ts");
      state = addDockedToolSettings(state, "ts");
      const newState = NineZoneStateReducer(state, {
        type: "TOOL_SETTINGS_DRAG_START",
        newFloatingWidgetId: "new-fw1",
      });
      expect(newState.toolSettings?.type).toEqual("widget");
      expect(newState.floatingWidgets.byId["new-fw1"].id).toEqual("new-fw1");
    });

    it("should use preferredFloatingWidgetSize", () => {
      let state = createNineZoneState();
      state = addTab(state, "ts", {
        preferredFloatingWidgetSize: {
          height: 400,
          width: 500,
        },
      });
      state = addDockedToolSettings(state, "ts");
      const newState = NineZoneStateReducer(state, {
        type: "TOOL_SETTINGS_DRAG_START",
        newFloatingWidgetId: "new-fw1",
      });

      expect(newState.floatingWidgets.byId["new-fw1"].bounds).toEqual({
        left: 0,
        top: 0,
        bottom: 400,
        right: 500,
      });
    });
  });

  describe("POPOUT_WIDGET_SEND_BACK", () => {
    it("should send back to proper start panel section via index and merge widgetTabs", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addPanelWidget(state, "left", "leftStart", ["t1"]);
      state = addPopoutWidget(state, "fw1", ["t2"], {
        home: {
          side: "left",
          widgetId: "",
          widgetIndex: 0,
        },
      });
      const newState = NineZoneStateReducer(state, {
        type: "POPOUT_WIDGET_SEND_BACK",
        id: "fw1",
      });

      expect(newState.panels.left.widgets).toEqual(["leftStart"]);
      expect(newState.widgets.leftStart.tabs).toEqual(["t1", "t2"]);
      expect(newState.popoutWidgets.byId.fw1).not.to.exist;
      expect(newState.popoutWidgets.allIds).not.toContain("fw1");
    });

    it("should send back to proper end panel section via index widgetId is undefined", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addPanelWidget(state, "left", "leftStart", ["t1"]);
      state = addPopoutWidget(state, "fw1", ["t2"], {
        home: {
          side: "left",
          widgetId: "",
          widgetIndex: 1,
        },
      });
      const newState = NineZoneStateReducer(state, {
        type: "POPOUT_WIDGET_SEND_BACK",
        id: "fw1",
      });

      expect(newState.panels.left.widgets).toEqual(["leftStart", "leftEnd"]);
      expect(newState.widgets.leftStart.tabs).toEqual(["t1"]);
      expect(newState.widgets.leftEnd.tabs).toEqual(["t2"]);
      expect(newState.popoutWidgets.byId.fw1).not.to.exist;
      expect(newState.popoutWidgets.allIds).not.toContain("fw1");
    });

    it("should send back to proper start panel section via index widgetId is undefined", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addPanelWidget(state, "left", "leftEnd", ["t1"]);
      state = addPopoutWidget(state, "fw1", ["t2"], {
        home: {
          side: "left",
          widgetId: "",
          widgetIndex: 0,
        },
      });
      const newState = NineZoneStateReducer(state, {
        type: "POPOUT_WIDGET_SEND_BACK",
        id: "fw1",
      });

      expect(newState.panels.left.widgets).toEqual(["leftStart", "leftEnd"]);
      expect(newState.widgets.leftEnd.tabs).toEqual(["t1"]);
      expect(newState.widgets.leftStart.tabs).toEqual(["t2"]);
      expect(newState.popoutWidgets.byId.fw1).not.to.exist;
      expect(newState.popoutWidgets.allIds).not.toContain("fw1");
    });

    it("should send back to a newly created widget container if the container no longer exists because all widget tabs were popped out", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addPanelWidget(state, "left", "w2", ["t2"]);
      state = addPopoutWidget(state, "fw1", ["t1"], {
        home: {
          side: "left",
          widgetId: "w1",
          widgetIndex: 0,
        },
      });

      const newState = NineZoneStateReducer(state, {
        type: "POPOUT_WIDGET_SEND_BACK",
        id: "fw1",
      });

      expect(newState.panels.left.widgets).toEqual(["w1", "w2"]);
      expect(newState.widgets.w1.tabs).toEqual(["t1"]);
      expect(newState.widgets.w2.tabs).toEqual(["t2"]);
      expect(newState.popoutWidgets.byId.fw1).not.to.exist;
      expect(newState.popoutWidgets.allIds).not.toContain("fw1");
    });

    it("should insert to provided widgetIndex when maxWidgetCount is reached", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2", "t3", "fwt1"]);
      state = addPanelWidget(state, "left", "leftStart", ["t1", "t2", "t3"]);
      state = addPopoutWidget(state, "fw1", ["fwt1"], {
        home: {
          side: "left",
          widgetId: "",
          widgetIndex: 1,
        },
      });
      const newState = NineZoneStateReducer(state, {
        type: "POPOUT_WIDGET_SEND_BACK",
        id: "fw1",
      });

      expect(newState.panels.left.widgets).toEqual(["leftStart", "leftEnd"]);
      expect(newState.widgets.leftStart.tabs).toEqual(["t1", "t2", "t3"]);
      expect(newState.widgets.leftEnd.tabs).toEqual(["fwt1"]);
      expect(newState.popoutWidgets.byId.fw1).not.to.exist;
      expect(newState.popoutWidgets.allIds).not.toContain("fw1");
      expect(newState.widgets.fw1).not.to.exist;
    });

    it("should send back to existing widget", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      state = addPopoutWidget(state, "fw1", ["t2"], {
        home: {
          side: "right",
          widgetId: "w1",
          widgetIndex: 0,
        },
      });
      const newState = NineZoneStateReducer(state, {
        type: "POPOUT_WIDGET_SEND_BACK",
        id: "fw1",
      });

      expect(newState.panels.left.widgets).toEqual(["w1"]);
      expect(newState.widgets.w1.tabs).toEqual(["t1", "t2"]);
    });

    it("should send back to existing widget (by section index)", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2", "t3"]);
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      state = addPanelWidget(state, "left", "w2", ["t2"]);
      state = addPopoutWidget(state, "fw1", ["t3"], {
        home: {
          side: "left",
          widgetId: "w3",
          widgetIndex: 1,
        },
      });
      const newState = NineZoneStateReducer(state, {
        type: "POPOUT_WIDGET_SEND_BACK",
        id: "fw1",
      });

      expect(newState.panels.left.widgets).toEqual(["w1", "w2"]);
      expect(newState.widgets.w2.tabs).toEqual(["t2", "t3"]);
    });

    it("should send back to new panel section (by section index)", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addPanelWidget(state, "left", "w1", ["t1"]);
      state = addPopoutWidget(state, "pw1", ["t2"], {
        home: {
          widgetId: "w2",
          side: "left",
          widgetIndex: 1,
        },
      });
      const newState = NineZoneStateReducer(state, {
        type: "POPOUT_WIDGET_SEND_BACK",
        id: "pw1",
      });

      expect(newState.panels.left.widgets).toEqual(["w1", "w2"]);
    });

    it("should send back to new floating widget", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addPopoutWidget(state, "pw1", ["t1"], {
        home: {
          widgetId: "fw1",
          floatingWidget: createFloatingWidgetState("fw1"),
        },
      });
      const newState = NineZoneStateReducer(state, {
        type: "POPOUT_WIDGET_SEND_BACK",
        id: "pw1",
      });

      expect(newState.floatingWidgets.allIds).toContain("fw1");
    });

    it("should send back to new floating widget w/ unique id", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addPopoutWidget(state, "pw1", ["t1"], {
        home: {
          widgetId: "fw1",
          floatingWidget: createFloatingWidgetState("fw1"),
        },
      });
      const newState = NineZoneStateReducer(state, {
        type: "POPOUT_WIDGET_SEND_BACK",
        id: "pw1",
      });

      expect(newState.floatingWidgets.allIds).toContain("fw1");
    });
  });

  describe("WIDGET_DEF_ADD", () => {
    const defaultArgs: Pick<
      WidgetDefAddAction,
      "floatingWidget" | "location" | "panelSection"
    > = {
      floatingWidget: {
        id: getUniqueId(),
      },
      location: "panel",
      panelSection: {
        side: "left",
        id: "",
        index: 0,
      },
    };

    it("should restore saved tab", () => {
      let state = createNineZoneState();
      state = updateSavedTabState(state, "t1", (draft) => {
        draft.home = {
          side: "bottom",
          widgetId: "",
          widgetIndex: 0,
          tabIndex: 0,
        };
      });
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_DEF_ADD",
        ...defaultArgs,
        id: "t1",
      });
      expect(newState.panels.bottom.widgets).lengthOf(1);
    });

    it("should add to an existing panel section", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addPanelWidget(state, "right", "w1", ["t1"]);
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_DEF_ADD",
        ...defaultArgs,
        id: "t2",
        location: "panel",
        panelSection: {
          id: "w1",
          side: "left",
          index: 0,
        },
      });
      expect(newState.panels.left.widgets).lengthOf(0);
      expect(newState.widgets.w1.tabs).to.eql(["t1", "t2"]);
    });

    it("should add to an existing panel section (maxWidgetCount)", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1", "t2"]);
      state = addPanelWidget(state, "right", "w1", ["t1"]);
      state = addPanelWidget(state, "right", "w2", ["t2"]);
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_DEF_ADD",
        ...defaultArgs,
        id: "t3",
        location: "panel",
        panelSection: {
          id: "w3",
          side: "right",
          index: 1,
        },
      });
      expect(newState.panels.right.widgets).eql(["w1", "w2"]);
      expect(newState.widgets.w2.tabs).to.eql(["t2", "t3"]);
    });

    it("should add to an existing floating widget", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addFloatingWidget(state, "w1", ["t1"]);
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_DEF_ADD",
        ...defaultArgs,
        id: "t2",
        location: "floating",
        floatingWidget: {
          id: "w1",
        },
      });
      expect(newState.floatingWidgets.allIds).to.eql(["w1"]);
      expect(newState.widgets.w1.tabs).to.eql(["t1", "t2"]);
    });

    it("should add to a new panel section", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_DEF_ADD",
        ...defaultArgs,
        id: "t1",
        location: "panel",
        panelSection: {
          id: "w1",
          index: 0,
          side: "right",
        },
      });
      expect(newState.panels.right.widgets).to.eql(["w1"]);
      expect(newState.widgets.w1.tabs).to.eql(["t1"]);
    });

    it("should add to a new floating widget", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_DEF_ADD",
        ...defaultArgs,
        id: "t1",
        location: "floating",
        floatingWidget: {
          id: "w1",
        },
      });
      expect(newState.floatingWidgets.allIds).to.eql(["w1"]);
      expect(newState.widgets.w1.tabs).to.eql(["t1"]);
    });

    it("should add to a new floating widget (w/ preferred position & size)", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_DEF_ADD",
        ...defaultArgs,
        id: "t1",
        location: "floating",
        floatingWidget: {
          id: "w1",
          preferredPosition: {
            x: 300,
            y: 500,
          },
        },
        overrides: {
          preferredFloatingWidgetSize: {
            height: 123,
            width: 456,
          },
        },
      });
      expect(newState.floatingWidgets.allIds).to.eql(["w1"]);
      expect(newState.widgets.w1.tabs).to.eql(["t1"]);
      expect(newState.floatingWidgets.byId.w1.userSized).toEqual(true);
    });
  });

  describe("WIDGET_DEF_ADD_TOOL_SETTINGS", () => {
    it("should add docked tool settings tab", () => {
      let state = createNineZoneState();
      state = updateSavedTabState(state, "t1", (draft) => {
        draft.home = {
          side: "bottom",
          widgetId: "",
          widgetIndex: 0,
          tabIndex: 0,
        };
      });
      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_DEF_ADD_TOOL_SETTINGS",
        id: "t1",
      });
      expect(newState.tabs.t1).to.exist;
      expect(newState.toolSettings).to.eql({
        type: "docked",
        tabId: "t1",
        hidden: false,
      });
    });
  });
});
