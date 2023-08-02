/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

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
