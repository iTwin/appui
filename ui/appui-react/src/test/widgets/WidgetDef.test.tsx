/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import * as React from "react";
import { BadgeType } from "@itwin/appui-abstract";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import { SvgList } from "@itwin/itwinui-icons-react";
import {
  FrontstageDef,
  initializeNineZoneState,
  UiFramework,
  WidgetDef,
  WidgetState,
} from "../../appui-react";
import TestUtils from "../TestUtils";
import { defaultFrontstageConfig } from "../frontstage/FrontstageDef.test";

describe("WidgetDef", () => {
  beforeAll(async () => {
    await NoRenderApp.startup();
    await TestUtils.initializeUiFramework();
  });

  afterAll(async () => {
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
      const spy = vi.fn();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);
      widgetDef.handleWidgetStateChanged(WidgetState.Hidden);
      expect(spy).toHaveBeenCalledOnce();
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
      def.nineZoneState = initializeNineZoneState(def);
      vi.spyOn(
        UiFramework.frontstages,
        "activeFrontstageDef",
        "get"
      ).mockImplementation(() => def);

      const spy = vi.fn();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

      const widgetDef = def.findWidgetDef("w1")!;
      widgetDef.setWidgetState(WidgetState.Hidden);
      expect(spy).toHaveBeenNthCalledWith(1, {
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
      def.nineZoneState = initializeNineZoneState(def);
      vi.spyOn(
        UiFramework.frontstages,
        "activeFrontstageDef",
        "get"
      ).mockImplementation(() => def);

      const spy = vi.fn();
      UiFramework.frontstages.onWidgetStateChangedEvent.addListener(spy);

      const widgetDef = def.findWidgetDef("w1")!;
      widgetDef.setWidgetState(WidgetState.Open);
      expect(spy).toHaveBeenNthCalledWith(1, {
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
