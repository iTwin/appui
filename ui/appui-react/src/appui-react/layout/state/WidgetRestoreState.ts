/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type { PanelSide } from "../widget-panels/PanelTypes.js";
import type { SizeProps } from "../../utils/SizeProps.js";
import type {
  FloatingWidgetState,
  PopoutWidgetState,
  WidgetState,
} from "./WidgetState.js";

/** Minimum size enforced for a popped-out widget window. */
export const MIN_POPOUT_WINDOW_SIZE: SizeProps = {
  width: 200,
  height: 200,
};

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
  state: TabRestoreState
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
  state: TabRestoreState
): state is PanelWidgetRestoreState {
  return "side" in state;
}
