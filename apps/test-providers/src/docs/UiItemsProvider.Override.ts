/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { provider } from "./UiItemsProvider.Provider.js";
// __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.Override
import { UiItemsManager } from "@itwin/appui-react";

UiItemsManager.register(provider, { stageIds: ["example:CustomFrontstage"] });
// __PUBLISH_EXTRACT_END__
