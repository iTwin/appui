/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// cSpell:ignore typemoq, tabid

import * as moq from "typemoq";
import type { IModelRpcProps } from "@itwin/core-common";
import type { Id64String } from "@itwin/core-bentley";
import { Logger } from "@itwin/core-bentley";
import type { IModelConnection, ViewState } from "@itwin/core-frontend";
import { SelectionSet } from "@itwin/core-frontend";
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

  beforeEach(async () => {
    Object.defineProperty(window, "localStorage", {
      get: () => localStorageMock,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "localStorage", localStorageToRestore);
  });

  describe("UiFramework", () => {
    it("store should throw Error without initialize", () => {
      TestUtils.terminateUiFramework();
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

      const spy = vi.fn();
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
      spy.mockReset();

      // No tabid arg
      Object.defineProperty(SettingsModalFrontstage, "showSettingsStage", {
        get: () => handleOpenSetting2,
      });
      await tool.parseAndRun();
      expect(spy).toHaveBeenCalledOnce();
      spy.mockReset();

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
      TestUtils.terminateUiFramework();
      const spyLogger = vi.spyOn(Logger, "logInfo");
      expect(UiFramework.initialized).toEqual(false);
      await UiFramework.initialize(TestUtils.store);
      expect(UiFramework.initialized).toEqual(true);
      await UiFramework.initialize(TestUtils.store);
      expect(spyLogger).toHaveBeenCalledOnce();
    });

    it("test default frameworkState key", async () => {
      expect(UiFramework.frameworkStateKey).to.equal("frameworkState");
    });

    it("IsUiVisible", async () => {
      UiFramework.setIsUiVisible(false);
      expect(UiFramework.getIsUiVisible()).toEqual(false);
    });

    it("ColorTheme", async () => {
      await TestUtils.initializeUiFramework();
      UiFramework.setColorTheme(ColorTheme.Dark);
      expect(UiFramework.getColorTheme()).toEqual(ColorTheme.Dark);
    });

    it("test selection scope state data", async () => {
      expect(UiFramework.getActiveSelectionScope()).to.equal("element");
      const scopes = UiFramework.getAvailableSelectionScopes();
      expect(scopes.length).to.be.greaterThan(0);

      // since "file" is not a valid scope the active scope should still be element
      UiFramework.setActiveSelectionScope("file");
      expect(UiFramework.getActiveSelectionScope()).to.equal("element");
    });

    it("WidgetOpacity", async () => {
      await TestUtils.initializeUiFramework(true);
      const testValue = 0.5;
      UiFramework.setWidgetOpacity(testValue);
      expect(UiFramework.getWidgetOpacity()).toEqual(testValue);
    });

    it("ActiveIModelId", async () => {
      const testValue = "Test";
      UiFramework.setActiveIModelId(testValue);
      expect(UiFramework.getActiveIModelId()).toEqual(testValue);
    });

    class testSettingsProvider implements UserSettingsProvider {
      public readonly providerId = "testSettingsProvider";
      public settingsLoaded = false;
      public async loadUserSettings(storage: UiStateStorage) {
        if (storage) this.settingsLoaded = true;
      }
    }

    it("SessionState setters/getters", async () => {
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

      expect(settingsProvider.settingsLoaded).toEqual(false);

      const uisettings = new LocalStateStorage();
      await UiFramework.setUiStateStorage(uisettings);
      expect(UiFramework.getUiStateStorage()).toEqual(uisettings);
      expect(settingsProvider.settingsLoaded).toEqual(true);
      settingsProvider.settingsLoaded = false;
      // if we try to set storage to same object this should be a noop and the settingsLoaded property should remain false;
      await UiFramework.setUiStateStorage(uisettings);
      expect(settingsProvider.settingsLoaded).toEqual(false);

      await UiFramework.initializeStateFromUserSettingsProviders();

      const useDragInteraction = true;
      UiFramework.setUseDragInteraction(useDragInteraction);
      expect(UiFramework.useDragInteraction).to.eql(useDragInteraction);

      UiFramework.closeCursorMenu();
      expect(UiFramework.getCursorMenuData()).toEqual(undefined);

      const menuData: CursorMenuPayload = {
        items: [],
        position: { x: 100, y: 100 },
      };
      UiFramework.openCursorMenu(menuData);
      expect(UiFramework.getCursorMenuData()).toBeTruthy();

      const viewState = moq.Mock.ofType<ViewState>();
      UiFramework.setDefaultViewState(viewState.object);
      expect(UiFramework.getDefaultViewState()).toBeTruthy();

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
      const stub = vi.spyOn(PopupManager, "displayCard").mockReturnValue(true);
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
      stub.mockReset();

      vi.spyOn(PopupManager, "displayCard").mockReturnValue(false);
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
      ).toEqual(false);

      const hideStub = vi.spyOn(PopupManager, "hideCard").mockReturnValue(true);
      expect(UiFramework.hideCard()).toEqual(true);

      hideStub.mockReset();

      vi.spyOn(PopupManager, "hideCard").mockReturnValue(false);
      expect(UiFramework.hideCard()).toEqual(false);
    });

    it("openToolSettingsPopup/closeToolSettingsPopup forwards to PopupManager", () => {
      const dataProviderMock = moq.Mock.ofType<DialogLayoutDataProvider>();
      const stub = vi
        .spyOn(PopupManager, "openToolSettings")
        .mockReturnValue(true);
      expect(
        UiFramework.openToolSettingsPopup(
          dataProviderMock.object,
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          () => {}
        )
      ).toEqual(true);
      stub.mockReset();

      vi.spyOn(PopupManager, "openToolSettings").mockReturnValue(false);
      expect(
        UiFramework.openToolSettingsPopup(
          dataProviderMock.object,
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          () => {}
        )
      ).toEqual(false);

      const hideStub = vi
        .spyOn(PopupManager, "closeToolSettings")
        .mockReturnValue(true);
      expect(UiFramework.closeToolSettingsPopup()).toEqual(true);

      hideStub.mockReset();

      vi.spyOn(PopupManager, "closeToolSettings").mockReturnValue(false);
      expect(UiFramework.closeToolSettingsPopup()).toEqual(false);
    });

    it("showToolbar/hideToolbar forwards to PopupManager", () => {
      const stub = vi
        .spyOn(PopupManager, "displayToolbar")
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
      stub.mockReset();

      const hideStub = vi
        .spyOn(PopupManager, "hideToolbar")
        .mockReturnValue(true);
      expect(UiFramework.hideToolbar()).toEqual(true);

      hideStub.mockReset();

      vi.spyOn(PopupManager, "hideToolbar").mockReturnValue(false);
      expect(UiFramework.hideToolbar()).toEqual(false);
    });

    it("showMenuButton/hideMenuButton forwards to AccuDrawPopupManager", () => {
      const stub = vi
        .spyOn(AccuDrawPopupManager, "showMenuButton")
        .mockReturnValue(true);
      expect(UiFramework.showMenuButton("test", [], { x: 0, y: 0 })).toEqual(
        true
      );
      stub.mockReset();

      vi.spyOn(AccuDrawPopupManager, "showMenuButton").mockReturnValue(false);
      expect(UiFramework.showMenuButton("test", [], { x: 0, y: 0 })).toEqual(
        false
      );

      const hideStub = vi
        .spyOn(AccuDrawPopupManager, "hideMenuButton")
        .mockReturnValue(true);
      expect(UiFramework.hideMenuButton("test")).toEqual(true);

      hideStub.mockReset();

      vi.spyOn(AccuDrawPopupManager, "hideMenuButton").mockReturnValue(false);
      expect(UiFramework.hideMenuButton("test")).toEqual(false);
    });

    it("hideMenuButton returns false if menu button with id cannot be found", () => {
      const htmlElement = document.createElement<any>("div");
      UiFramework.showMenuButton("test", [], { x: 0, y: 0 }, htmlElement);

      expect(UiFramework.hideMenuButton("test2")).toEqual(false);
      expect(UiFramework.hideMenuButton("test")).toEqual(true);
    });

    it("showCalculator/hideCalculator forwards to AccuDrawPopupManager", () => {
      const stub = vi
        .spyOn(AccuDrawPopupManager, "showCalculator")
        .mockReturnValue(true);
      expect(
        UiFramework.showCalculator(
          23,
          "icon-string",
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      ).toEqual(true);

      stub.mockReset();

      vi.spyOn(AccuDrawPopupManager, "showCalculator").mockReturnValue(false);
      expect(
        UiFramework.showCalculator(
          23,
          "icon-string",
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      ).toEqual(false);

      const hideStub = vi
        .spyOn(AccuDrawPopupManager, "hideCalculator")
        .mockReturnValue(true);
      expect(UiFramework.hideCalculator()).toEqual(true);

      hideStub.mockReset();

      vi.spyOn(AccuDrawPopupManager, "hideCalculator").mockReturnValue(false);
      expect(UiFramework.hideCalculator()).toEqual(false);
    });

    it("showComponent/hideComponent forwards to PopupManager", () => {
      const stub = vi
        .spyOn(PopupManager, "showComponent")
        .mockReturnValue(true);
      expect(
        UiFramework.showComponent(
          createElement("div", { id: "test" }, ["card content"]),
          {}
        )
      ).toEqual(true);
      stub.mockReset();

      vi.spyOn(PopupManager, "showComponent").mockReturnValue(false);
      expect(
        UiFramework.showComponent(
          createElement("div", { id: "test" }, ["card content"]),
          {}
        )
      ).toEqual(false);

      const hideStub = vi
        .spyOn(PopupManager, "hideComponent")
        .mockReturnValue(true);
      expect(UiFramework.hideComponent()).toEqual(true);

      hideStub.mockReset();

      vi.spyOn(PopupManager, "hideComponent").mockReturnValue(false);
      expect(UiFramework.hideComponent()).toEqual(false);
    });

    it("hideComponent returns false if menu button with id cannot be found", () => {
      UiFramework.showComponent(createElement("div", {}, ["card content"]), {
        id: "component-1",
      });

      expect(UiFramework.hideComponent("component-1000")).toEqual(false);
      expect(UiFramework.hideComponent("component-1")).toEqual(true);
    });

    it("showAngleEditor forwards to AccuDrawPopupManager", () => {
      const stub = vi
        .spyOn(AccuDrawPopupManager, "showAngleEditor")
        .mockReturnValue(true);
      expect(
        UiFramework.showAngleEditor(
          23,
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      ).toEqual(true);

      stub.mockReset();

      vi.spyOn(AccuDrawPopupManager, "showAngleEditor").mockReturnValue(false);
      expect(
        UiFramework.showAngleEditor(
          23,
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      ).toEqual(false);
    });

    it("showInputEditor/hideImportEditor forwards to PopupManager", () => {
      vi.spyOn(PopupManager, "showInputEditor").mockReturnValue(true);
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

      const hideStub = vi
        .spyOn(PopupManager, "hideInputEditor")
        .mockReturnValue(true);
      expect(UiFramework.hideInputEditor()).toEqual(true);

      hideStub.mockReset();
      vi.spyOn(PopupManager, "hideInputEditor").mockReturnValue(false);
      expect(UiFramework.hideInputEditor()).toEqual(false);
    });

    it("showDimensionEditor(height) forwards to AccuDrawPopupManager", () => {
      const lengthStub = vi
        .spyOn(AccuDrawPopupManager, "showLengthEditor")
        .mockReturnValue(true);
      const heightStub = vi
        .spyOn(AccuDrawPopupManager, "showHeightEditor")
        .mockReturnValue(true);
      expect(
        UiFramework.showDimensionEditor(
          "length",
          23,
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      ).toEqual(true);

      expect(lengthStub).toHaveBeenCalledOnce();
      expect(heightStub).not.toBeCalled();
      lengthStub.mockReset();

      expect(
        UiFramework.showDimensionEditor(
          "length",
          23,
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      );

      expect(lengthStub).toHaveBeenCalledOnce();
      expect(heightStub).not.toBeCalled();
    });

    it("showDimensionEditor(length) forwards to AccuDrawPopupManager", () => {
      const lengthStub = vi
        .spyOn(AccuDrawPopupManager, "showLengthEditor")
        .mockReturnValue(true);
      const heightStub = vi
        .spyOn(AccuDrawPopupManager, "showHeightEditor")
        .mockReturnValue(true);
      expect(
        UiFramework.showDimensionEditor(
          "height",
          23,
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      ).toEqual(true);

      expect(lengthStub).not.toBeCalled();
      expect(heightStub).toHaveBeenCalledOnce();
      heightStub.mockReset();

      expect(
        UiFramework.showDimensionEditor(
          "height",
          23,
          { x: 0, y: 0 },
          () => {},
          () => {}
        )
      );

      expect(lengthStub).not.toBeCalled();
      expect(heightStub).toHaveBeenCalledOnce();
    });

    it("openDialog calls the appropriate UiFramework.dialogs open method", () => {
      const UiDataProvidedDialogMock =
        moq.Mock.ofType<DialogLayoutDataProvider>();
      let isModal = true;
      const internalModalStub = vi.spyOn(InternalModalDialogManager, "open");
      const internalModalessStub = vi.spyOn(
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
      expect(internalModalStub).toHaveBeenCalledOnce();
      expect(internalModalessStub).not.toBeCalled();

      internalModalStub.mockReset();
      internalModalessStub.mockReset();

      isModal = false;
      expect(
        UiFramework.openDialog(
          UiDataProvidedDialogMock.object,
          "My Dialog",
          isModal,
          "one"
        )
      ).toEqual(true);
      expect(internalModalStub).not.toBeCalled();
      expect(internalModalessStub).toHaveBeenCalledOnce();
    });

    it("closeDialog calls the modelless close method, and model close method if needed", () => {
      const UiDataProvidedDialogMock =
        moq.Mock.ofType<DialogLayoutDataProvider>();
      const internalModalStub = vi.spyOn(InternalModalDialogManager, "close");
      const internalModalessStub = vi.spyOn(
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
      expect(internalModalStub).toHaveBeenCalledOnce();
      expect(internalModalessStub).not.toBeCalled();

      internalModalStub.mockReset();
      internalModalessStub.mockReset();

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
      expect(internalModalStub).not.toBeCalled();
      expect(internalModalessStub).toHaveBeenCalledOnce();
    });

    it("showKeyinPalette/hideKeyinPalette forwards to PopupManager", () => {
      const stub = vi.spyOn(PopupManager, "showKeyinPalette");
      expect(UiFramework.showKeyinPalette([])).toEqual(true);
      expect(stub).toHaveBeenCalledOnce();

      const hideStub = vi.spyOn(PopupManager, "hideKeyinPalette");
      expect(UiFramework.hideKeyinPalette()).toEqual(true);
      expect(hideStub).toHaveBeenCalledOnce();
      expect(UiFramework.hideKeyinPalette()).toEqual(false); // cannot hide if not shown
    });
  });

  describe("ConnectionEvents", () => {
    const imodelToken: IModelRpcProps = { key: "" };
    const imodelMock = moq.Mock.ofType<IModelConnection>();
    let ss: SelectionSet;

    beforeEach(async () => {
      imodelMock.reset();
      imodelMock.setup((x) => x.getRpcProps()).returns(() => imodelToken);

      ss = new SelectionSet(imodelMock.object);
      imodelMock.setup((x) => x.selectionSet).returns(() => ss);
    });

    it("SessionState setIModelConnection", async () => {
      UiFramework.setIModelConnection(imodelMock.object);
      expect(UiFramework.getIModelConnection()).toEqual(imodelMock.object);
    });
  });
});
