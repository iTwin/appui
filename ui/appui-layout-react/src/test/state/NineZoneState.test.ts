/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { Rectangle } from "@itwin/core-react";
import {
  addFloatingWidget,
  addPanelWidget,
  addTab,
  convertAllPopupWidgetContainersToFloating,
  createNineZoneState,
  floatWidget,
  isTabDragDropTargetState,
  isWidgetDragDropTargetState,
  popoutWidgetToChildWindow,
} from "../../appui-layout-react";
import { addTabs } from "../Utils";
import {
  convertFloatingWidgetContainerToPopout,
  convertPopoutWidgetContainerToFloating,
} from "../../appui-layout-react/state/internal/NineZoneStateHelpers";

describe("isWidgetDragDropTargetState", () => {
  it("returns `true`", () => {
    isWidgetDragDropTargetState({ type: "tab", tabIndex: 0, widgetId: "w1" })
      .should.true;
  });

  it("returns `false`", () => {
    isWidgetDragDropTargetState({
      type: "floatingWidget",
      newFloatingWidgetId: "",
      size: { height: 0, width: 0 },
    }).should.false;
  });
});

describe("isTabDragDropTargetState", () => {
  it("returns `true`", () => {
    isTabDragDropTargetState({ type: "tab", tabIndex: 0, widgetId: "w1" })
      .should.true;
  });

  it("returns `false`", () => {
    isTabDragDropTargetState({ type: "window" }).should.false;
  });
});

