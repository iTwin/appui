/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Point, Rectangle } from "@itwin/core-react";
import { produce } from "immer";
import type { NineZoneAction } from "../../../appui-react/layout/state/NineZoneAction";
import { createNineZoneState } from "../../../appui-react/layout/state/NineZoneState";
import { NineZoneStateReducer } from "../../../appui-react/layout/state/NineZoneStateReducer";
import { activateDroppedTab } from "../../../appui-react/preview/activate-dropped-tab/activateDroppedTab";
import { addPanelWidget } from "../../../appui-react/layout/state/internal/PanelStateHelpers";
import {
  addTab,
  createDraggedTabState,
} from "../../../appui-react/layout/state/internal/TabStateHelpers";
import { addFloatingWidget } from "../../../appui-react/layout/state/internal/WidgetStateHelpers";
import { addTabs } from "../../layout/Utils";

describe("activateDroppedTab", () => {
  describe("WIDGET_DRAG_END", () => {
    describe("no target", () => {
      it("should not remove floating widget", () => {
        let state = createNineZoneState({
          size: { height: 1000, width: 1600 },
        });
        state = addTabs(state, ["t1"]);
        state = addFloatingWidget(state, "fw1", ["t1"]);

        const action: NineZoneAction = {
          type: "WIDGET_DRAG_END",
          floatingWidgetId: "fw1",
          target: {
            type: "window",
          },
        };

        const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
        const newState = wrappedReducer(state, action);

        (!!newState.floatingWidgets.byId.fw1).should.true;
        newState.widgets.fw1.activeTabId.should.eql("t1");
      });

      describe("tab target", () => {
        it("should add dragged tab", () => {
          let state = createNineZoneState();
          state = addTabs(state, ["t1", "t2", "t3", "fwt1"]);
          state = addPanelWidget(state, "left", "w1", ["t1", "t2", "t3"]);
          state = addFloatingWidget(state, "fw1", ["fwt1"]);

          const action: NineZoneAction = {
            type: "WIDGET_DRAG_END",
            floatingWidgetId: "fw1",
            target: {
              type: "tab",
              tabIndex: 1,
              widgetId: "w1",
            },
          };

          const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
          const newState = wrappedReducer(state, action);

          newState.widgets.w1.tabs.should.eql(["t1", "fwt1", "t2", "t3"]);
          newState.widgets.w1.activeTabId.should.eql("fwt1");
        });
      });

      describe("section target", () => {
        it("should add a section", () => {
          let state = createNineZoneState();
          state = addTabs(state, ["t1", "t2", "fwt1"]);
          state = addPanelWidget(state, "left", "w1", ["t1"]);
          state = addPanelWidget(state, "left", "w2", ["t2"]);
          state = addFloatingWidget(state, "fw1", ["fwt1"]);

          const action: NineZoneAction = {
            type: "WIDGET_DRAG_END",
            floatingWidgetId: "fw1",
            target: {
              type: "section",
              newWidgetId: "newId",
              side: "left",
              sectionIndex: 1,
            },
          };

          const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
          const newState = wrappedReducer(state, action);

          newState.panels.left.widgets.should.eql(["w1", "newId", "w2"]);
          newState.widgets.newId.activeTabId.should.eql("fwt1");
        });
      });

      describe("widget target", () => {
        it("should add tabs to a section widget", () => {
          let state = createNineZoneState();
          state = addTabs(state, ["t1", "t2", "fwt1"]);
          state = addPanelWidget(state, "left", "w1", ["t1"]);
          state = addPanelWidget(state, "left", "w2", ["t2"]);
          state = addFloatingWidget(state, "fw1", ["fwt1"]);

          const action: NineZoneAction = {
            type: "WIDGET_DRAG_END",
            floatingWidgetId: "fw1",
            target: {
              type: "widget",
              widgetId: "w2",
            },
          };

          const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
          const newState = wrappedReducer(state, action);

          newState.widgets.w2.tabs.should.eql(["t2", "fwt1"]);
          newState.widgets.w2.activeTabId.should.eql("fwt1");
        });

        it("should add tabs to a floating widget", () => {
          let state = createNineZoneState();
          state = addTabs(state, ["fwt1", "fwt2"]);
          state = addFloatingWidget(state, "fw1", ["fwt1"]);
          state = addFloatingWidget(state, "fw2", ["fwt2"]);

          const action: NineZoneAction = {
            type: "WIDGET_DRAG_END",
            floatingWidgetId: "fw1",
            target: {
              type: "widget",
              widgetId: "fw2",
            },
          };

          const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
          const newState = wrappedReducer(state, action);

          newState.widgets.fw2.tabs.should.eql(["fwt2", "fwt1"]);
          newState.widgets.fw2.activeTabId.should.eql("fwt1");
        });
      });

      describe("panel target", () => {
        it("should add panel", () => {
          let state = createNineZoneState();
          state = addTab(state, "fwt1");
          state = addFloatingWidget(state, "fw1", ["fwt1"]);

          const action: NineZoneAction = {
            type: "WIDGET_DRAG_END",
            floatingWidgetId: "fw1",
            target: {
              type: "panel",
              newWidgetId: "leftStart",
              side: "left",
            },
          };

          const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
          const newState = wrappedReducer(state, action);

          newState.panels.left.widgets.should.eql(["leftStart"]);
          newState.widgets.leftStart.activeTabId.should.eql("fwt1");
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

          const action: NineZoneAction = {
            type: "WIDGET_TAB_DRAG_END",
            id: "dt",
            target: {
              type: "tab",
              tabIndex: 1,
              widgetId: "leftStart",
            },
          };

          const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
          const newState = wrappedReducer(state, action);

          newState.widgets.leftStart.tabs.should.eql(["t1", "dt", "t2"]);
          newState.widgets.leftStart.activeTabId.should.eql("dt");
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

          const action: NineZoneAction = {
            type: "WIDGET_TAB_DRAG_END",
            id: "dt",
            target: {
              type: "tab",
              tabIndex: 1,
              widgetId: "leftEnd",
            },
          };

          const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
          const newState = wrappedReducer(state, action);

          newState.widgets.leftEnd.tabs.should.eql(["t1", "dt", "t2"]);
          newState.widgets.leftEnd.activeTabId.should.eql("dt");
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

          const action: NineZoneAction = {
            type: "WIDGET_TAB_DRAG_END",
            id: "dt",
            target: {
              type: "section",
              newWidgetId: "leftEnd",
              side: "left",
              sectionIndex: 1,
            },
          };

          const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
          const newState = wrappedReducer(state, action);

          newState.panels.left.widgets.should.eql(["leftStart", "leftEnd"]);
          newState.widgets.leftEnd.activeTabId.should.eql("dt");
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

          const action: NineZoneAction = {
            type: "WIDGET_TAB_DRAG_END",
            id: "dt",
            target: {
              type: "section",
              newWidgetId: "nw1",
              side: "left",
              sectionIndex: 1,
            },
          };

          const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
          const newState = wrappedReducer(state, action);

          newState.panels.left.widgets.should.eql(["leftStart", "nw1"]);
          newState.widgets.nw1.activeTabId.should.eql("dt");
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

          const action: NineZoneAction = {
            type: "WIDGET_TAB_DRAG_END",
            id: "dt",
            target: {
              type: "section",
              newWidgetId: "nw1",
              side: "left",
              sectionIndex: 0,
            },
          };

          const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
          const newState = wrappedReducer(state, action);

          newState.panels.left.widgets.should.eql(["nw1", "leftEnd"]);
          newState.widgets.nw1.activeTabId.should.eql("dt");
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

          const action: NineZoneAction = {
            type: "WIDGET_TAB_DRAG_END",
            id: "dt",
            target: {
              type: "widget",
              widgetId: "leftEnd",
            },
          };

          const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
          const newState = wrappedReducer(state, action);

          newState.panels.left.widgets.should.eql(["leftEnd"]);
          newState.widgets.leftEnd.activeTabId.should.eql("dt");
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

          const action: NineZoneAction = {
            type: "WIDGET_TAB_DRAG_END",
            id: "dt",
            target: {
              type: "widget",
              widgetId: "leftStart",
            },
          };

          const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
          const newState = wrappedReducer(state, action);

          newState.panels.left.widgets.should.eql(["leftStart"]);
          newState.widgets.leftStart.activeTabId.should.eql("dt");
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

          const action: NineZoneAction = {
            type: "WIDGET_TAB_DRAG_END",
            id: "dt",
            target: {
              type: "widget",
              widgetId: "fw1",
            },
          };

          const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
          const newState = wrappedReducer(state, action);

          newState.widgets.fw1.tabs.should.eql(["fwt1", "dt"]);
          newState.widgets.fw1.activeTabId.should.eql("dt");
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

          const action: NineZoneAction = {
            type: "WIDGET_TAB_DRAG_END",
            id: "dt",
            target: {
              type: "panel",
              newWidgetId: "newId",
              side: "left",
            },
          };

          const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
          const newState = wrappedReducer(state, action);

          newState.panels.left.widgets.should.eql(["newId"]);
          newState.widgets.newId.activeTabId.should.eql("dt");
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

          const action: NineZoneAction = {
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
          };

          const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
          const newState = wrappedReducer(state, action);

          (!!newState.floatingWidgets.byId.newId).should.true;
          newState.widgets.newId.activeTabId.should.eql("dt");
        });
      });
    });

    describe("WIDGET_DRAG", () => {
      it("should move floating widget", () => {
        let state = createNineZoneState({
          size: { height: 1000, width: 1600 },
        });
        state = addTabs(state, ["t1"]);
        state = addFloatingWidget(state, "fw1", ["t1"], {
          bounds: new Rectangle(0, 100, 200, 400),
        });

        const action: NineZoneAction = {
          type: "WIDGET_DRAG",
          dragBy: new Point(10, 20).toProps(),
          floatingWidgetId: "fw1",
        };

        const wrappedReducer = activateDroppedTab(NineZoneStateReducer);
        const newState = wrappedReducer(state, action);
        newState.floatingWidgets.byId.fw1.bounds.should.eql({
          left: 10,
          top: 120,
          right: 210,
          bottom: 420,
        });
      });
    });
  });
});
