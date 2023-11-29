/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.Imports
import { UiItemsManager, UiItemsProvider } from "@itwin/appui-react";
// __PUBLISH_EXTRACT_END__

// __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.Provider
const provider: UiItemsProvider = {
  id: "example:Provider",
  getWidgets: () => [],
  getToolbarItems: () => [],
};
// __PUBLISH_EXTRACT_END__

export async function registerUiItemsProvider() {
  // __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.Register
  UiItemsManager.register(provider);
  // __PUBLISH_EXTRACT_END__
}

export async function overrideUiItemsProvider() {
  // __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.Override
  UiItemsManager.register(provider, { stageIds: ["example:CustomFrontstage"] });
  // __PUBLISH_EXTRACT_END__
}
