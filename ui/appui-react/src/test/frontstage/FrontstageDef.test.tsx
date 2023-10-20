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
import * as sinon from "sinon";
import produce from "immer";
import {
  addFloatingWidget,
  addPanelWidget,
  addPopoutWidget,
  addTab,
  createNineZoneState,
} from "@itwin/appui-layout-react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { act, renderHook } from "@testing-library/react-hooks";
import type {
  FrontstageConfig,
  UiItemsProvider,
  Widget,
} from "../../appui-react";
import {
  FrontstageDef,
  FrontstageProvider,
  initializeNineZoneState,
  StagePanelDef,
  StagePanelLocation,
  StagePanelSection,
  UiFramework,
  UiItemsManager,
  useSpecificWidgetDef,
  WidgetDef,
  WidgetState,
} from "../../appui-react";
import TestUtils, { storageMock } from "../TestUtils";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager";

class BadLayoutFrontstage extends FrontstageProvider {
  public static stageId = "BadLayout";
  public get id(): string {
    return BadLayoutFrontstage.stageId;
  }

  public override frontstageConfig(): FrontstageConfig {
    return {
      id: this.id,
      version: 1,
      contentGroup: TestUtils.TestContentGroup1,
    };
  }
}

class BadGroupFrontstage extends FrontstageProvider {
  public static stageId = "BadGroup";
  public get id(): string {
    return BadGroupFrontstage.stageId;
  }

  public override frontstageConfig(): FrontstageConfig {
    return {
      id: this.id,
      version: 1,
      contentGroup: TestUtils.TestContentGroup1,
    };
  }
}

export const defaultFrontstageConfig: FrontstageConfig = {
  id: "test-frontstage",
  contentGroup: TestUtils.TestContentGroup1,
  version: 1,
};

