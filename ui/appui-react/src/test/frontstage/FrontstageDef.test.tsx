/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import * as sinon from "sinon";
import produce from "immer";
import { addFloatingWidget, addPanelWidget, addPopoutWidget, addTab, createNineZoneState } from "@itwin/appui-layout-react";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { ProcessDetector } from "@itwin/core-bentley";
import { renderHook } from "@testing-library/react-hooks";
import type { FrontstageConfig, UiItemsProvider, Widget} from "../../appui-react";
import { FrontstageDef, FrontstageProvider, StagePanelDef, StagePanelLocation, StagePanelSection, StagePanelState, UiFramework, UiItemsManager, useSpecificWidgetDef, WidgetDef, WidgetState } from "../../appui-react";
import TestUtils, { storageMock } from "../TestUtils";
import { InternalFrontstageManager } from "../../appui-react/frontstage/InternalFrontstageManager";

describe("FrontstageDef", () => {
  const localStorageToRestore = Object.getOwnPropertyDescriptor(window, "localStorage")!;
  const localStorageMock = storageMock();

  before(async () => {
    Object.defineProperty(window, "localStorage", { get: () => localStorageMock });
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();
  });

  after(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
    Object.defineProperty(window, "localStorage", localStorageToRestore);
  });

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

  it("setActiveFrontstage should throw Error on invalid content layout", () => {
    const frontstageProvider = new BadLayoutFrontstage();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    expect(UiFramework.frontstages.setActiveFrontstage("BadLayout")).to.be.rejectedWith(Error); // eslint-disable-line @typescript-eslint/no-floating-promises
  });

  it("setActiveFrontstage should throw Error on invalid content group", () => {
    const frontstageProvider = new BadGroupFrontstage();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    expect(UiFramework.frontstages.setActiveFrontstage("BadGroup")).to.be.rejectedWith(Error); // eslint-disable-line @typescript-eslint/no-floating-promises
  });

  describe("restoreLayout", () => {
    it("should emit onFrontstageRestoreLayoutEvent", () => {
      const spy = sinon.spy(InternalFrontstageManager.onFrontstageRestoreLayoutEvent, "emit");
      const frontstageDef = new FrontstageDef();
      frontstageDef.restoreLayout();
      spy.calledOnceWithExactly(sinon.match({
        frontstageDef,
      })).should.true;
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

      public provideWidgets(_stageId: string, _stageUsage: string, location: StagePanelLocation, section?: StagePanelSection) {
        const widgets: Widget[] = [];
        widgets.push({ // This should be added to Left stage panel, Start location.
          id: "WidgetsProviderW1",
          label: "WidgetsProvider W1",
        });
        if (location === StagePanelLocation.Right)
          widgets.push({
            id: "WidgetsProviderR1",
            label: "WidgetsProvider R1",
          });
        if (location === StagePanelLocation.Right && section === StagePanelSection.End)
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
      const frontstageDef = await UiFramework.frontstages.getFrontstageDef(EmptyFrontstageProvider.stageId);
      expect(!!frontstageDef?.isReady).to.be.false;
      await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
      const sut = UiFramework.frontstages.activeFrontstageDef!;
      sut.rightPanel!.getPanelSectionDef(StagePanelSection.Start).widgetDefs.map((w) => w.id).should.eql(["WidgetsProviderR1"]);
      sut.rightPanel!.getPanelSectionDef(StagePanelSection.End).widgetDefs.map((w) => w.id).should.eql(["WidgetsProviderRM1"]);
      sut.leftPanel!.getPanelSectionDef(StagePanelSection.Start).widgetDefs.map((w) => w.id).should.eql(["WidgetsProviderW1"]);
    });
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
    state = addFloatingWidget(state, "fw3", ["t5"], { hidden: true });

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

    const t5 = WidgetDef.create({
      id: "t5",
      defaultState: WidgetState.Hidden,
    });

    const findWidgetDefGetter = sinon.stub(frontstageDef, "findWidgetDef");
    findWidgetDefGetter
      .onFirstCall().returns(t2);
    findWidgetDefGetter.returns(t3);

    const rightMiddleVisible = frontstageDef.isWidgetDisplayed("t2");
    expect(rightMiddleVisible).to.be.true;
    const rightEndVisible = frontstageDef.isWidgetDisplayed("t3");
    expect(rightEndVisible).to.be.false;
    const floatingWidgetVisible = frontstageDef.isWidgetDisplayed("t4");
    expect(floatingWidgetVisible).to.be.true;
    expect(frontstageDef.getWidgetCurrentState(t4)).to.eql(WidgetState.Floating);
    expect(frontstageDef.getWidgetCurrentState(t5)).to.eql(WidgetState.Hidden);
  });

  it("should save size and position", async () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1");
    state = addTab(state, "t2");
    state = addTab(state, "t3");
    state = addPopoutWidget(state, "pw1", ["t1"]);
    state = addPanelWidget(state, "right", "rightMiddle", ["t2"]);
    state = addPanelWidget(state, "right", "rightEnd", ["t3"]);

    const t1 = WidgetDef.create({ id: "t1" });

    const frontstageDef = new FrontstageDef();
    sinon.stub(frontstageDef, "findWidgetDef").withArgs("t1").returns(t1);
    sinon.stub(frontstageDef, "nineZoneState").get(() => state);
    sinon.stub(frontstageDef, "id").get(() => "testFrontstage");
    sinon.stub(frontstageDef, "version").get(() => 11);

    sinon.stub(window, "screenX").get(() => 99);
    sinon.stub(window, "screenY").get(() => 99);
    sinon.stub(window, "innerWidth").get(() => 999);
    sinon.stub(window, "innerHeight").get(() => 999);

    frontstageDef.saveChildWindowSizeAndPosition("pw1", window);

    const widgetDef = frontstageDef.findWidgetDef("t1");
    expect(widgetDef?.popoutBounds).to.eql({
      left: 99,
      top: 99,
      right: 99 + 999,
      bottom: 99 + 999,
    });
  });

  it("should save size and position in Electron", async () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1");
    state = addTab(state, "t2");
    state = addTab(state, "t3");
    state = addPopoutWidget(state, "pw1", ["t1"]);
    state = addPanelWidget(state, "right", "rightMiddle", ["t2"]);
    state = addPanelWidget(state, "right", "rightEnd", ["t3"]);

    const t1 = WidgetDef.create({ id: "t1" });

    const frontstageDef = new FrontstageDef();
    sinon.stub(frontstageDef, "findWidgetDef").withArgs("t1").returns(t1);
    sinon.stub(frontstageDef, "nineZoneState").get(() => state);
    sinon.stub(frontstageDef, "id").get(() => "testFrontstage");
    sinon.stub(frontstageDef, "version").get(() => 11);

    sinon.stub(window, "screenX").get(() => 99);
    sinon.stub(window, "screenY").get(() => 99);
    sinon.stub(window, "innerWidth").get(() => 999);
    sinon.stub(window, "innerHeight").get(() => 999);

    sinon.stub(ProcessDetector, "isElectronAppFrontend").get(() => true);
    frontstageDef.saveChildWindowSizeAndPosition("pw1", window);
    sinon.stub(ProcessDetector, "isElectronAppFrontend").get(() => false);

    const widgetDef = frontstageDef.findWidgetDef("t1");
    expect(widgetDef?.popoutBounds).to.eql({
      left: 99,
      top: 99,
      right: 99 + 999 + 16,
      bottom: 99 + 999 + 39,
    });
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
      id: "old",
      version: 1,
      usage: "General",
      contentGroup: TestUtils.TestContentGroup2,
      rightPanel: {
        sections: {
          start: [{
            id: "test-widget",
          }],
        },
      },
    });
    sinon.stub(UiFramework.frontstages, "activeFrontstageDef").get(() => def);

    const spy = sinon.spy();
    UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

    // __PUBLISH_EXTRACT_START__ AppUI.WidgetDef.setWidgetState
    const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
    if (!frontstageDef)
      throw new Error("Active frontstage not found");
    const widgetDef = frontstageDef.findWidgetDef("test-widget");
    widgetDef?.setWidgetState(WidgetState.Open);
    // __PUBLISH_EXTRACT_END__

    expect(spy).to.calledOnceWith();
  });

  describe("getWidgetCurrentState", () => {
    it("should show WidgetState as closed in panel size is undefined", () => {
      const frontstageDef = new FrontstageDef();
      sinon.stub(frontstageDef, "isReady").get(() => true);

      let nineZoneState = createNineZoneState();
      nineZoneState = addTab(nineZoneState, "t1");
      nineZoneState = addTab(nineZoneState, "t2");
      nineZoneState = addPanelWidget(nineZoneState, "left", "start", ["t1", "t2"], { activeTabId: "t1" });
      frontstageDef.nineZoneState = nineZoneState;
      const widgetDef = WidgetDef.create({
        id: "t1",
        defaultState: WidgetState.Hidden,
      });

      const leftPanel = StagePanelDef.create({
        resizable: true,
        sections: {
          start: [{ id: "start" }],
        },
      }, StagePanelLocation.Left);
      sinon.stub(frontstageDef, "leftPanel").get(() => leftPanel);

      sinon.stub(frontstageDef, "getStagePanelDef").withArgs(StagePanelLocation.Left).returns(leftPanel);
      sinon.stub(frontstageDef, "findWidgetDef").withArgs("t1").returns(widgetDef);

      expect(frontstageDef.getWidgetCurrentState(widgetDef)).to.be.eql(WidgetState.Closed);
    });

    it("should show WidgetState as closed in panel size is 0", () => {
      const frontstageDef = new FrontstageDef();
      sinon.stub(frontstageDef, "isReady").get(() => true);

      let nineZoneState = createNineZoneState();
      nineZoneState = addTab(nineZoneState, "t1");
      nineZoneState = addTab(nineZoneState, "t2");
      nineZoneState = addPanelWidget(nineZoneState, "left", "start", ["t1", "t2"], { activeTabId: "t1" });
      frontstageDef.nineZoneState = nineZoneState;
      const widgetDef = WidgetDef.create({
        id: "t1",
        defaultState: WidgetState.Hidden,
      });

      const leftPanel = StagePanelDef.create({
        resizable: true,
        size: 0,
        sections: {
          start: [{ id: "start" }],
        },
      }, StagePanelLocation.Left);
      sinon.stub(frontstageDef, "leftPanel").get(() => leftPanel);

      sinon.stub(frontstageDef, "getStagePanelDef").withArgs(StagePanelLocation.Left).returns(leftPanel);
      sinon.stub(frontstageDef, "findWidgetDef").withArgs("t1").returns(widgetDef);

      // const panel = frontstageDef.nineZoneState.panels.left;
      expect(frontstageDef.getWidgetCurrentState(widgetDef)).to.be.eql(WidgetState.Closed);
    });

    it("should show WidgetState as closed in panel is collapsed", () => {
      const frontstageDef = new FrontstageDef();
      sinon.stub(frontstageDef, "isReady").get(() => true);

      let nineZoneState = createNineZoneState();
      nineZoneState = addTab(nineZoneState, "t1");
      nineZoneState = addTab(nineZoneState, "t2");
      nineZoneState = addPanelWidget(nineZoneState, "left", "start", ["t1", "t2"], { activeTabId: "t1" });
      nineZoneState = produce(nineZoneState, (draft) => {
        draft.panels.left.collapsed = true;
      });
      frontstageDef.nineZoneState = nineZoneState;
      const widgetDef = WidgetDef.create({
        id: "t1",
        defaultState: WidgetState.Open,
      });

      sinon.stub(frontstageDef, "findWidgetDef").withArgs("t1").returns(widgetDef);
      expect(frontstageDef.getWidgetCurrentState(widgetDef)).to.be.eql(WidgetState.Closed);
    });
  });

});

