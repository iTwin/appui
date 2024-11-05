/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import { UiError } from "@itwin/appui-abstract";
import type { Draft } from "immer";
import { produce } from "immer";
import { isHorizontalPanelSide } from "../../widget-panels/Panel.js";
import type {
  HorizontalPanelSide,
  PanelSide,
  VerticalPanelSide,
} from "../../widget-panels/PanelTypes.js";
import type { NineZoneState } from "../NineZoneState.js";
import type {
  HorizontalPanelState,
  PanelsState,
  VerticalPanelState,
} from "../PanelState.js";
import type { WidgetState } from "../WidgetState.js";
import { category } from "./NineZoneStateHelpers.js";
import { addWidgetState } from "./WidgetStateHelpers.js";
import type { StagePanelSizeSpec } from "../../../stagepanels/StagePanelConfig.js";
import type { SizeProps } from "../../../utils/SizeProps.js";

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
  update: (draft: Draft<PanelsState>[K]) => void
) {
  return produce(state, (draft) => {
    const panel = draft.panels[side];
    update(panel);
  });
}

/** @internal */
export function getPanelPixelSizeFromSpec(
  side: PanelSide,
  appSize: SizeProps,
  panelSize: StagePanelSizeSpec
) {
  if (typeof panelSize === "number") {
    return panelSize;
  }

  const fullSize = isHorizontalPanelSide(side) ? appSize.height : appSize.width;
  return (panelSize.percentage / 100) * fullSize;
}

/** @internal */
export function getPanelSize(
  preferredSizeSpec: StagePanelSizeSpec | undefined,
  side: PanelSide,
  minSizeSpec: StagePanelSizeSpec,
  maxSizeSpec: StagePanelSizeSpec,
  appSize: SizeProps
) {
  if (preferredSizeSpec === undefined) return undefined;

  const maxSize = getPanelPixelSizeFromSpec(side, appSize, maxSizeSpec);
  const minSize = getPanelPixelSizeFromSpec(side, appSize, minSizeSpec);
  const preferredSize = getPanelPixelSizeFromSpec(
    side,
    appSize,
    preferredSizeSpec
  );

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
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    throw new UiError(category, "Max widget count exceeded", undefined, () => ({
      maxWidgetCount,
    }));

  state = addWidgetState(state, id, tabs, widgetArgs);
  return produce(state, (draft) => {
    const widgets = draft.panels[side].widgets;
    widgets.splice(sectionIndex, 0, id);
  });
}
