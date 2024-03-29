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

        expect(newState.floatingWidgets.byId.fw1).toBeTruthy();
        expect(newState.widgets.fw1.activeTabId).toEqual("t1");
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

          expect(newState.widgets.w1.tabs).toEqual(["t1", "fwt1", "t2", "t3"]);
          expect(newState.widgets.w1.activeTabId).toEqual("fwt1");
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

          expect(newState.panels.left.widgets).toEqual(["w1", "newId", "w2"]);
          expect(newState.widgets.newId.activeTabId).toEqual("fwt1");
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

          expect(newState.widgets.w2.tabs).toEqual(["t2", "fwt1"]);
          expect(newState.widgets.w2.activeTabId).toEqual("fwt1");
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

          expect(newState.widgets.fw2.tabs).toEqual(["fwt2", "fwt1"]);
          expect(newState.widgets.fw2.activeTabId).toEqual("fwt1");
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

          expect(newState.panels.left.widgets).toEqual(["leftStart"]);
          expect(newState.widgets.leftStart.activeTabId).toEqual("fwt1");
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

          expect(newState.widgets.leftStart.tabs).toEqual(["t1", "dt", "t2"]);
          expect(newState.widgets.leftStart.activeTabId).toEqual("dt");
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

          expect(newState.widgets.leftEnd.tabs).toEqual(["t1", "dt", "t2"]);
          expect(newState.widgets.leftEnd.activeTabId).toEqual("dt");
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

          expect(newState.panels.left.widgets).toEqual([
            "leftStart",
            "leftEnd",
          ]);
          expect(newState.widgets.leftEnd.activeTabId).toEqual("dt");
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

          expect(newState.panels.left.widgets).toEqual(["leftStart", "nw1"]);
          expect(newState.widgets.nw1.activeTabId).toEqual("dt");
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

          expect(newState.panels.left.widgets).toEqual(["nw1", "leftEnd"]);
          expect(newState.widgets.nw1.activeTabId).toEqual("dt");
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

          expect(newState.panels.left.widgets).toEqual(["leftEnd"]);
          expect(newState.widgets.leftEnd.activeTabId).toEqual("dt");
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

          expect(newState.panels.left.widgets).toEqual(["leftStart"]);
          expect(newState.widgets.leftStart.activeTabId).toEqual("dt");
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

          expect(newState.widgets.fw1.tabs).toEqual(["fwt1", "dt"]);
          expect(newState.widgets.fw1.activeTabId).toEqual("dt");
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

          expect(newState.panels.left.widgets).toEqual(["newId"]);
          expect(newState.widgets.newId.activeTabId).toEqual("dt");
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

          expect(newState.floatingWidgets.byId.newId).toBeTruthy();
          expect(newState.widgets.newId.activeTabId).toEqual("dt");
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
        expect(newState.floatingWidgets.byId.fw1.bounds).toEqual({
          left: 10,
          top: 120,
          right: 210,
          bottom: 420,
        });
      });
    });
  });
});
