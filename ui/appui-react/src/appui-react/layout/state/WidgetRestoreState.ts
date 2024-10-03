/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type { PanelSide } from "../widget-panels/PanelTypes.js";
import type { FloatingWidgetState, WidgetState } from "./WidgetState.js";

/** @internal */
export interface FloatingWidgetRestoreState {
  widgetId: WidgetState["id"];
  floatingWidget: FloatingWidgetState;
}

/** @internal */
export interface PanelWidgetRestoreState {
  widgetId: WidgetState["id"];
  side: PanelSide;
  widgetIndex: number;
}

/** @internal */
export type WidgetRestoreState =
  | FloatingWidgetRestoreState
  | PanelWidgetRestoreState;

/** @internal */
export function isFloatingWidgetRestoreState(
  state: WidgetRestoreState
): state is FloatingWidgetRestoreState {
  return "floatingWidget" in state;
}

/** @internal */
export function isPanelWidgetRestoreState(
  state: WidgetRestoreState
): state is PanelWidgetRestoreState {
  return "side" in state;
}
