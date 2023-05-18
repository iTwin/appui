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
import { Size } from "@itwin/core-react";
import { IModelApp, IModelConnection, MockRender, ScreenViewport, SpatialViewState } from "@itwin/core-frontend";
import {
  ConfigurableCreateInfo, ConfigurableUiContent, ContentGroup, ContentLayoutDef, CoreTools, FrontstageDef,
  ModalFrontstageRequestedCloseEventArgs, RestoreFrontstageLayoutTool, SettingsModalFrontstage,
  ToolUiProvider, UiFramework, WidgetState,
} from "../../appui-react";
import TestUtils, { storageMock } from "../TestUtils";
import { TestFrontstage, TestFrontstage2, TestFrontstage3 } from "./FrontstageTestUtils";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager";
/* eslint-disable deprecation/deprecation */

const mySessionStorage = storageMock();

const propertyDescriptorToRestore = Object.getOwnPropertyDescriptor(window, "sessionStorage")!;

describe("FrontstageManager", () => {
  before(async () => {
    Object.defineProperty(window, "sessionStorage", {
      get: () => mySessionStorage,
    });

    await TestUtils.initializeUiFramework();
    await MockRender.App.startup();

    InternalFrontstageManager.initialize();
    InternalFrontstageManager.clearFrontstageProviders();
  });

  after(async () => {
    await MockRender.App.shutdown();
    TestUtils.terminateUiFramework();

    // restore the overriden property getter
    Object.defineProperty(window, "sessionStorage", propertyDescriptorToRestore);
  });

  it("initialized should return true", () => {
    expect(InternalFrontstageManager.isInitialized).to.be.true;
  });

  it("findWidget should return undefined when no active frontstage", async () => {
    await InternalFrontstageManager.setActiveFrontstageDef(undefined);
    expect(InternalFrontstageManager.findWidget("xyz")).to.be.undefined;
  });

  it("setActiveFrontstage should set active frontstage", async () => {
    const frontstageProvider = new TestFrontstage();
    InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
    expect(InternalFrontstageManager.hasFrontstage(frontstageProvider.id)).to.be.true;
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(frontstageProvider.id);

    expect(frontstageDef).to.not.be.undefined;
    if (frontstageDef) {
      expect(InternalFrontstageManager.hasFrontstage(frontstageDef.id)).to.be.true;
      await InternalFrontstageManager.setActiveFrontstage(frontstageDef.id);
      expect(InternalFrontstageManager.activeFrontstageId).to.eq(frontstageDef.id);
    }
  });

  it("getFronstageDef should return active frontstage when no id provided", async () => {
    const activeFrontstageDef = new FrontstageDef();
    sinon.stub(UiFramework.frontstages, "activeFrontstageDef").get(() => activeFrontstageDef);

    const frontstageDef = await InternalFrontstageManager.getFrontstageDef();

    expect(frontstageDef).to.eq(activeFrontstageDef);
  });

  it("hasFrontstage returns false if the fronstage is not found", () => {
    expect(InternalFrontstageManager.hasFrontstage(undefined as any)).to.be.false;
  });

  it("setActiveModalFrontstage from backstage item", async () => {
    const handleFrontstageCloseRequested = ({ stageCloseFunc }: ModalFrontstageRequestedCloseEventArgs) => {
      stageCloseFunc();
    };

    // since we are not really displaying modal stage add listener to mimic the close processing
    const removeListener = InternalFrontstageManager.onCloseModalFrontstageRequestedEvent.addListener(handleFrontstageCloseRequested);

    expect(InternalFrontstageManager.activeModalFrontstage).to.be.undefined;
    const backstageItem = SettingsModalFrontstage.getBackstageActionItem(100, 10);
    backstageItem.execute();
    expect(InternalFrontstageManager.activeModalFrontstage).to.not.be.undefined;
    InternalFrontstageManager.closeModalFrontstage();
    await TestUtils.flushAsyncOperations();

    expect(InternalFrontstageManager.activeModalFrontstage).to.be.undefined;
    removeListener();
  });

  it("should emit onFrontstageRestoreLayoutEvent", async () => {
    const spy = sinon.spy(InternalFrontstageManager.onFrontstageRestoreLayoutEvent, "emit");

    const frontstageProvider = new TestFrontstage();
    InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(frontstageProvider.id);

    expect(InternalFrontstageManager.activeModalFrontstage).to.be.undefined;
    expect(frontstageDef).to.not.be.undefined;
    if (frontstageDef) {
      await InternalFrontstageManager.setActiveFrontstage(frontstageDef.id);
      expect(InternalFrontstageManager.activeFrontstageId).to.eq(frontstageDef.id);

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
    await InternalFrontstageManager.setActiveFrontstage("xyz");
    spyMethod.calledOnce.should.true;
  });

  it("setActiveFrontstage should set active frontstage", async () => {
    const frontstageProvider = new TestFrontstage2();
    InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(frontstageProvider.id);

    expect(frontstageDef).to.not.be.undefined;
    if (frontstageDef) {
      // make sure zones defined by new names are properly placed into the proper spot in frontstageDef
      expect(frontstageDef.contentManipulation).not.to.be.undefined;
      expect(frontstageDef.toolSettings).not.to.be.undefined;
      expect(frontstageDef.statusBar).not.to.be.undefined;
      expect(frontstageDef.viewNavigation).to.be.undefined;
      await InternalFrontstageManager.setActiveFrontstage(frontstageDef.id);
      expect(InternalFrontstageManager.activeFrontstageId).to.eq(frontstageDef.id);
    }
  });

  it("deactivateFrontstageDef should set active frontstage to undefined", async () => {
    const frontstageProvider = new TestFrontstage();
    InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(frontstageProvider.id);

    await InternalFrontstageManager.setActiveFrontstageDef(frontstageDef);
    expect(InternalFrontstageManager.activeFrontstageDef).to.eq(frontstageDef);

    await InternalFrontstageManager.deactivateFrontstageDef();
    expect(InternalFrontstageManager.activeFrontstageDef).to.be.undefined;
    expect(InternalFrontstageManager.activeFrontstageId).to.eq("");
  });

  it("setActiveContentGroup should setActiveLayout if layout found", async () => {
    const contentGroup = new ContentGroup({ id: "1", contents: [], layout: { id: "1" } });
    const layoutDef = new ContentLayoutDef({ id: "1" });
    sinon.stub(UiFramework.content.layouts, "getForGroup").returns(layoutDef);
    const spy = sinon.stub(InternalFrontstageManager, "setActiveLayout");
    await InternalFrontstageManager.setActiveContentGroup(contentGroup);
    expect(spy).to.have.been.calledWithExactly(layoutDef, contentGroup);
  });

  it("setWidgetState returns false on invalid id", () => {
    expect(InternalFrontstageManager.setWidgetState("xyz", WidgetState.Closed)).to.be.false;
  });

  it("setWidgetState apply state on widgetDef", () => {
    const stubbedWidget = {
      setWidgetState: sinon.spy(),
    };
    sinon.stub(UiFramework.frontstages, "findWidget").withArgs("xyz").returns(stubbedWidget as any);
    expect(InternalFrontstageManager.setWidgetState("xyz", WidgetState.Closed)).to.be.true;
    expect(stubbedWidget.setWidgetState).to.calledWithExactly(WidgetState.Closed);
    sinon.restore();
  });

  it("findWidget returns undefined on invalid id", () => {
    expect(InternalFrontstageManager.findWidget("xyz")).to.be.undefined;
  });

  it("findWidget returns the widget from the active frontstage def", async () => {
    const frontstageProvider = new TestFrontstage();
    InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(frontstageProvider.id);

    await InternalFrontstageManager.setActiveFrontstageDef(frontstageDef);

    expect(InternalFrontstageManager.findWidget("widget3")).to.not.be.undefined;
    await InternalFrontstageManager.deactivateFrontstageDef();
  });

  it("FrontstageProvider supplies valid Frontstage", async () => {
    const frontstageProvider = new TestFrontstage();
    expect(InternalFrontstageManager.frontstageDefs.has(frontstageProvider.id));
    InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(frontstageProvider.id);
    expect(frontstageDef).to.not.be.undefined;
    expect(InternalFrontstageManager.frontstageDefs.has(frontstageProvider.id));
  });

  it("Expect cached frontstageDef to be replaced", async () => {
    const frontstageProvider = new TestFrontstage();
    InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(frontstageProvider.id);
    const newFrontstageProvider = new TestFrontstage();
    InternalFrontstageManager.addFrontstageProvider(newFrontstageProvider);
    const newFrontstageDef = await InternalFrontstageManager.getFrontstageDef(frontstageProvider.id);
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

      InternalFrontstageManager.isInitialized = false;
      InternalFrontstageManager.initialize();
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      IModelApp.viewManager.setSelectedView(viewportMock.object);
    });

    it("CoreTools.selectElementCommand", async () => {
      const item = CoreTools.selectElementCommand;
      item.execute();
      setImmediate(async () => {
        await TestUtils.flushAsyncOperations();
        expect(InternalFrontstageManager.activeToolId).to.eq(item.toolId);
      });
    });

    it("trigger tool settings reload", () => {
      class ToolUiProviderMock extends ToolUiProvider {
        constructor(info: ConfigurableCreateInfo, options: any) {
          super(info, options);
        }
      }

      const activeToolSettingsProvider = new ToolUiProviderMock(new ConfigurableCreateInfo("test", "test", "test"), undefined);
      sinon.stub(InternalFrontstageManager, "activeToolSettingsProvider").get(() => activeToolSettingsProvider);

      UiFramework.toolSettings.onReloadToolSettingsProperties.emit();
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
      InternalFrontstageManager.onFrontstageDeactivatedEvent.addListener(spyDeactivated);

      const frontstageProvider = new TestFrontstage3();
      InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
      const frontstageDef = await InternalFrontstageManager.getFrontstageDef(frontstageProvider.id);
      await InternalFrontstageManager.setActiveFrontstageDef(frontstageDef);
      expect(InternalFrontstageManager.activeFrontstageDef).to.eq(frontstageDef);

      fakeTimers.tick(200);

      divContainer.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, cancelable: true, view: window, buttons: 1 }));
      divContainer.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, cancelable: true, view: window, buttons: 1 }));

      fakeTimers.tick(200);
      fakeTimers.restore();

      divContainer.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, cancelable: true, view: window, buttons: 1 }));
      divContainer.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, cancelable: true, view: window, buttons: 1 }));

      await InternalFrontstageManager.deactivateFrontstageDef();
      expect(InternalFrontstageManager.activeFrontstageDef).to.be.undefined;
      spyDeactivated.calledOnce.should.true;
    });

  });

  describe("nineZoneSize", () => {
    let nineZoneSize: typeof InternalFrontstageManager.nineZoneSize;

    before(() => {
      nineZoneSize = InternalFrontstageManager.nineZoneSize;
    });

    afterEach(() => {
      InternalFrontstageManager.nineZoneSize = nineZoneSize;
    });

    it("should set nineZoneSize", () => {
      InternalFrontstageManager.nineZoneSize = new Size(10, 20);
      InternalFrontstageManager.nineZoneSize.width.should.eq(10);
      InternalFrontstageManager.nineZoneSize.height.should.eq(20);
    });
  });
});
