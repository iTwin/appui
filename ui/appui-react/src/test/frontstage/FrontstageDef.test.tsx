/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { act, renderHook } from "@testing-library/react-hooks";
import { expect } from "chai";
import * as sinon from "sinon";
import type {
  FrontstageConfig,
  StagePanelConfig,
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
  StagePanelState,
  UiFramework,
  UiItemsManager,
  useSpecificWidgetDef,
  WidgetDef,
  WidgetState,
} from "../../appui-react";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager";
import { createNineZoneState } from "../../appui-react/layout/state/NineZoneState";
import TestUtils, { storageMock } from "../TestUtils";
import { addTab } from "../../appui-react/layout/state/internal/TabStateHelpers";
import {
  addFloatingWidget,
  addPopoutWidget,
} from "../../appui-react/layout/state/internal/WidgetStateHelpers";
import { addPanelWidget } from "../../appui-react/layout/state/internal/PanelStateHelpers";

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

  before(async () => {
    Object.defineProperty(window, "localStorage", {
      get: () => localStorageMock,
    });
    await NoRenderApp.startup();
    await TestUtils.initializeUiFramework();
  });

  after(async () => {
    TestUtils.terminateUiFramework();
    await IModelApp.shutdown();
    Object.defineProperty(window, "localStorage", localStorageToRestore);
  });

  it("setActiveFrontstage should throw Error on invalid content layout", () => {
    const frontstageProvider = new BadLayoutFrontstage();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    void expect(
      UiFramework.frontstages.setActiveFrontstage("BadLayout")
    ).to.be.rejectedWith(Error);
  });

  it("setActiveFrontstage should throw Error on invalid content group", () => {
    const frontstageProvider = new BadGroupFrontstage();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    void expect(
      UiFramework.frontstages.setActiveFrontstage("BadGroup")
    ).to.be.rejectedWith(Error);
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

    sinon.stub(frontstageDef, "findWidgetDef").callsFake((id) => {
      if (id === "t1") return t1;
      if (id === "t2") return t2;
      if (id === "t3") return t3;
      return undefined;
    });

    sinon.stub();

    expect(frontstageDef.isWidgetDisplayed("t1")).to.be.true;
    expect(frontstageDef.isWidgetDisplayed("t2")).to.be.false;
    expect(frontstageDef.isWidgetDisplayed("t3")).to.be.true;
  });

  it("should not save size and position if ninezone state is not available", () => {
    const frontstageDef = new FrontstageDef();
    const spy = sinon.stub(frontstageDef, "findWidgetDef");

    frontstageDef.saveChildWindowSizeAndPosition("1", window);

    expect(spy).to.not.be.called;
  });

  it("should not save size and position if widget is not found", () => {
    const frontstageDef = new FrontstageDef();
    const state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    const spy = sinon.stub(frontstageDef, "findWidgetDef");
    sinon.stub(frontstageDef, "nineZoneState").get(() => state);

    frontstageDef.saveChildWindowSizeAndPosition("1", window);

    expect(spy).to.not.be.called;
  });

  it("should not save size and position if widget is not found", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1");
    state = addPopoutWidget(state, "pw1", ["t1"]);

    const frontstageDef = new FrontstageDef();
    const spy = sinon.stub(frontstageDef, "findWidgetDef").returns(undefined);
    sinon.stub(frontstageDef, "nineZoneState").get(() => state);

    frontstageDef.saveChildWindowSizeAndPosition("pw1", window);

    expect(spy).to.be.calledOnceWithExactly("t1");
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
      sinon
        .stub(UiFramework.frontstages, "activeFrontstageDef")
        .get(() => activeFrontstageDef);

      const spy = sinon.spy();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

      // __PUBLISH_EXTRACT_START__ AppUI.WidgetDef.setWidgetState
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      if (!frontstageDef) throw new Error("Active frontstage not found");
      const widgetDef = frontstageDef.findWidgetDef("test-widget");
      widgetDef?.setWidgetState(WidgetState.Open);
      // __PUBLISH_EXTRACT_END__

      expect(spy).to.calledOnceWith({
        widgetDef,
        widgetState: WidgetState.Open,
      });
      expect(widgetDef?.state).to.eq(WidgetState.Open);
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
      sinon
        .stub(UiFramework.frontstages, "activeFrontstageDef")
        .get(() => frontstageDef);

      const spy = sinon.spy();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

      const widgetDef = frontstageDef.findWidgetDef("w1")!;
      widgetDef.setWidgetState(WidgetState.Hidden);
      expect(spy).to.calledOnceWithExactly({
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
      sinon
        .stub(UiFramework.frontstages, "activeFrontstageDef")
        .get(() => frontstageDef);

      const spy = sinon.spy();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

      const widgetDef = frontstageDef.findWidgetDef("test-widget");
      widgetDef?.setWidgetState(WidgetState.Floating);

      expect(spy).to.calledOnceWith({
        widgetDef,
        widgetState: WidgetState.Floating,
      });
      expect(widgetDef?.state).to.eq(WidgetState.Floating);
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
      sinon
        .stub(UiFramework.frontstages, "activeFrontstageDef")
        .get(() => frontstageDef);

      const spy = sinon.spy();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

      const widgetDef = frontstageDef.findWidgetDef("ts");
      widgetDef?.setWidgetState(WidgetState.Hidden);

      expect(spy).to.calledOnceWith({
        widgetDef,
        widgetState: WidgetState.Hidden,
      });
      expect(widgetDef?.state).to.eq(WidgetState.Hidden);
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
      const spy = sinon.spy(
        InternalFrontstageManager.onFrontstageRestoreLayoutEvent,
        "emit"
      );
      const frontstageDef = new FrontstageDef();
      frontstageDef.restoreLayout();
      spy.calledOnceWithExactly(
        sinon.match({
          frontstageDef,
        })
      ).should.true;
    });

    it("should restore panel widget to default state", () => {
      const frontstageDef = new FrontstageDef();
      const rightPanel = new StagePanelDef();
      const w1 = WidgetDef.create({
        id: "w1",
        defaultState: WidgetState.Open,
      });
      sinon.stub(rightPanel, "widgetDefs").get(() => [w1]);
      sinon.stub(frontstageDef, "rightPanel").get(() => rightPanel);
      const spy = sinon.spy(w1, "setWidgetState");

      frontstageDef.restoreLayout();
      sinon.assert.calledOnceWithExactly(spy, WidgetState.Open);
    });

    it("should restore panel size to default size", () => {
      const frontstageDef = new FrontstageDef();
      const rightPanel = new StagePanelDef();
      const stagePanelConfig: StagePanelConfig = { sizeSpec: 300 };
      sinon.stub(rightPanel, "initialConfig").get(() => stagePanelConfig);
      sinon.stub(frontstageDef, "rightPanel").get(() => rightPanel);
      const spy = sinon.spy(rightPanel, "sizeSpec", ["set"]);

      frontstageDef.restoreLayout();
      sinon.assert.calledOnceWithExactly(spy.set, 300);
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

      const dispatch = sinon.stub();
      sinon.stub(frontstageDef, "dispatch").get(() => dispatch);
      frontstageDef.floatWidget("t1");
      sinon.assert.calledOnceWithMatch(dispatch, {
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

      const dispatch = sinon.stub();
      sinon.stub(frontstageDef, "dispatch").get(() => dispatch);
      frontstageDef.popoutWidget("t1");
      sinon.assert.calledOnceWithMatch(dispatch, {
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

      const spy = sinon.spy(window, "open");
      frontstageDef.nineZoneState = state;

      expect(frontstageDef.nineZoneState).to.be.eq(state);
      sinon.assert.calledTwice(spy);
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
      frontstageDef.popoutWidget("t1");

      const spy = sinon.spy(window, "open");
      const popoutWidgets = frontstageDef.nineZoneState!.popoutWidgets;
      const popoutWidget = popoutWidgets.byId[popoutWidgets.allIds[0]];
      frontstageDef.openPopoutWidgetContainer(
        popoutWidget.id,
        frontstageDef.nineZoneState
      );
      sinon.assert.calledOnce(spy);
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
        sinon.stub<
          Parameters<
            typeof UiFramework.frontstages.onPanelStateChangedEvent.addListener
          >[0]
        >();
      UiFramework.frontstages.onPanelStateChangedEvent.addListener(spy);

      frontstageDef.dispatch({
        type: "PANEL_SET_COLLAPSED",
        side: "left",
        collapsed: true,
      });
      expect(frontstageDef.nineZoneState?.panels.left.collapsed).to.be.true;
      sinon.assert.calledOnceWithExactly(spy, {
        panelDef: frontstageDef.leftPanel!,
        panelState: StagePanelState.Minimized,
      });

      frontstageDef.dispatch({
        type: "PANEL_SET_COLLAPSED",
        side: "left",
        collapsed: false,
      });
      expect(frontstageDef.nineZoneState?.panels.left.collapsed).to.be.false;
      sinon.assert.calledTwice(spy);
      sinon.assert.calledWithExactly(spy.getCall(1), {
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
        sinon.stub<
          Parameters<
            typeof UiFramework.frontstages.onPanelStateChangedEvent.addListener
          >[0]
        >();
      UiFramework.frontstages.onPanelStateChangedEvent.addListener(spy);

      frontstageDef.batch(() => {
        frontstageDef.dispatch({
          type: "PANEL_SET_COLLAPSED",
          side: "left",
          collapsed: true,
        });
        expect(frontstageDef.nineZoneState?.panels.left.collapsed).to.be.true;
        sinon.assert.notCalled(spy);

        frontstageDef.dispatch({
          type: "PANEL_SET_COLLAPSED",
          side: "left",
          collapsed: false,
        });
        expect(frontstageDef.nineZoneState?.panels.left.collapsed).to.be.false;
        sinon.assert.notCalled(spy);

        frontstageDef.dispatch({
          type: "PANEL_SET_COLLAPSED",
          side: "left",
          collapsed: true,
        });
        expect(frontstageDef.nineZoneState?.panels.left.collapsed).to.be.true;
        sinon.assert.notCalled(spy);
      });

      sinon.assert.calledOnceWithExactly(spy, {
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
      sinon.stub(frontstageDef, "nineZoneState").get(() => state);
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
      sinon.stub(frontstageDef, "nineZoneState").get(() => undefined);
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
  before(async () => {
    await NoRenderApp.startup();
    await TestUtils.initializeUiFramework();
  });

  after(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
  });

  it("should return widgetDef from active frontstage", () => {
    const frontstageDef = new FrontstageDef();
    const widgetDef = new WidgetDef();
    sinon.stub(frontstageDef, "findWidgetDef").returns(widgetDef);
    sinon
      .stub(UiFramework.frontstages, "activeFrontstageDef")
      .get(() => frontstageDef);

    const { result } = renderHook(() => useSpecificWidgetDef("t1"));

    expect(result.current).to.be.eq(widgetDef);
  });

  it("should handle no active frontstage", () => {
    sinon
      .stub(UiFramework.frontstages, "activeFrontstageDef")
      .get(() => undefined);
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
