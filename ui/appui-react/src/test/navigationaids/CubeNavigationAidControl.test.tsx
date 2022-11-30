/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import { ConfigurableUiControlType, ConfigurableUiManager, ContentViewManager, CubeNavigationAidControl, UiFramework, WidgetDef } from "../../appui-react";
import TestUtils from "../TestUtils";

describe("CubeNavigationAidControl", () => {

  before(async () => {
    await TestUtils.initializeUiFramework();

    if (!ConfigurableUiManager.isControlRegistered("CubeNavigationAid"))
      ConfigurableUiManager.registerControl("CubeNavigationAid", CubeNavigationAidControl);
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  it("CubeNavigationAidControl creates CubeNavigationAid", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      classId: "CubeNavigationAid",
      applicationData: {
        imodel: UiFramework.getIModelConnection(),
        viewport: ContentViewManager.getActiveContentControl()?.viewport,
      },
    });

    const reactNode = widgetDef.getWidgetControl(ConfigurableUiControlType.NavigationAid);
    expect(reactNode).to.not.be.undefined;
  });

});
