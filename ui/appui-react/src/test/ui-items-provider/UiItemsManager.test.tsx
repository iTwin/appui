/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation, @typescript-eslint/ban-ts-comment */

import * as React from "react";
import * as sinon from "sinon";
import { expect } from "chai";
import {
  BackstageItemUtilities,
  StagePanelLocation,
  StageUsage,
  StatusBarItemUtilities,
  StatusBarSection,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsManager,
} from "../../appui-react";

describe("UiItemsManager", () => {
  afterEach(() => {
    UiItemsManager.clearAllProviders();
  });

  it("should register a provider", () => {
    UiItemsManager.register({
      id: "provider1",
    });

    const provider = UiItemsManager.getUiItemsProvider("provider1");
    expect(provider?.id).to.eq("provider1");
  });

  it("should provide status bar items", () => {
    UiItemsManager.register({
      id: "provider1",
      provideStatusBarItems: () => [
        StatusBarItemUtilities.createActionItem(
          "s1",
          StatusBarSection.Center,
          0,
          "",
          "",
          () => {}
        ),
      ],
    });

    const items = UiItemsManager.getStatusBarItems(
      "stage1",
      StageUsage.General
    );
    sinon.assert.match(items, [
      sinon.match({
        id: "s1",
      }),
    ]);
  });

  it("should provide backstage items", () => {
    UiItemsManager.register({
      id: "provider1",
      provideBackstageItems: () => [
        BackstageItemUtilities.createActionItem(
          "b1",
          0,
          0,
          () => {},
          "b1-label"
        ),
        BackstageItemUtilities.createStageLauncher("b2", 0, 0, "b2-label"),
      ],
    });

    const items = UiItemsManager.getBackstageItems();
    sinon.assert.match(items, [
      sinon.match({
        id: "b1",
      }),
      sinon.match({
        id: "b2",
      }),
    ]);
  });

  it("should provide toolbar items", () => {
    UiItemsManager.register({
      id: "provider1",
      provideToolbarItems: () => [{ id: "t1", itemPriority: 0 }],
    });

    const items = UiItemsManager.getToolbarButtonItems(
      "stage1",
      StageUsage.General,
      ToolbarUsage.ViewNavigation,
      ToolbarOrientation.Horizontal
    );
    sinon.assert.match(items, [
      sinon.match({
        id: "t1",
      }),
    ]);
  });

  it("should provide widgets", () => {
    UiItemsManager.register({
      id: "provider1",
      provideWidgets: () => [{ id: "w1" }],
    });

    const widgets = UiItemsManager.getWidgets(
      "stage1",
      StageUsage.General,
      StagePanelLocation.Left
    );
    sinon.assert.match(widgets, [
      sinon.match({
        id: "w1",
      }),
    ]);
  });
});
