/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module StandardUiItemsProvider
 */

import { ViewClipByPlaneTool } from "@itwin/core-frontend";
import type { DefaultContentTools } from "./StandardContentToolsUiItemsProvider.js";
import { StandardContentToolsUiItemsProvider } from "./StandardContentToolsUiItemsProvider.js";
import { UiItemsManager } from "./UiItemsManager.js";
import { BaseUiItemsProvider } from "./BaseUiItemsProvider.js";
import type {
  ToolbarItem,
  ToolbarOrientation,
  ToolbarUsage,
} from "../toolbar/ToolbarItem.js";
import type { StatusBarItem } from "../statusbar/StatusBarItem.js";
import { UiItemsProvider } from "./UiItemsProvider.js";

/**
 * Defines options that may be set in frontstage app data to control what group priorities
 * to use for each tool button that can be added by this extension. Defining groupIds is optional
 * and only required if use wants to override the default grouping. This application data is statically
 * set in the FrontstageProvider.
 * @example
 * ```
 * const applicationData = {
 *    defaultContentTools: {
 *      vertical: {
 *        selectElementGroupPriority: 100,
 *        measureGroupPriority: 200,
 *        selectionGroupPriority: 300,
 *      },
 *      horizontal: {
 *        clearSelectionGroupPriority: 100,
 *        overridesGroupPriority: 200,
 *      },
 *    },
 *  }
 *
 * ```
 * @public
 * @deprecated in 4.17.0. Application data is not supported in frontstages. Instead configure the {@link UiItemsProvider} before registering for a specific frontstage.
 */
export interface DefaultContentToolsAppData {
  defaultContentTools?: {
    vertical?: {
      selectElementGroupPriority?: number;
      measureGroupPriority?: number;
      selectionGroupPriority?: number;
    };
    horizontal?: {
      clearSelectionGroupPriority?: number;
      overridesGroupPriority?: number;
    };
  };
}

/** Provide standard tools for the ContentManipulationWidgetComposer.
 * @public
 * @deprecated in 4.17.0. Use {@link StandardContentToolsUiItemsProvider} instead. Supported frontstages can be specified when registering the provider.
 */
// eslint-disable-next-line deprecation/deprecation
export class StandardContentToolsProvider extends BaseUiItemsProvider {
  private uiItemsProvider: StandardContentToolsUiItemsProvider;
  /**
   * static function to register the StandardContentToolsProvider
   * @param providerId - unique identifier for this instance of the provider.  This is required in case separate packages want
   * to set up custom stage with their own subset of standard tools.
   * @param defaultContentTools - if undefined all available tools are provided to stage. If defined only those
   * specific tool buttons are shown.
   * @param isSupportedStage - optional function that will be called to determine if tools should be added to current stage. If not set and
   * the current stage's `usage` is set to `StageUsage.General` then the provider will add items to frontstage.
   */
  public static register(
    providerId: string,
    defaultContentTools?: DefaultContentTools,
    isSupportedStage?: (
      stageId: string,
      stageUsage: string,
      stageAppData?: any
    ) => boolean
  ) {
    // eslint-disable-next-line deprecation/deprecation
    const provider = new StandardContentToolsProvider(
      providerId,
      defaultContentTools,
      isSupportedStage
    );
    UiItemsManager.register(provider);

    // register core commands not automatically registered
    ViewClipByPlaneTool.register();
    return provider;
  }

  constructor(
    providerId: string,
    defaultContentTools?: DefaultContentTools | undefined,
    isSupportedStage?: (
      stageId: string,
      stageUsage: string,
      stageAppData?: any
    ) => boolean
  ) {
    super(providerId, isSupportedStage);
    this.uiItemsProvider = new StandardContentToolsUiItemsProvider(
      defaultContentTools
    );
  }

  public override provideToolbarItemsInternal(
    _stageId: string,
    _stageUsage: string,
    toolbarUsage: ToolbarUsage,
    toolbarOrientation: ToolbarOrientation,
    stageAppData?: any
  ): ToolbarItem[] {
    // eslint-disable-next-line deprecation/deprecation
    return this.uiItemsProvider.provideToolbarItems(
      _stageId,
      _stageUsage,
      toolbarUsage,
      toolbarOrientation,
      stageAppData
    );
  }

  public override provideStatusBarItemsInternal(
    _stageId: string,
    _stageUsage: string,
    _stageAppData?: any
  ): StatusBarItem[] {
    // eslint-disable-next-line deprecation/deprecation
    return this.uiItemsProvider.provideStatusBarItems(
      _stageId,
      _stageUsage,
      _stageAppData
    );
  }
}
