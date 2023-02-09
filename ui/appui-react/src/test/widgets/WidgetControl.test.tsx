/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as sinon from "sinon";
import { WidgetState } from "@itwin/appui-abstract";
import { ConfigurableUiControlType, WidgetConfig, WidgetDef } from "../../appui-react";
import TestUtils from "../TestUtils";
import { assert } from "@itwin/core-bentley";

describe("WidgetControl", () => {
  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  const widgetConfig: WidgetConfig = {
    id: "test-widget",
    defaultState: WidgetState.Hidden,
  };

  it("registerControl & widgetControl using same classId", () => {
    const widgetDef = WidgetDef.create(widgetConfig);
    const widgetControl = widgetDef.getWidgetControl(ConfigurableUiControlType.Widget);

    expect(widgetControl).to.not.be.undefined;
    if (widgetControl) {
      expect(widgetControl.widgetDef).to.eq(widgetDef);

      const testId = "test-widget";
      expect(widgetControl.uniqueId).to.eq(testId);
      expect(widgetControl.name).to.eq(testId);
      expect(widgetControl.controlId).to.eq(testId);
    }
  });

  it("setWidgetState", () => {
    const widgetDef = WidgetDef.create(widgetConfig);
    const spy = sinon.spy(widgetDef, "setWidgetState");
    const widgetControl = widgetDef.getWidgetControl(ConfigurableUiControlType.Widget);
    expect(widgetControl).to.not.be.undefined;
    assert(!!widgetControl);

    widgetControl.setWidgetState(WidgetState.Open);
    sinon.assert.calledOnceWithExactly(spy, WidgetState.Open);
  });
});
