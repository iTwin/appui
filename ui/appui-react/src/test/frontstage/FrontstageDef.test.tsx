/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { act, renderHook } from "@testing-library/react";
import type { ListenerType } from "@itwin/core-react";
import type {
  FrontstageConfig,
  StagePanelConfig,
  UiItemsProvider,
  Widget,
} from "../../appui-react.js";
import {
  ContentGroup,
  ContentGroupProvider,
  FrontstageDef,
  FrontstageProvider,
  initializeNineZoneState,
  StagePanelDef,
  StagePanelLocation,
  StagePanelSection,
  StagePanelState,
  StageUsage,
  StandardFrontstageProvider,
  UiFramework,
  UiItemsManager,
  useSpecificWidgetDef,
  WidgetDef,
  WidgetState,
} from "../../appui-react.js";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager.js";
import { createNineZoneState } from "../../appui-react/layout/state/NineZoneState.js";
import TestUtils, { storageMock } from "../TestUtils.js";
import { addTab } from "../../appui-react/layout/state/internal/TabStateHelpers.js";
import {
  addFloatingWidget,
  addPopoutWidget,
} from "../../appui-react/layout/state/internal/WidgetStateHelpers.js";
import { addPanelWidget } from "../../appui-react/layout/state/internal/PanelStateHelpers.js";

class BadLayoutFrontstage extends FrontstageProvider {
  public static stageId = "BadLayout";
  public get id(): string {
    return BadLayoutFrontstage.stageId;
  }

