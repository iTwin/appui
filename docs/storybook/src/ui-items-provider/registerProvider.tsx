/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.Register.Imports
import { UiItemsManager } from "@itwin/appui-react";
// __PUBLISH_EXTRACT_END__
import { provider } from "./Provider";

export async function registerUiItemsProvider() {
  // __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.Register
  UiItemsManager.register(provider);
  // __PUBLISH_EXTRACT_END__
}