describe("floatWidget", () => {
  it("should not update if already floating", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1"]);
    state = addFloatingWidget(state, "fw1", ["t1"]);
    const newState = floatWidget(state, "t1");
    newState.should.eq(state);
  });

  it("should throw if tab does not exist", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTabs(state, ["t1", "t2"]);
    state = addPanelWidget(state, "right", "rightStart", ["t1"]);
    state = addPanelWidget(state, "right", "rightEnd", ["t2"]);

    (() => floatWidget(state, "t0")).should.throw();
  });

  it("should apply position and size", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTabs(state, ["t1", "t2"]);
    state = addPanelWidget(state, "right", "rightStart", ["t1"], {
      minimized: true,
    });
    state = addPanelWidget(state, "right", "rightEnd", ["t2"]);

    const newState = floatWidget(
      state,
      "t1",
      { x: 55, y: 105 },
      { height: 200, width: 200 }
    );

    newState.floatingWidgets.allIds.should.length(1);
    const floatingWidgetContainerId = newState.floatingWidgets.allIds[0];
    newState.floatingWidgets.byId[floatingWidgetContainerId].bounds.should.eql({
      left: 55,
      top: 105,
      bottom: 105 + 200,
      right: 55 + 200,
    });
    newState.floatingWidgets.byId[floatingWidgetContainerId].home.should.eql({
      side: "right",
      widgetId: "rightStart",
      widgetIndex: 0,
    });

    // restore widget tab "t1" back to original "rightStart" location
    // const dockedState = dockWidgetContainer(newState, "t1");
    // dockedState.panels.right.widgets.should.eql(["rightStart", "rightEnd"]);
    // dockedState.widgets.rightStart.tabs.should.eql(["t1"]);
  });

  it("should apply position and preferred size", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1", {
      preferredFloatingWidgetSize: { height: 222, width: 222 },
    });
    state = addTab(state, "t2");
    state = addPanelWidget(state, "right", "rightStart", ["t1"], {
      minimized: true,
    });
    state = addPanelWidget(state, "right", "rightEnd", ["t2"]);

    const newState = floatWidget(state, "t1", { x: 55, y: 105 });
    newState.floatingWidgets.allIds.should.length(1);
    const floatingWidgetContainerId = Object.keys(
      newState.floatingWidgets.byId
    )[0];
    newState.floatingWidgets.byId[floatingWidgetContainerId].bounds.should.eql({
      left: 55,
      top: 105,
      bottom: 105 + 222,
      right: 55 + 222,
    });
    newState.floatingWidgets.byId[floatingWidgetContainerId].home.should.eql({
      side: "right",
      widgetId: "rightStart",
      widgetIndex: 0,
    });

    // restore widget tab "t1" back to original "rightStart" location
    // const dockedState = dockWidgetContainer(newState, "t1");
    // dockedState.widgets.rightEnd.tabs.should.eql(["t2"]);
  });

  it("should apply default position {x:50, y:100} and size {height:400, width:400}", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTabs(state, ["t1", "t2"]);
    state = addPanelWidget(state, "right", "rightStart", ["t1"], {
      minimized: true,
    });
    state = addPanelWidget(state, "right", "rightEnd", ["t2"]);

    const newState = floatWidget(state, "t1");

    Object.entries(newState.floatingWidgets.byId).should.length(1);
    const floatingWidgetContainerId = Object.keys(
      newState.floatingWidgets.byId
    )[0];
    newState.floatingWidgets.byId[floatingWidgetContainerId].bounds.should.eql({
      left: 50,
      top: 100,
      bottom: 100 + 400,
      right: 50 + 400,
    });
    newState.floatingWidgets.byId[floatingWidgetContainerId].home.should.eql({
      side: "right",
      widgetId: "rightStart",
      widgetIndex: 0,
    });

    // restore widget tab "t1" back to original "rightStart" location
    // const dockedState = dockWidgetContainer(newState, "t1");
    // dockedState.widgets.rightEnd.tabs.should.eql(["t2"]);
  });

  it("should apply position and default size of (400,400)", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTabs(state, ["t1", "t2"]);
    state = addPanelWidget(state, "right", "rightStart", ["t1"], {
      minimized: true,
    });
    state = addPanelWidget(state, "right", "rightEnd", ["t2"]);

    const newState = floatWidget(state, "t1", { x: 55, y: 105 });
    Object.entries(newState.floatingWidgets.byId).should.length(1);
    const floatingWidgetContainerId = Object.keys(
      newState.floatingWidgets.byId
    )[0];
    newState.floatingWidgets.byId[floatingWidgetContainerId].bounds.should.eql({
      left: 55,
      top: 105,
      bottom: 105 + 400,
      right: 55 + 400,
    });
    newState.floatingWidgets.byId[floatingWidgetContainerId].home.should.eql({
      side: "right",
      widgetId: "rightStart",
      widgetIndex: 0,
    });

    // restore widget tab "t1" back to original "rightStart" location
    // const dockedState = dockWidgetContainer(newState, "t1");
    // dockedState.widgets.rightEnd.tabs.should.eql(["t2"]);
  });

  it("should properly handle multiple widget tabs", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTabs(state, ["t1", "t2", "ta", "tb"]);
    state = addPanelWidget(state, "right", "rightStart", ["t1", "ta", "tb"], {
      minimized: true,
    });
    state = addPanelWidget(state, "right", "rightEnd", ["t2"]);

    const newState = floatWidget(state, "t1", { x: 55, y: 105 });
    newState.floatingWidgets.allIds.should.length(1);
    const floatingWidgetContainerId = newState.floatingWidgets.allIds[0];
    newState.floatingWidgets.byId[floatingWidgetContainerId].bounds.should.eql({
      left: 55,
      top: 105,
      bottom: 105 + 400,
      right: 55 + 400,
    });
    newState.floatingWidgets.byId[floatingWidgetContainerId].home.should.eql({
      side: "right",
      widgetId: "rightStart",
      widgetIndex: 0,
    });

    // Restore "t1" back to original "rightStart" location
    // const dockedState = dockWidgetContainer(newState, "t1");
    // dockedState.widgets.rightStart.tabs.should.contain("t1");
    // dockedState.floatingWidgets.allIds.should.length(0);
  });

  it("should create popout entries with default size and location", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTabs(state, ["t1", "ta", "tb"]);
    state = addPanelWidget(state, "right", "rightStart", ["t1", "ta", "tb"], {
      minimized: true,
    });
    const newState = popoutWidgetToChildWindow(
      state,
      "t1",
      Rectangle.createFromSize({ height: 800, width: 600 })
    );
    expect(Object.entries(newState.popoutWidgets.byId).length).to.be.eql(1);
    const popoutWidgetContainerId = Object.keys(newState.popoutWidgets.byId)[0];

    newState.popoutWidgets.byId[popoutWidgetContainerId].bounds.should.eql({
      left: 0,
      top: 0,
      bottom: 800,
      right: 600,
    });
  });

  it("should create popout entries with specified size and location", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTabs(state, ["t1", "ta", "tb"]);
    state = addPanelWidget(state, "right", "rightStart", ["t1", "ta", "tb"], {
      minimized: true,
    });
    const newState = popoutWidgetToChildWindow(
      state,
      "t1",
      Rectangle.createFromSize({ width: 100, height: 200 }).offset({
        x: 5,
        y: 10,
      })
    );
    expect(Object.entries(newState.popoutWidgets.byId).length).to.be.eql(1);
    const popoutWidgetContainerId = Object.keys(newState.popoutWidgets.byId)[0];

    newState.popoutWidgets.byId[popoutWidgetContainerId].bounds.should.eql({
      left: 5,
      top: 10,
      bottom: 10 + 200,
      right: 5 + 100,
    });
  });

  it("should create popout entries with specified size and location (given initial state with no popout data)", () => {
    let state = createNineZoneState({
      size: {
        height: 1000,
        width: 1600,
      },
    });
    state = addTabs(state, ["t1", "ta", "tb"]);
    state = addPanelWidget(state, "right", "rightStart", ["t1", "ta", "tb"], {
      minimized: true,
    });

    const newState = popoutWidgetToChildWindow(
      state,
      "t1",
      Rectangle.createFromSize({ width: 100, height: 200 }).offset({
        x: 5,
        y: 10,
      })
    );
    expect(Object.entries(newState.popoutWidgets.byId).length).to.be.eql(1);
    const popoutWidgetContainerId = Object.keys(newState.popoutWidgets.byId)[0];

    newState.popoutWidgets.byId[popoutWidgetContainerId].bounds.should.eql({
      left: 5,
      top: 10,
      bottom: 10 + 200,
      right: 5 + 100,
    });
  });

  it("should create multiple popout entries and then remove the last one (via function)", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTabs(state, ["t1", "ta", "tb"]);
    state = addPanelWidget(state, "right", "rightStart", ["t1", "ta", "tb"], {
      minimized: true,
    });

    let newState = popoutWidgetToChildWindow(
      state,
      "t1",
      Rectangle.createFromSize({ height: 800, width: 600 })
    );
    expect(Object.entries(newState.popoutWidgets.byId).length).to.be.eql(1);
    // const popoutWidgetContainerId1 = Object.keys(
    //   newState.popoutWidgets.byId
    // )[0];

    newState = popoutWidgetToChildWindow(
      newState,
      "ta",
      Rectangle.createFromSize({ height: 800, width: 600 })
    );
    expect(Object.entries(newState.popoutWidgets.byId).length).to.be.eql(2);
    // const popoutWidgetContainerId2 = Object.keys(
    //   newState.popoutWidgets.byId
    // )[1];
    // let latestState = dockWidgetContainer(
    //   newState,
    //   popoutWidgetContainerId2,
    //   true
    // );
    // expect(Object.entries(latestState.popoutWidgets.byId).length).to.be.eql(1);
    // expect(Object.keys(latestState.popoutWidgets.byId)[0]).to.be.eql(
    //   popoutWidgetContainerId1
    // );

    // latestState = dockWidgetContainer(latestState, "t1", false);
    // expect(Object.entries(latestState.popoutWidgets.byId).length).to.be.eql(0);
  });

  it("should create multiple popout entries and then convert them to floating", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTabs(state, ["t1", "ta", "tb"]);
    state = addPanelWidget(state, "right", "rightStart", ["t1", "ta", "tb"], {
      minimized: true,
    });
    let newState = popoutWidgetToChildWindow(
      state,
      "t1",
      Rectangle.createFromSize({ height: 800, width: 600 })
    );
    expect(Object.entries(newState.popoutWidgets.byId).length).to.be.eql(1);
    newState = popoutWidgetToChildWindow(
      newState,
      "ta",
      Rectangle.createFromSize({ height: 800, width: 600 })
    );
    expect(Object.entries(newState.popoutWidgets.byId).length).to.be.eql(2);
    newState = convertAllPopupWidgetContainersToFloating(newState);
    expect(Object.entries(newState.popoutWidgets.byId).length).to.be.eql(0);
  });

  it("should create multiple popout entries and then convert one of them to floating", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTabs(state, ["t1", "ta", "tb"]);
    state = addPanelWidget(state, "right", "rightStart", ["t1", "ta", "tb"], {
      minimized: true,
    });
    let newState = popoutWidgetToChildWindow(
      state,
      "t1",
      Rectangle.createFromSize({ height: 800, width: 600 })
    );
    expect(Object.entries(newState.popoutWidgets.byId).length).to.be.eql(1);
    const popoutWidgetContainerId1 = Object.keys(
      newState.popoutWidgets.byId
    )[0];
    newState = popoutWidgetToChildWindow(
      newState,
      "ta",
      Rectangle.createFromSize({ height: 800, width: 600 })
    );
    expect(Object.entries(newState.popoutWidgets.byId).length).to.be.eql(2);
    newState = convertPopoutWidgetContainerToFloating(
      newState,
      popoutWidgetContainerId1
    );
    expect(Object.entries(newState.popoutWidgets.byId).length).to.be.eql(1);

    newState = convertFloatingWidgetContainerToPopout(
      newState,
      popoutWidgetContainerId1
    );
    expect(Object.entries(newState.popoutWidgets.byId).length).to.be.eql(2);
  });
});

