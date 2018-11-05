/*---------------------------------------------------------------------------------------------
* Copyright (c) 2018 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { expect } from "chai";
import TestUtils from "../TestUtils";
import { WidgetState, WidgetDefProps, WidgetDef, ConfigurableUiManager, WidgetControl, ConfigurableCreateInfo, ConfigurableUiControlType } from "../../src/index";

describe("WidgetDef", () => {

  class TestWidget extends WidgetControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.reactElement = <div />;
    }
  }

  before(async () => {
    await TestUtils.initializeUiFramework();
    ConfigurableUiManager.registerControl("WidgetDefTest", TestWidget);
  });

  it("optional properties", () => {
    const widgetProps: WidgetDefProps = {
      defaultState: WidgetState.Open,
      priority: 100,
      isFreeform: true,
      iconClass: "icon-home",
      labelKey: "SampleApp:Test.my-label",
      tooltipKey: "SampleApp:Test.my-tooltip",
      isToolSettings: true,
      isStatusBar: true,
      featureId: "FeatureId",
      isFloatingStateSupported: true,
      isFloatingStateWindowResizable: false,
      applicationData: "AppData",
      reactElement: <div />,
    };
    const widgetDef: WidgetDef = new WidgetDef(widgetProps);

    expect(widgetDef.widgetState).to.eq(WidgetState.Open);
    expect(widgetDef.priority).to.eq(100);
    expect(widgetDef.featureId).to.eq("FeatureId");
    expect(widgetDef.isFreeform).to.eq(true);
    expect(widgetDef.isFloatingStateSupported).to.eq(true);
    expect(widgetDef.isFloatingStateWindowResizable).to.eq(false);
    expect(widgetDef.isToolSettings).to.eq(true);
    expect(widgetDef.isStatusBar).to.eq(true);
    expect(widgetDef.applicationData).to.eq("AppData");

    expect(widgetDef.label).to.eq("Test.my-label");
    expect(widgetDef.tooltip).to.eq("Test.my-tooltip");
    expect(widgetDef.iconInfo.iconClass).to.eq("icon-home");
  });

  it("registerControl & widgetControl using same classId", () => {
    const widgetProps: WidgetDefProps = {
      classId: "WidgetDefTest",
    };
    const widgetDef: WidgetDef = new WidgetDef(widgetProps);

    expect(widgetDef.getWidgetControl(ConfigurableUiControlType.Widget)).to.not.be.undefined;
    expect(widgetDef.reactElement).to.not.be.undefined;
  });

  it("widgetControl using constructor classId", () => {
    const widgetProps: WidgetDefProps = {
      classId: TestWidget,
    };
    const widgetDef: WidgetDef = new WidgetDef(widgetProps);
    const widgetControl = widgetDef.getWidgetControl(ConfigurableUiControlType.Widget);

    expect(widgetControl).to.not.be.undefined;
    if (widgetControl)
      expect(widgetControl.classId).to.eq("TestWidget");
    expect(widgetDef.reactElement).to.not.be.undefined;
  });

  it("setWidgetState", () => {
    const widgetProps: WidgetDefProps = {
      classId: "WidgetDefTest",
    };
    const widgetDef: WidgetDef = new WidgetDef(widgetProps);
    widgetDef.setWidgetState(WidgetState.Open);

    expect(widgetDef.widgetState).to.eq(WidgetState.Open);
    expect(widgetDef.canOpen()).to.be.true;
  });

  it("getWidgetControl throws an Error when type is incorrect", () => {
    const widgetProps: WidgetDefProps = {
      classId: "WidgetDefTest",
    };
    const widgetDef: WidgetDef = new WidgetDef(widgetProps);

    expect(() => widgetDef.getWidgetControl(ConfigurableUiControlType.StatusBarWidget)).to.throw(Error);
  });

});