describe("FrontstageDef", () => {
  const localStorageToRestore = Object.getOwnPropertyDescriptor(
    window,
    "localStorage"
  )!;
  const localStorageMock = storageMock();

  beforeAll(async () => {
    Object.defineProperty(window, "localStorage", {
      get: () => localStorageMock,
    });
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();
  });

  afterAll(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
    Object.defineProperty(window, "localStorage", localStorageToRestore);
  });

  it("setActiveFrontstage should throw Error on invalid content layout", async () => {
    const frontstageProvider = new BadLayoutFrontstage();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    await expect(
      UiFramework.frontstages.setActiveFrontstage("BadLayout")
    ).rejects.toBe(Error);
  });

  it("setActiveFrontstage should throw Error on invalid content group", async () => {
    const frontstageProvider = new BadGroupFrontstage();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    await expect(
      UiFramework.frontstages.setActiveFrontstage("BadGroup")
    ).rejects.toBe(Error);
  });

  it("should be able to determine if widget is visible", async () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1");
    state = addTab(state, "t2");
    state = addTab(state, "t3");
    state = addTab(state, "t4");
    state = addTab(state, "t5");
    state = addPopoutWidget(state, "fw1", ["t1"]);
    state = addPanelWidget(state, "right", "rightMiddle", ["t2"]);
    state = addPanelWidget(state, "right", "rightEnd", ["t3"]);
    state = addFloatingWidget(state, "fw2", ["t4"]);

    const frontstageDef = new FrontstageDef();
    frontstageDef.nineZoneState = state;
    const fw1Visible = frontstageDef.isWidgetDisplayed("t1");
    expect(fw1Visible).to.be.true;

    const t2 = WidgetDef.create({
      id: "t2",
      defaultState: WidgetState.Open,
    });

    const t3 = WidgetDef.create({
      id: "t3",
      defaultState: WidgetState.Hidden,
    });

    const t4 = WidgetDef.create({
      id: "t4",
      defaultState: WidgetState.Floating,
    });

    const findWidgetDefGetter = vi.spyOn(frontstageDef, "findWidgetDef");
    expect(findWidgetDefGetter).toHaveBeenNthCalledWith(1, t2);
    findWidgetDefGetter.mockReturnValue(t3);

    const rightMiddleVisible = frontstageDef.isWidgetDisplayed("t2");
    expect(rightMiddleVisible).to.be.true;
    const rightEndVisible = frontstageDef.isWidgetDisplayed("t3");
    expect(rightEndVisible).to.be.false;
    const floatingWidgetVisible = frontstageDef.isWidgetDisplayed("t4");
    expect(floatingWidgetVisible).to.be.true;
    expect(frontstageDef.getWidgetCurrentState(t4)).to.eql(
      WidgetState.Floating
    );
  });

  it("should not save size and position if ninezone state is not available", () => {
    const frontstageDef = new FrontstageDef();
    const spy = vi.spyOn(frontstageDef, "findWidgetDef");

    frontstageDef.saveChildWindowSizeAndPosition("1", window);

    expect(spy).not.toHaveBeenCalled();
  });

  it("should not save size and position if widget is not found", () => {
    const frontstageDef = new FrontstageDef();
    const state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    const spy = vi.spyOn(frontstageDef, "findWidgetDef");
    vi.spyOn(frontstageDef, "nineZoneState", "get").mockImplementation(
      () => state
    );

    frontstageDef.saveChildWindowSizeAndPosition("1", window);

    expect(spy).not.toHaveBeenCalled();
  });

  it("should not save size and position if widget is not found", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1");
    state = addPopoutWidget(state, "pw1", ["t1"]);

    const frontstageDef = new FrontstageDef();
    const spy = vi
      .spyOn(frontstageDef, "findWidgetDef")
      .mockReturnValue(undefined);
    vi.spyOn(frontstageDef, "nineZoneState", "get").mockImplementation(
      () => state
    );

    frontstageDef.saveChildWindowSizeAndPosition("pw1", window);

    expect(spy).toHaveBeenNthCalledWith(1, "t1");
  });

  it("should activate a widget def", async () => {
    const def = new FrontstageDef();
    await def.initializeFromConfig({
      ...defaultFrontstageConfig,
      rightPanel: {
        sections: {
          start: [
            {
              id: "test-widget",
              defaultState: WidgetState.Hidden,
            },
          ],
        },
      },
    });
    def.nineZoneState = initializeNineZoneState(def);
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => def);

    const spy = vi.fn();
    UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

    // __PUBLISH_EXTRACT_START__ AppUI.WidgetDef.setWidgetState
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) throw new Error("Active frontstage not found");
    const widgetDef = frontstageDef.findWidgetDef("test-widget");
    widgetDef?.setWidgetState(WidgetState.Open);
    // __PUBLISH_EXTRACT_END__

    expect(spy).toHaveBeenNthCalledWith(1);
  });

  describe("findWidgetDef", () => {
    it("should return tool settings", async () => {
      const frontstage = new FrontstageDef();
      await frontstage.initializeFromConfig({
        ...defaultFrontstageConfig,
        toolSettings: {
          id: "test-tool-settings-widget",
        },
      });
      const widget = frontstage.findWidgetDef("test-tool-settings-widget");
      expect(widget?.id).to.eq("test-tool-settings-widget");
    });

    it("should return status bar", async () => {
      const frontstage = new FrontstageDef();
      await frontstage.initializeFromConfig({
        ...defaultFrontstageConfig,
        statusBar: {
          id: "test-status-bar-widget",
        },
      });
      const widget = frontstage.findWidgetDef("test-status-bar-widget");
      expect(widget?.id).to.eq("test-status-bar-widget");
    });
  });

  describe("restoreLayout", () => {
    it("should emit onFrontstageRestoreLayoutEvent", () => {
      const spy = vi.spyOn(
        InternalFrontstageManager.onFrontstageRestoreLayoutEvent,
        "emit"
      );
      const frontstageDef = new FrontstageDef();
      frontstageDef.restoreLayout();
      expect(spy).toHaveBeenNthCalledWith(
        1,
        sinon.match({
          frontstageDef,
        })
      );
    });

    it("should restore panel widget to default state", () => {
      const frontstageDef = new FrontstageDef();
      const rightPanel = new StagePanelDef();
      const w1 = WidgetDef.create({
        id: "w1",
        defaultState: WidgetState.Open,
      });
      vi.spyOn(rightPanel, "widgetDefs", "get").mockImplementation(() => [w1]);
      vi.spyOn(frontstageDef, "rightPanel", "get").mockImplementation(
        () => rightPanel
      );
      const spy = vi.spyOn(w1, "setWidgetState");

      frontstageDef.restoreLayout();
      expect(spy).toHaveBeenNthCalledWith(1, WidgetState.Open);
    });

    it("should restore panel size to default size", () => {
      const frontstageDef = new FrontstageDef();
      const rightPanel = new StagePanelDef();
      vi.spyOn(rightPanel, "defaultSize", "get").mockImplementation(() => 300);
      vi.spyOn(frontstageDef, "rightPanel", "get").mockImplementation(
        () => rightPanel
      );
      const spy = vi.spyOn(rightPanel, "size", "set");

      frontstageDef.restoreLayout();
      expect(spy).toHaveBeenNthCalledWith(1, 300);
    });
  });

  describe("dynamic widgets", () => {
    class WidgetsProvider implements UiItemsProvider {
      public readonly id = "WidgetsProvider";

      public provideWidgets(
        _stageId: string,
        _stageUsage: string,
        location: StagePanelLocation,
        section?: StagePanelSection
      ) {
        const widgets: Widget[] = [];
        widgets.push({
          // This should be added to Left stage panel, Start location.
          id: "WidgetsProviderW1",
          label: "WidgetsProvider W1",
        });
        if (location === StagePanelLocation.Right)
          widgets.push({
            id: "WidgetsProviderR1",
            label: "WidgetsProvider R1",
          });
        if (
          location === StagePanelLocation.Right &&
          section === StagePanelSection.End
        )
          widgets.push({
            id: "WidgetsProviderRM1",
            label: "WidgetsProvider RM1",
          });

        return widgets;
      }
    }

    class EmptyFrontstageProvider extends FrontstageProvider {
      public static stageId = "TestFrontstageUi2";
      public override get id(): string {
        return EmptyFrontstageProvider.stageId;
      }

      public override frontstageConfig(): FrontstageConfig {
        return {
          id: this.id,
          version: 1,
          contentGroup: TestUtils.TestContentGroup1,
        };
      }
    }

    beforeEach(() => {
      UiItemsManager.register(new WidgetsProvider());
    });

    afterEach(() => {
      UiItemsManager.unregister("WidgetsProvider");
    });

    it("should add extension widgets to stage panel zones", async () => {
      const frontstageProvider = new EmptyFrontstageProvider();
      UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
      const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
        EmptyFrontstageProvider.stageId
      );
      expect(!!frontstageDef?.isReady).to.be.false;
      await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
      const sut = UiFramework.frontstages.activeFrontstageDef!;
      sut
        .rightPanel!.getPanelSectionDef(StagePanelSection.Start)
        .widgetDefs.map((w) => w.id)
        .should.eql(["WidgetsProviderR1"]);
      sut
        .rightPanel!.getPanelSectionDef(StagePanelSection.End)
        .widgetDefs.map((w) => w.id)
        .should.eql(["WidgetsProviderRM1"]);
      sut
        .leftPanel!.getPanelSectionDef(StagePanelSection.Start)
        .widgetDefs.map((w) => w.id)
        .should.eql(["WidgetsProviderW1"]);
    });
  });

  describe("getWidgetCurrentState", () => {
    it("should show WidgetState as closed in panel size is undefined", () => {
      const frontstageDef = new FrontstageDef();
      vi.spyOn(frontstageDef, "isReady", "get").mockImplementation(() => true);

      let nineZoneState = createNineZoneState();
      nineZoneState = addTab(nineZoneState, "t1");
      nineZoneState = addTab(nineZoneState, "t2");
      nineZoneState = addPanelWidget(
        nineZoneState,
        "left",
        "start",
        ["t1", "t2"],
        { activeTabId: "t1" }
      );
      frontstageDef.nineZoneState = nineZoneState;
      const widgetDef = WidgetDef.create({
        id: "t1",
        defaultState: WidgetState.Hidden,
      });

      const leftPanel = StagePanelDef.create(
        {
          resizable: true,
          sections: {
            start: [{ id: "start" }],
          },
        },
        StagePanelLocation.Left
      );
      vi.spyOn(frontstageDef, "leftPanel", "get").mockImplementation(
        () => leftPanel
      );

      sinon
        .stub(frontstageDef, "getStagePanelDef")
        .withArgs(StagePanelLocation.Left)
        .returns(leftPanel);
      sinon
        .stub(frontstageDef, "findWidgetDef")
        .withArgs("t1")
        .returns(widgetDef);

      expect(frontstageDef.getWidgetCurrentState(widgetDef)).to.be.eql(
        WidgetState.Closed
      );
    });

    it("should show WidgetState as closed in panel size is 0", () => {
      const frontstageDef = new FrontstageDef();
      vi.spyOn(frontstageDef, "isReady", "get").mockImplementation(() => true);

      let nineZoneState = createNineZoneState();
      nineZoneState = addTab(nineZoneState, "t1");
      nineZoneState = addTab(nineZoneState, "t2");
      nineZoneState = addPanelWidget(
        nineZoneState,
        "left",
        "start",
        ["t1", "t2"],
        { activeTabId: "t1" }
      );
      frontstageDef.nineZoneState = nineZoneState;
      const widgetDef = WidgetDef.create({
        id: "t1",
        defaultState: WidgetState.Hidden,
      });

      const leftPanel = StagePanelDef.create(
        {
          resizable: true,
          size: 0,
          sections: {
            start: [{ id: "start" }],
          },
        },
        StagePanelLocation.Left
      );
      vi.spyOn(frontstageDef, "leftPanel", "get").mockImplementation(
        () => leftPanel
      );

      sinon
        .stub(frontstageDef, "getStagePanelDef")
        .withArgs(StagePanelLocation.Left)
        .returns(leftPanel);
      sinon
        .stub(frontstageDef, "findWidgetDef")
        .withArgs("t1")
        .returns(widgetDef);

      // const panel = frontstageDef.nineZoneState.panels.left;
      expect(frontstageDef.getWidgetCurrentState(widgetDef)).to.be.eql(
        WidgetState.Closed
      );
    });

    it("should show WidgetState as closed in panel is collapsed", () => {
      const frontstageDef = new FrontstageDef();
      vi.spyOn(frontstageDef, "isReady", "get").mockImplementation(() => true);

      let nineZoneState = createNineZoneState();
      nineZoneState = addTab(nineZoneState, "t1");
      nineZoneState = addTab(nineZoneState, "t2");
      nineZoneState = addPanelWidget(
        nineZoneState,
        "left",
        "start",
        ["t1", "t2"],
        { activeTabId: "t1" }
      );
      nineZoneState = produce(nineZoneState, (draft) => {
        draft.panels.left.collapsed = true;
      });
      frontstageDef.nineZoneState = nineZoneState;
      const widgetDef = WidgetDef.create({
        id: "t1",
        defaultState: WidgetState.Open,
      });

      sinon
        .stub(frontstageDef, "findWidgetDef")
        .withArgs("t1")
        .returns(widgetDef);
      expect(frontstageDef.getWidgetCurrentState(widgetDef)).to.be.eql(
        WidgetState.Closed
      );
    });
  });

  describe("floatWidget", () => {
    it("should dispatch WIDGET_TAB_FLOAT action", async () => {
      const def = new FrontstageDef();
      await def.initializeFromConfig({
        ...defaultFrontstageConfig,
        leftPanel: {
          sections: {
            start: [
              {
                id: "t1",
              },
            ],
          },
        },
      });
      def.nineZoneState = initializeNineZoneState(def);

      const dispatch = vi.fn();
      vi.spyOn(def as any, "dispatch", "get").mockImplementation(
        () => dispatch as any
      );
      def.floatWidget("t1");
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "WIDGET_TAB_FLOAT",
        id: "t1",
      });
    });
  });

  describe("popoutWidget", () => {
    it("should dispatch WIDGET_TAB_POPOUT action", async () => {
      const def = new FrontstageDef();
      await def.initializeFromConfig({
        ...defaultFrontstageConfig,
        leftPanel: {
          sections: {
            start: [
              {
                id: "t1",
              },
            ],
          },
        },
      });
      def.nineZoneState = initializeNineZoneState(def);

      const dispatch = vi.fn();
      vi.spyOn(def as any, "dispatch", "get").mockImplementation(
        () => dispatch
      );
      def.popoutWidget("t1");
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: "WIDGET_TAB_POPOUT",
        id: "t1",
      });
    });
    it("should handle multiple popoutWidgets being set for empty 'oldState' (For electron initialization)", async () => {
      let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
      state = addTab(state, "t1");
      state = addTab(state, "t2");
      state = addPopoutWidget(state, "fw1", ["t1"]);
      state = addPopoutWidget(state, "fw2", ["t2"]);

      const frontstageDef = new FrontstageDef();
      await frontstageDef.initializeFromConfig({
        ...defaultFrontstageConfig,
        leftPanel: {
          sections: {
            start: [
              {
                id: "t1",
              },
            ],
          },
        },
        rightPanel: {
          sections: {
            start: [
              {
                id: "t2",
              },
            ],
          },
        },
      });

      const spy = vi.spyOn(window, "open");
      frontstageDef.nineZoneState = state;

      expect(frontstageDef.nineZoneState).to.be.eq(state);
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe("openPopoutWidgetContainer", () => {
    it("should open a popout window", async () => {
      const frontstageDef = new FrontstageDef();
      await frontstageDef.initializeFromConfig({
        ...defaultFrontstageConfig,
        leftPanel: {
          sections: {
            start: [
              {
                id: "t1",
              },
            ],
          },
        },
      });
      frontstageDef.nineZoneState = initializeNineZoneState(frontstageDef);
      frontstageDef.popoutWidget("t1");

      const spy = vi.spyOn(window, "open");
      const popoutWidgets = frontstageDef.nineZoneState.popoutWidgets;
      const popoutWidget = popoutWidgets.byId[popoutWidgets.allIds[0]];
      frontstageDef.openPopoutWidgetContainer(
        popoutWidget.id,
        frontstageDef.nineZoneState
      );
      expect(spy).toHaveBeenCalledOnce();
    });
  });

  describe("dockWidgetContainer", () => {
    it("should dock popout widget", async () => {
      const frontstageDef = new FrontstageDef();
      await frontstageDef.initializeFromConfig({
        ...defaultFrontstageConfig,
        leftPanel: {
          sections: {
            start: [{ id: "t1" }],
          },
        },
      });
      frontstageDef.nineZoneState = initializeNineZoneState(frontstageDef);
      frontstageDef.popoutWidget("t1");

      frontstageDef.dockWidgetContainer("t1");
      expect(frontstageDef.nineZoneState.popoutWidgets.allIds).lengthOf(0);
    });

    it("should dock floating widget", async () => {
      const frontstageDef = new FrontstageDef();
      await frontstageDef.initializeFromConfig({
        ...defaultFrontstageConfig,
        leftPanel: {
          sections: {
            start: [{ id: "t1" }],
          },
        },
      });
      frontstageDef.nineZoneState = initializeNineZoneState(frontstageDef);
      frontstageDef.floatWidget("t1");

      const floatingWidgets = frontstageDef.nineZoneState.floatingWidgets;
      const floatingWidget = floatingWidgets.byId[floatingWidgets.allIds[0]];
      frontstageDef.dockWidgetContainer(floatingWidget.id);
      expect(frontstageDef.nineZoneState.floatingWidgets.allIds).lengthOf(0);
    });
  });

  describe("setFloatingWidgetContainerBounds", () => {
    it("should update floating widget bounds", async () => {
      const frontstageDef = new FrontstageDef();
      await frontstageDef.initializeFromConfig({
        ...defaultFrontstageConfig,
        leftPanel: {
          sections: {
            start: [
              {
                id: "t1",
                canFloat: { containerId: "fw1" },
                defaultState: WidgetState.Floating,
              },
            ],
          },
        },
      });

      frontstageDef.nineZoneState = initializeNineZoneState(frontstageDef);
      frontstageDef.dispatch({
        type: "RESIZE",
        size: {
          height: 1000,
          width: 1000,
        },
      });

      frontstageDef.setFloatingWidgetContainerBounds("fw1", {
        top: 55,
        left: 105,
        bottom: 155,
        right: 255,
      });

      expect(
        frontstageDef.nineZoneState.floatingWidgets.byId.fw1.bounds
      ).to.eql({
        top: 55,
        left: 105,
        bottom: 155,
        right: 255,
      });
    });
  });
});

