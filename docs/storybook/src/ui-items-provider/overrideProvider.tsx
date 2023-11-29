/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.Override.Imports
import { UiItemsManager } from "@itwin/appui-react";
// __PUBLISH_EXTRACT_END__
import { provider } from "./Provider";

export async function overrideUiItemsProvider() {
  // __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.Override
  UiItemsManager.register(provider, { stageIds: ["example:CustomFrontstage"] });
  // __PUBLISH_EXTRACT_END__
}
