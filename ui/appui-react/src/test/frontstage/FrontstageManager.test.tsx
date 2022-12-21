/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { expect } from "chai";
import * as sinon from "sinon";
import * as moq from "typemoq";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { Logger } from "@itwin/core-bentley";
import { WidgetState } from "@itwin/appui-abstract";
import { Size } from "@itwin/core-react";
import type { IModelConnection, ScreenViewport, SpatialViewState } from "@itwin/core-frontend";
import { IModelApp, MockRender } from "@itwin/core-frontend";
import type {
  ModalFrontstageRequestedCloseEventArgs} from "../../appui-react";
import {
  ConfigurableCreateInfo, ConfigurableUiContent, ContentGroup, ContentLayoutDef, ContentLayoutManager, CoreTools, FrontstageDef, FrontstageManager, RestoreFrontstageLayoutTool, SettingsModalFrontstage,
  ToolSettingsManager, ToolUiProvider, UiFramework,
} from "../../appui-react";
import TestUtils, { storageMock } from "../TestUtils";
import { TestFrontstage, TestFrontstage2, TestFrontstage3 } from "./FrontstageTestUtils";

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
    FrontstageManager.clearFrontstageProviders();
  });

  after(async () => {
    await MockRender.App.shutdown();
    TestUtils.terminateUiFramework();

    // restore the overriden property getter
    Object.defineProperty(window, "sessionStorage", propertyDescriptorToRestore);
  });

  it("initialized should return true", () => {
    expect(FrontstageManager.isInitialized).to.be.true;
  });

  it("findWidget should return undefined when no active frontstage", async () => {
    await FrontstageManager.setActiveFrontstageDef(undefined);
    expect(FrontstageManager.findWidget("xyz")).to.be.undefined;
  });

  it("setActiveFrontstage should set active frontstage", async () => {
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    expect(FrontstageManager.hasFrontstage(frontstageProvider.id)).to.be.true;
    const frontstageDef = await FrontstageManager.getFrontstageDef(frontstageProvider.id);

    expect(frontstageDef).to.not.be.undefined;
    if (frontstageDef) {
      expect(FrontstageManager.hasFrontstage(frontstageDef.id)).to.be.true;
      await FrontstageManager.setActiveFrontstage(frontstageDef.id);
      expect(FrontstageManager.activeFrontstageId).to.eq(frontstageDef.id);
    }
  });

  it("getFronstageDef should return active frontstage when no id provided", async () => {
    const activeFrontstageDef = new FrontstageDef();
    sinon.stub(FrontstageManager, "activeFrontstageDef").get(() => activeFrontstageDef);

    const frontstageDef = await FrontstageManager.getFrontstageDef();

    expect(frontstageDef).to.eq(activeFrontstageDef);
  });

  it("hasFrontstage returns false if the fronstage is not found", () => {
    expect(FrontstageManager.hasFrontstage(undefined as any)).to.be.false;
  });

  it("setActiveModalFrontstage from backstage item", async () => {
    const handleFrontstageCloseRequested = ({ stageCloseFunc }: ModalFrontstageRequestedCloseEventArgs) => {
      stageCloseFunc();
    };

    // since we are not really displaying modal stage add listener to mimic the close processing
    const removeListener = FrontstageManager.onCloseModalFrontstageRequestedEvent.addListener(handleFrontstageCloseRequested);

    expect(FrontstageManager.activeModalFrontstage).to.be.undefined;
    const backstageItem = SettingsModalFrontstage.getBackstageActionItem(100, 10);
    backstageItem.execute();
    expect(FrontstageManager.activeModalFrontstage).to.not.be.undefined;
    FrontstageManager.closeModalFrontstage();
    await TestUtils.flushAsyncOperations();

    expect(FrontstageManager.activeModalFrontstage).to.be.undefined;
    removeListener();
  });

  it("should emit onFrontstageRestoreLayoutEvent", async () => {
    const spy = sinon.spy(FrontstageManager.onFrontstageRestoreLayoutEvent, "emit");

    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await FrontstageManager.getFrontstageDef(frontstageProvider.id);

    expect(FrontstageManager.activeModalFrontstage).to.be.undefined;
    expect(frontstageDef).to.not.be.undefined;
    if (frontstageDef) {
      await FrontstageManager.setActiveFrontstage(frontstageDef.id);
      expect(FrontstageManager.activeFrontstageId).to.eq(frontstageDef.id);

      const tool = new RestoreFrontstageLayoutTool();
      await tool.parseAndRun(frontstageDef.id);
      spy.calledOnce.should.true;
      spy.resetHistory();

      // call without id to use active stage
      await tool.parseAndRun();
      spy.calledOnce.should.true;
      spy.resetHistory();

      // call without invalid id
      await tool.parseAndRun("bad-id");
      spy.calledOnce.should.false;
    }
  });

  it("setActiveFrontstage should log Error on invalid id", async () => {
    const spyMethod = sinon.spy(Logger, "logError");
    await FrontstageManager.setActiveFrontstage("xyz");
    spyMethod.calledOnce.should.true;
  });

  it("setActiveFrontstage should set active frontstage", async () => {
    const frontstageProvider = new TestFrontstage2();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await FrontstageManager.getFrontstageDef(frontstageProvider.id);

    expect(frontstageDef).to.not.be.undefined;
    if (frontstageDef) {
      // make sure zones defined by new names are properly placed into the proper spot in frontstageDef
      expect(frontstageDef.contentManipulation).not.to.be.undefined;
      expect(frontstageDef.toolSettings).not.to.be.undefined;
      expect(frontstageDef.statusBar).not.to.be.undefined;
      expect(frontstageDef.viewNavigation).to.be.undefined;
      await FrontstageManager.setActiveFrontstage(frontstageDef.id);
      expect(FrontstageManager.activeFrontstageId).to.eq(frontstageDef.id);
    }
  });

  it("deactivateFrontstageDef should set active frontstage to undefined", async () => {
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await FrontstageManager.getFrontstageDef(frontstageProvider.id);

    await FrontstageManager.setActiveFrontstageDef(frontstageDef);
    expect(FrontstageManager.activeFrontstageDef).to.eq(frontstageDef);

    await FrontstageManager.deactivateFrontstageDef();
    expect(FrontstageManager.activeFrontstageDef).to.be.undefined;
    expect(FrontstageManager.activeFrontstageId).to.eq("");
  });

  it("setActiveContentGroup should setActiveLayout if layout found", async () => {
    const contentGroup = new ContentGroup({ id: "1", contents: [], layout: { id: "1" } });
    const layoutDef = new ContentLayoutDef({ id: "1" });
    sinon.stub(ContentLayoutManager, "getLayoutForGroup").returns(layoutDef);
    const spy = sinon.stub(FrontstageManager, "setActiveLayout");
    await FrontstageManager.setActiveContentGroup(contentGroup);
    expect(spy).to.have.been.calledWithExactly(layoutDef, contentGroup);
  });

  it("setWidgetState returns false on invalid id", () => {
    expect(FrontstageManager.setWidgetState("xyz", WidgetState.Closed)).to.be.false;
  });

  it("findWidget returns undefined on invalid id", () => {
    expect(FrontstageManager.findWidget("xyz")).to.be.undefined;
  });

  it("FrontstageProvider supplies valid Frontstage", async () => {
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await FrontstageManager.getFrontstageDef(frontstageProvider.id);
    expect(frontstageDef).to.not.be.undefined;
  });

  it("Expect cached frontstageDef to be replaced", async () => {
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await FrontstageManager.getFrontstageDef(frontstageProvider.id);
    const newFrontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(newFrontstageProvider);
    const newFrontstageDef = await FrontstageManager.getFrontstageDef(frontstageProvider.id);
    expect(newFrontstageDef).to.not.eql(frontstageDef);
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
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      IModelApp.viewManager.setSelectedView(viewportMock.object);
    });

    it("CoreTools.selectElementCommand", async () => {
      const item = CoreTools.selectElementCommand;
      item.execute();
      setImmediate(async () => {
        await TestUtils.flushAsyncOperations();
        expect(FrontstageManager.activeToolId).to.eq(item.toolId);
      });
    });

    it("trigger tool settings reload", () => {
      class ToolUiProviderMock extends ToolUiProvider {
        constructor(info: ConfigurableCreateInfo, options: any) {
          super(info, options);
        }
      }

      const activeToolSettingsProvider = new ToolUiProviderMock(new ConfigurableCreateInfo("test", "test", "test"), undefined);
      sinon.stub(FrontstageManager, "activeToolSettingsProvider").get(() => activeToolSettingsProvider);

      ToolSettingsManager.onReloadToolSettingsProperties.emit();
    });

  });

  describe("ConfigurableUiContent", () => {
    before(() => {
      const imodelConnectionMock = moq.Mock.ofType<IModelConnection>();
      imodelConnectionMock.setup((x) => x.iModelId).returns(() => "dummyImodelId");
      sinon.stub(UiFramework, "getIModelConnection").get(() => imodelConnectionMock.object);
    });

    it("mouse moves should be handled for frontstage tracking", async () => {
      const fakeTimers = sinon.useFakeTimers();
      render(<Provider store={TestUtils.store} >
        <ConfigurableUiContent idleTimeout={100} intervalTimeout={100} />
      </Provider>);

      const divContainer = document.getElementById("uifw-configurableui-wrapper")!;

      const spyDeactivated = sinon.spy();
      FrontstageManager.onFrontstageDeactivatedEvent.addListener(spyDeactivated);

      const frontstageProvider = new TestFrontstage3();
      FrontstageManager.addFrontstageProvider(frontstageProvider);
      const frontstageDef = await FrontstageManager.getFrontstageDef(frontstageProvider.id);
      await FrontstageManager.setActiveFrontstageDef(frontstageDef);
      expect(FrontstageManager.activeFrontstageDef).to.eq(frontstageDef);

      fakeTimers.tick(200);

      divContainer.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, cancelable: true, view: window, buttons: 1 }));
      divContainer.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, cancelable: true, view: window, buttons: 1 }));

      fakeTimers.tick(200);
      fakeTimers.restore();

      divContainer.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, cancelable: true, view: window, buttons: 1 }));
      divContainer.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, cancelable: true, view: window, buttons: 1 }));

      await FrontstageManager.deactivateFrontstageDef();
      expect(FrontstageManager.activeFrontstageDef).to.be.undefined;
      spyDeactivated.calledOnce.should.true;
    });

  });

  describe("nineZoneSize", () => {
    let nineZoneSize: typeof FrontstageManager.nineZoneSize;

    before(() => {
      nineZoneSize = FrontstageManager.nineZoneSize;
    });

    afterEach(() => {
      FrontstageManager.nineZoneSize = nineZoneSize;
    });

    it("should set nineZoneSize", () => {
      FrontstageManager.nineZoneSize = new Size(10, 20);
      FrontstageManager.nineZoneSize.width.should.eq(10);
      FrontstageManager.nineZoneSize.height.should.eq(20);
    });
  });
});
