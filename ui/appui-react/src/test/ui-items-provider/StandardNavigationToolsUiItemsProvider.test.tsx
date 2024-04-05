/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { DefaultNavigationTools } from "../../appui-react";
import {
  StageUsage,
  StandardNavigationToolsUiItemsProvider,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsManager,
} from "../../appui-react";

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

describe("StandardNavigationToolsUiItemsProvider", () => {
  it("should register StandardNavigationToolsUiItemsProvider with defaults", () => {
    const provider = new StandardNavigationToolsUiItemsProvider();
    UiItemsManager.register(provider);

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
    ).toEqual(3);

    UiItemsManager.unregister(provider.id);
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should register StandardNavigationToolsUiItemsProvider with no horizontal buttons", () => {
    const provider = new StandardNavigationToolsUiItemsProvider({
      horizontal: {},
      vertical: {
        walk: true,
        toggleCamera: true,
        setupWalkCamera: true,
      },
    });
    UiItemsManager.register(provider, { stageIds: ["test"] });
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
    UiItemsManager.unregister(provider.id);
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should register StandardNavigationToolsUiItemsProvider with no vertical buttons", () => {
    const provider = new StandardNavigationToolsUiItemsProvider({
      horizontal: {
        rotateView: true,
        panView: true,
        fitView: true,
        windowArea: true,
        viewUndoRedo: true,
      },
      vertical: {},
    });
    UiItemsManager.register(provider, { stageIds: ["test"] });

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

    UiItemsManager.unregister(provider.id);
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should process all combinations of options", () => {
    const provider = new StandardNavigationToolsUiItemsProvider();
    UiItemsManager.register(provider);
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

    UiItemsManager.unregister(provider.id);

    testToolsArray.forEach((defaultTools: DefaultNavigationTools) => {
      const local_provider = new StandardNavigationToolsUiItemsProvider(
        defaultTools
      );
      UiItemsManager.register(local_provider);
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
      UiItemsManager.unregister(local_provider.id);
      expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
    });
  });
});
