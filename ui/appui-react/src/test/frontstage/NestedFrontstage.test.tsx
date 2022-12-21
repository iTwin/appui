/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { StandardContentLayouts } from "@itwin/appui-abstract";
import { expect } from "chai";
import * as React from "react";
import * as sinon from "sinon";
import type { FrontstageConfig} from "../../appui-react";
import {
  ContentGroup, FrontstageDef, FrontstageManager, FrontstageProvider, NestedFrontstage, ToolItemDef,
} from "../../appui-react";
import TestUtils from "../TestUtils";
import { AppStatusBarWidgetControl, TestContentControl, TestFrontstage } from "./FrontstageTestUtils";

class TestNestedFrontstage extends FrontstageProvider {
  public get defaultToolDef() {
    return new ToolItemDef({
      toolId: "dummy",
      iconSpec: "dummy",
      label: "dummy",
      description: "dummy",
      execute: async () => { },
    });
  }

  public static stageId = "Test1";
  public get id(): string {
    return TestNestedFrontstage.stageId;
  }

  public override frontstageConfig(): FrontstageConfig {
    const contentGroup: ContentGroup = new ContentGroup(
      {
        id: "test-group",
        layout: StandardContentLayouts.singleView,
        contents: [
          {
            id: "main",
            classId: TestContentControl,
            applicationData: { label: "Content 1a", bgColor: "black" },
          },
        ],
      },
    );

    return {
      id: this.id,
      version: 1,
      contentGroup,
      contentManipulation: {
        id: "contentManipulation",
        element: <>FrontstageToolWidget</>,
        applicationData: { key: "value" },
      },
      toolSettings: {
        id: "toolSettings",
      },
      statusBar: {
        id: "statusBar",
        iconSpec: "icon-placeholder",
        labelKey: "App:widgets.StatusBar",
        control: AppStatusBarWidgetControl,
        applicationData: { key: "value" },
      },
    };
  }
}

describe("NestedFrontstage", async () => {

  before(async () => {
    await TestUtils.initializeUiFramework();
    FrontstageManager.clearFrontstageProviders();
  });

  after(() => {
    TestUtils.terminateUiFramework();
  });

  it("activeNestedFrontstage should return undefined if none active", () => {
    expect(FrontstageManager.activeNestedFrontstage).to.be.undefined;
    expect(FrontstageManager.nestedFrontstageCount).to.eq(0);
  });

  it("openNestedFrontstage & closeNestedFrontstage should open/close nested frontstages", async () => {
    const frontstageProvider = new TestFrontstage();
    FrontstageManager.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await FrontstageDef.create(frontstageProvider);
    await FrontstageManager.setActiveFrontstageDef(frontstageDef);
    await TestUtils.flushAsyncOperations();

    expect(FrontstageManager.activeFrontstageDef).to.eq(frontstageDef);
    expect(FrontstageManager.nestedFrontstageCount).to.eq(0);

    const nestedFrontstageProvider = new TestNestedFrontstage();
    const nestedFrontstageDef = await FrontstageDef.create(nestedFrontstageProvider);
    const spyActivated = sinon.spy(nestedFrontstageDef, "_onActivated" as any);
    const spyDeactivated = sinon.spy(nestedFrontstageDef, "_onDeactivated" as any);

    await FrontstageManager.openNestedFrontstage(nestedFrontstageDef);
    expect(FrontstageManager.nestedFrontstageCount).to.eq(1);
    expect(FrontstageManager.activeNestedFrontstage).to.eq(nestedFrontstageDef);
    expect(spyActivated.calledOnce).to.be.true;

    const nestedFrontstageProvider2 = new TestNestedFrontstage();
    const nestedFrontstageDef2 = await FrontstageDef.create(nestedFrontstageProvider2);
    await FrontstageManager.openNestedFrontstage(nestedFrontstageDef2);
    expect(FrontstageManager.nestedFrontstageCount).to.eq(2);
    expect(FrontstageManager.activeNestedFrontstage).to.eq(nestedFrontstageDef2);
    expect(spyDeactivated.calledOnce).to.be.true;

    NestedFrontstage.backToPreviousFrontstageCommand.execute();
    await TestUtils.flushAsyncOperations();

    expect(FrontstageManager.nestedFrontstageCount).to.eq(1);

    NestedFrontstage.backToPreviousFrontstageCommand.execute();
    await TestUtils.flushAsyncOperations();

    expect(FrontstageManager.nestedFrontstageCount).to.eq(0);
    expect(FrontstageManager.activeFrontstageDef).to.eq(frontstageDef);
  });

});
