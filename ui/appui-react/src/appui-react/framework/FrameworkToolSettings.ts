/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ToolSettings
 */
import type { DialogItem, DialogPropertySyncItem } from "@itwin/appui-abstract";
import { UiEvent } from "@itwin/appui-abstract";
import type { InteractiveTool } from "@itwin/core-frontend";

/** Sync Tool Settings Properties Event Args interface.
 * @public
 */
export interface SyncToolSettingsPropertiesEventArgs {
  toolId: string;
  syncProperties: DialogPropertySyncItem[];
}

/** Sync Tool Settings Properties Event class.
 * @public
 * @deprecated in 4.13.x. Use `BeUiEvent<SyncToolSettingsPropertiesEventArgs>` instead.
 */
// eslint-disable-next-line deprecation/deprecation
export class SyncToolSettingsPropertiesEvent extends UiEvent<SyncToolSettingsPropertiesEventArgs> {}

/**
 * [[UiFramework.toolSettings]] interface
 * @public
 */
export interface FrameworkToolSettings {
  /** clear cached Tool Settings properties. */
  clearToolSettingsData(): void;

  /** Cache Tool Settings properties */
  initializeToolSettingsData(
    toolSettingsProperties: DialogItem[] | undefined,
    toolId?: string,
    toolLabel?: string,
    toolDescription?: string
  ): boolean;

  /** Set of data used in Tool Settings for the specified tool. The tool specified should be the "active" tool.
   */
  initializeDataForTool(tool: InteractiveTool): void;

  /** Returns the toolSettings properties that can be used to populate the tool settings widget. */
  readonly toolSettingsProperties: DialogItem[];

  /** Returns true if the Tool Settings are to be auto populated from the toolSettingsProperties.
   * The setter is chiefly for testing.
   */
  useDefaultToolSettingsProvider: boolean;

  /** The name of the active tool. This is typically the flyover text specified for the tool. */
  activeToolLabel: string;

  /** Returns the description of the active tool. */
  readonly activeToolDescription: string;

  /** Get ToolSettings Properties sync event. */
  // eslint-disable-next-line deprecation/deprecation
  readonly onSyncToolSettingsProperties: SyncToolSettingsPropertiesEvent;
  // eslint-disable-next-line deprecation/deprecation
  readonly onReloadToolSettingsProperties: UiEvent<void>;

  /** Gets the Id of the active tool. If a tool is not active, blank is returned.
   * @return  Id of the active tool, or blank if one is not active.
   */
  readonly toolIdForToolSettings: string;

  /**
   * Sets the focus on the ToolSettings UI element.
   */
  focusIntoToolSettings(): boolean;
}
