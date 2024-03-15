/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { expect } from "chai";
import produce from "immer";
import * as React from "react";
import * as sinon from "sinon";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { BadgeType } from "@itwin/core-react";
import { SvgList } from "@itwin/itwinui-icons-react";
import {
  FrontstageDef,
  getWidgetState,
  initializeNineZoneState,
  StagePanelDef,
  StagePanelLocation,
  UiFramework,
  WidgetDef,
  WidgetState,
} from "../../appui-react";
import TestUtils from "../TestUtils";
import { defaultFrontstageConfig } from "../frontstage/FrontstageDef.test";
import { createNineZoneState } from "../../appui-react/layout/state/NineZoneState";
import { addTab } from "../../appui-react/layout/state/internal/TabStateHelpers";
import { addPanelWidget } from "../../appui-react/layout/state/internal/PanelStateHelpers";

describe("WidgetDef", () => {
  before(async () => {
    await NoRenderApp.startup();
    await TestUtils.initializeUiFramework();
  });

  after(async () => {
    TestUtils.terminateUiFramework();
    await IModelApp.shutdown();
  });

  it("optional properties", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      defaultState: WidgetState.Open,
      priority: 100,
      icon: "icon-home",
      label: "label",
      tooltip: "tooltip",
      canFloat: {
        isResizable: false,
      },
      badge: BadgeType.TechnicalPreview,
      content: <div />,
    });

    expect(widgetDef.isVisible).to.eq(true);
    expect(widgetDef.isActive).to.eq(true);
    expect(widgetDef.isFloating).to.eq(false);
    expect(widgetDef.priority).to.eq(100);
    expect(widgetDef.isFloatingStateSupported).to.eq(true);
    expect(widgetDef.isFloatingStateWindowResizable).to.eq(false);
    expect(widgetDef.isToolSettings).to.eq(false);
    expect(widgetDef.isStatusBar).to.eq(false);

    expect(widgetDef.label).to.eq("label");
    expect(widgetDef.tooltip).to.eq("tooltip");
    expect(widgetDef.iconSpec).to.eq("icon-home");
    expect(widgetDef.badgeType).to.eq(BadgeType.TechnicalPreview);

    widgetDef.iconSpec = "icon-lightbulb";
    expect(widgetDef.iconSpec).to.eq("icon-lightbulb");
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.false;
  });

  it("should work with react icon", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      defaultState: WidgetState.Open,
      priority: 200,
      icon: <SvgList />,
      label: "label",
      tooltip: "tooltip",
      canFloat: {
        isResizable: true,
      },
    });
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.true;
  });

  it("should properly handle iconSpec set/get", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      defaultState: WidgetState.Open,
      priority: 200,
      icon: "icon-lightbulb",
      label: "label",
      tooltip: "tooltip",
      canFloat: {
        isResizable: true,
      },
    });
    expect(widgetDef.iconSpec).to.eq("icon-lightbulb");
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.false;

    widgetDef.iconSpec = <SvgList />;
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.true;

    widgetDef.iconSpec = "icon-home";
    expect(widgetDef.iconSpec).to.eq("icon-home");
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.false;
  });

  it("labelKey and tooltipKey should return translated string", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      labelKey: "App:label",
      tooltipKey: "App:tooltip",
    });

    expect(widgetDef.label).to.eq("label");
    expect(widgetDef.tooltip).to.eq("tooltip");
  });

  it("reactNode supports set and get", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
    });

    widgetDef.reactNode = <div />;
    expect(widgetDef.reactNode).to.not.be.undefined;
  });

  describe("setWidgetState", () => {
    it("should update widget state", () => {
      const widgetDef = WidgetDef.create({
        id: "w1",
        badge: BadgeType.None,
      });
      widgetDef.handleWidgetStateChanged(WidgetState.Open);

      expect(widgetDef.stateChanged).to.eq(true);
      expect(widgetDef.isVisible).to.eq(true);
    });

    it("should emit UiFramework.frontstages.onWidgetStateChangedEvent", () => {
      const widgetDef = WidgetDef.create({
        id: "t1",
        defaultState: WidgetState.Closed,
      });
      const spy = sinon.spy();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);
      widgetDef.handleWidgetStateChanged(WidgetState.Hidden);

      sinon.assert.calledOnce(spy);
    });

    it("should emit onWidgetStateChangedEvent for a hidden widget", async () => {
      const def = new FrontstageDef();
      await def.initializeFromConfig({
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
      initializeNineZoneState(def);
      sinon.stub(UiFramework.frontstages, "activeFrontstageDef").get(() => def);

      const spy = sinon.spy();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

      const widgetDef = def.findWidgetDef("w1")!;
      widgetDef.setWidgetState(WidgetState.Hidden);
      expect(spy).to.calledOnceWithExactly({
        widgetDef,
        widgetState: WidgetState.Hidden,
      });
    });

    it("should emit onWidgetStateChangedEvent for an opened widget", async () => {
      const def = new FrontstageDef();
      await def.initializeFromConfig({
        ...defaultFrontstageConfig,
        rightPanel: {
          sections: {
            start: [
              {
                id: "w1",
                defaultState: WidgetState.Hidden,
              },
            ],
          },
        },
      });
      initializeNineZoneState(def);
      sinon.stub(UiFramework.frontstages, "activeFrontstageDef").get(() => def);

      const spy = sinon.spy();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

      const widgetDef = def.findWidgetDef("w1")!;
      widgetDef.setWidgetState(WidgetState.Open);
      expect(spy).to.calledOnceWithExactly({
        widgetDef,
        widgetState: WidgetState.Open,
      });
    });
  });

  describe("label", () => {
    it("should set label", () => {
      const sut = new WidgetDef();
      sut.setLabel("test");

      sut.label.should.eq("test");
    });
  });
});

describe("getWidgetState", () => {
  it("should return `Closed` if panel size is undefined", () => {
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

    expect(getWidgetState(widgetDef, frontstageDef.nineZoneState)).to.be.eql(
      WidgetState.Closed
    );
  });

  it("should return `Closed` if panel size is 0", () => {
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

    expect(getWidgetState(widgetDef, frontstageDef.nineZoneState)).to.be.eql(
      WidgetState.Closed
    );
  });

  it("should return `Closed` if panel is collapsed", () => {
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
    expect(getWidgetState(widgetDef, frontstageDef.nineZoneState)).to.be.eql(
      WidgetState.Closed
    );
  });

  it("should return `Unloaded` if tab is not loaded", () => {
    const frontstageDef = new FrontstageDef();

    let nineZoneState = createNineZoneState();
    nineZoneState = addTab(nineZoneState, "t1", { unloaded: true });
    nineZoneState = addPanelWidget(nineZoneState, "left", "start", ["t1"]);
    frontstageDef.nineZoneState = nineZoneState;
    const widgetDef = WidgetDef.create({
      id: "t1",
    });

    sinon
      .stub(frontstageDef, "findWidgetDef")
      .withArgs("t1")
      .returns(widgetDef);
    expect(getWidgetState(widgetDef, frontstageDef.nineZoneState)).to.be.eql(
      WidgetState.Unloaded
    );
  });
});
