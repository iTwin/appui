/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import { UiError } from "@itwin/appui-abstract";
import type { SizeProps } from "@itwin/core-react";
import produce from "immer";
import type { WritableDraft } from "immer/dist/types/types-external";
import { isHorizontalPanelSide } from "../../widget-panels/Panel";
import type {
  HorizontalPanelSide,
  PanelSide,
  VerticalPanelSide,
} from "../../widget-panels/PanelTypes";
import type { NineZoneState } from "../NineZoneState";
import type {
  HorizontalPanelState,
  PanelMaxSizeState,
  PanelsState,
  PanelState,
  VerticalPanelState,
} from "../PanelState";
import type { WidgetState } from "../WidgetState";
import { category } from "./NineZoneStateHelpers";
import { addWidgetState } from "./WidgetStateHelpers";

function createPanelState(side: PanelSide) {
  return {
    collapseOffset: 100,
    collapsed: false,
    maxSize: 600,
    minSize: 200,
    pinned: true,
    resizable: true,
    side,
    size: undefined,
    widgets: [],
    maxWidgetCount: 2,
    splitterPercent: 50,
  };
}

/** @internal */
export function createVerticalPanelState(
  side: VerticalPanelSide,
  args?: Partial<VerticalPanelState>
): VerticalPanelState {
  return {
    ...createPanelState(side),
    ...args,
    side,
  };
}

/** @internal */
export function createHorizontalPanelState(
  side: HorizontalPanelSide,
  args?: Partial<HorizontalPanelState>
): HorizontalPanelState {
  return {
    ...createPanelState(side),
    minSize: 100,
    span: true,
    ...args,
    side,
  };
}

/** @internal */
export function createPanelsState(args?: Partial<PanelsState>): PanelsState {
  return {
    bottom: createHorizontalPanelState("bottom"),
    left: createVerticalPanelState("left"),
    right: createVerticalPanelState("right"),
    top: createHorizontalPanelState("top"),
    ...args,
  };
}

/** @internal */
export function updatePanelState<K extends keyof PanelsState>(
  state: NineZoneState,
  side: K,
  update: (draft: WritableDraft<PanelsState>[K]) => void
) {
  return produce(state, (draft) => {
    const panel = draft.panels[side];
    update(panel);
  });
}

/** @internal */
export function getPanelMaxSize(
  side: PanelSide,
  appSize: SizeProps,
  maxSize: PanelMaxSizeState
) {
  if (typeof maxSize === "number") {
    return maxSize;
  }
  const size = isHorizontalPanelSide(side) ? appSize.height : appSize.width;
  return (maxSize.percentage / 100) * size;
}

/** @internal */
export function getPanelSize(
  preferredSize: number | undefined,
  side: PanelSide,
  minSize: PanelState["minSize"],
  maxSizeSpec: PanelState["maxSize"],
  appSize: SizeProps
) {
  if (preferredSize === undefined) return undefined;

  const maxSize = getPanelMaxSize(side, appSize, maxSizeSpec);
  return Math.min(Math.max(preferredSize, minSize), maxSize);
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
    throw new UiError(category, "Max widget count exceeded", undefined, () => ({
      maxWidgetCount,
    }));

  state = addWidgetState(state, id, tabs, widgetArgs);
  return produce(state, (draft) => {
    const widgets = draft.panels[side].widgets;
    widgets.splice(sectionIndex, 0, id);
  });
}
