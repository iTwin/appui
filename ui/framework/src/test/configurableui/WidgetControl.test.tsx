/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { expect } from "chai";
import TestUtils from "../TestUtils";
import { WidgetState, WidgetDefProps, WidgetDef, WidgetControl, ConfigurableCreateInfo, ConfigurableUiControlType } from "../../index";

describe("WidgetControl", () => {

  class TestWidget extends WidgetControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.reactElement = <div />;
    }
  }

  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  const widgetProps: WidgetDefProps = {
    id: "test-widget",
    classId: TestWidget,
    defaultState: WidgetState.Off,
  };

  it("registerControl & widgetControl using same classId", () => {
    const widgetDef: WidgetDef = new WidgetDef(widgetProps);
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
    const widgetDef: WidgetDef = new WidgetDef(widgetProps);
    const widgetControl = widgetDef.getWidgetControl(ConfigurableUiControlType.Widget);

    expect(widgetControl).to.not.be.undefined;
    if (widgetControl) {
      expect(widgetDef.widgetState).to.eq(WidgetState.Off);
      widgetControl.setWidgetState(WidgetState.Open);
      expect(widgetDef.widgetState).to.eq(WidgetState.Open);
    }
  });

});
