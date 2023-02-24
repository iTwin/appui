/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StandardUiItemsProvider
 */

import { BaseUiItemsProvider, CommonToolbarItem, ToolbarOrientation, ToolbarUsage, UiItemsManager } from "@itwin/appui-abstract";
import { DefaultNavigationTools, StandardNavigationToolsUiItemsProvider } from "./StandardNavigationToolsUiItemsProvider";

/* eslint-disable deprecation/deprecation */

/**
 * Provide standard tools for the ViewNavigationWidgetComposer.
 * @public
 */
export class StandardNavigationToolsProvider extends BaseUiItemsProvider {
  private uiItemsProvider: StandardNavigationToolsUiItemsProvider;
  /**
   * static function to register the StandardContentToolsProvider
   * @param providerId - unique identifier for this instance of the provider. This is required in case separate packages want
   * to set up custom stage with their own subset of standard tools
   * @param defaultNavigationTools - if undefined all available tools are provided to stage. If defined only those
   * specific tool buttons are shown.
   * @param isSupportedStage - optional function that will be called to determine if tools should be added to current stage. If not set and
   * the current stage's `usage` is set to `StageUsage.General` then the provider will add items to frontstage.
   */
  public static register(providerId: string, defaultNavigationTools?: DefaultNavigationTools, isSupportedStage?: (stageId: string, stageUsage: string, stageAppData?: any) => boolean) {
    const provider = new StandardNavigationToolsProvider(providerId, defaultNavigationTools, isSupportedStage);
    UiItemsManager.register(provider);
    return provider;
  }

  constructor(providerId: string, defaultNavigationTools?: DefaultNavigationTools, isSupportedStage?: (stageId: string, stageUsage: string, stageAppData?: any) => boolean) {
    super(providerId, isSupportedStage);
    this.uiItemsProvider = new StandardNavigationToolsUiItemsProvider(defaultNavigationTools);
  }

  public override provideToolbarButtonItemsInternal(stageId: string, stageUsage: string, toolbarUsage: ToolbarUsage, toolbarOrientation: ToolbarOrientation, stageAppData?: any): CommonToolbarItem[] {
    return this.uiItemsProvider.provideToolbarButtonItems(stageId, stageUsage, toolbarUsage, toolbarOrientation, stageAppData);
  }
}
