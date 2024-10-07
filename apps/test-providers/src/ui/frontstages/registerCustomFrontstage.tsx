/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// __PUBLISH_EXTRACT_START__ AppUI.Frontstage.Register.Imports
import { UiFramework } from "@itwin/appui-react";
// __PUBLISH_EXTRACT_END__
import { customFrontstageProvider } from "./CustomFrontstageProvider.js";

export function registerCustomFrontstage() {
  // __PUBLISH_EXTRACT_START__ AppUI.Frontstage.Register
  UiFramework.frontstages.addFrontstage(customFrontstageProvider);
  // __PUBLISH_EXTRACT_END__
}
