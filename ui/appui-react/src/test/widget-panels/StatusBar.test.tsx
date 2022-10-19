/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { shallow } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { FrontstageDef, FrontstageManager, WidgetDef, WidgetPanelsStatusBar } from "../../appui-react";

describe("WidgetPanelsStatusBar", () => {
  it("should render", () => {
    const frontstageDef = new FrontstageDef();
    const widget = new WidgetDef({});
    sinon.stub(frontstageDef, "statusBar").get(() => widget);
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => frontstageDef);
    const sut = shallow(<WidgetPanelsStatusBar />);
    sut.should.matchSnapshot();
  });

  it("should not render widget control", () => {
    const frontstageDef = new FrontstageDef();
    const widget = new WidgetDef({});
    sinon.stub(frontstageDef, "statusBar").get(() => widget);
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => frontstageDef);
    const sut = shallow(<WidgetPanelsStatusBar />);
    sut.should.matchSnapshot();
  });

  it("should not render", () => {
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => undefined);
    const sut = shallow(<WidgetPanelsStatusBar />);
    sut.should.matchSnapshot();
  });
});
