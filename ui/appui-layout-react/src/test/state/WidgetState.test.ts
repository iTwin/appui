/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import {
  addFloatingWidget,
  addPopoutWidget,
  addTab,
  createNineZoneState,
} from "../../appui-layout-react";
import { addTabs, handleMetaData } from "../Utils";

describe("addFloatingWidget", () => {
  it("should throw if floating widget is already added", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2"]);
    state = addFloatingWidget(state, "fw1", ["t1"]);
    (() => addFloatingWidget(state, "fw1", ["t2"])).should.throw();
  });

  it("should set `resizable`", () => {
    let state = createNineZoneState();
    state = addTab(state, "t1", { isFloatingWidgetResizable: true });
    state = addFloatingWidget(state, "fw1", ["t1"]);
    expect(state.floatingWidgets.byId.fw1.resizable).to.true;
  });
});

describe("addPopoutWidget", () => {
  it("should throw with multiple tabs", () => {
    let state = createNineZoneState();
    state = addTabs(state, ["t1", "t2"]);
    handleMetaData(() =>
      addPopoutWidget(state, "fw1", ["t1", "t2"])
    ).should.throw();
  });
});
