/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import { BadgeType } from "@itwin/appui-abstract";
import { SvgList } from "@itwin/itwinui-icons-react";
import { UiFramework, WidgetChangedEventArgs, WidgetDef, WidgetState } from "../../appui-react";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager";
import TestUtils from "../TestUtils";

describe("WidgetDef", () => {
  before(async () => {
    await TestUtils.initializeUiFramework();
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  it("optional properties", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      defaultState: WidgetState.Open,
      priority: 100,
      icon: "icon-home",
      label: "label",
      tooltip: "tooltip",
      canFloat: {
        isResizable: false,
      },
      badge: BadgeType.TechnicalPreview,
      content: <div />,
    });

    expect(widgetDef.isVisible).to.eq(true);
    expect(widgetDef.isActive).to.eq(true);
    expect(widgetDef.isFloating).to.eq(false);
    expect(widgetDef.priority).to.eq(100);
    expect(widgetDef.isFloatingStateSupported).to.eq(true);
    expect(widgetDef.isFloatingStateWindowResizable).to.eq(false);
    expect(widgetDef.isToolSettings).to.eq(false);
    expect(widgetDef.isStatusBar).to.eq(false);

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
      icon: <SvgList />,
      label: "label",
      tooltip: "tooltip",
      canFloat: {
        isResizable: true,
      },
    });
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.true;
  });

  it("should properly handle iconSpec set/get", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      defaultState: WidgetState.Open,
      priority: 200,
      icon: "icon-lightbulb",
      label: "label",
      tooltip: "tooltip",
      canFloat: {
        isResizable: true,
      },
    });
    expect(widgetDef.iconSpec).to.eq("icon-lightbulb");
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.false;

    widgetDef.iconSpec = <SvgList />;
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.true;

    widgetDef.iconSpec = "icon-home";
    expect(widgetDef.iconSpec).to.eq("icon-home");
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.false;

  });

  it("labelKey and tooltipKey should return translated string", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      labelKey: "App:label",
      tooltipKey: "App:tooltip",
    });

    expect(widgetDef.label).to.eq("label");
    expect(widgetDef.tooltip).to.eq("tooltip");
  });

  it("reactNode supports set and get", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
    });

    widgetDef.reactNode = <div />;
    expect(widgetDef.reactNode).to.not.be.undefined;
  });

  describe("setWidgetState", () => {
    it("should update widget state", () => {
      const widgetDef = WidgetDef.create({
        id: "w1",
        badge: BadgeType.None,
      });
      widgetDef.setWidgetState(WidgetState.Open);

      expect(widgetDef.stateChanged).to.eq(true);
      expect(widgetDef.isVisible).to.eq(true);
    });

    it("should emit UiFramework.frontstages.onWidgetStateChangedEvent", () => {
      const widgetDef = WidgetDef.create({
        id: "t1",
        defaultState: WidgetState.Closed,
      });
      const spy = sinon.spy();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

      widgetDef.setWidgetState(WidgetState.Hidden);

      sinon.assert.calledOnce(spy);
    });
  });

  describe("show", () => {
    it("should emit onWidgetShowEvent", () => {
      const spy = sinon.spy(InternalFrontstageManager.onWidgetShowEvent, "emit");
      const widgetDef = new WidgetDef();
      widgetDef.show();
      spy.calledOnceWithExactly(sinon.match({
        widgetDef,
      })).should.true;
    });
  });

  describe("expand", () => {
    it("should emit onWidgetExpandEvent", () => {
      const spy = sinon.spy(InternalFrontstageManager.onWidgetExpandEvent, "emit");
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
      InternalFrontstageManager.onWidgetLabelChangedEvent.addListener(spy);
      const sut = new WidgetDef();
      sut.setLabel("test");

      spy.calledOnceWithExactly(sinon.match({ widgetDef: sut })).should.true;
    });

    it("should not emit onWidgetLabelChangedEvent for same label", () => {
      const spy = sinon.stub<(args: WidgetChangedEventArgs) => void>();
      const sut = new WidgetDef();
      sut.setLabel("test");

      InternalFrontstageManager.onWidgetLabelChangedEvent.addListener(spy);
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
