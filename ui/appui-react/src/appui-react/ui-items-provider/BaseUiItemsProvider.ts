/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiProvider
 */

import { StageUsage } from "../frontstage/StageUsage.js";
import type { StagePanelLocation } from "../stagepanels/StagePanelLocation.js";
import type { StagePanelSection } from "../stagepanels/StagePanelSection.js";
import type { StatusBarItem } from "../statusbar/StatusBarItem.js";
import type {
  ToolbarItem,
  ToolbarOrientation,
  ToolbarUsage,
} from "../toolbar/ToolbarItem.js";
import type { Widget } from "../widgets/Widget.js";
import { UiItemsManager, UiItemsProviderOverrides } from "./UiItemsManager.js";
import type { UiItemsProvider } from "./UiItemsProvider.js";

/** Base implementation of a UiItemsProvider. The base class allows the user to pass in a function that is used to determine if the
 * active stage should be provided items. Derived provider classes should override the `xxxInternal` methods to provide items.
 * @public
 * @deprecated in 4.17.0. Use {@link UiItemsProviderOverrides} to specify supported frontstages when registering the provider.
 */
export class BaseUiItemsProvider implements UiItemsProvider {
  /*
   * @param providerId - unique identifier for this instance of the provider. This is required in case separate packages want
   * to set up custom stage with their own subset of standard tools.
   * @param isSupportedStage - optional function that will be called to determine if tools should be added to current stage. If not set and
   * the current stage's `usage` is set to `StageUsage.General` then the provider will add items to frontstage.
   */
  constructor(
    protected _providerId: string,
    public isSupportedStage?: (
      stageId: string,
      stageUsage: string,
      stageAppData?: any,
      provider?: UiItemsProvider
    ) => boolean
  ) {}

  public get id(): string {
    return this._providerId;
  }
  public onUnregister(): void {}

  public unregister() {
    UiItemsManager.unregister(this._providerId);
  }

  public provideToolbarItemsInternal(
    _stageId: string,
    _stageUsage: string,
    _toolbarUsage: ToolbarUsage,
    _toolbarOrientation: ToolbarOrientation,
    _stageAppData?: any
  ): ToolbarItem[] {
    return [];
  }

  public provideToolbarItems(
    stageId: string,
    stageUsage: string,
    toolbarUsage: ToolbarUsage,
    toolbarOrientation: ToolbarOrientation,
    stageAppData?: any
  ): ToolbarItem[] {
    let provideToStage = false;

    if (this.isSupportedStage) {
      provideToStage = this.isSupportedStage(
        stageId,
        stageUsage,
        stageAppData,
        this
      );
    } else {
      provideToStage = stageUsage === StageUsage.General.valueOf();
    }

    return provideToStage
      ? this.provideToolbarItemsInternal(
          stageId,
          stageUsage,
          toolbarUsage,
          toolbarOrientation,
          stageAppData
        )
      : [];
  }

  public provideStatusBarItemsInternal(
    _stageId: string,
    _stageUsage: string,
    _stageAppData?: any
  ): StatusBarItem[] {
    return [];
  }

  public provideStatusBarItems(
    stageId: string,
    stageUsage: string,
    stageAppData?: any
  ): StatusBarItem[] {
    let provideToStage = false;

    if (this.isSupportedStage) {
      provideToStage = this.isSupportedStage(
        stageId,
        stageUsage,
        stageAppData,
        this
      );
    } else {
      provideToStage = stageUsage === StageUsage.General.valueOf();
    }

    return provideToStage
      ? this.provideStatusBarItemsInternal(stageId, stageUsage, stageAppData)
      : [];
  }

  public provideWidgetsInternal(
    _stageId: string,
    _stageUsage: string,
    _location: StagePanelLocation,
    _section?: StagePanelSection,
    _stageAppData?: any
  ): Widget[] {
    return [];
  }

  public provideWidgets(
    stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection,
    stageAppData?: any
  ): ReadonlyArray<Widget> {
    let provideToStage = false;

    if (this.isSupportedStage) {
      provideToStage = this.isSupportedStage(
        stageId,
        stageUsage,
        stageAppData,
        this
      );
    } else {
      provideToStage = stageUsage === StageUsage.General.valueOf();
    }

    return provideToStage
      ? this.provideWidgetsInternal(
          stageId,
          stageUsage,
          location,
          section,
          stageAppData
        )
      : [];
  }
}
