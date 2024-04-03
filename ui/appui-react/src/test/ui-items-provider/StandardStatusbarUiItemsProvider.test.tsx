/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { DefaultStatusbarItems } from "../../appui-react";
import {
  StageUsage,
  StandardStatusbarUiItemsProvider,
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

describe("StandardStatusbarUiItemsProvider", () => {
  it("should register StandardStatusbarUiItemsProvider with defaults", () => {
    const provider = new StandardStatusbarUiItemsProvider();
    UiItemsManager.register(provider);

    expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
    // Activity Item is not included by default
    expect(UiItemsManager.getStatusBarItems("test", StageUsage.General)).length(
      8
    );
    UiItemsManager.unregister(provider.id);
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should register StandardStatusbarUiItemsProvider with no separators", () => {
    const provider = new StandardStatusbarUiItemsProvider({
      messageCenter: true,
      toolAssistance: true,
      activityCenter: true,
      accuSnapModePicker: true,
      tileLoadIndicator: true,
      selectionScope: true,
      selectionInfo: true,
    });
    UiItemsManager.register(provider);

    expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
    expect(
      UiItemsManager.getStatusBarItems("test", StageUsage.General).length
    ).toEqual(7);
    UiItemsManager.unregister(provider.id);
    expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
  });

  it("should process all combinations of options", () => {
    const provider = new StandardStatusbarUiItemsProvider();
    UiItemsManager.register(provider);

    expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
    // Activity Item is not included by default
    expect(
      UiItemsManager.getStatusBarItems("test", StageUsage.General).length
    ).toEqual(8);
    UiItemsManager.unregister(provider.id);

    testArray.forEach((itemList: DefaultStatusbarItems) => {
      const local_provider = new StandardStatusbarUiItemsProvider(itemList);
      UiItemsManager.register(provider);
      expect(UiItemsManager.hasRegisteredProviders).toEqual(true);
      UiItemsManager.getStatusBarItems("test", StageUsage.General);
      UiItemsManager.unregister(local_provider.id);
      expect(UiItemsManager.hasRegisteredProviders).toEqual(false);
    });
  });
});
