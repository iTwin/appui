/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */

import { expect } from "chai";
import { StagePanelLocation, StageUsage, UiItemsManager } from "../../appui-react";
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
