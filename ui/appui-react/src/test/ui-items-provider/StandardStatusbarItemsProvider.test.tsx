/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { DefaultStatusbarItems } from "../../appui-react";
import {
  StageUsage,
  StandardStatusbarItemsProvider,
  UiItemsManager,
} from "../../appui-react";

const testArray: DefaultStatusbarItems[] = [
  {},

  {
    messageCenter: true,
    preToolAssistanceSeparator: true,
    toolAssistance: true,
    postToolAssistanceSeparator: true,
    activityCenter: true,
    accuSnapModePicker: true,
    tileLoadIndicator: true,
    selectionScope: true,
    selectionInfo: true,
  },

  {
    messageCenter: true,
  },

  {
    preToolAssistanceSeparator: true,
    toolAssistance: true,
    postToolAssistanceSeparator: true,
    activityCenter: true,
    accuSnapModePicker: true,
    tileLoadIndicator: true,
    selectionScope: true,
    selectionInfo: true,
  },

  {
    messageCenter: true,
    toolAssistance: true,
    activityCenter: true,
    accuSnapModePicker: true,
    tileLoadIndicator: true,
    selectionScope: true,
    selectionInfo: true,
  },
];

describe("StandardStatusbarItemsProvider", () => {
  const testProviderId = "testStatusItemsProvider";

  it("should register StandardStatusbarItemsProvider with defaults", () => {
    const provider = StandardStatusbarItemsProvider.register(testProviderId);
    expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
    // Activity Item is not included by default
    expect(UiItemsManager.getStatusBarItems("test", StageUsage.General)).length(
      8
    );
    provider.unregister();
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should register StandardStatusbarItemsProvider with no separators", () => {
    const provider = StandardStatusbarItemsProvider.register(testProviderId, {
      messageCenter: true,
      toolAssistance: true,
      activityCenter: true,
      accuSnapModePicker: true,
      tileLoadIndicator: true,
      selectionScope: true,
      selectionInfo: true,
    });
    expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
    expect(
      UiItemsManager.getStatusBarItems("test", StageUsage.General).length
    ).toEqual(7);
    provider.unregister();
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should process all combinations of options", () => {
    const provider = StandardStatusbarItemsProvider.register(
      testProviderId,
      undefined,
      (_stageId: string, _stageUsage: string, _applicationData: any) => {
        return true;
      }
    );
    expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
    // Activity Item is not included by default
    expect(
      UiItemsManager.getStatusBarItems("test", StageUsage.General).length
    ).toEqual(8);
    provider.unregister();

    testArray.forEach((itemList: DefaultStatusbarItems) => {
      const local_provider = StandardStatusbarItemsProvider.register(
        testProviderId,
        itemList
      );
      expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
      UiItemsManager.getStatusBarItems("test", StageUsage.General);
      local_provider.unregister();
      expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
    });
  });
});
