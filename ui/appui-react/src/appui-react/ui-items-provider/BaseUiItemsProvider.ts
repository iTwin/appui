/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiProvider
 */

import { StageUsage } from "../frontstage/StageUsage";
import { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import { StagePanelSection } from "../stagepanels/StagePanelSection";
import { StatusBarItem } from "../statusbar/StatusBarItem";
import { ToolbarItem, ToolbarOrientation, ToolbarUsage } from "../toolbar/ToolbarItem";
import { CommonWidgetProps } from "../widgets/WidgetProps";
import { UiItemsManager } from "./UiItemsManager";
import { UiItemsProvider } from "./UiItemsProvider";

/** Base implementation of a UiItemsProvider. The base class allows the user to pass in a function that is used to determine if the
 * active stage should be provided items. Derived provider classes should override the `xxxInternal` methods to provide items.
 * @beta // TODO: 4.x cleanup
 */
export class BaseUiItemsProvider implements UiItemsProvider {
  /*
   * @param providerId - unique identifier for this instance of the provider. This is required in case separate packages want
   * to set up custom stage with their own subset of standard tools.
   * @param isSupportedStage - optional function that will be called to determine if tools should be added to current stage. If not set and
   * the current stage's `usage` is set to `StageUsage.General` then the provider will add items to frontstage.
   */
  constructor(protected _providerId: string, public isSupportedStage?: (stageId: string, stageUsage: string, stageAppData?: any, provider?: UiItemsProvider) => boolean) { }

  public get id(): string { return this._providerId; }
  public onUnregister(): void { }

  public unregister() {
    UiItemsManager.unregister(this._providerId);
  }

  public provideToolbarButtonItemsInternal(_stageId: string, _stageUsage: string, _toolbarUsage: ToolbarUsage, _toolbarOrientation: ToolbarOrientation, _stageAppData?: any): ToolbarItem[] {
    return [];
  }

  public provideToolbarButtonItems(stageId: string, stageUsage: string, toolbarUsage: ToolbarUsage, toolbarOrientation: ToolbarOrientation, stageAppData?: any): ToolbarItem[] {
    let provideToStage = false;

    if (this.isSupportedStage) {
      provideToStage = this.isSupportedStage(stageId, stageUsage, stageAppData, this);
    } else {
      provideToStage = (stageUsage === StageUsage.General);
    }

    return provideToStage ? this.provideToolbarButtonItemsInternal(stageId, stageUsage, toolbarUsage, toolbarOrientation, stageAppData) : [];
  }

  public provideStatusBarItemsInternal(_stageId: string, _stageUsage: string, _stageAppData?: any): StatusBarItem[] {
    return [];
  }

  public provideStatusBarItems(stageId: string, stageUsage: string, stageAppData?: any): StatusBarItem[] {
    let provideToStage = false;

    if (this.isSupportedStage) {
      provideToStage = this.isSupportedStage(stageId, stageUsage, stageAppData, this);
    } else {
      provideToStage = (stageUsage === StageUsage.General);
    }

    return provideToStage ? this.provideStatusBarItemsInternal(stageId, stageUsage, stageAppData) : [];
  }

  public provideWidgetsInternal(_stageId: string, _stageUsage: string, _location: StagePanelLocation, _section?: StagePanelSection, _stageAppData?: any): CommonWidgetProps[] {
    return [];
  }

  public provideWidgets(stageId: string, stageUsage: string, location: StagePanelLocation, section?: StagePanelSection, stageAppData?: any): ReadonlyArray<CommonWidgetProps> {
    let provideToStage = false;

    if (this.isSupportedStage) {
      provideToStage = this.isSupportedStage(stageId, stageUsage, stageAppData, this);
    } else {
      provideToStage = (stageUsage === StageUsage.General);
    }

    return provideToStage ? this.provideWidgetsInternal(stageId, stageUsage, location, section, stageAppData) : [];
  }
}
