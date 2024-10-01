/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { DefaultNavigationTools } from "../../appui-react.js";
import {
  StageUsage,
  StandardNavigationToolsProvider,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsManager,
} from "../../appui-react.js";

const testToolsArray: DefaultNavigationTools[] = [
  {},

  {
    horizontal: {},
  },

  {
    vertical: {},
  },
  {
    horizontal: {
      rotateView: true,
      panView: true,
      fitView: true,
      windowArea: true,
      viewUndoRedo: true,
    },
    vertical: {
      walk: true,
      toggleCamera: true,
    },
  },
  {
    horizontal: {
      rotateView: true,
    },
    vertical: {
      walk: true,
    },
  },
  {
    horizontal: {
      panView: true,
      fitView: true,
      windowArea: true,
      viewUndoRedo: true,
    },
    vertical: {
      toggleCamera: true,
    },
  },
];

describe("StandardNavigationToolsProvider", () => {
  const testToolProviderId = "ui2-standardNavigationTools";

  it("should register StandardNavigationToolsProvider with defaults", () => {
    const provider =
      StandardNavigationToolsProvider.register(testToolProviderId);
    expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
    expect(
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ViewNavigation,
        ToolbarOrientation.Horizontal
      )
    ).length(6);
    expect(
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ViewNavigation,
        ToolbarOrientation.Vertical
      )
    ).length(3);
    provider.unregister();
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should register StandardNavigationToolsProvider with no horizontal buttons", () => {
    const provider = StandardNavigationToolsProvider.register(
      testToolProviderId,
      {
        horizontal: {},
        vertical: {
          walk: true,
          toggleCamera: true,
          setupWalkCamera: true,
        },
      },
      (stageId: string, _stageUsage: string, _applicationData: any) => {
        return "test" === stageId;
      }
    );
    expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
    expect(
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ViewNavigation,
        ToolbarOrientation.Horizontal
      ).length
    ).toEqual(0);
    expect(
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ViewNavigation,
        ToolbarOrientation.Vertical
      ).length
    ).toEqual(3);
    provider.unregister();
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should register StandardNavigationToolsProvider with no vertical buttons", () => {
    const provider = StandardNavigationToolsProvider.register(
      testToolProviderId,
      {
        horizontal: {
          rotateView: true,
          panView: true,
          fitView: true,
          windowArea: true,
          viewUndoRedo: true,
        },
        vertical: {},
      },
      (stageId: string, _stageUsage: string, _applicationData: any) => {
        return "test" === stageId;
      }
    );
    expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
    expect(
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ViewNavigation,
        ToolbarOrientation.Horizontal
      ).length
    ).toEqual(6);
    expect(
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ViewNavigation,
        ToolbarOrientation.Vertical
      ).length
    ).toEqual(0);

    provider.unregister();
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should process all combinations of options", () => {
    const provider = StandardNavigationToolsProvider.register(
      testToolProviderId,
      undefined,
      (_stageId: string, _stageUsage: string, _applicationData: any) => {
        return true;
      }
    );
    expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
    UiItemsManager.getToolbarButtonItems(
      "test",
      StageUsage.General,
      ToolbarUsage.ViewNavigation,
      ToolbarOrientation.Horizontal
    );
    UiItemsManager.getToolbarButtonItems(
      "test",
      StageUsage.General,
      ToolbarUsage.ViewNavigation,
      ToolbarOrientation.Vertical
    );

    provider.unregister();

    testToolsArray.forEach((defaultTools: DefaultNavigationTools) => {
      const local_provider = StandardNavigationToolsProvider.register(
        testToolProviderId,
        defaultTools
      );
      expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ViewNavigation,
        ToolbarOrientation.Horizontal
      );
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ViewNavigation,
        ToolbarOrientation.Vertical
      );
      local_provider.unregister();
      expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
    });
  });
});
