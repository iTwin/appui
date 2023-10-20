/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { IModelApp, NoRenderApp } from "@itwin/core-frontend";
import type { DefaultNavigationTools } from "../../appui-react";
import {
  StageUsage,
  StandardNavigationToolsProvider,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsManager,
} from "../../appui-react";
import TestUtils from "../TestUtils";

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

  // avoid problems due to no real localization resources by return dummy values for englishKeyin and keyin properties.
  beforeAll(async () => {
    await TestUtils.initializeUiFramework();
    await NoRenderApp.startup();
  });

  afterAll(async () => {
    await IModelApp.shutdown();
    TestUtils.terminateUiFramework();
    vi.resetAllMocks();
  });

  it("should register StandardNavigationToolsProvider with defaults", () => {
    const provider =
      StandardNavigationToolsProvider.register(testToolProviderId);
    expect(UiItemsManager.hasRegisteredProviders).to.be.true;
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
    expect(UiItemsManager.hasRegisteredProviders).to.be.false;
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
    expect(UiItemsManager.hasRegisteredProviders).to.be.true;
    expect(
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ViewNavigation,
        ToolbarOrientation.Horizontal
      ).length
    ).to.eq(0);
    expect(
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ViewNavigation,
        ToolbarOrientation.Vertical
      ).length
    ).to.eq(3);
    provider.unregister();
    expect(UiItemsManager.hasRegisteredProviders).to.be.false;
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
    expect(UiItemsManager.hasRegisteredProviders).to.be.true;
    expect(
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ViewNavigation,
        ToolbarOrientation.Horizontal
      ).length
    ).to.eq(6);
    expect(
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ViewNavigation,
        ToolbarOrientation.Vertical
      ).length
    ).to.eq(0);

    provider.unregister();
    expect(UiItemsManager.hasRegisteredProviders).to.be.false;
  });

  it("should process all combinations of options", () => {
    const provider = StandardNavigationToolsProvider.register(
      testToolProviderId,
      undefined,
      (_stageId: string, _stageUsage: string, _applicationData: any) => {
        return true;
      }
    );
    expect(UiItemsManager.hasRegisteredProviders).to.be.true;
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
      expect(UiItemsManager.hasRegisteredProviders).to.be.true;
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
      expect(UiItemsManager.hasRegisteredProviders).to.be.false;
    });
  });
});
