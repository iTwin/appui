/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { StandardContentLayouts } from "@itwin/appui-abstract";
import * as React from "react";
import type { FrontstageConfig } from "../../appui-react";
import {
  ContentGroup,
  FrontstageDef,
  FrontstageProvider,
  NestedFrontstage,
  ToolItemDef,
  UiFramework,
} from "../../appui-react";
import TestUtils from "../TestUtils";
import { TestContentControl, TestFrontstage } from "./FrontstageTestUtils";

class TestNestedFrontstage extends FrontstageProvider {
  public get defaultToolDef() {
    return new ToolItemDef({
      toolId: "dummy",
      icon: "dummy",
      label: "dummy",
      description: "dummy",
      execute: async () => {},
    });
  }

  public static stageId = "Test1";
  public get id(): string {
    return TestNestedFrontstage.stageId;
  }

  public override frontstageConfig(): FrontstageConfig {
    const contentGroup: ContentGroup = new ContentGroup({
      id: "test-group",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "main",
          classId: TestContentControl,
          applicationData: { label: "Content 1a", bgColor: "black" },
        },
      ],
    });

    return {
      id: this.id,
      version: 1,
      contentGroup,
      contentManipulation: {
        id: "contentManipulation",
        content: <>FrontstageToolWidget</>,
      },
      toolSettings: {
        id: "toolSettings",
      },
      statusBar: {
        id: "statusBar",
        icon: "icon-placeholder",
        labelKey: "App:widgets.StatusBar",
      },
    };
  }
}

describe("NestedFrontstage", async () => {
  afterEach(() => {
    UiFramework.frontstages.clearFrontstageProviders();
  });

  it("activeNestedFrontstage should return undefined if none active", () => {
    expect(UiFramework.frontstages.activeNestedFrontstage).to.be.undefined;
    expect(UiFramework.frontstages.nestedFrontstageCount).toEqual(0);
  });

  it("openNestedFrontstage & closeNestedFrontstage should open/close nested frontstages", async () => {
    const frontstageProvider = new TestFrontstage();
    UiFramework.frontstages.addFrontstageProvider(frontstageProvider);
    const frontstageDef = await FrontstageDef.create(frontstageProvider);
    await UiFramework.frontstages.setActiveFrontstageDef(frontstageDef);
    await TestUtils.flushAsyncOperations();

    expect(UiFramework.frontstages.activeFrontstageDef).toEqual(frontstageDef);
    expect(UiFramework.frontstages.nestedFrontstageCount).toEqual(0);

    const nestedFrontstageProvider = new TestNestedFrontstage();
    const nestedFrontstageDef = await FrontstageDef.create(
      nestedFrontstageProvider
    );
    const spyActivated = vi.spyOn(nestedFrontstageDef, "_onActivated" as any);
    const spyDeactivated = vi.spyOn(
      nestedFrontstageDef,
      "_onDeactivated" as any
    );

    await UiFramework.frontstages.openNestedFrontstage(nestedFrontstageDef);
    expect(UiFramework.frontstages.nestedFrontstageCount).toEqual(1);
    expect(UiFramework.frontstages.activeNestedFrontstage).toEqual(
      nestedFrontstageDef
    );
    expect(spyActivated).toHaveBeenCalledOnce();

    const nestedFrontstageProvider2 = new TestNestedFrontstage();
    const nestedFrontstageDef2 = await FrontstageDef.create(
      nestedFrontstageProvider2
    );
    await UiFramework.frontstages.openNestedFrontstage(nestedFrontstageDef2);
    expect(UiFramework.frontstages.nestedFrontstageCount).toEqual(2);
    expect(UiFramework.frontstages.activeNestedFrontstage).toEqual(
      nestedFrontstageDef2
    );
    expect(spyDeactivated).toHaveBeenCalledOnce();

    NestedFrontstage.backToPreviousFrontstageCommand.execute();
    await TestUtils.flushAsyncOperations();

    expect(UiFramework.frontstages.nestedFrontstageCount).toEqual(1);

    NestedFrontstage.backToPreviousFrontstageCommand.execute();
    await TestUtils.flushAsyncOperations();

    expect(UiFramework.frontstages.nestedFrontstageCount).toEqual(0);
    expect(UiFramework.frontstages.activeFrontstageDef).toEqual(frontstageDef);
  });
});
