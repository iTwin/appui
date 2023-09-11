/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type { PanelSide } from "../widget-panels/Panel";
import type { FloatingWidgetState, WidgetState } from "./WidgetState";

/** @internal */
export interface FloatingWidgetTabHomeState {
  widgetId: WidgetState["id"];
  tabIndex: number;
  floatingWidget: FloatingWidgetState;
}

/** @internal */
export interface PanelWidgetTabHomeState {
  side: PanelSide;
  widgetId: WidgetState["id"];
  widgetIndex: number;
  tabIndex: number;
}

/** @internal */
export type TabHomeState = FloatingWidgetTabHomeState | PanelWidgetTabHomeState;

/** @internal */
export function isFloatingWidgetTabHomeState(
  home: TabHomeState
): home is FloatingWidgetTabHomeState {
  return "floatingWidget" in home;
}
