/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type { SizeProps } from "../../utils/SizeProps.js";
import type { PanelSide } from "../widget-panels/PanelTypes.js";
import type { FloatingWidgetState, WidgetState } from "./WidgetState.js";

/** @public */
export interface TabDropTargetState {
  readonly widgetId: WidgetState["id"];
  readonly tabIndex: number;
  readonly type: "tab";
}

/** @public */
export interface WidgetDropTargetState {
  readonly widgetId: WidgetState["id"];
  readonly type: "widget";
}

/** @public */
export interface PanelDropTargetState {
  readonly side: PanelSide;
  readonly newWidgetId: WidgetState["id"];
  readonly type: "panel";
}

/** @public */
export interface SectionDropTargetState {
  readonly side: PanelSide;
  readonly newWidgetId: WidgetState["id"];
  readonly sectionIndex: number;
  readonly type: "section";
}

/** @public */
export interface FloatingWidgetDropTargetState {
  readonly type: "floatingWidget";
  readonly newFloatingWidgetId: FloatingWidgetState["id"];
  readonly size: SizeProps;
}

/** Drop target of a tab drag action.
 * @public
 */
export type TabDragDropTargetState =
  | PanelDropTargetState
  | SectionDropTargetState
  | WidgetDropTargetState
  | TabDropTargetState
  | FloatingWidgetDropTargetState;

/** Default drop target, when nothing is targeted.
 * @public
 */
export interface WindowDropTargetState {
  readonly type: "window";
}

/** Drop target of a widget drag action.
 * @public
 */
export type WidgetDragDropTargetState =
  | PanelDropTargetState
  | SectionDropTargetState
  | WidgetDropTargetState
  | TabDropTargetState
  | WindowDropTargetState;

/** @public */
export type DropTargetState =
  | TabDragDropTargetState
  | WidgetDragDropTargetState;

/** @public */
export function isTabDropTargetState(
  state: DropTargetState
): state is TabDropTargetState {
  return state.type === "tab";
}

/** @public */
export function isPanelDropTargetState(
  state: DropTargetState
): state is PanelDropTargetState {
  return state.type === "panel";
}

/** @public */
export function isSectionDropTargetState(
  state: DropTargetState
): state is SectionDropTargetState {
  return state.type === "section";
}

/** @public */
export function isWidgetDropTargetState(
  state: DropTargetState
): state is WidgetDropTargetState {
  return state.type === "widget";
}

/** @public */
export function isWindowDropTargetState(
  state: WidgetDragDropTargetState
): state is WindowDropTargetState {
  return state.type === "window";
}

/** @public */
export function isWidgetDragDropTargetState(
  state: DropTargetState
): state is WidgetDragDropTargetState {
  if (state.type === "floatingWidget") return false;
  return true;
}

/** @public */
export function isTabDragDropTargetState(
  state: DropTargetState
): state is TabDragDropTargetState {
  if (state.type === "window") return false;
  return true;
}
