/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// cSpell:ignore typemoq, tabid

import { expect } from "chai";
import * as moq from "typemoq";
import * as sinon from "sinon";
import type { IModelRpcProps } from "@itwin/core-common";
import type { Id64String } from "@itwin/core-bentley";
import { Logger } from "@itwin/core-bentley";
import type { IModelConnection, ViewState } from "@itwin/core-frontend";
import { IModelApp, SelectionSet } from "@itwin/core-frontend";
import type { CursorMenuPayload, UserSettingsProvider } from "../appui-react";
import {
  AccuDrawPopupManager,
  ColorTheme,
  SettingsModalFrontstage,
  UiFramework,
} from "../appui-react";
import type { UiStateStorage } from "@itwin/core-react";
import { LocalStateStorage } from "@itwin/core-react";
import TestUtils, { storageMock } from "./TestUtils";
import { OpenSettingsTool } from "../appui-react/tools/OpenSettingsTool";
import { PopupManager } from "../appui-react";
import { createElement } from "react";
import type { DialogLayoutDataProvider } from "@itwin/appui-abstract";
import { InternalModalDialogManager } from "../appui-react/dialog/InternalModalDialogManager";
import { InternalModelessDialogManager } from "../appui-react/dialog/InternalModelessDialogManager";

describe("UiFramework localStorage Wrapper", () => {
  const localStorageToRestore = Object.getOwnPropertyDescriptor(
    window,
    "localStorage"
  )!;
  const localStorageMock = storageMock();

  before(async () => {
    Object.defineProperty(window, "localStorage", {
      get: () => localStorageMock,
    });
  });

  after(() => {
    Object.defineProperty(window, "localStorage", localStorageToRestore);
  });

  describe("UiFramework", () => {
    beforeEach(() => {
      TestUtils.terminateUiFramework();
    });

    afterEach(() => {
      TestUtils.terminateUiFramework();
    });

    it("store should throw Error without initialize", () => {
      expect(() => UiFramework.store).to.throw(Error);
    });

    it("localizationNamespace should return UiFramework", () => {
      expect(UiFramework.localizationNamespace).toEqual("UiFramework");
    });

    it("packageName should return appui-react", () => {
      expect(UiFramework.packageName).toEqual("appui-react");
    });

    it("translate should return the key (in test environment)", async () => {
      await TestUtils.initializeUiFramework(true);
      expect(UiFramework.translate("test1.test2")).toEqual("test1.test2");
    });

    it("test OpenSettingsTool", async () => {
      await TestUtils.initializeUiFramework(true);

      const spy = sinon.spy();
      const tabName = "page1";
      const handleOpenSetting = (settingsCategory: string) => {
        expect(settingsCategory).to.eql(tabName);
        spy();
      };

      const handleOpenSetting2 = (_settingsCategory: string) => {
        spy();
      };

      const showSettingsStageToRestore = Object.getOwnPropertyDescriptor(
        SettingsModalFrontstage,
        "showSettingsStage"
      )!;
      Object.defineProperty(SettingsModalFrontstage, "showSettingsStage", {
        get: () => handleOpenSetting,
      });
      const tool = new OpenSettingsTool();
      // tabid arg
      await tool.parseAndRun(tabName);
      expect(spy).toHaveBeenCalledOnce();
      spy.resetHistory();

      // No tabid arg
      Object.defineProperty(SettingsModalFrontstage, "showSettingsStage", {
        get: () => handleOpenSetting2,
      });
      await tool.parseAndRun();
      expect(spy).toHaveBeenCalledOnce();
      spy.resetHistory();

      Object.defineProperty(
        SettingsModalFrontstage,
        "showSettingsStage",
        showSettingsStageToRestore
      );
    });

    it("loggerCategory should correctly handle null or undefined object", () => {
      expect(UiFramework.loggerCategory(null)).toEqual(UiFramework.packageName);
      expect(UiFramework.loggerCategory(undefined)).toEqual(
        UiFramework.packageName
      );
    });

    it("calling initialize twice should log", async () => {
      const spyLogger = sinon.spy(Logger, "logInfo");
      expect(UiFramework.initialized).to.be.false;
      await UiFramework.initialize(TestUtils.store);
      expect(UiFramework.initialized).toEqual(true);
      await UiFramework.initialize(TestUtils.store);
      spyLogger.calledOnce.should.true;
    });

    it("test default frameworkState key", async () => {
      await TestUtils.initializeUiFramework();
      expect(UiFramework.frameworkStateKey).to.equal("frameworkState");
      TestUtils.terminateUiFramework();
    });

    it("IsUiVisible", async () => {
      await TestUtils.initializeUiFramework();
      UiFramework.setIsUiVisible(false);
      expect(UiFramework.getIsUiVisible()).to.be.false;
      TestUtils.terminateUiFramework();
    });

    it("ColorTheme", async () => {
      await TestUtils.initializeUiFramework();
      UiFramework.setColorTheme(ColorTheme.Dark);
      expect(UiFramework.getColorTheme()).toEqual(ColorTheme.Dark);
      TestUtils.terminateUiFramework();
    });

    it("test selection scope state data", async () => {
      await TestUtils.initializeUiFramework();
      expect(UiFramework.getActiveSelectionScope()).to.equal("element");
      const scopes = UiFramework.getAvailableSelectionScopes();
      expect(scopes.length).to.be.greaterThan(0);

      // since "file" is not a valid scope the active scope should still be element
      UiFramework.setActiveSelectionScope("file");
      expect(UiFramework.getActiveSelectionScope()).to.equal("element");
      TestUtils.terminateUiFramework();
    });

    it("WidgetOpacity", async () => {
      await TestUtils.initializeUiFramework();
      const testValue = 0.5;
      UiFramework.setWidgetOpacity(testValue);
      expect(UiFramework.getWidgetOpacity()).toEqual(testValue);
      TestUtils.terminateUiFramework();
    });

    it("ActiveIModelId", async () => {
      await TestUtils.initializeUiFramework();
      const testValue = "Test";
      UiFramework.setActiveIModelId(testValue);
      expect(UiFramework.getActiveIModelId()).toEqual(testValue);
      TestUtils.terminateUiFramework();
    });

    class testSettingsProvider implements UserSettingsProvider {
      public readonly providerId = "testSettingsProvider";
      public settingsLoaded = false;
      public async loadUserSettings(storage: UiStateStorage) {
        if (storage) this.settingsLoaded = true;
      }
    }

    it("SessionState setters/getters", async () => {
      await TestUtils.initializeUiFramework();
      const settingsProvider = new testSettingsProvider();
      UiFramework.registerUserSettingsProvider(settingsProvider);

      UiFramework.setDefaultIModelViewportControlId(
        "DefaultIModelViewportControlId"
      );
      expect(UiFramework.getDefaultIModelViewportControlId()).toEqual(
        "DefaultIModelViewportControlId"
      );

      const testViewId: Id64String = "0x12345678";
      UiFramework.setDefaultViewId(testViewId);
      expect(UiFramework.getDefaultViewId()).toEqual(testViewId);

      expect(settingsProvider.settingsLoaded).to.be.false;

      const uisettings = new LocalStateStorage();
      await UiFramework.setUiStateStorage(uisettings);
      expect(UiFramework.getUiStateStorage()).toEqual(uisettings);
      expect(settingsProvider.settingsLoaded).toEqual(true);
      settingsProvider.settingsLoaded = false;
      // if we try to set storage to same object this should be a noop and the settingsLoaded property should remain false;
      await UiFramework.setUiStateStorage(uisettings);
      expect(settingsProvider.settingsLoaded).to.be.false;

      await UiFramework.initializeStateFromUserSettingsProviders();

      const useDragInteraction = true;
      UiFramework.setUseDragInteraction(useDragInteraction);
      expect(UiFramework.useDragInteraction).to.eql(useDragInteraction);

      UiFramework.closeCursorMenu();
      expect(UiFramework.getCursorMenuData()).to.be.undefined;

      const menuData: CursorMenuPayload = {
        items: [],
        position: { x: 100, y: 100 },
      };
      UiFramework.openCursorMenu(menuData);
      expect(UiFramework.getCursorMenuData()).not.to.be.undefined;

      const viewState = moq.Mock.ofType<ViewState>();
      UiFramework.setDefaultViewState(viewState.object);
      expect(UiFramework.getDefaultViewState()).not.to.be.undefined;

      const displayOverlay = false;
      UiFramework.setViewOverlayDisplay(displayOverlay);
      expect(UiFramework.viewOverlayDisplay).to.eql(displayOverlay);
      // test workflow that doesn't change the item
      const currentDisplay = UiFramework.viewOverlayDisplay;
      UiFramework.setViewOverlayDisplay(displayOverlay);
      expect(UiFramework.viewOverlayDisplay).to.eql(currentDisplay);

      TestUtils.terminateUiFramework();

      // try again when store is not defined
      expect(UiFramework.useDragInteraction).to.eql(false);
    });

    it("showCard/hideCard forwards to PopupManager", () => {
      const stub = sinon
        .stub(PopupManager, "displayCard")
        .mockReturnValue(true);
      expect(
        UiFramework.showCard(
          createElement("div", { id: "test" }, ["card content"]),
          "test",
          { items: [] },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          (item: any) => {
            item;
          },
          () => {}
        )
      ).toEqual(true);
      stub.restore();

      sinon.stub(PopupManager, "displayCard").mockReturnValue(false);
      expect(
        UiFramework.showCard(
          createElement("div", { id: "test" }, ["card content"]),
          "test",
          { items: [] },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          (item: any) => {
            item;
          },
          () => {}
        )
      ).to.be.false;

      const hideStub = sinon
        .stub(PopupManager, "hideCard")
        .mockReturnValue(true);
      expect(UiFramework.hideCard()).toEqual(true);

      hideStub.restore();

      sinon.stub(PopupManager, "hideCard").mockReturnValue(false);
      expect(UiFramework.hideCard()).to.be.false;
    });

    it("openToolSettingsPopup/closeToolSettingsPopup forwards to PopupManager", () => {
      const dataProviderMock = moq.Mock.ofType<DialogLayoutDataProvider>();
      const stub = sinon
        .stub(PopupManager, "openToolSettings")
        .mockReturnValue(true);
      expect(
        UiFramework.openToolSettingsPopup(
          dataProviderMock.object,
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          () => {}
        )
      ).toEqual(true);
      stub.restore();

      sinon.stub(PopupManager, "openToolSettings").mockReturnValue(false);
      expect(
        UiFramework.openToolSettingsPopup(
          dataProviderMock.object,
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          () => {}
        )
      ).to.be.false;

      const hideStub = sinon
        .stub(PopupManager, "closeToolSettings")
        .returns(true);
      expect(UiFramework.closeToolSettingsPopup()).toEqual(true);

      hideStub.restore();

      sinon.stub(PopupManager, "closeToolSettings").mockReturnValue(false);
      expect(UiFramework.closeToolSettingsPopup()).to.be.false;
    });

    it("showToolbar/hideToolbar forwards to PopupManager", () => {
      const stub = sinon
        .stub(PopupManager, "displayToolbar")
        .mockReturnValue(true);
      expect(
        UiFramework.showToolbar(
          { items: [] },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          (item: any) => {
            item;
          },
          () => {}
        )
      ).toEqual(true);
      stub.restore();

      const hideStub = sinon
        .stub(PopupManager, "hideToolbar")
        .mockReturnValue(true);
      expect(UiFramework.hideToolbar()).toEqual(true);

      hideStub.restore();

      sinon.stub(PopupManager, "hideToolbar").mockReturnValue(false);
      expect(UiFramework.hideToolbar()).to.be.false;
    });

    it("showMenuButton/hideMenuButton forwards to AccuDrawPopupManager", () => {
      const stub = sinon
        .stub(AccuDrawPopupManager, "showMenuButton")
        .returns(true);
      expect(UiFramework.showMenuButton("test", [], { x: 0, y: 0 })).toEqual(
        true
      );
      stub.restore();

      sinon.stub(AccuDrawPopupManager, "showMenuButton").mockReturnValue(false);
      expect(UiFramework.showMenuButton("test", [], { x: 0, y: 0 })).to.be
        .false;

      const hideStub = sinon
        .stub(AccuDrawPopupManager, "hideMenuButton")
        .returns(true);
      expect(UiFramework.hideMenuButton("test")).toEqual(true);

      hideStub.restore();

      sinon.stub(AccuDrawPopupManager, "hideMenuButton").mockReturnValue(false);
      expect(UiFramework.hideMenuButton("test")).to.be.false;
    });

    it("hideMenuButton returns false if menu button with id cannot be found", () => {
      const htmlElement = document.createElement<any>("div");
      UiFramework.showMenuButton("test", [], { x: 0, y: 0 }, htmlElement);

      expect(UiFramework.hideMenuButton("test2")).to.be.false;
      expect(UiFramework.hideMenuButton("test")).toEqual(true);
    });

    it("showCalculator/hideCalculator forwards to AccuDrawPopupManager", () => {
      const stub = sinon
        .stub(AccuDrawPopupManager, "showCalculator")
        .returns(true);
      expect(
        UiFramework.showCalculator(
          23,
          "icon-string",
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      ).toEqual(true);

      stub.restore();

      sinon.stub(AccuDrawPopupManager, "showCalculator").mockReturnValue(false);
      expect(
        UiFramework.showCalculator(
          23,
          "icon-string",
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      ).to.be.false;

      const hideStub = sinon
        .stub(AccuDrawPopupManager, "hideCalculator")
        .returns(true);
      expect(UiFramework.hideCalculator()).toEqual(true);

      hideStub.restore();

      sinon.stub(AccuDrawPopupManager, "hideCalculator").mockReturnValue(false);
      expect(UiFramework.hideCalculator()).to.be.false;
    });

    it("showComponent/hideComponent forwards to PopupManager", () => {
      const stub = sinon
        .stub(PopupManager, "showComponent")
        .mockReturnValue(true);
      expect(
        UiFramework.showComponent(
          createElement("div", { id: "test" }, ["card content"]),
          {}
        )
      ).toEqual(true);
      stub.restore();

      sinon.stub(PopupManager, "showComponent").mockReturnValue(false);
      expect(
        UiFramework.showComponent(
          createElement("div", { id: "test" }, ["card content"]),
          {}
        )
      ).to.be.false;

      const hideStub = sinon
        .stub(PopupManager, "hideComponent")
        .mockReturnValue(true);
      expect(UiFramework.hideComponent()).toEqual(true);

      hideStub.restore();

      sinon.stub(PopupManager, "hideComponent").mockReturnValue(false);
      expect(UiFramework.hideComponent()).to.be.false;
    });

    it("hideComponent returns false if menu button with id cannot be found", () => {
      UiFramework.showComponent(createElement("div", {}, ["card content"]), {
        id: "component-1",
      });

      expect(UiFramework.hideComponent("component-1000")).to.be.false;
      expect(UiFramework.hideComponent("component-1")).toEqual(true);
    });

    it("showAngleEditor forwards to AccuDrawPopupManager", () => {
      const stub = sinon
        .stub(AccuDrawPopupManager, "showAngleEditor")
        .returns(true);
      expect(
        UiFramework.showAngleEditor(
          23,
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      ).toEqual(true);

      stub.restore();

      sinon
        .stub(AccuDrawPopupManager, "showAngleEditor")
        .mockReturnValue(false);
      expect(
        UiFramework.showAngleEditor(
          23,
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      ).to.be.false;
    });

    it("showInputEditor/hideImportEditor forwards to PopupManager", () => {
      sinon.stub(PopupManager, "showInputEditor").mockReturnValue(true);
      expect(
        UiFramework.showInputEditor({
          initialValue: 2,
          location: { x: 0, y: 0 },
          onCancel: () => {},
          onCommit: (_: any) => {},
          propertyDescription: {
            typename: "",
            name: "test",
            displayLabel: "test",
          },
        })
      ).toEqual(true);

      const hideStub = sinon
        .stub(PopupManager, "hideInputEditor")
        .returns(true);
      expect(UiFramework.hideInputEditor()).toEqual(true);

      hideStub.restore();
      sinon.stub(PopupManager, "hideInputEditor").mockReturnValue(false);
      expect(UiFramework.hideInputEditor()).to.be.false;
    });

    it("showDimensionEditor(height) forwards to AccuDrawPopupManager", () => {
      const lengthStub = sinon
        .stub(AccuDrawPopupManager, "showLengthEditor")
        .returns(true);
      const heightStub = sinon
        .stub(AccuDrawPopupManager, "showHeightEditor")
        .returns(true);
      expect(
        UiFramework.showDimensionEditor(
          "length",
          23,
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      ).toEqual(true);

      expect(lengthStub.calledOnce).toEqual(true);
      expect(heightStub.called).to.be.false;
      lengthStub.restore();

      sinon
        .stub(AccuDrawPopupManager, "showDimensionEditor")
        .mockReturnValue(false);
      expect(
        UiFramework.showDimensionEditor(
          "length",
          23,
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      ).to.be.false;

      expect(lengthStub.calledOnce).toEqual(true);
      expect(heightStub.called).to.be.false;
    });

    it("showDimensionEditor(length) forwards to AccuDrawPopupManager", () => {
      const lengthStub = sinon
        .stub(AccuDrawPopupManager, "showLengthEditor")
        .returns(true);
      const heightStub = sinon
        .stub(AccuDrawPopupManager, "showHeightEditor")
        .returns(true);
      expect(
        UiFramework.showDimensionEditor(
          "height",
          23,
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      ).toEqual(true);

      expect(lengthStub.called).to.be.false;
      expect(heightStub.calledOnce).toEqual(true);
      heightStub.restore();

      sinon
        .stub(AccuDrawPopupManager, "showDimensionEditor")
        .mockReturnValue(false);
      expect(
        UiFramework.showDimensionEditor(
          "height",
          23,
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      ).to.be.false;

      expect(lengthStub.called).to.be.false;
      expect(heightStub.calledOnce).toEqual(true);
    });

    it("openDialog calls the appropriate UiFramework.dialogs open method", () => {
      const UiDataProvidedDialogMock =
        moq.Mock.ofType<DialogLayoutDataProvider>();
      let isModal = true;
      const internalModalStub = sinon.stub(InternalModalDialogManager, "open");
      const internalModalessStub = sinon.stub(
        InternalModelessDialogManager,
        "open"
      );
      expect(
        UiFramework.openDialog(
          UiDataProvidedDialogMock.object,
          "My Dialog",
          isModal,
          "one"
        )
      ).toEqual(true);
      expect(internalModalStub.calledOnce).toEqual(true);
      expect(internalModalessStub.called).to.be.false;

      internalModalStub.resetHistory();
      internalModalessStub.resetHistory();

      isModal = false;
      expect(
        UiFramework.openDialog(
          UiDataProvidedDialogMock.object,
          "My Dialog",
          isModal,
          "one"
        )
      ).toEqual(true);
      expect(internalModalStub.called).to.be.false;
      expect(internalModalessStub.calledOnce).toEqual(true);
    });

    it("closeDialog calls the modelless close method, and model close method if needed", () => {
      const UiDataProvidedDialogMock =
        moq.Mock.ofType<DialogLayoutDataProvider>();
      const internalModalStub = sinon.spy(InternalModalDialogManager, "close");
      const internalModalessStub = sinon.spy(
        InternalModelessDialogManager,
        "close"
      );

      let isModal = true;
      expect(
        UiFramework.openDialog(
          UiDataProvidedDialogMock.object,
          "My Dialog",
          isModal,
          "one"
        )
      ).toEqual(true);
      expect(UiFramework.closeDialog("one")).toEqual(true);
      expect(internalModalStub.calledOnce).toEqual(true);
      expect(internalModalessStub.called).to.be.false;

      internalModalStub.resetHistory();
      internalModalessStub.resetHistory();

      isModal = false;
      expect(
        UiFramework.openDialog(
          UiDataProvidedDialogMock.object,
          "My Dialog",
          isModal,
          "one"
        )
      ).toEqual(true);
      expect(UiFramework.closeDialog("one")).toEqual(true);
      expect(internalModalStub.called).to.be.false;
      expect(internalModalessStub.calledOnce).toEqual(true);
    });

    it("showKeyinPalette/hideKeyinPalette forwards to PopupManager", () => {
      const stub = sinon.spy(PopupManager, "showKeyinPalette");
      expect(UiFramework.showKeyinPalette([])).toEqual(true);
      expect(stub.calledOnce).toEqual(true);

      const hideStub = sinon.spy(PopupManager, "hideKeyinPalette");
      expect(UiFramework.hideKeyinPalette()).toEqual(true);
      expect(hideStub.calledOnce).toEqual(true);
      expect(UiFramework.hideKeyinPalette()).to.be.false; // cannot hide if not shown
    });
  });

  // before we can test setting scope to a valid scope id we must make sure Presentation Manager is initialized.
  describe("Requires Presentation", () => {
    const shutdownIModelApp = async () => {
      if (IModelApp.initialized) await IModelApp.shutdown();
    };

    beforeEach(async () => {
      await shutdownIModelApp();
    });

    describe("initialize and setActiveSelectionScope", () => {
      it("creates manager instances", async () => {
        await TestUtils.initializeUiFramework();
        UiFramework.setActiveSelectionScope("element");
        TestUtils.terminateUiFramework();

        await shutdownIModelApp();
      });
    });
  });

  describe("ConnectionEvents", () => {
    const imodelToken: IModelRpcProps = { key: "" };
    const imodelMock = moq.Mock.ofType<IModelConnection>();
    let ss: SelectionSet;

    beforeEach(async () => {
      await TestUtils.initializeUiFramework(false);

      imodelMock.reset();
      imodelMock
        .setup((x) => x.getRpcProps())
        .mockReturnValue(() => imodelToken);

      ss = new SelectionSet(imodelMock.object);
      imodelMock.setup((x) => x.selectionSet).mockReturnValue(() => ss);
    });

    afterEach(() => {
      TestUtils.terminateUiFramework();
    });

    it("SessionState setIModelConnection", async () => {
      UiFramework.setIModelConnection(imodelMock.object);
      expect(UiFramework.getIModelConnection()).toEqual(imodelMock.object);
    });
  });
});