describe("float and dock widget", () => {
  it("panel widget should float", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1");
    state = addTab(state, "t2");
    state = addTab(state, "t3");
    state = addPanelWidget(state, "right", "rightStart", ["t1"], { minimized: true });
    state = addPanelWidget(state, "right", "rightEnd", ["t3"]);

    const frontstageDef = new FrontstageDef();
    const nineZoneStateSetter = sinon.spy();

    sinon.stub(frontstageDef, "nineZoneState").get(() => state).set(nineZoneStateSetter);
    frontstageDef.floatWidget("t1", { x: 55, y: 105 });
    nineZoneStateSetter.calledOnce.should.true;

    frontstageDef.floatWidget("ta");
    nineZoneStateSetter.calledOnce.should.true;
  });

  it("panel widget should popout", async () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1");
    state = addTab(state, "t2");
    state = addTab(state, "t3");
    state = addTab(state, "t4");
    state = addPanelWidget(state, "left", "leftStart", ["t1"], { minimized: true });
    state = addPanelWidget(state, "right", "rightMiddle", ["t2", "t4"], { activeTabId: "t2" });
    state = addPanelWidget(state, "right", "rightEnd", ["t3"]);
    state = produce(state, (draft) => {
      draft.panels.right.size = 300;
    });

    const frontstageDef = new FrontstageDef();
    const nineZoneStateSetter = sinon.spy();
    sinon.stub(frontstageDef, "nineZoneState").get(() => state).set(nineZoneStateSetter);

    const t1 = WidgetDef.create({
      id: "t1",
      defaultState: WidgetState.Open,
    });

    const t2 = WidgetDef.create({
      id: "t2",
      defaultState: WidgetState.Open,
    });

    const t4 = WidgetDef.create({
      id: "t4",
      defaultState: WidgetState.Closed,
    });

    const findWidgetDefGetter = sinon.stub(frontstageDef, "findWidgetDef");
    findWidgetDefGetter
      .onFirstCall().returns(t1);
    findWidgetDefGetter.returns(t2);

    expect(frontstageDef.getWidgetCurrentState(t1)).to.eql(WidgetState.Closed);
    expect(frontstageDef.getWidgetCurrentState(t2)).to.eql(WidgetState.Open);
    expect(frontstageDef.getWidgetCurrentState(t4)).to.eql(WidgetState.Closed);

    const openStub = sinon.stub();
    sinon.stub(window, "open").callsFake(openStub);
    frontstageDef.popoutWidget("t1", { x: 55, y: 105 }, { height: 300, width: 200 });
    nineZoneStateSetter.calledOnce.should.true;
    await new Promise((r) => { setTimeout(r, 100); }); // wait for open processing
    openStub.calledOnce.should.be.true;

    openStub.resetHistory();
    frontstageDef.popoutWidget("t2");
    await new Promise((r) => { setTimeout(r, 100); }); // wait for open processing
    openStub.calledOnce.should.true;
  });

  it("reopen popout window", async () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1");
    state = addTab(state, "t2");
    state = addTab(state, "t3");
    state = addPopoutWidget(state, "fw1", ["t1"]);
    state = addPopoutWidget(state, "fw2", ["t2"]);
    state = addPanelWidget(state, "right", "rightEnd", ["t3"]);

    const frontstageDef = new FrontstageDef();

    const t1 = WidgetDef.create({
      id: "t1",
      defaultState: WidgetState.Open,
    });

    const t2 = WidgetDef.create({
      id: "t2",
      defaultState: WidgetState.Open,
    });

    const findWidgetDefGetter = sinon.stub(frontstageDef, "findWidgetDef");
    findWidgetDefGetter
      .onFirstCall().returns(t1);
    findWidgetDefGetter.returns(t2);

    const nineZoneStateSetter = sinon.spy();
    sinon.stub(frontstageDef, "nineZoneState").get(() => state).set(nineZoneStateSetter);

    // should not trigger setter because it is already in a popout state
    frontstageDef.popoutWidget("t1");
    nineZoneStateSetter.calledOnce.should.be.false;

    const openStub = sinon.stub();
    sinon.stub(window, "open").callsFake(openStub);

    frontstageDef.openPopoutWidgetContainer(state, "fw1");
    await new Promise((r) => { setTimeout(r, 100); }); // wait for open processing
    openStub.calledOnce.should.be.true;

    openStub.resetHistory();
    frontstageDef.openPopoutWidgetContainer(state, "fw2");
    await new Promise((r) => { setTimeout(r, 100); }); // wait for open processing
    openStub.calledOnce.should.be.true;
  });

  it("floating widget should dock", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1");
    state = addTab(state, "t2");
    state = addTab(state, "t3");
    state = addFloatingWidget(state, "fw1", ["t1"]);
    state = addPanelWidget(state, "right", "rightMiddle", ["t2"]);
    state = addPanelWidget(state, "right", "rightEnd", ["t3"]);

    const frontstageDef = new FrontstageDef();
    const nineZoneStateSetter = sinon.spy();

    sinon.stub(frontstageDef, "nineZoneState").get(() => state).set(nineZoneStateSetter);

    expect(frontstageDef.isFloatingWidget("t1")).to.be.true;
    expect(frontstageDef.isFloatingWidget("bad")).to.be.false;
    frontstageDef.dockWidgetContainer("t1");
    nineZoneStateSetter.calledOnce.should.true;

    frontstageDef.dockWidgetContainer("ta");
    nineZoneStateSetter.calledOnce.should.true;
  });

  it("popout widget should dock", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1");
    state = addTab(state, "t2");
    state = addTab(state, "t3");
    state = addPopoutWidget(state, "fw1", ["t1"]);
    state = addPanelWidget(state, "right", "rightMiddle", ["t2"]);
    state = addPanelWidget(state, "right", "rightEnd", ["t3"]);

    const frontstageDef = new FrontstageDef();
    const nineZoneStateSetter = sinon.spy();

    sinon.stub(frontstageDef, "nineZoneState").get(() => state).set(nineZoneStateSetter);

    expect(frontstageDef.isPopoutWidget("t1")).to.be.true;
    expect(frontstageDef.isPopoutWidget("bad")).to.be.false;
    frontstageDef.dockWidgetContainer("t1");
    nineZoneStateSetter.calledOnce.should.true;

    frontstageDef.dockWidgetContainer("ta");
    nineZoneStateSetter.calledOnce.should.true;
  });

  it("dock popout widget container given widget Id", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1");
    state = addTab(state, "t2");
    state = addTab(state, "t3");
    state = addPopoutWidget(state, "fw1", ["t1"]);
    state = addPanelWidget(state, "right", "rightMiddle", ["t2"]);
    state = addPanelWidget(state, "right", "rightEnd", ["t3"]);

    const frontstageDef = new FrontstageDef();
    const nineZoneStateSetter = sinon.spy();

    sinon.stub(frontstageDef, "nineZoneState").get(() => state).set(nineZoneStateSetter);

    expect(frontstageDef.isPopoutWidget("t1")).to.be.true;
    expect(frontstageDef.isPopoutWidget("bad")).to.be.false;
    frontstageDef.dockWidgetContainer("t1");
    nineZoneStateSetter.calledOnce.should.true;

    frontstageDef.dockWidgetContainer("ta");
    nineZoneStateSetter.calledOnce.should.true;
  });

  it("dock popout widget container given container Id", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1");
    state = addTab(state, "t2");
    state = addTab(state, "t3");
    state = addPopoutWidget(state, "fw1", ["t1"]);
    state = addPanelWidget(state, "right", "rightMiddle", ["t2"]);
    state = addPanelWidget(state, "right", "rightEnd", ["t3"]);

    const frontstageDef = new FrontstageDef();
    const nineZoneStateSetter = sinon.spy();

    sinon.stub(frontstageDef, "nineZoneState").get(() => state).set(nineZoneStateSetter);

    expect(frontstageDef.isPopoutWidget("t1")).to.be.true;
    expect(frontstageDef.isPopoutWidget("bad")).to.be.false;
    frontstageDef.dockPopoutWidgetContainer("fw1");
    nineZoneStateSetter.calledOnce.should.true;
  });

  it("dock popout widget should not set state given non popout container", () => {
    const state = createNineZoneState({ size: { height: 1000, width: 1600 } });

    const frontstageDef = new FrontstageDef();
    const nineZoneStateSetter = sinon.spy();

    sinon.stub(frontstageDef, "nineZoneState").get(() => state).set(nineZoneStateSetter);

    frontstageDef.dockPopoutWidgetContainer("fw1");
    expect(nineZoneStateSetter).to.not.be.called;
  });

  it("popout widget should float", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1");
    state = addTab(state, "t2");
    state = addTab(state, "t3");
    state = addPopoutWidget(state, "fw1", ["t1"]);
    state = addPanelWidget(state, "right", "rightMiddle", ["t2"]);
    state = addPanelWidget(state, "right", "rightEnd", ["t3"]);

    const frontstageDef = new FrontstageDef();
    const nineZoneStateSetter = sinon.spy();

    sinon.stub(frontstageDef, "nineZoneState").get(() => state).set(nineZoneStateSetter);
    sinon.stub(frontstageDef, "nineZoneState").get(() => state);
    frontstageDef.floatWidget("t1", { x: 55, y: 105 });
    nineZoneStateSetter.calledOnce.should.true;

    frontstageDef.floatWidget("ta");
    nineZoneStateSetter.calledOnce.should.true;
  });

  it("set floating widget bounds", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "fw1", ["t1"]);

    const frontstageDef = new FrontstageDef();
    const nineZoneStateSetter = sinon.spy();

    sinon.stub(frontstageDef, "nineZoneState").get(() => state).set(nineZoneStateSetter);
    expect(frontstageDef.setFloatingWidgetContainerBounds("fw1", { top: 55, left: 105, bottom: 155, right: 255 })).to.be.true;
    expect(frontstageDef.setFloatingWidgetContainerBounds("bad", { top: 55, left: 105, bottom: 155, right: 255 })).to.be.false;
    nineZoneStateSetter.calledOnce.should.true;
  });

  it("get floating containers 1 available", () => {
    let state = createNineZoneState({ size: { height: 1000, width: 1600 } });
    state = addTab(state, "t1");
    state = addFloatingWidget(state, "fw1", ["t1"], { bounds: { top: 55, left: 105, bottom: 155, right: 255 } });
    const frontstageDef = new FrontstageDef();
    sinon.stub(frontstageDef, "nineZoneState").get(() => state);
    expect(frontstageDef.getFloatingWidgetContainerIds().length).to.eql(1);
    expect(frontstageDef.getFloatingWidgetContainerIdByWidgetId("t1")).to.eql("fw1");
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
    expect(frontstageDef.getFloatingWidgetContainerIdByWidgetId("t1")).to.be.undefined;
    expect(frontstageDef.getFloatingWidgetContainerBounds("t1")).to.be.undefined;
    expect(frontstageDef.getFloatingWidgetContainerBounds(undefined)).to.be.undefined;
  });

  it("should return default size for panel", () => {
    const frontstageDef = new FrontstageDef();
    const panelDef = StagePanelDef.create({ resizable: true, size: 300 }, StagePanelLocation.Left);

    expect(frontstageDef.getPanelCurrentState(panelDef)).to.have.ordered.members([StagePanelState.Open, 300, true]);
  });
});

describe("useSpecificWidgetDef", () => {
  it("should return widgetDef from active frontstage", () => {
    const frontstageDef = new FrontstageDef();
    const widgetDef = new WidgetDef();
    sinon.stub(frontstageDef, "findWidgetDef").returns(widgetDef);
    sinon.stub(UiFramework.frontstages, "activeFrontstageDef").get(() => frontstageDef);

    const { result } = renderHook(() => useSpecificWidgetDef("t1"));

    expect(result.current).to.be.eq(widgetDef);
  });

  it("should handle no active frontstage", () => {
    sinon.stub(UiFramework.frontstages, "activeFrontstageDef").get(() => undefined);
    const { result } = renderHook(() => useSpecificWidgetDef("t1"));

    expect(result.current).to.be.undefined;
  });
});
