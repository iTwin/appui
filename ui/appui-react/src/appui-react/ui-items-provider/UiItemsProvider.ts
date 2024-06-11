/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiProvider
 */

import type { BackstageItem } from "../backstage/BackstageItem";
import type { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import type { StagePanelSection } from "../stagepanels/StagePanelSection";
import type { StatusBarItem } from "../statusbar/StatusBarItem";
import type {
  ToolbarItem,
  ToolbarOrientation,
  ToolbarUsage,
} from "../toolbar/ToolbarItem";
import type { Widget } from "../widgets/Widget";

/** Describes interface of objects that want to provide UI component to the running IModelApp.
 * @public
 */
export interface UiItemsProvider {
  /** Id of provider. */
  readonly id: string;

  /** Provides toolbar items.
   * @note Use {@link ToolbarItem.layouts} to map item to location previously specified by `provideToolbarItems` arguments.
   */
  readonly getToolbarItems?: () => ReadonlyArray<ToolbarItem>;
  /** Provides status bar items. */
  readonly getStatusBarItems?: () => ReadonlyArray<StatusBarItem>;
  /** Provides backstage items. */
  readonly getBackstageItems?: () => ReadonlyArray<BackstageItem>;
  /** Provides widgets.
   * @note Use {@link Widget.layouts} to map item to location previously specified by `provideWidgets` arguments.
   */
  readonly getWidgets?: () => ReadonlyArray<Widget>;

  /** Provides toolbar items.
   * @deprecated in 4.15.0. Use {@link UiItemsProvider.getToolbarItems} instead. To map item to location previously specified by arguments use {@link ToolbarItem.layouts}.
   */
  readonly provideToolbarItems?: (
    stageId: string,
    stageUsage: string,
    toolbarUsage: ToolbarUsage,
    toolbarOrientation: ToolbarOrientation
  ) => ReadonlyArray<ToolbarItem>;
  /** Provides status bar items.
   * @deprecated in 4.15.0. Use {@link UiItemsProvider.getStatusBarItems} instead.
   */
  readonly provideStatusBarItems?: (
    stageId: string,
    stageUsage: string
  ) => ReadonlyArray<StatusBarItem>;
  /** Provides backstage items.
   * @deprecated in 4.15.0. Use {@link UiItemsProvider.getBackstageItems} instead.
   */
  readonly provideBackstageItems?: () => ReadonlyArray<BackstageItem>;
  /** Provides widgets.
   * @deprecated in 4.15.0. Use {@link UiItemsProvider.getWidgets} instead. To map item to location previously specified by arguments use {@link Widget.layouts}.
   */
  readonly provideWidgets?: (
    stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection
  ) => ReadonlyArray<Widget>;
  /** Function called when the provider is unregistered. Allows provider to do a cleanup. */
  readonly onUnregister?: () => void;
}
