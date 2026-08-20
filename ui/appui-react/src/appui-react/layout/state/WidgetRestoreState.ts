/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type { PanelSide } from "../widget-panels/PanelTypes.js";
import type {
  FloatingWidgetState,
  PopoutWidgetState,
  WidgetState,
} from "./WidgetState.js";

/** @internal */
export interface FloatingWidgetRestoreState {
  widgetId: WidgetState["id"];
  floatingWidget: FloatingWidgetState;
}

/** @internal */
export interface PopoutWidgetRestoreState {
  widgetId: WidgetState["id"];
  popoutWidget: PopoutWidgetState;
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

/** Restore state for a tab, which (unlike {@link WidgetRestoreState}) can also
 * restore into a popout window.
 * @internal
 */
export type TabRestoreState = WidgetRestoreState | PopoutWidgetRestoreState;

/** @internal */
export function isFloatingWidgetRestoreState(
  state: WidgetRestoreState | TabRestoreState
): state is FloatingWidgetRestoreState {
  return "floatingWidget" in state;
}

/** @internal */
export function isPopoutWidgetRestoreState(
  state: TabRestoreState
): state is PopoutWidgetRestoreState {
  return "popoutWidget" in state;
}

/** @internal */
export function isPanelWidgetRestoreState(
  state: WidgetRestoreState | TabRestoreState
): state is PanelWidgetRestoreState {
  return "side" in state;
}
