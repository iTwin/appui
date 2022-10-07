/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";

import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { WidgetState } from "@itwin/appui-abstract";
import {
  CoreTools, Frontstage, FrontstageDef, FrontstageManager, UiFramework, useSpecificWidgetDef, WidgetDef,
} from "../../appui-react";
import TestUtils, { mount } from "../TestUtils";
import { TestFrontstage } from "./FrontstageTestUtils";
import { renderHook } from "@testing-library/react-hooks";

describe("Frontstage", () => {
  before(async () => {
    await NoRenderApp.startup();
    await TestUtils.initializeUiFramework();
    UiFramework.setUiVersion("1");
    FrontstageManager.clearFrontstageProviders();
  });

  after(async () => {
    TestUtils.terminateUiFramework();
    await IModelApp.shutdown();
  });

  beforeEach(() => {
    sinon.stub(FrontstageManager, "activeToolSettingsProvider").get(() => undefined);
  });

  it("should render", () => {
    mount(<Frontstage id="test1" defaultTool={CoreTools.selectElementCommand} contentGroup={TestUtils.TestContentGroup1} />);
  });

  it("FrontstageProvider supplies valid Frontstage", async () => {
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await FrontstageManager.getFrontstageDef(frontstageProvider.frontstage.props.id);

    await FrontstageManager.setActiveFrontstageDef(frontstageDef);
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

  it("Expect cached frontstageDef to be replaced", async () => {
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await FrontstageManager.getFrontstageDef(frontstageProvider.frontstage.props.id);
    const newFrontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(newFrontstageProvider);
    const newFrontstageDef = await FrontstageManager.getFrontstageDef(frontstageProvider.frontstage.props.id);
    expect(newFrontstageDef).to.not.eql(frontstageDef);
  });
});

describe("useSpecificWidgetDef", () => {
  it("should return widgetDef from active frontstage", () => {
    const frontstageDef = new FrontstageDef();
    const widgetDef = new WidgetDef({});
    sinon.stub(frontstageDef, "findWidgetDef").returns(widgetDef);
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => frontstageDef);

    const { result } = renderHook(() => useSpecificWidgetDef("t1"));

    expect(result.current).to.be.eq(widgetDef);
  });

  it("should handle no active frontstage", () => {
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => undefined);
    const { result } = renderHook(() => useSpecificWidgetDef("t1"));

    expect(result.current).to.be.undefined;
  });
});
