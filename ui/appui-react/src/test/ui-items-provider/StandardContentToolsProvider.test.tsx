/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type {
  DefaultContentTools,
  DefaultContentToolsAppData,
} from "../../appui-react.js";
import {
  StageUsage,
  StandardContentToolsProvider,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsManager,
} from "../../appui-react.js";

const testAppDataPropsArray: DefaultContentToolsAppData[] = [
  {
    defaultContentTools: {
      vertical: {
        selectElementGroupPriority: 100,
        measureGroupPriority: 200,
        selectionGroupPriority: 300,
      },
      horizontal: {
        clearSelectionGroupPriority: 100,
        overridesGroupPriority: 200,
      },
    },
  },
  {
    defaultContentTools: {
      vertical: {
        selectElementGroupPriority: 100,
        selectionGroupPriority: 300,
      },
      horizontal: {
        overridesGroupPriority: 200,
      },
    },
  },
  {
    defaultContentTools: {
      vertical: {
        selectElementGroupPriority: 100,
        selectionGroupPriority: 300,
      },
      horizontal: {
        overridesGroupPriority: 200,
      },
    },
  },
  {
    defaultContentTools: {
      vertical: {
        measureGroupPriority: 200,
      },
      horizontal: {
        clearSelectionGroupPriority: 100,
      },
    },
  },
  {
    defaultContentTools: {
      vertical: {},
      horizontal: {
        overridesGroupPriority: 200,
      },
    },
  },
  {
    defaultContentTools: {
      vertical: {
        measureGroupPriority: 200,
      },
      horizontal: {},
    },
  },
  {
    defaultContentTools: {
      horizontal: {
        overridesGroupPriority: 200,
      },
    },
  },
  {
    defaultContentTools: {
      vertical: {
        measureGroupPriority: 200,
      },
    },
  },
];

const testToolsArray: DefaultContentTools[] = [
  {},

  {
    horizontal: {},
  },

  {
    vertical: {},
  },
  {
    horizontal: {
      clearSelection: true,
      clearDisplayOverrides: true,
      hide: "group", // "group" | "element"
      isolate: "group", // | "element",
      emphasize: "element",
    },
    vertical: {
      selectElement: true,
      measureGroup: true,
      sectionGroup: true,
    },
  },

  {
    horizontal: {
      clearSelection: true,
      clearDisplayOverrides: true,
      hide: "element",
      isolate: "element",
      emphasize: "element",
    },
    vertical: {
      selectElement: false,
      measureGroup: false,
      sectionGroup: false,
    },
  },

  {
    horizontal: {
      clearSelection: false,
      clearDisplayOverrides: false,
      hide: "element",
      isolate: "element",
      emphasize: "element",
    },
    vertical: {},
  },

  {
    horizontal: {
      clearDisplayOverrides: false,
    },
    vertical: {},
  },
];

describe("StandardContentToolsProvider", () => {
  const testContentToolProviderId = "ui2-standardContentTools";

  it("should register StandardContentToolsProvider with defaults", () => {
    const provider = StandardContentToolsProvider.register(
      testContentToolProviderId
    );
    expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
    expect(
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ContentManipulation,
        ToolbarOrientation.Horizontal
      ).length
    ).toEqual(5);
    expect(
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ContentManipulation,
        ToolbarOrientation.Vertical
      ).length
    ).toEqual(3);
    provider.unregister();
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should register StandardContentToolsProvider with group buttons", () => {
    const provider = StandardContentToolsProvider.register(
      testContentToolProviderId,
      {
        horizontal: {
          clearSelection: true,
          clearDisplayOverrides: true,
          hide: "group",
          isolate: "group",
          emphasize: "element",
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
        ToolbarUsage.ContentManipulation,
        ToolbarOrientation.Horizontal
      ).length
    ).toEqual(5);
    expect(
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ContentManipulation,
        ToolbarOrientation.Vertical
      ).length
    ).toEqual(3);
    provider.unregister();
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should register StandardContentToolsProvider with no horizontal buttons", () => {
    const provider = StandardContentToolsProvider.register(
      testContentToolProviderId,
      {
        horizontal: {},
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
        ToolbarUsage.ContentManipulation,
        ToolbarOrientation.Horizontal
      ).length
    ).toEqual(0);
    expect(
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ContentManipulation,
        ToolbarOrientation.Vertical
      ).length
    ).toEqual(3);
    provider.unregister();
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should register StandardContentToolsProvider with no vertical buttons", () => {
    const provider = StandardContentToolsProvider.register(
      testContentToolProviderId,
      {
        horizontal: {
          clearSelection: true,
          clearDisplayOverrides: true,
          hide: "group",
          isolate: "group",
          emphasize: "element",
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
        ToolbarUsage.ContentManipulation,
        ToolbarOrientation.Horizontal
      ).length
    ).toEqual(5);
    expect(
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ContentManipulation,
        ToolbarOrientation.Vertical
      ).length
    ).toEqual(0);

    provider.unregister();
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should process app data group options", () => {
    const provider = StandardContentToolsProvider.register(
      testContentToolProviderId,
      {
        horizontal: {
          clearSelection: true,
          clearDisplayOverrides: true,
          hide: "group",
          isolate: "group",
          emphasize: "element",
        },
        vertical: {},
      },
      (stageId: string, _stageUsage: string, _applicationData: any) => {
        return "test" === stageId;
      }
    );

    expect(UiItemsManager.hasRegisteredProviders).toEqual(true);

    testAppDataPropsArray.forEach(
      (_testAppDataProps: DefaultContentToolsAppData) => {
        expect(
          UiItemsManager.getToolbarButtonItems(
            "test",
            StageUsage.General,
            ToolbarUsage.ContentManipulation,
            ToolbarOrientation.Horizontal
          ).length
        ).toEqual(5);
        expect(
          UiItemsManager.getToolbarButtonItems(
            "test",
            StageUsage.General,
            ToolbarUsage.ContentManipulation,
            ToolbarOrientation.Vertical
          ).length
        ).toEqual(0);
      }
    );

    provider.unregister();
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should process all combinations of options", () => {
    const provider = StandardContentToolsProvider.register(
      testContentToolProviderId,
      undefined,
      (_stageId: string, _stageUsage: string, _applicationData: any) => {
        return true;
      }
    );
    expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
    UiItemsManager.getToolbarButtonItems(
      "test",
      StageUsage.General,
      ToolbarUsage.ContentManipulation,
      ToolbarOrientation.Horizontal
    );
    UiItemsManager.getToolbarButtonItems(
      "test",
      StageUsage.General,
      ToolbarUsage.ContentManipulation,
      ToolbarOrientation.Vertical
    );
    UiItemsManager.getStatusBarItems("test", StageUsage.General);
    provider.unregister();

    testToolsArray.forEach((defaultTools: DefaultContentTools) => {
      const local_provider = StandardContentToolsProvider.register(
        testContentToolProviderId,
        defaultTools
      );
      expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ContentManipulation,
        ToolbarOrientation.Horizontal
      );
      UiItemsManager.getToolbarButtonItems(
        "test",
        StageUsage.General,
        ToolbarUsage.ContentManipulation,
        ToolbarOrientation.Vertical
      );
      UiItemsManager.getStatusBarItems("test", StageUsage.General);
      local_provider.unregister();
      expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
    });
  });
});
