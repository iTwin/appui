/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { provider } from "./UiItemsProvider.Provider";
// __PUBLISH_EXTRACT_START__ AppUI.UiItemsProvider.Register
import { UiItemsManager } from "@itwin/appui-react";

UiItemsManager.register(provider);
// __PUBLISH_EXTRACT_END__
