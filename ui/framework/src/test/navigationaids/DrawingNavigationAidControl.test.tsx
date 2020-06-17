/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import { AnyWidgetProps, ConfigurableUiManager, DrawingNavigationAidControl, NavigationWidgetDef } from "../../ui-framework";
import { TestUtils } from "../TestUtils";

describe("DrawingNavigationAidControl", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();

    if (!ConfigurableUiManager.isControlRegistered("DrawingNavigationAid"))
      ConfigurableUiManager.registerControl("DrawingNavigationAid", DrawingNavigationAidControl);
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  const widgetProps: AnyWidgetProps = {
    classId: "NavigationWidget",
    isFreeform: true,
    navigationAidId: "DrawingNavigationAid",
  };

  it("DrawingNavigationAidControl creates DrawingNavigationAid", () => {

    const widgetDef = new NavigationWidgetDef(widgetProps); // tslint:disable-line:deprecation
    expect(widgetDef).to.be.instanceof(NavigationWidgetDef); // tslint:disable-line:deprecation

    const navigationWidgetDef = widgetDef as NavigationWidgetDef; // tslint:disable-line:deprecation

    const reactNode = navigationWidgetDef.reactNode;
    expect(reactNode).to.not.be.undefined;

    const cornerNode = navigationWidgetDef.renderCornerItem();
    expect(cornerNode).to.not.be.undefined;
  });

});
