/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StandardUiItemsProvider
 */

import type { DefaultStatusbarItems } from "./StandardStatusbarUiItemsProvider.js";
import { StandardStatusbarUiItemsProvider } from "./StandardStatusbarUiItemsProvider.js";
import type { StatusBarItem } from "../statusbar/StatusBarItem.js";
import { UiItemsManager } from "./UiItemsManager.js";
import { BaseUiItemsProvider } from "./BaseUiItemsProvider.js";

/** Provide standard status bar fields.
 * @public
 * @deprecated in 4.17.0. Use {@link StandardStatusbarUiItemsProvider} instead. Supported frontstages can be specified when registering the provider.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export class StandardStatusbarItemsProvider extends BaseUiItemsProvider {
  private uiItemsProvider: StandardStatusbarUiItemsProvider;
  constructor(
    providerId: string,
    _defaultItems?: DefaultStatusbarItems | undefined,
    isSupportedStage?: (
      stageId: string,
      stageUsage: string,
      stageAppData?: any
    ) => boolean
  ) {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    super(providerId, isSupportedStage);
    this.uiItemsProvider = new StandardStatusbarUiItemsProvider(_defaultItems);
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
  public static register(
    providerId: string,
    defaultItems?: DefaultStatusbarItems,
    isSupportedStage?: (
      stageId: string,
      stageUsage: string,
      stageAppData?: any
    ) => boolean
  ) {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    const provider = new StandardStatusbarItemsProvider(
      providerId,
      defaultItems,
      isSupportedStage
    );
    UiItemsManager.register(provider);
    return provider;
  }

  public override provideStatusBarItemsInternal(
    _stageId: string,
    _stageUsage: string,
    _stageAppData?: any
  ): StatusBarItem[] {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return this.uiItemsProvider.provideStatusBarItems(
      _stageId,
      _stageUsage,
      _stageAppData
    );
  }
}
