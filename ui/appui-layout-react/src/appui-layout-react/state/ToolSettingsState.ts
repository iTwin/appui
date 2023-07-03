/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type { TabState } from "./TabState";

/** @internal */
export interface CommonToolSettingsState {
  readonly tabId: TabState["id"];
}

/** @internal */
export interface DockedToolSettingsState extends CommonToolSettingsState {
  readonly type: "docked";
}

/** @internal */
export interface WidgetToolSettingsState extends CommonToolSettingsState {
  readonly type: "widget";
}

/** @internal */
export type ToolSettingsState =
  | DockedToolSettingsState
  | WidgetToolSettingsState;

/** @internal */
export function isDockedToolSettingsState(
  state: ToolSettingsState
): state is DockedToolSettingsState {
  return state.type === "docked";
}
