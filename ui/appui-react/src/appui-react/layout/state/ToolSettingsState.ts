/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type { TabState } from "./TabState";

/** @internal */
export interface DockedToolSettingsState {
  readonly type: "docked";
  readonly tabId: TabState["id"];
  readonly hidden: boolean;
}

/** @internal */
export interface WidgetToolSettingsState {
  readonly type: "widget";
  readonly tabId: TabState["id"];
}

/** @internal */
export type ToolSettingsState =
  | DockedToolSettingsState
  | WidgetToolSettingsState;
