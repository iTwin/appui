/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as sinon from "sinon";
import * as moq from "typemoq";
import { Logger } from "@bentley/bentleyjs-core";
import { IModelApp, MockRender, ScreenViewport, SpatialViewState } from "@bentley/imodeljs-frontend";
import { WidgetState } from "@bentley/ui-abstract";
import { CoreTools, FrontstageManager } from "../../ui-framework";
import TestUtils, { storageMock } from "../TestUtils";
import { TestFrontstage, TestFrontstage2 } from "./FrontstageTestUtils";

const mySessionStorage = storageMock();

const propertyDescriptorToRestore = Object.getOwnPropertyDescriptor(window, "sessionStorage")!;

describe("FrontstageManager", () => {

  before(async () => {
    Object.defineProperty(window, "sessionStorage", {
      get: () => mySessionStorage,
    });

    await TestUtils.initializeUiFramework();

    await MockRender.App.startup();

    FrontstageManager.initialize();
    FrontstageManager.clearFrontstageDefs();
  });

  after(async () => {
    await MockRender.App.shutdown();
    TestUtils.terminateUiFramework();

    // restore the overriden property getter
    Object.defineProperty(window, "sessionStorage", propertyDescriptorToRestore);
  });

  it("findWidget should return undefined when no active frontstage", async () => {
    await FrontstageManager.setActiveFrontstageDef(undefined);
    expect(FrontstageManager.findWidget("xyz")).to.be.undefined;
  });

  it("setActiveFrontstage should set active frontstage", async () => {
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    expect(frontstageProvider.frontstageDef).to.not.be.undefined;
    const frontstageDef = frontstageProvider.frontstageDef;
    if (frontstageDef) {
      await FrontstageManager.setActiveFrontstage(frontstageDef.id);
      expect(FrontstageManager.activeFrontstageId).to.eq(frontstageDef.id);
    }
  });

  it("setActiveFrontstage should log Error on invalid id", async () => {
    const spyMethod = sinon.spy(Logger, "logError");
    await FrontstageManager.setActiveFrontstage("xyz");
    spyMethod.calledOnce.should.true;
    (Logger.logError as any).restore();
  });

  it("setWidgetState should find and set widget state", async () => {
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    await FrontstageManager.setActiveFrontstageDef(frontstageProvider.frontstageDef);

    const widgetDef = FrontstageManager.findWidget("widget1");
    expect(widgetDef).to.not.be.undefined;

    if (widgetDef) {
      expect(widgetDef.isVisible).to.eq(true);
      expect(FrontstageManager.setWidgetState("widget1", WidgetState.Hidden)).to.be.true;
      expect(widgetDef.isVisible).to.eq(false);
    }
  });

  it("setActiveFrontstage2 should set active frontstage", async () => {
    const frontstageProvider = new TestFrontstage2();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    expect(frontstageProvider.frontstageDef).to.not.be.undefined;
    const frontstageDef = frontstageProvider.frontstageDef;
    if (frontstageDef) {
      // make sure zones defined by new names are properly placed into the proper spot in frontstageDef
      expect(frontstageDef.getZoneDef(1)).not.to.be.undefined;
      expect(frontstageDef.getZoneDef(2)).not.to.be.undefined;
      expect(frontstageDef.getZoneDef(8)).not.to.be.undefined;
      expect(frontstageDef.getZoneDef(3)).to.be.undefined;
      await FrontstageManager.setActiveFrontstage(frontstageDef.id);
      expect(FrontstageManager.activeFrontstageId).to.eq(frontstageDef.id);
    }
  });

  it("setWidgetState returns false on invalid id", () => {
    expect(FrontstageManager.setWidgetState("xyz", WidgetState.Closed)).to.be.false;
  });

  it("findWidget returns undefined on invalid id", () => {
    expect(FrontstageManager.findWidget("xyz")).to.be.undefined;
  });

  describe("Executing a tool should set activeToolId", () => {
    const viewportMock = moq.Mock.ofType<ScreenViewport>();

    before(() => {
      const spatialViewStateMock = moq.Mock.ofType<SpatialViewState>();
      spatialViewStateMock.setup((view) => view.is3d()).returns(() => true);
      spatialViewStateMock.setup((view) => view.classFullName).returns(() => "BisCore:SpatialViewDefinition");
      viewportMock.reset();
      viewportMock.setup((viewport) => viewport.view).returns(() => spatialViewStateMock.object);

      FrontstageManager.isInitialized = false;
      FrontstageManager.initialize();
      IModelApp.viewManager.setSelectedView(viewportMock.object);
    });

    it("CoreTools.selectElementCommand", () => {
      const item = CoreTools.selectElementCommand;
      item.execute();
      expect(FrontstageManager.activeToolId).to.eq(item.toolId);
    });

  });

});
