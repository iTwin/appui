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
import type { ToolbarItemLocation } from "../toolbar/ToolbarItemLocation";
import type { Widget } from "../widgets/Widget";

/** Describes interface of objects that want to provide UI component to the running IModelApp.
 * @public
 */
export interface UiItemsProvider {
  /** Id of provider. */
  readonly id: string;

  /** Provides toolbar items.
   * @internal
   */
  readonly getToolbarItems?: () => ReadonlyArray<ToolbarItem>;
  /** Provides toolbar item locations for the layout.
   * @internal
   */
  readonly getToolbarItemLocations?: () => ReadonlyArray<ToolbarItemLocation>;

  /** Provides toolbar items. */
  readonly provideToolbarItems?: (
    stageId: string,
    stageUsage: string,
    toolbarUsage: ToolbarUsage,
    toolbarOrientation: ToolbarOrientation
  ) => ReadonlyArray<ToolbarItem>;
  /** Provides status bar items. */
  readonly provideStatusBarItems?: (
    stageId: string,
    stageUsage: string
  ) => ReadonlyArray<StatusBarItem>;
  /** Provides backstage items. */
  readonly provideBackstageItems?: () => ReadonlyArray<BackstageItem>;
  /** Provides widgets. */
  readonly provideWidgets?: (
    stageId: string,
    stageUsage: string,
    location: StagePanelLocation,
    section?: StagePanelSection
  ) => ReadonlyArray<Widget>;
  /** Function called when the provider is unregistered. Allows provider to do a cleanup. */
  readonly onUnregister?: () => void;
}
