/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import { UiError } from "@itwin/appui-abstract";
import produce from "immer";
import type {
  HorizontalPanelSide,
  PanelSide,
  VerticalPanelSide,
} from "../widget-panels/Panel";
import { isHorizontalPanelSide } from "../widget-panels/Panel";
import { category } from "./internal/NineZoneStateHelpers";
import { addWidgetState } from "./internal/WidgetStateHelpers";
import type { NineZoneState } from "./NineZoneState";
import type { WidgetState } from "./WidgetState";

/** @internal */
export type PanelMaxSizeState = number | { readonly percentage: number };

/** @internal */
export interface PanelState {
  readonly collapseOffset: number;
  readonly collapsed: boolean;
  readonly maxSize: PanelMaxSizeState;
  readonly minSize: number;
  readonly pinned: boolean;
  readonly resizable: boolean;
  readonly side: PanelSide;
  readonly size: number | undefined;
  readonly widgets: ReadonlyArray<WidgetState["id"]>;
  readonly maxWidgetCount: number;
  readonly splitterPercent: number | undefined; // Defaults to 50.
}

/** @internal */
export interface HorizontalPanelState extends PanelState {
  readonly span: boolean;
  readonly side: HorizontalPanelSide;
}

/** @internal */
export interface VerticalPanelState extends PanelState {
  readonly side: VerticalPanelSide;
}

/** @internal */
export interface PanelsState {
  readonly bottom: HorizontalPanelState;
  readonly left: VerticalPanelState;
  readonly right: VerticalPanelState;
  readonly top: HorizontalPanelState;
}

/** @internal */
export function isHorizontalPanelState(
  state: PanelState
): state is HorizontalPanelState {
  return isHorizontalPanelSide(state.side);
}

/** @internal */
export function getWidgetPanelSectionId(
  side: PanelSide,
  panelSectionIndex: number
) {
  return 0 === panelSectionIndex ? `${side}Start` : `${side}End`;
}

/** @internal */
export function addPanelWidget(
  state: NineZoneState,
  side: PanelSide,
  id: WidgetState["id"],
  tabs: WidgetState["tabs"],
  widgetArgs?: Partial<WidgetState>
): NineZoneState {
  return insertPanelWidget(state, side, id, tabs, Infinity, widgetArgs);
}

/** @internal */
export function insertPanelWidget(
  state: NineZoneState,
  side: PanelSide,
  id: WidgetState["id"],
  tabs: WidgetState["tabs"],
  sectionIndex: number,
  widgetArgs?: Partial<WidgetState>
): NineZoneState {
  const panel = state.panels[side];
  const maxWidgetCount = panel.maxWidgetCount;
  if (panel.widgets.length >= maxWidgetCount)
    // eslint-disable-next-line deprecation/deprecation
    throw new UiError(category, "Max widget count exceeded", undefined, () => ({
      maxWidgetCount,
    }));

  state = addWidgetState(state, id, tabs, widgetArgs);
  return produce(state, (draft) => {
    const widgets = draft.panels[side].widgets;
    widgets.splice(sectionIndex, 0, id);
  });
}