describe("floatWidget", () => {
  describe("float and dock widget", () => {
    it("get floating containers 1 available", () => {
      let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
      state = addTab(state, "t1");
      state = addFloatingWidget(state, "fw1", ["t1"], {
        bounds: { top: 55, left: 105, bottom: 155, right: 255 },
      });
      const frontstageDef = new FrontstageDef();
      vi.spyOn(frontstageDef, "nineZoneState", "get").mockImplementation(
        () => state
      );
      expect(frontstageDef.getFloatingWidgetContainerIds().length).to.eql(1);
      expect(frontstageDef.getFloatingWidgetContainerIdByWidgetId("t1")).to.eql(
        "fw1"
      );
      expect(frontstageDef.getFloatingWidgetContainerBounds("fw1")).to.eql({
        left: 105,
        top: 55,
        bottom: 155,
        right: 255,
      });
    });

    it("get floating containers 0 available", () => {
      const frontstageDef = new FrontstageDef();
      vi.spyOn(frontstageDef, "nineZoneState", "get").mockImplementation(
        () => undefined
      );
      expect(frontstageDef.getFloatingWidgetContainerIds().length).to.eql(0);
      expect(frontstageDef.getFloatingWidgetContainerIdByWidgetId("t1")).to.be
        .undefined;
      expect(frontstageDef.getFloatingWidgetContainerBounds("t1")).to.be
        .undefined;
      expect(frontstageDef.getFloatingWidgetContainerBounds(undefined)).to.be
        .undefined;
    });
  });
});

