/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import { StagePanelLocation, StageUsage, UiItemsManager } from "../../appui-react";
import * as abstract from "@itwin/appui-abstract";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { UiItemsManager as AbstractUiItemsManagerType } from "@itwin/appui-abstract"; // eslint-disable-line deprecation/deprecation

// eslint-disable-next-line deprecation/deprecation
const AbstractUiItemsManager: typeof AbstractUiItemsManagerType | undefined = abstract.UiItemsManager;

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
    it("should register widgets", () => {
      UiItemsManager.register({
        id: "provider1",
        provideWidgets: () => [
          { id: "w1" },
        ],
      });
      AbstractUiItemsManager?.register({
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

      if (!AbstractUiItemsManager)
        return;
      const abstractWidgets = AbstractUiItemsManager?.getWidgets("stage1", StageUsage.General, StagePanelLocation.Left) ?? [];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const abstractWidgetIds = abstractWidgets.map((w) => w.id || "");
      abstractWidgetIds.should.eql(["w1", "w2"]);
    });
  });
});
