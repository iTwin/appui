/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import { ConfigurableUiControlType, DrawingNavigationAidControl, UiFramework, WidgetDef } from "../../appui-react";
import { TestUtils } from "../TestUtils";

describe("DrawingNavigationAidControl", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();

    if (!UiFramework.controls.isRegistered("DrawingNavigationAid"))
      UiFramework.controls.register("DrawingNavigationAid", DrawingNavigationAidControl);
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  it("DrawingNavigationAidControl creates DrawingNavigationAid", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      classId: "DrawingNavigationAid",
      applicationData: {
        imodel: UiFramework.getIModelConnection(),
        viewport: UiFramework.content.getActiveContentControl()?.viewport,
      },
    });

    const reactNode = widgetDef.getWidgetControl(ConfigurableUiControlType.NavigationAid);
    expect(reactNode).to.not.be.undefined;
  });

});
