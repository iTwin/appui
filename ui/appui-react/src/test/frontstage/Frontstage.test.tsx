/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as sinon from "sinon";

import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { WidgetState } from "@itwin/appui-abstract";
import {
  FrontstageDef, FrontstageManager, useSpecificWidgetDef, WidgetDef,
} from "../../appui-react";
import TestUtils from "../TestUtils";
import { TestFrontstage } from "./FrontstageTestUtils";
import { renderHook } from "@testing-library/react-hooks";
import { assert } from "@itwin/core-bentley";

describe("Frontstage", () => {
  before(async () => {
    await NoRenderApp.startup();
    await TestUtils.initializeUiFramework();
    FrontstageManager.clearFrontstageProviders();
  });

  after(async () => {
    TestUtils.terminateUiFramework();
    await IModelApp.shutdown();
  });

  beforeEach(() => {
    sinon.stub(FrontstageManager, "activeToolSettingsProvider").get(() => undefined);
  });

  it("FrontstageProvider supplies valid Frontstage", async () => {
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await FrontstageManager.getFrontstageDef(frontstageProvider.frontstage.id);

    await FrontstageManager.setActiveFrontstageDef(frontstageDef);
    const widgetDef = FrontstageManager.findWidget("widget1");
    expect(widgetDef).to.not.be.undefined;
    assert((!!widgetDef));

    widgetDef.setWidgetState(WidgetState.Open);
    expect(widgetDef.isActive).to.eq(true);
    expect(widgetDef.isVisible).to.eq(true);
  });

  it("Expect cached frontstageDef to be replaced", async () => {
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await FrontstageManager.getFrontstageDef(frontstageProvider.frontstage.id);
    const newFrontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(newFrontstageProvider);
    const newFrontstageDef = await FrontstageManager.getFrontstageDef(frontstageProvider.frontstage.id);
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