describe("useSpecificWidgetDef", () => {
  beforeAll(async () => {
    await NoRenderApp.startup();
    await TestUtils.initializeUiFramework();
  });

  afterAll(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("should return widgetDef from active frontstage", () => {
    const frontstageDef = new FrontstageDef();
    const widgetDef = new WidgetDef();
    vi.spyOn(frontstageDef, "findWidgetDef").mockReturnValue(widgetDef);
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => frontstageDef);

    const { result } = renderHook(() => useSpecificWidgetDef("t1"));

    expect(result.current).to.be.eq(widgetDef);
  });

  it("should handle no active frontstage", () => {
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => undefined);
    const { result } = renderHook(() => useSpecificWidgetDef("t1"));

    expect(result.current).to.be.undefined;
  });

  it("should return re-created dynamic widgetDef", async () => {
    const frontstageDef = new FrontstageDef();
    await frontstageDef.initializeFromConfig(defaultFrontstageConfig);
    UiItemsManager.register({
      id: "provider1",
      provideWidgets: () => [
        {
          id: "w1",
        },
      ],
    });
    await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);

    const initialDef = frontstageDef.findWidgetDef("w1");
    const { result } = renderHook(() => useSpecificWidgetDef("w1"));
    expect(initialDef).to.exist;
    expect(initialDef).to.eq(result.current);

    await act(async () => {
      // Re-creates dynamic widgets.
      await UiFramework.frontstages.setActiveFrontstageDef(undefined);
      await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
    });

    const recreatedDef = frontstageDef.findWidgetDef("w1");
    expect(recreatedDef).to.exist;
    expect(recreatedDef).to.not.eq(initialDef);
    expect(recreatedDef).to.eq(result.current);

    UiItemsManager.unregister("provider1");
  });
});
