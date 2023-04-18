/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */

import { StagePanelLocation, StageUsage, UiItemsManager } from "../../appui-react";
import * as abstract from "@itwin/appui-abstract";

// @ts-ignore Removed in 4.0
const AbstractUiItemsManager = abstract.UiItemsManager;

describe.only("UiItemsManager", () => {
  beforeEach(() => {
    UiItemsManager.clearAllProviders();
  });

  it("should register widgets", () => {
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

    it("should register widgets", () => {
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

      const widgets = UiItemsManager.getWidgets("stage1", StageUsage.General, StagePanelLocation.Left);
      const widgetIds = widgets.map((w) => w.id);
      widgetIds.should.eql(["w1", "w2"]);

      const abstractWidgets = AbstractUiItemsManager.getWidgets("stage1", StageUsage.General, StagePanelLocation.Left) ?? [];
      const abstractWidgetIds = abstractWidgets
        // @ts-ignore Possibly 'any'
        .map((w) => {
          return w.id || "";
        });
      abstractWidgetIds.should.eql(["w1", "w2"]);
    });
  });
});
