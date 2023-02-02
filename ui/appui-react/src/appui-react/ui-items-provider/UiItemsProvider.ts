/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiProvider
 */

import { BackstageItem } from "../backstage/BackstageItem";
import { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import { StagePanelSection } from "../stagepanels/StagePanelSection";
import { StatusBarItem } from "../statusbar/StatusBarItem";
import { ToolbarItem, ToolbarOrientation, ToolbarUsage } from "../toolbar/ToolbarItem";
import { WidgetProps } from "../widgets/WidgetProps";

/** Describes interface of objects that want to provide UI component to the running IModelApp.
 * @beta
 */
export interface UiItemsProvider {
  /** id of provider */
  readonly id: string;

  /** UiItemsManager calls following method to get items to populate specific toolbars */
  provideToolbarButtonItems?: (stageId: string, stageUsage: string, toolbarUsage: ToolbarUsage, toolbarOrientation: ToolbarOrientation) => ToolbarItem[];
  /** UiItemsManager calls following method to augment base statusbar for stages that allow it. */
  provideStatusBarItems?: (stageId: string, stageUsage: string) => StatusBarItem[];
  /** UiItemsManager calls following method to augment backstage items. */
  provideBackstageItems?: () => BackstageItem[];
  /** UiItemsManager calls following method to augment Widget lists.
   * @note Returned widgets must provide unique `AbstractWidgetProps["id"]` to correctly save/restore App layout.
   */
  provideWidgets?: (stageId: string, stageUsage: string, location: StagePanelLocation, section?: StagePanelSection) => ReadonlyArray<WidgetProps>;
  /** Function called when the provider is unregistered via `ItemsManager.unregister` to allow provider to do cleanup. */
  onUnregister?: () => void;
}
