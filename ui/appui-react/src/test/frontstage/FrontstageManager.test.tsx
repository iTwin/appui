/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as moq from "typemoq";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { Logger } from "@itwin/core-bentley";
import { Size } from "@itwin/core-react";
import type {
  IModelConnection,
  ScreenViewport,
  SpatialViewState,
} from "@itwin/core-frontend";
import { IModelApp } from "@itwin/core-frontend";
import {
  ConfigurableCreateInfo,
  ConfigurableUiContent,
  ContentGroup,
  ContentLayoutDef,
  CoreTools,
  FrontstageDef,
  RestoreFrontstageLayoutTool,
  SettingsModalFrontstage,
  ThemeManager,
  ToolUiProvider,
  UiFramework,
  WidgetState,
} from "../../appui-react";
import TestUtils, { storageMock } from "../TestUtils";
import {
  TestFrontstage,
  TestFrontstage2,
  TestFrontstage3,
} from "./FrontstageTestUtils";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager";

const mySessionStorage = storageMock();

const propertyDescriptorToRestore = Object.getOwnPropertyDescriptor(
  window,
  "sessionStorage"
)!;

describe("FrontstageManager", () => {
  beforeEach(async () => {
    Object.defineProperty(window, "sessionStorage", {
      get: () => mySessionStorage,
    });

    InternalFrontstageManager.initialize();
    InternalFrontstageManager.clearFrontstages();
  });

  afterEach(async () => {
    Object.defineProperty(
      window,
      "sessionStorage",
      propertyDescriptorToRestore
    );
  });

  it("initialized should return true", () => {
    expect(InternalFrontstageManager.isInitialized).toEqual(true);
  });

  it("findWidget should return undefined when no active frontstage", async () => {
    await InternalFrontstageManager.setActiveFrontstageDef(undefined);
    expect(InternalFrontstageManager.findWidget("xyz")).toEqual(undefined);
  });
  it("setActiveFrontstage should set active frontstage", async () => {
    const frontstageProvider = new TestFrontstage();
    InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
    expect(
      InternalFrontstageManager.hasFrontstage(frontstageProvider.id)
    ).toEqual(true);
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(
      frontstageProvider.id
    );

    expect(frontstageDef).toBeTruthy();
    expect(InternalFrontstageManager.hasFrontstage(frontstageDef!.id)).toEqual(
      true
    );
    await InternalFrontstageManager.setActiveFrontstage(frontstageDef!.id);
    expect(InternalFrontstageManager.activeFrontstageId).toEqual(
      frontstageDef!.id
    );
  });

  it("getFronstageDef should return active frontstage when no id provided", async () => {
    const activeFrontstageDef = new FrontstageDef();
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => activeFrontstageDef);

    const frontstageDef = await InternalFrontstageManager.getFrontstageDef();

    expect(frontstageDef).toEqual(activeFrontstageDef);
  });

  it("hasFrontstage returns false if the fronstage is not found", () => {
    expect(InternalFrontstageManager.hasFrontstage(undefined as any)).toEqual(
      false
    );
  });

  it("setActiveModalFrontstage from backstage item", async () => {
    // since we are not really displaying modal stage add listener to mimic the close processing
    const removeListener =
      InternalFrontstageManager.onCloseModalFrontstageRequestedEvent.addListener(
        ({ stageCloseFunc }) => {
          stageCloseFunc();
        }
      );

    expect(InternalFrontstageManager.activeModalFrontstage).toEqual(undefined);
    const backstageItem = SettingsModalFrontstage.getBackstageActionItem(
      100,
      10
    );
    backstageItem.execute();
    expect(InternalFrontstageManager.activeModalFrontstage).toBeTruthy();
    InternalFrontstageManager.closeModalFrontstage();
    await TestUtils.flushAsyncOperations();

    expect(InternalFrontstageManager.activeModalFrontstage).toEqual(undefined);
    removeListener();
  });

  it("should emit onFrontstageRestoreLayoutEvent", async () => {
    const spy = vi.spyOn(
      InternalFrontstageManager.onFrontstageRestoreLayoutEvent,
      "emit"
    );

    const frontstageProvider = new TestFrontstage();
    InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(
      frontstageProvider.id
    );

    expect(InternalFrontstageManager.activeModalFrontstage).toEqual(undefined);
    expect(frontstageDef).toBeTruthy();
    if (frontstageDef) {
      await InternalFrontstageManager.setActiveFrontstage(frontstageDef.id);
      expect(InternalFrontstageManager.activeFrontstageId).toEqual(
        frontstageDef.id
      );

      const tool = new RestoreFrontstageLayoutTool();
      await tool.parseAndRun(frontstageDef.id);
      expect(spy).toHaveBeenCalledOnce();
      spy.mockReset();

      // call without id to use active stage
      await tool.parseAndRun();
      expect(spy).toHaveBeenCalledOnce();
      spy.mockReset();

      // call without invalid id
      await tool.parseAndRun("bad-id");
      expect(spy).not.toBeCalled();
    }
  });

  it("setActiveFrontstage should log Error on invalid id", async () => {
    const spy = vi.spyOn(Logger, "logError");
    await InternalFrontstageManager.setActiveFrontstage("xyz");
    expect(spy).toHaveBeenCalledOnce();
  });

  it("setActiveFrontstage should set active frontstage", async () => {
    const frontstageProvider = new TestFrontstage2();
    InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(
      frontstageProvider.id
    );

    expect(frontstageDef).toBeTruthy();
    if (frontstageDef) {
      // make sure zones defined by new names are properly placed into the proper spot in frontstageDef
      expect(frontstageDef.contentManipulation).toBeTruthy();
      expect(frontstageDef.toolSettings).toBeTruthy();
      expect(frontstageDef.statusBar).toBeTruthy();
      expect(frontstageDef.viewNavigation).toEqual(undefined);
      await InternalFrontstageManager.setActiveFrontstage(frontstageDef.id);
      expect(InternalFrontstageManager.activeFrontstageId).toEqual(
        frontstageDef.id
      );
    }
  });

  it("deactivateFrontstageDef should set active frontstage to undefined", async () => {
    const frontstageProvider = new TestFrontstage();
    InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(
      frontstageProvider.id
    );

    await InternalFrontstageManager.setActiveFrontstageDef(frontstageDef);
    expect(InternalFrontstageManager.activeFrontstageDef).toEqual(
      frontstageDef
    );

    await InternalFrontstageManager.deactivateFrontstageDef();
    expect(InternalFrontstageManager.activeFrontstageDef).toEqual(undefined);
    expect(InternalFrontstageManager.activeFrontstageId).toEqual("");
  });

  it("setActiveContentGroup should setActiveLayout if layout found", async () => {
    const contentGroup = new ContentGroup({
      id: "1",
      contents: [],
      layout: { id: "1" },
    });
    const layoutDef = new ContentLayoutDef({ id: "1" });
    vi.spyOn(UiFramework.content.layouts, "getForGroup").mockReturnValue(
      layoutDef
    );
    const spy = vi.spyOn(InternalFrontstageManager, "setActiveLayout");
    await InternalFrontstageManager.setActiveContentGroup(contentGroup);
    expect(spy).toHaveBeenCalledWith(layoutDef, contentGroup);
  });

  it("setWidgetState returns false on invalid id", () => {
    expect(
      InternalFrontstageManager.setWidgetState("xyz", WidgetState.Closed)
    ).toEqual(false);
  });

  it("setWidgetState apply state on widgetDef", () => {
    const stubbedWidget = {
      setWidgetState: vi.fn(),
    };
    vi.spyOn(UiFramework.frontstages, "findWidget").mockReturnValue(
      stubbedWidget as any
    );
    expect(
      InternalFrontstageManager.setWidgetState("xyz", WidgetState.Closed)
    ).toEqual(true);
    expect(stubbedWidget.setWidgetState).toHaveBeenCalledWith(
      WidgetState.Closed
    );
  });

  it("findWidget returns undefined on invalid id", () => {
    expect(InternalFrontstageManager.findWidget("xyz")).toEqual(undefined);
  });

  it("findWidget returns the widget from the active frontstage def", async () => {
    const frontstageProvider = new TestFrontstage();
    InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(
      frontstageProvider.id
    );

    await InternalFrontstageManager.setActiveFrontstageDef(frontstageDef);

    expect(InternalFrontstageManager.findWidget("widget3")).toBeTruthy();
    await InternalFrontstageManager.deactivateFrontstageDef();
  });

  it("FrontstageProvider supplies valid Frontstage", async () => {
    const frontstageProvider = new TestFrontstage();
    expect(InternalFrontstageManager.frontstageDefs.has(frontstageProvider.id));
    InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(
      frontstageProvider.id
    );
    expect(frontstageDef).toBeTruthy();
    expect(InternalFrontstageManager.frontstageDefs.has(frontstageProvider.id));
  });

  it("Expect cached frontstageDef to be replaced", async () => {
    const frontstageProvider = new TestFrontstage();
    InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(
      frontstageProvider.id
    );
    const newFrontstageProvider = new TestFrontstage();
    InternalFrontstageManager.addFrontstageProvider(newFrontstageProvider);
    const newFrontstageDef = await InternalFrontstageManager.getFrontstageDef(
      frontstageProvider.id
    );
    expect(newFrontstageDef).to.not.eql(frontstageDef);
  });

  it("clearFrontstages should clear frontstages and fronstageProviders", async () => {
    const frontstageProvider = new TestFrontstage();
    InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
    expect(
      InternalFrontstageManager.hasFrontstage(frontstageProvider.id)
    ).toEqual(true);
    const frontstageDef = await InternalFrontstageManager.getFrontstageDef(
      frontstageProvider.id
    );
    expect(frontstageDef).toBeTruthy();
    expect(InternalFrontstageManager.hasFrontstage(frontstageDef!.id)).toEqual(
      true
    );
    await InternalFrontstageManager.setActiveFrontstage(frontstageDef!.id);
    expect(InternalFrontstageManager.activeFrontstageId).toEqual(
      frontstageDef!.id
    );

    InternalFrontstageManager.clearFrontstages();

    expect(
      InternalFrontstageManager.hasFrontstage(frontstageProvider.id)
    ).toEqual(false);
    expect(InternalFrontstageManager.hasFrontstage(frontstageDef!.id)).toEqual(
      false
    );
    expect(InternalFrontstageManager.activeFrontstageId).toEqual("");
  });

  describe("Executing a tool should set activeToolId", () => {
    const viewportMock = moq.Mock.ofType<ScreenViewport>();

    beforeEach(async () => {
      const spatialViewStateMock = moq.Mock.ofType<SpatialViewState>();
      spatialViewStateMock.setup((view) => view.is3d()).returns(() => true);
      spatialViewStateMock
        .setup((view) => view.classFullName)
        .returns(() => "BisCore:SpatialViewDefinition");
      viewportMock.reset();
      viewportMock
        .setup((viewport) => viewport.view)
        .returns(() => spatialViewStateMock.object);

      InternalFrontstageManager.isInitialized = false;
      InternalFrontstageManager.initialize();
      await IModelApp.viewManager.setSelectedView(viewportMock.object);
    });

    it("CoreTools.selectElementCommand", async () => {
      const item = CoreTools.selectElementCommand;
      item.execute();
      await TestUtils.flushAsyncOperations();
      expect(InternalFrontstageManager.activeToolId).toEqual(item.toolId);
    });

    it("trigger tool settings reload", () => {
      class ToolUiProviderMock extends ToolUiProvider {
        constructor(info: ConfigurableCreateInfo, options: any) {
          super(info, options);
        }
      }

      const activeToolSettingsProvider = new ToolUiProviderMock(
        new ConfigurableCreateInfo("test", "test", "test"),
        undefined
      );
      vi.spyOn(
        InternalFrontstageManager,
        "activeToolSettingsProvider",
        "get"
      ).mockImplementation(() => activeToolSettingsProvider);

      UiFramework.toolSettings.onReloadToolSettingsProperties.emit();
    });
  });

  describe("ConfigurableUiContent", () => {
    beforeEach(() => {
      const imodelConnectionMock = moq.Mock.ofType<IModelConnection>();
      imodelConnectionMock
        .setup((x) => x.iModelId)
        .returns(() => "dummyImodelId");
      vi.spyOn(UiFramework, "getIModelConnection").mockImplementation(
        () => imodelConnectionMock.object
      );
    });

    it("mouse moves should be handled for frontstage tracking", async () => {
      vi.useFakeTimers();
      render(
        <Provider store={TestUtils.store}>
          <ThemeManager>
            <ConfigurableUiContent idleTimeout={100} intervalTimeout={100} />
          </ThemeManager>
        </Provider>
      );

      const divContainer = document.getElementById(
        "uifw-configurableui-wrapper"
      )!;

      const spy = vi.fn();
      InternalFrontstageManager.onFrontstageDeactivatedEvent.addListener(spy);

      const frontstageProvider = new TestFrontstage3();
      InternalFrontstageManager.addFrontstageProvider(frontstageProvider);
      const frontstageDef = await InternalFrontstageManager.getFrontstageDef(
        frontstageProvider.id
      );
      await InternalFrontstageManager.setActiveFrontstageDef(frontstageDef);
      expect(InternalFrontstageManager.activeFrontstageDef).toEqual(
        frontstageDef
      );

      vi.advanceTimersByTime(200);

      divContainer.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          cancelable: true,
          buttons: 1,
        })
      );
      divContainer.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          cancelable: true,
          buttons: 1,
        })
      );

      vi.advanceTimersByTime(200);

      divContainer.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          cancelable: true,
          buttons: 1,
        })
      );
      divContainer.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          cancelable: true,
          buttons: 1,
        })
      );

      await InternalFrontstageManager.deactivateFrontstageDef();
      expect(InternalFrontstageManager.activeFrontstageDef).toEqual(undefined);
      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe("nineZoneSize", () => {
    const nineZoneSize = InternalFrontstageManager.nineZoneSize;

    afterEach(() => {
      InternalFrontstageManager.nineZoneSize = nineZoneSize;
    });

    it("should set nineZoneSize", () => {
      InternalFrontstageManager.nineZoneSize = new Size(10, 20);
      expect(InternalFrontstageManager.nineZoneSize.width).toEqual(10);
      expect(InternalFrontstageManager.nineZoneSize.height).toEqual(20);
    });
  });
});
