/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */

import * as React from "react";
import { expect } from "chai";
import { StagePanelLocation, StageUsage, StatusBarSection, ToolbarOrientation, ToolbarUsage, UiItemsManager } from "../../appui-react";
import * as abstract from "@itwin/appui-abstract";

// @ts-ignore Removed in 4.0
const AbstractUiItemsManager = abstract.UiItemsManager;

describe.only("UiItemsManager", () => {
  afterEach(() => {
    UiItemsManager.clearAllProviders();

    if (!AbstractUiItemsManager)
      return;
    AbstractUiItemsManager.clearAllProviders();
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
        { id: "s1", content: <div></div>, itemPriority: 0, section: StatusBarSection.Center },
      ],
    });

    const items = UiItemsManager.getStatusBarItems("stage1", StageUsage.General);
    const itemIds = items.map((item) => item.id);
    itemIds.should.eql(["s1"]);
  });

  it("should provide backstage items", () => {
    UiItemsManager.register({
      id: "provider1",
      provideBackstageItems: () => [
        { id: "b1", groupPriority: 0, itemPriority: 0, label: "B1", execute: () => { } },
      ],
    });

    const items = UiItemsManager.getBackstageItems();
    const itemIds = items.map((item) => item.id);
    itemIds.should.eql(["b1"]);
  });

  it("should provide toolbar items", () => {
    UiItemsManager.register({
      id: "provider1",
      provideToolbarItems: () => [
        { id: "t1", itemPriority: 0 },
      ],
    });

    const items = UiItemsManager.getToolbarButtonItems("stage1", StageUsage.General, ToolbarUsage.ViewNavigation, ToolbarOrientation.Horizontal);
    const itemIds = items.map((item) => item.id);
    itemIds.should.eql(["t1"]);
  });

  it("should provide widgets", () => {
    UiItemsManager.register({
      id: "provider1",
      provideWidgets: () => [
        { id: "w1" },
      ],
    });

    const widgets = UiItemsManager.getWidgets("stage1", StageUsage.General, StagePanelLocation.Left);
    const widgetIds = widgets.map((w) => w.id);
    widgetIds.should.eql(["w1"]);
  });

  // Validate use-case where appui-react@4.0 is used with appui-abstract@3.7
  describe("AbstractUiItemsManager", () => {
    if (!AbstractUiItemsManager)
      return;

    it("should register a provider", () => {
      UiItemsManager.register({
        id: "provider1",
      });
      AbstractUiItemsManager.register({
        id: "provider2",
      });

      {
        const provider1 = UiItemsManager.getUiItemsProvider("provider1");
        const provider2 = UiItemsManager.getUiItemsProvider("provider2");
        expect(provider1?.id).to.eq("provider1");
        expect(provider2?.id).to.eq("provider2");
      }
      {
        const provider1 = AbstractUiItemsManager.getUiItemsProvider("provider1");
        const provider2 = AbstractUiItemsManager.getUiItemsProvider("provider2");
        expect(provider1?.id).to.eq("provider1");
        expect(provider2?.id).to.eq("provider2");
      }
    });

    it("should provide status bar items", () => {
      UiItemsManager.register({
        id: "provider1",
        provideStatusBarItems: () => [
          { id: "s1", content: <div></div>, itemPriority: 0, section: StatusBarSection.Center },
        ],
      });
      AbstractUiItemsManager.register({
        id: "provider2",
        provideStatusBarItems: () => [
          { id: "s2", itemPriority: 0, section: StatusBarSection.Center, isCustom: true },
        ],
      });

      {
        const items = UiItemsManager.getStatusBarItems("stage1", StageUsage.General);
        const itemIds = items.map((item) => item.id);
        itemIds.should.eql(["s1", "s2"]);
      }
      {
        const items = AbstractUiItemsManager.getStatusBarItems("stage1", StageUsage.General);
        const itemIds = items
          // @ts-ignore Possibly 'any'
          .map((item) =>
            item.id,
          );
        itemIds.should.eql(["s1", "s2"]);
      }
    });

    it("should provide backstage items", () => {
      UiItemsManager.register({
        id: "provider1",
        provideBackstageItems: () => [
          { id: "b1", groupPriority: 0, itemPriority: 0, label: "B1", execute: () => { } },
        ],
      });
      AbstractUiItemsManager.register({
        id: "provider2",
        provideBackstageItems: () => [
          { id: "b2", groupPriority: 0, itemPriority: 0, label: "B1", execute: () => { } },
        ],
      });

      {
        const items = UiItemsManager.getBackstageItems();
        const itemIds = items.map((item) => item.id);
        itemIds.should.eql(["b1", "b2"]);
      }
      {
        const items = AbstractUiItemsManager.getBackstageItems();
        const itemIds = items
          // @ts-ignore Possibly 'any'
          .map((item) =>
            item.id,
          );
        itemIds.should.eql(["b1", "b2"]);
      }
    });

    it("should provide toolbar items", () => {
      UiItemsManager.register({
        id: "provider1",
        provideToolbarItems: () => [
          { id: "t1", itemPriority: 0 },
        ],
      });
      AbstractUiItemsManager.register({
        id: "provider2",
        provideToolbarButtonItems: () => [
          { id: "t2", itemPriority: 0, isCustom: true },
        ],
      });

      {
        const items = UiItemsManager.getToolbarButtonItems("stage1", StageUsage.General, ToolbarUsage.ViewNavigation, ToolbarOrientation.Horizontal);
        const itemIds = items.map((item) => item.id);
        itemIds.should.eql(["t1", "t2"]);
      }

      {
        const items = AbstractUiItemsManager.getToolbarButtonItems("stage1", StageUsage.General, ToolbarUsage.ViewNavigation, ToolbarOrientation.Horizontal);
        const itemIds = items
          // @ts-ignore Possibly 'any'
          .map((item) =>
            item.id,
          );
        itemIds.should.eql(["t1", "t2"]);
      }
    });

    it("should provide widgets", () => {
      UiItemsManager.register({
        id: "provider1",
        provideWidgets: () => [
          { id: "w1" },
        ],
      });
      AbstractUiItemsManager.register({
        id: "provider2",
        provideWidgets: () => [
          {
            id: "w2",
            getWidgetContent: () => null,
          },
        ],
      });

      {
        const widgets = UiItemsManager.getWidgets("stage1", StageUsage.General, StagePanelLocation.Left);
        const widgetIds = widgets.map((w) => w.id);
        widgetIds.should.eql(["w1", "w2"]);
      }
      {
        const widgets = AbstractUiItemsManager.getWidgets("stage1", StageUsage.General, StagePanelLocation.Left);
        const widgetIds = widgets
          // @ts-ignore Possibly 'any'
          .map((w) => {
            return w.id || "";
          });
        widgetIds.should.eql(["w1", "w2"]);
      }
    });
  });
});
