/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import { expect } from "chai";
import { ConfigurableUiControlType, ConfigurableUiManager, ContentViewManager, DrawingNavigationAidControl, UiFramework, WidgetDef } from "../../appui-react";
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

  it("DrawingNavigationAidControl creates DrawingNavigationAid", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      classId: "DrawingNavigationAid",
      applicationData: {
        imodel: UiFramework.getIModelConnection(),
        viewport: ContentViewManager.getActiveContentControl()?.viewport,
      },
    });

    const reactNode = widgetDef.getWidgetControl(ConfigurableUiControlType.NavigationAid);
    expect(reactNode).to.not.be.undefined;
  });

});