  public override frontstageConfig(): FrontstageConfig {
    return {
      id: this.id,
      version: 1,
      contentGroup: new ContentGroup({
        id: "TestContentGroup1",
        layout: {
          id: "unknown-layout",
        },
        contents: [],
      }),
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

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      get: () => localStorageMock,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "localStorage", localStorageToRestore);
  });

  // TODO: vitest
  it.skip("setActiveFrontstage should throw Error on invalid content layout", async () => {
    const frontstageProvider = new BadLayoutFrontstage();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    await expect(
      UiFramework.frontstages.setActiveFrontstage("BadLayout")
    ).rejects.toThrow();
  });

  // TODO: vitest
  it.skip("setActiveFrontstage should throw Error on invalid content group", async () => {
    const frontstageProvider = new BadGroupFrontstage();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    await expect(
      UiFramework.frontstages.setActiveFrontstage("BadGroup")
    ).rejects.toThrow();
  });

  it("should determine if widget is visible", async () => {
    let state = createNineZoneState();
    state = addTab(state, "t1");
    state = addTab(state, "t2");
    state = addTab(state, "t3");
    state = addPopoutWidget(state, "pw1", ["t1"]);
    state = addPanelWidget(state, "right", "rightMiddle", ["t2"]);
    state = addFloatingWidget(state, "fw1", ["t3"]);

    const frontstageDef = new FrontstageDef();
    frontstageDef.nineZoneState = state;

    const t1 = WidgetDef.create({
      id: "t1",
      defaultState: WidgetState.Open,
    });

    const t2 = WidgetDef.create({
      id: "t2",
      defaultState: WidgetState.Hidden,
    });

    const t3 = WidgetDef.create({
      id: "t3",
      defaultState: WidgetState.Floating,
    });

    vi.spyOn(frontstageDef, "findWidgetDef").mockImplementation((id) => {
      if (id === "t1") return t1;
      if (id === "t2") return t2;
      if (id === "t3") return t3;
      return undefined;
    });

    vi.fn();

    expect(frontstageDef.isWidgetDisplayed("t1")).toEqual(true);
    expect(frontstageDef.isWidgetDisplayed("t2")).toEqual(false);
    expect(frontstageDef.isWidgetDisplayed("t3")).toEqual(true);
  });

  it("should not save size and position if ninezone state is not available", () => {
    const frontstageDef = new FrontstageDef();
    const spy = vi.spyOn(frontstageDef, "findWidgetDef");

    frontstageDef.saveChildWindowSizeAndPosition("1", window);

    expect(spy).not.toBeCalled();
  });

  it("should not save size and position if widget is not found", () => {
    const frontstageDef = new FrontstageDef();
    const state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    const spy = vi.spyOn(frontstageDef, "findWidgetDef");
    vi.spyOn(frontstageDef, "nineZoneState", "get").mockImplementation(
      () => state
    );

    frontstageDef.saveChildWindowSizeAndPosition("1", window);

    expect(spy).not.toBeCalled();
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

    expect(spy).toHaveBeenCalledWith("t1");
  });

  describe("create", () => {
    it("should create from FrontstageProvider instance", async () => {
      const frontstageDef = await FrontstageDef.create(
        new (class Provider extends FrontstageProvider {
          public override get id(): string {
            return "provider-1";
          }
          public override frontstageConfig(): FrontstageConfig {
            return {
              id: "frontstage-1",
              contentGroup: TestUtils.TestContentGroup1,
              version: 123,
            };
          }
        })()
      );
      expect(frontstageDef.version).toEqual(123);
    });

    it("should create from FrontstageProvider object", async () => {
      const frontstageDef = await FrontstageDef.create({
        id: "provider-1",
        frontstageConfig: () => ({
          id: "frontstage-1",
          contentGroup: TestUtils.TestContentGroup1,
          version: 123,
        }),
      });
      expect(frontstageDef.version).toEqual(123);
    });
  });

  describe("onWidgetStateChangedEvent", () => {
    it("should open a hidden widget", async () => {
      const activeFrontstageDef = new FrontstageDef();
      await activeFrontstageDef.initializeFromConfig({
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
      initializeNineZoneState(activeFrontstageDef);
      vi.spyOn(
        UiFramework.frontstages,
        "activeFrontstageDef",
        "get"
      ).mockImplementation(() => activeFrontstageDef);

      const spy = vi.fn();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

      // __PUBLISH_EXTRACT_START__ AppUI.WidgetDef.setWidgetState
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      if (!frontstageDef) throw new Error("Active frontstage not found");
      const widgetDef = frontstageDef.findWidgetDef("test-widget");
      widgetDef?.setWidgetState(WidgetState.Open);
      // __PUBLISH_EXTRACT_END__

      expect(spy).toHaveBeenCalledWith({
        widgetDef,
        widgetState: WidgetState.Open,
      });
      expect(widgetDef?.state).toEqual(WidgetState.Open);
    });

    it("should hide a panel widget", async () => {
      const frontstageDef = new FrontstageDef();
      await frontstageDef.initializeFromConfig({
        ...defaultFrontstageConfig,
        rightPanel: {
          sections: {
            start: [
              {
                id: "w1",
              },
            ],
          },
        },
      });
      initializeNineZoneState(frontstageDef);
      vi.spyOn(
        UiFramework.frontstages,
        "activeFrontstageDef",
        "get"
      ).mockImplementation(() => frontstageDef);

      const spy = vi.fn();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

      const widgetDef = frontstageDef.findWidgetDef("w1")!;
      widgetDef.setWidgetState(WidgetState.Hidden);
      expect(spy).toHaveBeenCalledWith({
        widgetDef,
        widgetState: WidgetState.Hidden,
      });
    });

    it("should float a panel widget", async () => {
      const frontstageDef = new FrontstageDef();
      await frontstageDef.initializeFromConfig({
        ...defaultFrontstageConfig,
        rightPanel: {
          sections: {
            start: [
              {
                id: "test-widget",
                defaultState: WidgetState.Open,
              },
            ],
          },
        },
      });
      initializeNineZoneState(frontstageDef);
      vi.spyOn(
        UiFramework.frontstages,
        "activeFrontstageDef",
        "get"
      ).mockImplementation(() => frontstageDef);

      const spy = vi.fn();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

      const widgetDef = frontstageDef.findWidgetDef("test-widget");
      widgetDef?.setWidgetState(WidgetState.Floating);

      expect(spy).toHaveBeenCalledWith({
        widgetDef,
        widgetState: WidgetState.Floating,
      });
      expect(widgetDef?.state).toEqual(WidgetState.Floating);
    });

    it("should hide tool settings", async () => {
      const frontstageDef = new FrontstageDef();
      await frontstageDef.initializeFromConfig({
        ...defaultFrontstageConfig,
        toolSettings: {
          id: "ts",
        },
      });
      initializeNineZoneState(frontstageDef);
      vi.spyOn(
        UiFramework.frontstages,
        "activeFrontstageDef",
        "get"
      ).mockImplementation(() => frontstageDef);

      const spy = vi.fn();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

      const widgetDef = frontstageDef.findWidgetDef("ts");
      widgetDef?.setWidgetState(WidgetState.Hidden);

      expect(spy).toHaveBeenCalledWith({
        widgetDef,
        widgetState: WidgetState.Hidden,
      });
      expect(widgetDef?.state).toEqual(WidgetState.Hidden);
    });
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
      expect(widget?.id).toEqual("test-tool-settings-widget");
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
      expect(widget?.id).toEqual("test-status-bar-widget");
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
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
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
      expect(spy).toHaveBeenCalledWith(WidgetState.Open);
    });

    it("should restore panel size to default size", () => {
      const frontstageDef = new FrontstageDef();
      const rightPanel = new StagePanelDef();
      const stagePanelConfig: StagePanelConfig = { sizeSpec: 300 };
      vi.spyOn(rightPanel, "initialConfig", "get").mockReturnValue(
        stagePanelConfig
      );
      vi.spyOn(frontstageDef, "rightPanel", "get").mockReturnValue(rightPanel);
      const spy = vi.spyOn(rightPanel, "sizeSpec", "set");

      frontstageDef.restoreLayout();
      expect(spy).toHaveBeenCalledWith(300);
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

    afterEach(() => {
      UiItemsManager.clearAllProviders();
    });

    it("should add extension widgets to stage panel zones", async () => {
      UiItemsManager.register(new WidgetsProvider());
      const frontstageProvider = new EmptyFrontstageProvider();
      UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
      const frontstageDef = await UiFramework.frontstages.getFrontstageDef(
        EmptyFrontstageProvider.stageId
      );
      expect(!!frontstageDef?.isReady).toEqual(false);
      await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
      const sut = UiFramework.frontstages.activeFrontstageDef!;
      expect(
        sut
          .rightPanel!.getPanelSectionDef(StagePanelSection.Start)
          .widgetDefs.map((w) => w.id)
      ).toEqual(["WidgetsProviderR1"]);
      expect(
        sut
          .rightPanel!.getPanelSectionDef(StagePanelSection.End)
          .widgetDefs.map((w) => w.id)
      ).toEqual(["WidgetsProviderRM1"]);
      expect(
        sut
          .leftPanel!.getPanelSectionDef(StagePanelSection.Start)
          .widgetDefs.map((w) => w.id)
      ).toEqual(["WidgetsProviderW1"]);
    });

    it("should provide widgets from content group getter", async () => {
      UiFramework.frontstages.addFrontstageProvider(
        new StandardFrontstageProvider({
          id: "frontstage-1",
          version: 1,
          usage: StageUsage.General,
          contentGroupProps: new (class extends ContentGroupProvider {
            public override async contentGroup() {
              UiItemsManager.register({
                id: "provider-1",
                getWidgets: () => [
                  {
                    id: "w1",
                    layouts: {
                      standard: {
                        location: StagePanelLocation.Left,
                        section: StagePanelSection.Start,
                      },
                    },
                  },
                ],
              });
              return TestUtils.TestContentGroup1;
            }
          })(),
        })
      );
      await UiFramework.frontstages.setActiveFrontstage("frontstage-1");
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef!;
      const widgets = Array.from(frontstageDef.widgetDefs).map((w) => w.id);
      expect(widgets).toContain("w1");
    });
  });

  describe("floatWidget", () => {
    it("should dispatch WIDGET_TAB_FLOAT action", async () => {
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
      initializeNineZoneState(frontstageDef);

      const dispatch = vi
        .spyOn(frontstageDef, "dispatch")
        .mockImplementation(() => {});
      frontstageDef.floatWidget("t1");
      expect(dispatch).toHaveBeenCalledWith({
        type: "WIDGET_TAB_FLOAT",
        id: "t1",
      });
    });
  });

  describe("popoutWidget", () => {
    it("should dispatch WIDGET_TAB_POPOUT action", async () => {
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
      initializeNineZoneState(frontstageDef);

      const dispatch = vi
        .spyOn(frontstageDef, "dispatch")
        .mockImplementation(() => {});
      frontstageDef.popoutWidget("t1");
      expect(dispatch).toHaveBeenCalledWith({
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

      expect(frontstageDef.nineZoneState).toEqual(state);
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
      initializeNineZoneState(frontstageDef);

      const spy = vi.spyOn(window, "open").mockReturnValue({
        addEventListener: () => {},
      } as unknown as Window);
      frontstageDef.popoutWidget("t1");

      spy.mockReset();
      const popoutWidgets = frontstageDef.nineZoneState!.popoutWidgets;
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
      initializeNineZoneState(frontstageDef);
      frontstageDef.popoutWidget("t1");

      frontstageDef.dockWidgetContainer("t1");
      expect(frontstageDef.nineZoneState!.popoutWidgets.allIds).lengthOf(0);
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
      initializeNineZoneState(frontstageDef);
      frontstageDef.floatWidget("t1");

      const sut = frontstageDef.nineZoneState!;
      const floatingWidgets = sut.floatingWidgets;
      const floatingWidget = floatingWidgets.byId[floatingWidgets.allIds[0]];
      frontstageDef.dockWidgetContainer(floatingWidget.id);
      expect(frontstageDef.nineZoneState!.floatingWidgets.allIds).lengthOf(0);
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
      initializeNineZoneState(frontstageDef);

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

      const sut = frontstageDef.nineZoneState!;
      expect(sut.floatingWidgets.byId.fw1.bounds).to.eql({
        top: 55,
        left: 105,
        bottom: 155,
        right: 255,
      });
    });
  });

  describe("dispatch", () => {
    it("should emit events after each action", async () => {
      const frontstageDef = new FrontstageDef();
      await frontstageDef.initializeFromConfig({
        ...defaultFrontstageConfig,
        leftPanel: {},
      });
      const state = createNineZoneState();
      frontstageDef.nineZoneState = state;

      const spy =
        vi.fn<
          Parameters<
            ListenerType<
              typeof UiFramework.frontstages.onPanelStateChangedEvent
            >
          >
        >();
      UiFramework.frontstages.onPanelStateChangedEvent.addListener(spy);

      frontstageDef.dispatch({
        type: "PANEL_SET_COLLAPSED",
        side: "left",
        collapsed: true,
      });
      expect(frontstageDef.nineZoneState?.panels.left.collapsed).toEqual(true);
      expect(spy).toHaveBeenCalledWith({
        panelDef: frontstageDef.leftPanel!,
        panelState: StagePanelState.Minimized,
      });

      frontstageDef.dispatch({
        type: "PANEL_SET_COLLAPSED",
        side: "left",
        collapsed: false,
      });
      expect(frontstageDef.nineZoneState?.panels.left.collapsed).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy.mock.calls[1][0]).toEqual({
        panelDef: frontstageDef.leftPanel!,
        panelState: StagePanelState.Open,
      });
    });
  });

  describe("batch", () => {
    it("should emit events once for multiple actions", async () => {
      const frontstageDef = new FrontstageDef();
      await frontstageDef.initializeFromConfig({
        ...defaultFrontstageConfig,
        leftPanel: {},
      });
      const state = createNineZoneState();
      frontstageDef.nineZoneState = state;

      const spy =
        vi.fn<
          Parameters<
            ListenerType<
              typeof UiFramework.frontstages.onPanelStateChangedEvent
            >
          >
        >();
      UiFramework.frontstages.onPanelStateChangedEvent.addListener(spy);

      frontstageDef.batch(() => {
        frontstageDef.dispatch({
          type: "PANEL_SET_COLLAPSED",
          side: "left",
          collapsed: true,
        });
        expect(frontstageDef.nineZoneState?.panels.left.collapsed).toEqual(
          true
        );
        expect(spy).not.toBeCalled();

        frontstageDef.dispatch({
          type: "PANEL_SET_COLLAPSED",
          side: "left",
          collapsed: false,
        });
        expect(frontstageDef.nineZoneState?.panels.left.collapsed).toEqual(
          false
        );
        expect(spy).not.toBeCalled();

        frontstageDef.dispatch({
          type: "PANEL_SET_COLLAPSED",
          side: "left",
          collapsed: true,
        });
        expect(frontstageDef.nineZoneState?.panels.left.collapsed).toEqual(
          true
        );
        expect(spy).not.toBeCalled();
      });

      expect(spy).toHaveBeenCalledWith({
        panelDef: frontstageDef.leftPanel!,
        panelState: StagePanelState.Minimized,
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
      expect(
        frontstageDef.getFloatingWidgetContainerIdByWidgetId("t1")
      ).toEqual(undefined);
      expect(frontstageDef.getFloatingWidgetContainerBounds("t1")).toEqual(
        undefined
      );
      expect(frontstageDef.getFloatingWidgetContainerBounds(undefined)).toEqual(
        undefined
      );
    });
  });
});

describe("useSpecificWidgetDef", () => {
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

    expect(result.current).toEqual(widgetDef);
  });

  it("should handle no active frontstage", () => {
    vi.spyOn(
      UiFramework.frontstages,
      "activeFrontstageDef",
      "get"
    ).mockImplementation(() => undefined);
    const { result } = renderHook(() => useSpecificWidgetDef("t1"));

    expect(result.current).toEqual(undefined);
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
    expect(initialDef).toEqual(result.current);

    await act(async () => {
      // Re-creates dynamic widgets.
      await UiFramework.frontstages.setActiveFrontstageDef(undefined);
      await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
    });

    const recreatedDef = frontstageDef.findWidgetDef("w1");
    expect(recreatedDef).to.exist;
    expect(recreatedDef).to.not.eq(initialDef);
    expect(recreatedDef).toEqual(result.current);

    UiItemsManager.unregister("provider1");
  });
});
