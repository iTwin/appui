/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { shallow } from "enzyme";
import * as React from "react";
import * as sinon from "sinon";
import { FrontstageDef, FrontstageManager, WidgetDef, WidgetPanelsToolbars } from "../../appui-react";

describe("WidgetPanelsToolbars", () => {
  it("should not render", () => {
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => undefined);
    const sut = shallow(<WidgetPanelsToolbars />);
    sut.should.matchSnapshot();
  });

  it("should render toolbars", () => {
    const frontstageDef = new FrontstageDef();
    const contentManipulationWidget = new WidgetDef();
    contentManipulationWidget.initializeFromConfig({
      id: "contentManipulationWidget",
      element: <>tools</>,
    });
    const viewNavigationWidget = new WidgetDef();
    viewNavigationWidget.initializeFromConfig({
      id: "viewNavigationWidget",
      element: <>navigation</>,
    });
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => frontstageDef);
    sinon.stub(frontstageDef, "contentManipulation").get(() => contentManipulationWidget);
    sinon.stub(frontstageDef, "viewNavigation").get(() => viewNavigationWidget);
    const sut = shallow(<WidgetPanelsToolbars />);
    sut.should.matchSnapshot();
  });
});
