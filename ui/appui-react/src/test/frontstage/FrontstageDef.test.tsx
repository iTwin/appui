/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
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

  before(async () => {
    Object.defineProperty(window, "localStorage", {
      get: () => localStorageMock,
    });
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();
  });

  after(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
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

    const findWidgetDefGetter = sinon.stub(frontstageDef, "findWidgetDef");
    findWidgetDefGetter.onFirstCall().returns(t2);
    findWidgetDefGetter.returns(t3);

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
    sinon.stub(UiFramework.frontstages, "activeFrontstageDef").get(() => def);

    const spy = sinon.spy();
    UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

    // __PUBLISH_EXTRACT_START__ AppUI.WidgetDef.setWidgetState
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef) throw new Error("Active frontstage not found");
    const widgetDef = frontstageDef.findWidgetDef("test-widget");
    widgetDef?.setWidgetState(WidgetState.Open);
    // __PUBLISH_EXTRACT_END__

    expect(spy).to.calledOnceWith();
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
      sinon.stub(rightPanel, "defaultSize").get(() => 300);
      sinon.stub(frontstageDef, "rightPanel").get(() => rightPanel);
      const spy = sinon.spy(rightPanel, "size", ["set"]);

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

  describe("getWidgetCurrentState", () => {
    it("should show WidgetState as closed in panel size is undefined", () => {
      const frontstageDef = new FrontstageDef();
      sinon.stub(frontstageDef, "isReady").get(() => true);

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
      sinon.stub(frontstageDef, "leftPanel").get(() => leftPanel);

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
      sinon.stub(frontstageDef, "isReady").get(() => true);

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
      sinon.stub(frontstageDef, "leftPanel").get(() => leftPanel);

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
      sinon.stub(frontstageDef, "isReady").get(() => true);

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

      const dispatch = sinon.stub();
      sinon.stub(def, "dispatch").get(() => dispatch);
      def.floatWidget("t1");
      sinon.assert.calledOnceWithMatch(dispatch, {
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

      const dispatch = sinon.stub();
      sinon.stub(def, "dispatch").get(() => dispatch);
      def.popoutWidget("t1");
      sinon.assert.calledOnceWithMatch(dispatch, {
        type: "WIDGET_TAB_POPOUT",
        id: "t1",
      });
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

      const spy = sinon.spy(window, "open");
      const popoutWidgets = frontstageDef.nineZoneState.popoutWidgets;
      const popoutWidget = popoutWidgets.byId[popoutWidgets.allIds[0]];
      frontstageDef.openPopoutWidgetContainer(popoutWidget.id);
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
