/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StandardUiItemsProvider
 */

import { BaseUiItemsProvider, CommonStatusBarItem, UiItemsManager } from "@itwin/appui-abstract";
import { DefaultStatusbarItems, StandardStatusbarUiItemsProvider } from "./StandardStatusbarUiItemsProvider";

/* eslint-disable deprecation/deprecation */

/**
 * Provide standard statusbar fields for the SimpleStatusbarWidget
 * @public
 */
export class StandardStatusbarItemsProvider extends BaseUiItemsProvider {
  private uiItemsProvider: StandardStatusbarUiItemsProvider;
  constructor(providerId: string, defaultItems?: DefaultStatusbarItems, isSupportedStage?: (stageId: string, stageUsage: string, stageAppData?: any) => boolean) {
    super(providerId, isSupportedStage);
    this.uiItemsProvider = new StandardStatusbarUiItemsProvider(defaultItems);
  }

  /**
  * static function to register the StandardStatusbarItemsProvider
  * @param providerId - unique identifier for this instance of the provider. This is required in case separate packages want
  * to set up custom stage with their own subset of standard status bar items.
  * @param defaultItems - if undefined all available item are provided to stage except for activityCenter. If defined only those
  * specific tool buttons are shown.
  * @param isSupportedStage - optional function that will be called to determine if tools should be added to current stage. If not set and
  * the current stage's `usage` is set to `StageUsage.General` then the provider will add items to frontstage.
  */
  public static register(providerId: string, defaultItems?: DefaultStatusbarItems, isSupportedStage?: (stageId: string, stageUsage: string, stageAppData?: any) => boolean) {
    const provider = new StandardStatusbarItemsProvider(providerId, defaultItems, isSupportedStage);
    UiItemsManager.register(provider);
    return provider;
  }

  public override provideStatusBarItemsInternal(stageId: string, stageUsage: string, stageAppData?: any): CommonStatusBarItem[] {
    return this.uiItemsProvider.provideStatusBarItems(stageId, stageUsage, stageAppData);
  }
}