// describe("dockWidgetContainer", () => {
//   it("should throw if tab does not exist", () => {
//     let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
//     state = addTabs(state, ["t1", "t2"]);
//     state = addPanelWidget(state, "right", "rightStart", ["t1"]);
//     state = addPanelWidget(state, "right", "rightEnd", ["t2"]);

//     (() => dockWidgetContainer(state, "t0")).should.throw();
//   });

//   it("should send back to specified `left` panel widget via function call", () => {
//     let state = createNineZoneState();
//     state = addTabs(state, ["t1", "fwt1", "fwt2"]);
//     state = addPanelWidget(state, "left", "w1", ["t1"]);
//     state = addFloatingWidget(state, "fw1", ["fwt1", "fwt2"], {
//       home: {
//         side: "left",
//         widgetId: "w1",
//         widgetIndex: 0,
//       },
//     });

//     const newState = dockWidgetContainer(state, "fw1", true);
//     newState.widgets.w1.tabs.should.eql(["t1", "fwt1", "fwt2"]);
//     should().not.exist(newState.widgets.fw1);
//     should().not.exist(newState.floatingWidgets.byId.fw1);
//   });

//   it("should send back to specified `left` panel widget via tabId and function call", () => {
//     let state = createNineZoneState();
//     state = addTabs(state, ["t1", "fwt1", "fwt2"]);
//     state = addPanelWidget(state, "left", "w1", ["t1"]);
//     state = addFloatingWidget(state, "fw1", ["fwt1", "fwt2"], {
//       home: {
//         side: "left",
//         widgetId: "w1",
//         widgetIndex: 0,
//       },
//     });

//     const newState = dockWidgetContainer(state, "fwt1", false);
//     newState.widgets.w1.tabs.should.eql(["t1", "fwt1", "fwt2"]);
//     should().not.exist(newState.widgets.fw1);
//     should().not.exist(newState.floatingWidgets.byId.fw1);
//   });
// });
