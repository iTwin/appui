/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import * as React from "react";
import { render } from "@testing-library/react";
import type { ConfigurableCreateInfo } from "../../appui-react";
import {
  ContentControl,
  ContentGroup,
  ContentLayout,
  ContentLayoutDef,
  UiFramework,
} from "../../appui-react";
import { TestFrontstage } from "../frontstage/FrontstageTestUtils";
import TestUtils, { storageMock } from "../TestUtils";
import { LocalStateStorage } from "@itwin/core-react";
import { StandardContentLayouts } from "@itwin/appui-abstract";
import {
  INACTIVITY_TIME_DEFAULT,
  InternalUiShowHideManager,
  UiShowHideSettingsProvider,
} from "../../appui-react/utils/InternalUiShowHideManager";

describe("UiShowHideManager localStorage Wrapper", () => {
  const localStorageToRestore = Object.getOwnPropertyDescriptor(
    window,
    "localStorage"
  )!;
  const localStorageMock = storageMock();

  beforeAll(async () => {
    Object.defineProperty(window, "localStorage", {
      get: () => localStorageMock,
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "localStorage", localStorageToRestore);
  });

  describe("UiShowHideManager", () => {
    beforeEach(async () => {
      await TestUtils.initializeUiFramework();
    });

    afterEach(() => {
      TestUtils.terminateUiFramework();
    });

    describe("getters and setters", () => {
      it("autoHideUi should return default of true", () => {
        expect(InternalUiShowHideManager.autoHideUi).to.be.true;
      });

      it("autoHideUi should set & return correct value", () => {
        InternalUiShowHideManager.autoHideUi = true;
        expect(InternalUiShowHideManager.autoHideUi).to.be.true;
        InternalUiShowHideManager.autoHideUi = false;
        expect(InternalUiShowHideManager.autoHideUi).to.be.false;
      });

      it("showHidePanels should return default of false", () => {
        expect(InternalUiShowHideManager.showHidePanels).to.be.false;
      });

      it("showHidePanels should set & return correct value", () => {
        const spyMethod = vi.fn();
        const remove = UiFramework.onUiVisibilityChanged.addListener(spyMethod);

        InternalUiShowHideManager.showHidePanels = true;
        expect(InternalUiShowHideManager.showHidePanels).to.be.true;
        expect(spyMethod).toHaveBeenCalledOnce();

        InternalUiShowHideManager.showHidePanels = false;
        expect(InternalUiShowHideManager.showHidePanels).to.be.false;
        expect(spyMethod).toBeCalledTimes(2);

        remove();
      });

      it("showHideFooter should return default of false", () => {
        expect(InternalUiShowHideManager.showHideFooter).to.be.false;
      });

      it("showHideFooter should set & return correct value", () => {
        const spyMethod = vi.fn();
        const remove = UiFramework.onUiVisibilityChanged.addListener(spyMethod);

        InternalUiShowHideManager.showHideFooter = true;
        expect(InternalUiShowHideManager.showHideFooter).to.be.true;
        expect(spyMethod).toHaveBeenCalledOnce();

        InternalUiShowHideManager.showHideFooter = false;
        expect(InternalUiShowHideManager.showHideFooter).to.be.false;
        expect(spyMethod).toBeCalledTimes(2);

        remove();
      });

      it("useProximityOpacity should return default of false", () => {
        expect(InternalUiShowHideManager.useProximityOpacity).to.be.false;
      });

      it("useProximityOpacity should set & return correct value", () => {
        const spyMethod = vi.fn();
        const remove = UiFramework.onUiVisibilityChanged.addListener(spyMethod);

        InternalUiShowHideManager.useProximityOpacity = false;
        expect(InternalUiShowHideManager.useProximityOpacity).to.be.false;
        expect(spyMethod).toHaveBeenCalledOnce();

        InternalUiShowHideManager.useProximityOpacity = true;
        expect(InternalUiShowHideManager.useProximityOpacity).to.be.true;
        expect(spyMethod).toBeCalledTimes(2);

        remove();
      });

      it("snapWidgetOpacity should return default of false", () => {
        expect(InternalUiShowHideManager.snapWidgetOpacity).to.be.false;
      });

      it("snapWidgetOpacity should set & return correct value", () => {
        const spyMethod = vi.fn();
        const remove = UiFramework.onUiVisibilityChanged.addListener(spyMethod);

        InternalUiShowHideManager.snapWidgetOpacity = true;
        expect(InternalUiShowHideManager.snapWidgetOpacity).to.be.true;
        expect(spyMethod).toHaveBeenCalledOnce();

        InternalUiShowHideManager.snapWidgetOpacity = false;
        expect(InternalUiShowHideManager.snapWidgetOpacity).to.be.false;
        expect(spyMethod).toBeCalledTimes(2);

        remove();
      });

      it("inactivityTime should return default", () => {
        expect(InternalUiShowHideManager.inactivityTime).to.eq(
          INACTIVITY_TIME_DEFAULT
        );
      });

      it("inactivityTime should set & return correct value", () => {
        const testValue = 10000;
        InternalUiShowHideManager.inactivityTime = testValue;
        expect(InternalUiShowHideManager.inactivityTime).to.eq(testValue);
      });
    });

    describe("Frontstage Activate", () => {
      it("activating Frontstage should show UI", async () => {
        UiFramework.setIsUiVisible(false);
        expect(InternalUiShowHideManager.isUiVisible).to.eq(false);
        InternalUiShowHideManager.autoHideUi = true;

        const frontstageProvider = new TestFrontstage();
        UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
        const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
          frontstageProvider.id
        );
        await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);

        await TestUtils.flushAsyncOperations();
        expect(InternalUiShowHideManager.isUiVisible).to.eq(true);
      });
    });

    describe("Content Mouse Events", () => {
      class TestContentControl extends ContentControl {
        constructor(info: ConfigurableCreateInfo, options: any) {
          super(info, options);

          this.reactNode = <div>Test</div>;
        }
      }

      const myContentGroup: ContentGroup = new ContentGroup({
        id: "test-group",
        layout: StandardContentLayouts.singleView,
        contents: [{ id: "myContent", classId: TestContentControl }],
      });

      const myContentLayout: ContentLayoutDef = new ContentLayoutDef({
        id: "SingleContent",
        description: "UiFramework:tests.singleContent",
      });

      it("Mouse move in content view should show the UI then hide after inactivity", () => {
        const fakeTimers = vi.useFakeTimers();
        UiFramework.setIsUiVisible(false);
        InternalUiShowHideManager.autoHideUi = true;
        InternalUiShowHideManager.inactivityTime = 20;
        expect(InternalUiShowHideManager.isUiVisible).to.eq(false);

        const component = render(
          <ContentLayout
            contentGroup={myContentGroup}
            contentLayout={myContentLayout}
          />
        );
        const container = component.getByTestId("single-content-container");
        container.dispatchEvent(
          new MouseEvent("mousemove", {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );

        fakeTimers.advanceTimersByTime(0);
        expect(InternalUiShowHideManager.isUiVisible).to.eq(true);

        fakeTimers.advanceTimersByTime(1000);
        fakeTimers.restoreAllMocks();
        expect(InternalUiShowHideManager.isUiVisible).to.eq(false);
      });

      it("Mouse move in content view should do nothing if autoHideUi is off", async () => {
        UiFramework.setIsUiVisible(false);
        InternalUiShowHideManager.autoHideUi = false;
        expect(InternalUiShowHideManager.isUiVisible).to.eq(false);

        const component = render(
          <ContentLayout
            contentGroup={myContentGroup}
            contentLayout={myContentLayout}
          />
        );
        const container = component.getByTestId("single-content-container");
        container.dispatchEvent(
          new MouseEvent("mousemove", {
            bubbles: true,
            cancelable: true,
            view: window,
          })
        );

        await TestUtils.flushAsyncOperations();
        expect(InternalUiShowHideManager.isUiVisible).to.eq(false);
      });
    });

    describe("Widget Mouse Events", () => {
      it("Mouse enter in widget should show the UI", async () => {
        UiFramework.setIsUiVisible(false);
        InternalUiShowHideManager.autoHideUi = true;
        expect(InternalUiShowHideManager.isUiVisible).to.eq(false);

        // const component = render(<ContentLayout contentGroup={myContentGroup} contentLayout={myContentLayout} />);
        // const container = component.getByTestId("single-content-container");
        // container.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true, cancelable: true, view: window }));

        // TEMP
        InternalUiShowHideManager.handleWidgetMouseEnter();

        await TestUtils.flushAsyncOperations();
        expect(InternalUiShowHideManager.isUiVisible).to.eq(true);
      });

      it("Mouse enter in widget should do nothing if autoHideUi is off", async () => {
        UiFramework.setIsUiVisible(false);
        InternalUiShowHideManager.autoHideUi = false;
        expect(InternalUiShowHideManager.isUiVisible).to.eq(false);

        // const component = render(<ContentLayout contentGroup={myContentGroup} contentLayout={myContentLayout} />);
        // const container = component.getByTestId("single-content-container");
        // container.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true, cancelable: true, view: window }));

        // TEMP
        InternalUiShowHideManager.handleWidgetMouseEnter();

        await TestUtils.flushAsyncOperations();
        expect(InternalUiShowHideManager.isUiVisible).to.eq(false);
      });
    });
  });

  describe("UiShowHideSettingsProvider ", () => {
    it("should get and set defaults", async () => {
      const settingsStorage = new LocalStateStorage();
      await UiShowHideSettingsProvider.storeAutoHideUi(false, settingsStorage);
      await UiShowHideSettingsProvider.storeUseProximityOpacity(
        false,
        settingsStorage
      );
      await UiShowHideSettingsProvider.storeSnapWidgetOpacity(
        false,
        settingsStorage
      );
      await TestUtils.initializeUiFramework();

      const uiShowHideSettingsProvider = new UiShowHideSettingsProvider();
      await uiShowHideSettingsProvider.loadUserSettings(
        UiFramework.getUiStateStorage()
      );

      expect(InternalUiShowHideManager.autoHideUi).to.eq(false);
      expect(InternalUiShowHideManager.useProximityOpacity).to.eq(false);
      expect(InternalUiShowHideManager.snapWidgetOpacity).to.eq(false);

      InternalUiShowHideManager.setAutoHideUi(true);
      InternalUiShowHideManager.setUseProximityOpacity(true);
      InternalUiShowHideManager.setSnapWidgetOpacity(true);
      expect(InternalUiShowHideManager.autoHideUi).to.eq(true);
      expect(InternalUiShowHideManager.useProximityOpacity).to.eq(true);
      expect(InternalUiShowHideManager.snapWidgetOpacity).to.eq(true);

      TestUtils.terminateUiFramework();
    });
  });
});
