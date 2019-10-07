/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { mount, shallow } from "enzyme";
import * as sinon from "sinon";
import { expect } from "chai";

import TestUtils from "../TestUtils";
import {
  Frontstage,
  FrontstageManager,
  WidgetState,
  FrontstageComposer,
  CoreTools,
} from "../../ui-framework";
import { TestFrontstage, TestWidgetElement } from "./FrontstageTestUtils";

describe("Frontstage", () => {
  let widgetElementComponentDidMountSpy: sinon.SinonSpy | undefined;
  const sandbox = sinon.createSandbox();

  before(async () => {
    await TestUtils.initializeUiFramework();
    FrontstageManager.clearFrontstageDefs();
    sandbox.stub(FrontstageManager, "activeToolSettingsNode").get(() => undefined);
  });

  after(() => {
    sandbox.restore();
  });

  beforeEach(() => {
    widgetElementComponentDidMountSpy && widgetElementComponentDidMountSpy.restore();
  });

  it("should render", () => {
    mount(<Frontstage id="test1" defaultTool={CoreTools.selectElementCommand} defaultLayout="defaultLayout1" contentGroup="contentGroup1" />);
  });

  it("renders correctly", () => {
    shallow(<Frontstage id="test1" defaultTool={CoreTools.selectElementCommand} defaultLayout="defaultLayout1" contentGroup="contentGroup1" />).should.matchSnapshot();
  });

  it("FrontstageProvider supplies valid Frontstage", async () => {
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    await FrontstageManager.setActiveFrontstageDef(frontstageProvider.frontstageDef);
    const widgetDef = FrontstageManager.findWidget("widget1");
    expect(widgetDef).to.not.be.undefined;

    if (widgetDef) {
      widgetDef.setWidgetState(WidgetState.Open);
      expect(widgetDef.isActive).to.eq(true);
      expect(widgetDef.isVisible).to.eq(true);

      FrontstageManager.setWidgetState("widget1", WidgetState.Hidden);
      expect(widgetDef.isVisible).to.eq(false);
    }
  });

  it("FrontstageProvider supplies Frontstage to FrontstageComposer", async () => {
    const wrapper = mount(<FrontstageComposer />);

    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    await FrontstageManager.setActiveFrontstageDef(frontstageProvider.frontstageDef);

    const widgetDef2 = FrontstageManager.findWidget("widget2");
    expect(widgetDef2).to.not.be.undefined;
    if (widgetDef2) {
      expect(widgetDef2.isVisible).to.eq(false);
      expect(widgetDef2.isActive).to.eq(false);

      widgetDef2.setWidgetState(WidgetState.Open);
      wrapper.update();
      expect(widgetDef2.isVisible).to.eq(true);
      expect(widgetDef2.isActive).to.eq(true);

      FrontstageManager.setWidgetState("widget2", WidgetState.Hidden);
      wrapper.update();
      expect(widgetDef2.isVisible).to.eq(false);
    }

    wrapper.unmount();
  });

  it("should change DOM parent of widget content", async () => {
    const wrapper = mount<FrontstageComposer>(<FrontstageComposer />);
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    await FrontstageManager.setActiveFrontstageDef(frontstageProvider.frontstageDef);
    wrapper.update();

    const widget = FrontstageManager.findWidget("widget3");
    const saveTransientStateSpy = sinon.spy(widget!.widgetControl!, "saveTransientState");
    const restoreTransientStateSpy = sinon.spy(widget!.widgetControl!, "restoreTransientState");

    let zones = FrontstageManager.NineZoneManager.getZonesManager().mergeZone(4, 7, wrapper.state("nineZone").zones);
    zones = FrontstageManager.NineZoneManager.getZonesManager().setWidgetTabIndex(4, 0, zones);
    zones = FrontstageManager.NineZoneManager.getZonesManager().setWidgetTabIndex(7, -1, zones);
    wrapper.setState({
      nineZone: {
        ...wrapper.state().nineZone,
        zones,
      },
    });
    wrapper.update();

    expect(saveTransientStateSpy.calledOnce).true;
    expect(restoreTransientStateSpy.calledOnce).true;

    wrapper.unmount();
  });

  it("should remount widget if widget control is not provided", async () => {
    const wrapper = mount<FrontstageComposer>(<FrontstageComposer />);
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    await FrontstageManager.setActiveFrontstageDef(frontstageProvider.frontstageDef);
    wrapper.update();

    const contentRenderer = wrapper.find("WidgetContentRenderer").at(2);
    const widgetElement = contentRenderer.find(TestWidgetElement);
    const widget = FrontstageManager.findWidget("widget3");
    sinon.stub(widget!, "widgetControl").get(() => undefined);
    const componentWillUnmountSpy = sinon.spy(widgetElement.instance(), "componentWillUnmount");
    widgetElementComponentDidMountSpy = sinon.spy(TestWidgetElement.prototype, "componentDidMount");

    expect(contentRenderer.state().widgetKey).eq(1);

    let zones = FrontstageManager.NineZoneManager.getZonesManager().mergeZone(4, 7, wrapper.state("nineZone").zones);
    zones = FrontstageManager.NineZoneManager.getZonesManager().setWidgetTabIndex(4, 0, zones);
    zones = FrontstageManager.NineZoneManager.getZonesManager().setWidgetTabIndex(7, -1, zones);
    wrapper.setState({
      nineZone: {
        ...wrapper.state().nineZone,
        zones,
      },
    });
    wrapper.update();

    expect(contentRenderer.state().widgetKey).eq(2);
    expect(componentWillUnmountSpy.calledOnce).true;
    expect(widgetElementComponentDidMountSpy.calledOnce).true;

    wrapper.unmount();
  });

  it("should remount widget if widget control did not handle state restoration", async () => {
    const wrapper = mount<FrontstageComposer>(<FrontstageComposer />);
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    await FrontstageManager.setActiveFrontstageDef(frontstageProvider.frontstageDef);
    wrapper.update();

    const contentRenderer = wrapper.find("WidgetContentRenderer").at(2);
    const widgetElement = contentRenderer.find(TestWidgetElement);
    const widget = FrontstageManager.findWidget("widget3");
    sinon.stub(widget!.widgetControl!, "restoreTransientState").returns(false);
    const componentWillUnmountSpy = sinon.spy(widgetElement.instance(), "componentWillUnmount");
    widgetElementComponentDidMountSpy = sinon.spy(TestWidgetElement.prototype, "componentDidMount");

    expect(contentRenderer.state().widgetKey).eq(1);

    let zones = FrontstageManager.NineZoneManager.getZonesManager().mergeZone(4, 7, wrapper.state("nineZone").zones);
    zones = FrontstageManager.NineZoneManager.getZonesManager().setWidgetTabIndex(4, 0, zones);
    zones = FrontstageManager.NineZoneManager.getZonesManager().setWidgetTabIndex(7, -1, zones);
    wrapper.setState({
      nineZone: {
        ...wrapper.state().nineZone,
        zones,
      },
    });
    wrapper.update();

    expect(contentRenderer.state().widgetKey).eq(2);
    expect(componentWillUnmountSpy.calledOnce).true;
    expect(widgetElementComponentDidMountSpy.calledOnce).true;

    wrapper.unmount();
  });

  it("should not remount widget if widget control handled state restoration", async () => {
    const wrapper = mount<FrontstageComposer>(<FrontstageComposer />);
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    await FrontstageManager.setActiveFrontstageDef(frontstageProvider.frontstageDef);
    wrapper.update();

    const contentRenderer = wrapper.find("WidgetContentRenderer").at(2);
    const widgetElement = contentRenderer.find(TestWidgetElement);
    const widget = FrontstageManager.findWidget("widget3");
    sinon.stub(widget!.widgetControl!, "restoreTransientState").returns(true);
    const componentWillUnmountSpy = sinon.spy(widgetElement.instance(), "componentWillUnmount");
    widgetElementComponentDidMountSpy = sinon.spy(TestWidgetElement.prototype, "componentDidMount");

    expect(contentRenderer.state().widgetKey).eq(1);

    let zones = FrontstageManager.NineZoneManager.getZonesManager().mergeZone(4, 7, wrapper.state("nineZone").zones);
    zones = FrontstageManager.NineZoneManager.getZonesManager().setWidgetTabIndex(4, 0, zones);
    zones = FrontstageManager.NineZoneManager.getZonesManager().setWidgetTabIndex(7, -1, zones);
    wrapper.setState({
      nineZone: {
        ...wrapper.state().nineZone,
        zones,
      },
    });
    wrapper.update();

    expect(contentRenderer.state().widgetKey).eq(1);
    expect(componentWillUnmountSpy.calledOnce).false;
    expect(widgetElementComponentDidMountSpy.calledOnce).false;

    wrapper.unmount();
  });

  it("should update when widget state changes", async () => {
    const wrapper = mount(<FrontstageComposer />);
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    await FrontstageManager.setActiveFrontstageDef(frontstageProvider.frontstageDef);
    wrapper.update();

    const contentRenderer = wrapper.find("WidgetContentRenderer").at(2);
    const forceUpdateSpy = sinon.spy(contentRenderer.instance(), "forceUpdate");

    const widgetDef = FrontstageManager.findWidget("widget3")!;
    const widgetState = WidgetState.Open;
    FrontstageManager.onWidgetStateChangedEvent.emit({
      widgetDef,
      widgetState,
    });

    expect(forceUpdateSpy.calledOnce).true;

    wrapper.unmount();
  });
});
