/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect, should } from "chai";
import { produce } from "immer";
import { Point, Rectangle } from "@itwin/core-react";
import type { NineZoneAction } from "../../appui-layout-react";
import {
  addDockedToolSettings,
  addFloatingWidget,
  addPanelWidget,
  addPopoutWidget,
  addTab,
  addWidgetToolSettings,
  createNineZoneState,
  NineZoneStateReducer,
} from "../../appui-layout-react";
import { addTabs } from "../Utils";
import { createDraggedTabState } from "../../appui-layout-react/state/internal/TabStateHelpers";
import { updatePanelState } from "../../appui-layout-react/state/internal/PanelStateHelpers";
import { assert } from "@itwin/core-bentley";
import { stub } from "sinon";

describe("NineZoneStateReducer", () => {
  it("should not update for unhandled action", () => {
    const state = createNineZoneState();
    const newState = NineZoneStateReducer(state, {
      type: "UNKNOWN",
    } as unknown as NineZoneAction);
    newState.should.eq(state);
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
      newState.size.should.eql({ height: 200, width: 300 });
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
      newState.floatingWidgets.byId.fw1.bounds.should.eql({
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
      expect(newState.panels.left.size).to.eq(250);
    });
  });

  describe("PANEL_TOGGLE_COLLAPSED", () => {
    it("should toggle collapsed property of panel", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_TOGGLE_COLLAPSED",
        side: "left",
      });
      newState.panels.left.collapsed.should.not.eq(state.panels.left.collapsed);
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
      newState.panels.left.collapsed.should.true;
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
      expect(newState.panels.left.size).to.eq(400);
      Number(400).should.eq(newState.panels.left.size);
    });

    it("should reset panel size", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_SET_SIZE",
        side: "left",
        size: undefined,
      });
      expect(newState.panels.left.size).to.undefined;
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
      Number(40).should.eq(newState.panels.left.splitterPercent);
    });
  });

  describe("PANEL_TOGGLE_SPAN", () => {
    it("should toggle span property of panel", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_TOGGLE_SPAN",
        side: "top",
      });
      newState.panels.top.span.should.not.eq(state.panels.top.span);
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
      newState.panels.top.pinned.should.false;
    });
  });

  describe("PANEL_TOGGLE_PINNED", () => {
    it("should toggle pinned property of panel", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "PANEL_TOGGLE_PINNED",
        side: "top",
      });
      newState.panels.top.pinned.should.not.eq(state.panels.top.pinned);
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
      newState.panels.left.size!.should.eq(300);
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
      should().exist(newState.floatingWidgets.byId.newId);
      newState.panels.left.widgets.should.length(0);
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
      newState.widgets.w2.minimized.should.false;
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
      newState.floatingWidgets.byId.fw1.bounds.should.eql({
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
        (!!newState.floatingWidgets.byId.fw1).should.true;
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
        newState.floatingWidgets.byId.w1.bounds.should.eql({
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
        newState.widgets.w1.tabs.should.eql(["t1", "fwt1", "t2", "t3"]);
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
        newState.floatingWidgets.byId.fw1.home.should.not.eq(
          state.floatingWidgets.byId.fw1.home
        );
        newState.floatingWidgets.byId.fw1.home.should.eql({
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
        newState.panels.left.widgets.should.eql(["w1", "newId", "w2"]);
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
        newState.widgets.w2.tabs.should.eql(["t2", "fwt1"]);
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
        newState.widgets.fw2.tabs.should.eql(["fwt2", "fwt1"]);
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
        newState.panels.left.widgets.should.eql(["leftStart"]);
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
      newState.widgets.leftStart.tabs.should.eql(["t1", "fwt1", "fwt2"]);
      should().not.exist(newState.widgets.fw1);
      should().not.exist(newState.floatingWidgets.byId.fw1);
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
      newState.widgets.w1.tabs.should.eql(["t0", "t1", "t2"]);
      should().not.exist(newState.widgets.fw1);
      should().not.exist(newState.floatingWidgets.byId.fw1);
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

      state.panels.left.widgets.should.eql(["leftStart"]);

      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_SEND_BACK",
        id: "fw1",
      });

      newState.panels.left.widgets.should.eql(["leftStart", "leftEnd"]);
      newState.widgets.leftStart.tabs.should.eql(["t1"]);
      newState.widgets.leftEnd.tabs.should.eql(["t2", "t3"]);
      should().not.exist(newState.widgets.fw1);
      should().not.exist(newState.floatingWidgets.byId.fw1);
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

      state.panels.left.widgets.should.eql(["leftEnd"]);

      const newState = NineZoneStateReducer(state, {
        type: "FLOATING_WIDGET_SEND_BACK",
        id: "fw1",
      });

      newState.panels.left.widgets.should.eql(["leftStart", "leftEnd"]);
      newState.widgets.leftEnd.tabs.should.eql(["t1"]);
      newState.widgets.leftStart.tabs.should.eql(["t2", "t3"]);
      should().not.exist(newState.floatingWidgets.byId.fw1);
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

      newState.panels.left.widgets.should.eql(["w1", "w2"]);
      newState.widgets.w1.tabs.should.eql(["t1"]);
      newState.widgets.w2.tabs.should.eql(["t2"]);
      should().not.exist(newState.widgets.fw1);
      should().not.exist(newState.floatingWidgets.byId.fw1);
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

      newState.panels.left.widgets.should.eql(["leftStart", "leftEnd"]);
      newState.widgets.leftStart.tabs.should.eql(["t1", "t2"]);
      newState.widgets.leftEnd.tabs.should.eql(["t3", "fwt1", "fwt2"]);
      should().not.exist(newState.widgets.fw1);
      should().not.exist(newState.floatingWidgets.byId.fw1);
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
      newState.panels.left.widgets.should.eql(["leftStart"]);
      newState.widgets.leftStart.tabs.should.eql(["t1", "t2"]);
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
      newState.widgets.w1.tabs.should.eql(["t1", "ft1"]);
      newState.widgets.w2.tabs.should.eql(["t2"]);
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
      newState.floatingWidgets.byId.fw1.bounds.should.eql({
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
      newState.tabs.t1.preferredFloatingWidgetSize!.should.eql({
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
      newState.floatingWidgets.byId.fw1.userSized!.should.eq(true);
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
      newState.floatingWidgets.byId.fw1.bounds.should.eql({
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
      newState.floatingWidgets.byId.fw1.bounds.should.eql({
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
      newState.floatingWidgets.byId.fw1.bounds.should.eql({
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
      newState.floatingWidgets.allIds.should.eql(["fw2", "fw1"]);
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
      newState.floatingWidgets.byId.fw1.userSized!.should.eq(false);
      newState.tabs.t1.userSized!.should.eq(false);
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
      newState.floatingWidgets.byId.fw1.userSized!.should.eq(true);
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
      newState.widgets.w1.activeTabId.should.eq("t1");
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
      newState.widgets.w1.minimized.should.false;
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
      newState.widgets.w1.minimized.should.false;
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
      newState.tabs.t1.preferredFloatingWidgetSize!.should.eql({
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
      newState.should.eq(state);
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
      newState.widgets.fw1.minimized.should.true;
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
      newState.widgets.fw1.activeTabId.should.eq("t2");
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
      newState.should.eq(state);
    });

    it("should throw if tab does not exist", () => {
      let state = createNineZoneState();
      state = addTabs(state, ["t1"]);
      state = addPanelWidget(state, "left", "leftStart", ["t1"]);

      (() =>
        NineZoneStateReducer(state, {
          type: "WIDGET_TAB_FLOAT",
          id: "t0",
        })).should.throw();
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
      floatingWidget.bounds.should.eql({
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
      floatingWidget.bounds.should.eql({
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
      floatingWidget.bounds.should.eql({
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
      floatingWidget.bounds.should.eql({
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
      (!!newState.draggedTab).should.true;
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
      newState.widgets.w1.tabs.should.eql(["t2"]);
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
      newState.panels.left.widgets.should.length(0);
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
      should().not.exist(newState.widgets.w1);
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
      should().not.exist(newState.floatingWidgets.byId.fw1);
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
      newState.widgets.fw1.activeTabId.should.eq("t1");
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
      newState.widgets.w2.minimized.should.false;
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
      newState.draggedTab!.position.should.eql({
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
        newState.widgets.leftStart.tabs.should.eql(["t1", "dt", "t2"]);
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
        newState.widgets.leftEnd.tabs.should.eql(["t1", "dt", "t2"]);
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
        newState.floatingWidgets.byId.fw1.home.should.not.eq(
          state.floatingWidgets.byId.fw1.home
        );
        newState.floatingWidgets.byId.fw1.home.should.eql({
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
        newState.panels.left.widgets.should.eql(["leftStart", "leftEnd"]);
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
        newState.panels.left.widgets.should.eql(["leftStart", "nw1"]);
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
        newState.panels.left.widgets.should.eql(["nw1", "leftEnd"]);
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
        newState.panels.left.widgets.should.eql(["leftEnd"]);
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
        newState.panels.left.widgets.should.eql(["leftStart"]);
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
        newState.widgets.fw1.tabs.should.eql(["fwt1", "dt"]);
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
        newState.panels.left.widgets.should.eql(["newId"]);
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
        (!!newState.floatingWidgets.byId.newId).should.true;
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
      newState.popoutWidgets.allIds.should.length(1);
    });

    it("should skip if already in a popout", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addPopoutWidget(state, "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_POPOUT",
        id: "t1",
      });

      newState.should.eq(state);
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
      newState.popoutWidgets.byId[popoutWidgetId].bounds.should.eql({
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
      newState.popoutWidgets.byId[popoutWidgetId].bounds.should.eql({
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
      newState.popoutWidgets.allIds.should.length(1);
      const popoutWidgetId = newState.popoutWidgets.allIds[0];
      newState.popoutWidgets.byId[popoutWidgetId].bounds.should.eql({
        left: 0,
        top: 0,
        bottom: 50,
        right: 50,
      });
    });

    it("should popout a tab and fit to content container if preferredFloatingWidgetSize is not set", () => {
      let state = createNineZoneState();

      const blankHTML = document.createElement("div");

      stub(document, "getElementById").returns(blankHTML);
      state = addTab(state, "t1");
      state = addPanelWidget(state, "left", "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_POPOUT",
        id: "t1",
      });

      newState.popoutWidgets.allIds.should.length(1);
      const popoutWidgetId = newState.popoutWidgets.allIds[0];

      newState.popoutWidgets.byId[popoutWidgetId].bounds.should.eql({
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
      expect(newState).to.eq(state);
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
      expect(newState.toolSettings.hidden).to.true;
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

      expect(newState.toolSettings?.type).to.eq("widget");
      expect(newState.toolSettings?.tabId).to.eq("t1");
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
      expect(newState.savedTabs.byId.t1).to.undefined;
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
      expect(newState.tabs.t1.label).to.eq("Tab 1");
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
      expect(newState.tabs.t1.label).to.eq("Tab 1");
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
      expect(newState.toolSettings.hidden).to.false;
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
      expect(widget.activeTabId).to.eq("t1");
    });

    it("should skip if tab is in a popout widget", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addPopoutWidget(state, "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_OPEN",
        id: "t1",
      });
      expect(newState).to.eq(state);
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
      newState.should.eq(state);
    });

    it("should minimize floating widget if tab is active", () => {
      let state = createNineZoneState();
      state = addTab(state, "t1");
      state = addFloatingWidget(state, "w1", ["t1"]);

      const newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_CLOSE",
        id: "t1",
      });
      expect(newState.widgets.w1.minimized).to.true;
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
      newState.should.eq(state);
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
      expect(newState.panels.left.collapsed).to.false;
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
      expect(newState.tabs.t1.unloaded).to.true;
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
      expect(newState.panels.left.splitterPercent).to.eq(100);

      newState = NineZoneStateReducer(state, {
        type: "WIDGET_TAB_EXPAND",
        id: "t2",
      });
      expect(newState.panels.left.splitterPercent).to.eq(0);
    });
  });

  describe("TOOL_SETTINGS_DOCK", () => {
    it("should skip if no tool settings", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "TOOL_SETTINGS_DOCK",
      });
      newState.should.eq(state);
    });

    it("should skip if tool settings is not a widget", () => {
      let state = createNineZoneState();
      state = addTab(state, "ts");
      state = addDockedToolSettings(state, "ts");
      const newState = NineZoneStateReducer(state, {
        type: "TOOL_SETTINGS_DOCK",
      });
      newState.should.eq(state);
    });

    it("should dock from panel widget", () => {
      let state = createNineZoneState();
      state = addTab(state, "ts");
      state = addPanelWidget(state, "left", "w1", ["ts"]);
      state = addWidgetToolSettings(state, "ts");
      const newState = NineZoneStateReducer(state, {
        type: "TOOL_SETTINGS_DOCK",
      });
      expect(newState.toolSettings?.type).to.eq("docked");
      should().not.exist(newState.widgets.w1);
    });

    it("should dock from floating widget", () => {
      let state = createNineZoneState();
      state = addTab(state, "ts");
      state = addFloatingWidget(state, "w1", ["ts"]);
      state = addWidgetToolSettings(state, "ts");
      const newState = NineZoneStateReducer(state, {
        type: "TOOL_SETTINGS_DOCK",
      });
      expect(newState.toolSettings?.type).to.eq("docked");

      should().not.exist(newState.widgets.w1);
      should().not.exist(newState.floatingWidgets.byId.w1);
    });
  });

  describe("TOOL_SETTINGS_DRAG_START", () => {
    it("should skip if no tool settings", () => {
      const state = createNineZoneState();
      const newState = NineZoneStateReducer(state, {
        type: "TOOL_SETTINGS_DRAG_START",
        newFloatingWidgetId: "new-fw1",
      });
      newState.should.eq(state);
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
      newState.should.eq(state);
    });

    it("should convert to floating widget", () => {
      let state = createNineZoneState();
      state = addTab(state, "ts");
      state = addDockedToolSettings(state, "ts");
      const newState = NineZoneStateReducer(state, {
        type: "TOOL_SETTINGS_DRAG_START",
        newFloatingWidgetId: "new-fw1",
      });
      expect(newState.toolSettings?.type).to.eq("widget");
      newState.floatingWidgets.byId["new-fw1"].id.should.eq("new-fw1");
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

      newState.floatingWidgets.byId["new-fw1"].bounds.should.eql({
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

      newState.panels.left.widgets.should.eql(["leftStart"]);
      newState.widgets.leftStart.tabs.should.eql(["t1", "t2"]);
      should().not.exist(newState.popoutWidgets.byId.fw1);
      newState.popoutWidgets.allIds.should.not.contain("fw1");
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

      newState.panels.left.widgets.should.eql(["leftStart", "leftEnd"]);
      newState.widgets.leftStart.tabs.should.eql(["t1"]);
      newState.widgets.leftEnd.tabs.should.eql(["t2"]);
      should().not.exist(newState.popoutWidgets.byId.fw1);
      newState.popoutWidgets.allIds.should.not.contain("fw1");
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

      newState.panels.left.widgets.should.eql(["leftStart", "leftEnd"]);
      newState.widgets.leftEnd.tabs.should.eql(["t1"]);
      newState.widgets.leftStart.tabs.should.eql(["t2"]);
      should().not.exist(newState.popoutWidgets.byId.fw1);
      newState.popoutWidgets.allIds.should.not.contain("fw1");
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

      newState.panels.left.widgets.should.eql(["w1", "w2"]);
      newState.widgets.w1.tabs.should.eql(["t1"]);
      newState.widgets.w2.tabs.should.eql(["t2"]);
      should().not.exist(newState.popoutWidgets.byId.fw1);
      newState.popoutWidgets.allIds.should.not.contain("fw1");
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

      newState.panels.left.widgets.should.eql(["leftStart", "leftEnd"]);
      newState.widgets.leftStart.tabs.should.eql(["t1", "t2", "t3"]);
      newState.widgets.leftEnd.tabs.should.eql(["fwt1"]);
      should().not.exist(newState.popoutWidgets.byId.fw1);
      newState.popoutWidgets.allIds.should.not.contain("fw1");
      should().not.exist(newState.widgets.fw1);
    });
  });
});
