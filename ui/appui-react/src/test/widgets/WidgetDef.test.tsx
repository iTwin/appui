/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { BadgeType, WidgetState } from "@itwin/appui-abstract";
import type {
  ConfigurableCreateInfo, WidgetChangedEventArgs} from "../../appui-react";
import { ConfigurableUiControlType, ConfigurableUiManager, FrontstageManager, WidgetControl, WidgetDef,
} from "../../appui-react";
import TestUtils from "../TestUtils";
import { SvgList } from "@itwin/itwinui-icons-react";

describe("WidgetDef", () => {
  class TestWidget extends WidgetControl {
    constructor(info: ConfigurableCreateInfo, options: any) {
      super(info, options);

      this.reactNode = <div />;
    }
  }

  before(async () => {
    await TestUtils.initializeUiFramework();
    ConfigurableUiManager.registerControl("WidgetDefTest", TestWidget);
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  it("optional properties", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      defaultState: WidgetState.Open,
      priority: 100,
      iconSpec: "icon-home",
      label: "label",
      tooltip: "tooltip",
      isFloatingStateSupported: true,
      isFloatingStateWindowResizable: false,
      applicationData: "AppData",
      element: <div />,
      badgeType: BadgeType.TechnicalPreview,
    });

    expect(widgetDef.isVisible).to.eq(true);
    expect(widgetDef.isActive).to.eq(true);
    expect(widgetDef.isFloating).to.eq(false);
    expect(widgetDef.priority).to.eq(100);
    expect(widgetDef.isFloatingStateSupported).to.eq(true);
    expect(widgetDef.isFloatingStateWindowResizable).to.eq(false);
    expect(widgetDef.isToolSettings).to.eq(false);
    expect(widgetDef.isStatusBar).to.eq(false);
    expect(widgetDef.applicationData).to.eq("AppData");

    expect(widgetDef.label).to.eq("label");
    expect(widgetDef.tooltip).to.eq("tooltip");
    expect(widgetDef.iconSpec).to.eq("icon-home");
    expect(widgetDef.badgeType).to.eq(BadgeType.TechnicalPreview);

    widgetDef.iconSpec = "icon-lightbulb";
    expect(widgetDef.iconSpec).to.eq("icon-lightbulb");
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.false;
  });

  it("should work with react icon", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      defaultState: WidgetState.Open,
      priority: 200,
      iconSpec: <SvgList />,
      label: "label",
      tooltip: "tooltip",
      isFloatingStateSupported: true,
      isFloatingStateWindowResizable: true,
    });
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.true;
  });

  it("should properly handle iconSpec set/get", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      defaultState: WidgetState.Open,
      priority: 200,
      iconSpec: "icon-lightbulb",
      internalData: new Map<string, any>(),
      label: "label",
      tooltip: "tooltip",
      isFloatingStateSupported: true,
      isFloatingStateWindowResizable: true,
    });
    expect(widgetDef.iconSpec).to.eq("icon-lightbulb");
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.false;

    widgetDef.iconSpec = <SvgList />;
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.true;

    widgetDef.iconSpec = "icon-home";
    expect(widgetDef.iconSpec).to.eq("icon-home");
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.false;

  });
  it("registerControl & widgetControl using same classId", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      classId: "WidgetDefTest",
    });

    expect(widgetDef.getWidgetControl(ConfigurableUiControlType.Widget)).to.not.be.undefined;
    expect(widgetDef.reactNode).to.not.be.undefined;
  });

  it("labelKey and tooltipKey should return translated string", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      classId: "WidgetDefTest",
      labelKey: "App:label",
      tooltipKey: "App:tooltip",
    });

    expect(widgetDef.label).to.eq("label");
    expect(widgetDef.tooltip).to.eq("tooltip");
  });

  it("reactNode supports set and get", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      classId: "WidgetDefTest",
    });

    widgetDef.reactNode = <div />;
    expect(widgetDef.reactNode).to.not.be.undefined;
  });

  it("widgetControl using constructor classId", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      classId: TestWidget,
    });
    const widgetControl = widgetDef.getWidgetControl(ConfigurableUiControlType.Widget);

    expect(widgetControl).to.not.be.undefined;
    if (widgetControl)
      expect(widgetControl.classId).to.eq("TestWidget");
    expect(widgetDef.reactNode).to.not.be.undefined;
  });

  it("setWidgetState", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      classId: "WidgetDefTest",
      badgeType: BadgeType.None,
    });
    widgetDef.setWidgetState(WidgetState.Open);

    expect(widgetDef.stateChanged).to.eq(true);
    expect(widgetDef.isVisible).to.eq(true);
  });

  it("getWidgetControl throws an Error when type is incorrect", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      classId: "WidgetDefTest",
    });

    expect(() => widgetDef.getWidgetControl(ConfigurableUiControlType.StatusBarWidget)).to.throw(Error);
  });

  describe("show", () => {
    it("should emit onWidgetShowEvent", () => {
      const spy = sinon.spy(FrontstageManager.onWidgetShowEvent, "emit");
      const widgetDef = new WidgetDef();
      widgetDef.show();
      spy.calledOnceWithExactly(sinon.match({
        widgetDef,
      })).should.true;
    });
  });

  describe("expand", () => {
    it("should emit onWidgetExpandEvent", () => {
      const spy = sinon.spy(FrontstageManager.onWidgetExpandEvent, "emit");
      const widgetDef = new WidgetDef();
      widgetDef.expand();
      spy.calledOnceWithExactly(sinon.match({
        widgetDef,
      })).should.true;
    });
  });

  describe("label", () => {
    it("should set label", () => {
      const sut = new WidgetDef();
      sut.setLabel("test");

      sut.label.should.eq("test");
    });

    it("should emit onWidgetLabelChangedEvent", () => {
      const spy = sinon.stub<(args: WidgetChangedEventArgs) => void>();
      FrontstageManager.onWidgetLabelChangedEvent.addListener(spy);
      const sut = new WidgetDef();
      sut.setLabel("test");

      spy.calledOnceWithExactly(sinon.match({ widgetDef: sut })).should.true;
    });

    it("should not emit onWidgetLabelChangedEvent for same label", () => {
      const spy = sinon.stub<(args: WidgetChangedEventArgs) => void>();
      const sut = new WidgetDef();
      sut.setLabel("test");

      FrontstageManager.onWidgetLabelChangedEvent.addListener(spy);
      sut.setLabel("test");

      spy.notCalled.should.true;
    });
  });

  describe("tabLocation", () => {
    it("should set tabLocation", () => {
      const sut = new WidgetDef();
      sut.tabLocation = {
        side: "bottom",
        tabIndex: 8,
        widgetId: "abc",
        widgetIndex: 5,
      };
      sut.tabLocation.should.eql({
        side: "bottom",
        tabIndex: 8,
        widgetId: "abc",
        widgetIndex: 5,
      });
    });
  });
});
