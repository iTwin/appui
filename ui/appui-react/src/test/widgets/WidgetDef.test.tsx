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

    expect(widgetDef.isVisible).toEqual(true);
    expect(widgetDef.isActive).toEqual(true);
    expect(widgetDef.isFloating).toEqual(false);
    expect(widgetDef.priority).toEqual(100);
    expect(widgetDef.isFloatingStateSupported).toEqual(true);
    expect(widgetDef.isFloatingStateWindowResizable).toEqual(false);
    expect(widgetDef.isToolSettings).toEqual(false);
    expect(widgetDef.isStatusBar).toEqual(false);

    expect(widgetDef.label).toEqual("label");
    expect(widgetDef.tooltip).toEqual("tooltip");
    expect(widgetDef.iconSpec).toEqual("icon-home");
    expect(widgetDef.badgeType).toEqual(BadgeType.TechnicalPreview);

    widgetDef.iconSpec = "icon-lightbulb";
    expect(widgetDef.iconSpec).toEqual("icon-lightbulb");
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
    expect(React.isValidElement(widgetDef.iconSpec)).toEqual(true);
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
    expect(widgetDef.iconSpec).toEqual("icon-lightbulb");
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.false;

    widgetDef.iconSpec = <SvgList />;
    expect(React.isValidElement(widgetDef.iconSpec)).toEqual(true);

    widgetDef.iconSpec = "icon-home";
    expect(widgetDef.iconSpec).toEqual("icon-home");
    expect(React.isValidElement(widgetDef.iconSpec)).to.be.false;
  });

  it("labelKey and tooltipKey should return translated string", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
      labelKey: "App:label",
      tooltipKey: "App:tooltip",
    });

    expect(widgetDef.label).toEqual("label");
    expect(widgetDef.tooltip).toEqual("tooltip");
  });

  it("reactNode supports set and get", () => {
    const widgetDef = WidgetDef.create({
      id: "w1",
    });

    widgetDef.reactNode = <div />;
    expect(widgetDef.reactNode).to.not.be.undefined;
  });

  describe("setWidgetState", () => {
    it("should update widget state", async () => {
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

      // __PUBLISH_EXTRACT_START__ AppUI.WidgetDef.setWidgetState
      const frontstageDef = UiFramework.frontstages.activeFrontstageDef;
      if (!frontstageDef) throw new Error("Active frontstage not found");
      const widgetDef = frontstageDef.findWidgetDef("test-widget");
      widgetDef?.setWidgetState(WidgetState.Open);
      // __PUBLISH_EXTRACT_END__

      expect(widgetDef?.state).toEqual(WidgetState.Open);
      expect(widgetDef?.stateChanged).toEqual(true);
    });

    it("should emit `UiFramework.frontstages.onWidgetStateChangedEvent`", async () => {
      const frontstageDef = new FrontstageDef();
      await frontstageDef.initializeFromConfig({
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
      initializeNineZoneState(frontstageDef);
      sinon
        .stub(UiFramework.frontstages, "activeFrontstageDef")
        .get(() => frontstageDef);

      const spy = sinon.spy();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

      const widgetDef = frontstageDef.findWidgetDef("w1")!;
      widgetDef.setWidgetState(WidgetState.Open);

      sinon.assert.calledOnceWithExactly(spy, {
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
