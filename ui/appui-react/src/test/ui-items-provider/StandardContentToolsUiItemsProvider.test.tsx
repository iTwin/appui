/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type {
  DefaultContentTools,
  DefaultContentToolsAppData,
} from "../../appui-react";
import {
  StageUsage,
  StandardContentToolsUiItemsProvider,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsManager,
} from "../../appui-react";

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

describe("StandardContentToolsUiItemsProvider", () => {
  it("should register StandardContentToolsUiItemsProvider with defaults", () => {
    const provider = new StandardContentToolsUiItemsProvider();
    UiItemsManager.register(provider);
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
    UiItemsManager.unregister(provider.id);
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should register StandardContentToolsUiItemsProvider with group buttons", () => {
    const provider = new StandardContentToolsUiItemsProvider({
      horizontal: {
        clearSelection: true,
        clearDisplayOverrides: true,
        hide: "group",
        isolate: "group",
        emphasize: "element",
      },
    });
    UiItemsManager.register(provider, { stageIds: ["test"] });

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
    UiItemsManager.unregister(provider.id);
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should register StandardContentToolsUiItemsProvider with no horizontal buttons", () => {
    const provider = new StandardContentToolsUiItemsProvider({
      horizontal: {},
    });
    UiItemsManager.register(provider, { stageIds: ["test"] });

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
    UiItemsManager.unregister(provider.id);
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should register StandardContentToolsUiItemsProvider with no vertical buttons", () => {
    const provider = new StandardContentToolsUiItemsProvider({
      horizontal: {
        clearSelection: true,
        clearDisplayOverrides: true,
        hide: "group",
        isolate: "group",
        emphasize: "element",
      },
      vertical: {},
    });
    UiItemsManager.register(provider, { stageIds: ["test"] });

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

    UiItemsManager.unregister(provider.id);
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should process app data group options", () => {
    const provider = new StandardContentToolsUiItemsProvider({
      horizontal: {
        clearSelection: true,
        clearDisplayOverrides: true,
        hide: "group",
        isolate: "group",
        emphasize: "element",
      },
      vertical: {},
    });
    UiItemsManager.register(provider, { stageIds: ["test"] });
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

    UiItemsManager.unregister(provider.id);
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should process all combinations of options", () => {
    const provider = new StandardContentToolsUiItemsProvider();
    UiItemsManager.register(provider);
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
    UiItemsManager.unregister(provider.id);

    testToolsArray.forEach((defaultTools: DefaultContentTools) => {
      const local_provider = new StandardContentToolsUiItemsProvider(
        defaultTools
      );
      UiItemsManager.register(local_provider);
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
      UiItemsManager.unregister(local_provider.id);
      expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
    });
  });
});
