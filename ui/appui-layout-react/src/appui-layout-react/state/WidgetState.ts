/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import { UiError } from "@itwin/appui-abstract";
import type { RectangleProps } from "@itwin/core-react";
import produce from "immer";
import type { PanelSide } from "../widget-panels/Panel";
import { category } from "./internal/NineZoneStateHelpers";
import {
  addWidgetState,
  createFloatingWidgetState,
  createPopoutWidgetState,
  getNewFloatingWidgetBounds,
} from "./internal/WidgetStateHelpers";
import type { NineZoneState } from "./NineZoneState";
import type { TabState } from "./TabState";
import type {
  PanelWidgetRestoreState,
  WidgetRestoreState,
} from "./WidgetRestoreState";

/** State of a stacked widget, which can contain multiple tabs. I.e. in a panel section or a floating widget.
 * @internal
 */
export interface WidgetState {
  readonly activeTabId: TabState["id"];
  readonly id: string;
  readonly minimized: boolean;
  readonly tabs: ReadonlyArray<TabState["id"]>;
}

/** @internal */
export interface WidgetsState {
  readonly [id: string]: WidgetState;
}

/** @internal */
export interface FloatingWidgetState {
  readonly id: WidgetState["id"];
  readonly bounds: RectangleProps;
  readonly home: PanelWidgetRestoreState;
  readonly userSized?: boolean;
  readonly resizable?: boolean;
}

/** @internal */
export interface FloatingWidgetsState {
  readonly byId: { readonly [id: string]: FloatingWidgetState };
  readonly allIds: ReadonlyArray<FloatingWidgetState["id"]>;
}

/** @internal */
export interface PopoutWidgetState {
  readonly bounds: RectangleProps;
  readonly id: WidgetState["id"];
  readonly home: WidgetRestoreState;
}

/** @internal */
export interface PopoutWidgetsState {
  readonly byId: { readonly [id: string]: PopoutWidgetState };
  readonly allIds: ReadonlyArray<PopoutWidgetState["id"]>;
}

/** @internal */
export function addFloatingWidget(
  state: NineZoneState,
  id: FloatingWidgetState["id"],
  tabs: WidgetState["tabs"],
  floatingWidgetArgs?: Partial<FloatingWidgetState>,
  widgetArgs?: Partial<WidgetState>
): NineZoneState {
  if (id in state.floatingWidgets.byId)
    throw new UiError(category, "Floating widget already exists");

  state = addWidgetState(state, id, tabs, widgetArgs);

  let bounds = floatingWidgetArgs?.bounds;
  if (!bounds) {
    bounds = getNewFloatingWidgetBounds(state);
  }

  const tabId = tabs[0];
  const tab = state.tabs[tabId];
  const resizable = tab.isFloatingWidgetResizable;

  const floatingWidget = createFloatingWidgetState(id, {
    bounds,
    resizable,
    ...floatingWidgetArgs,
  });
  return produce(state, (stateDraft) => {
    stateDraft.floatingWidgets.byId[id] = floatingWidget;
    stateDraft.floatingWidgets.allIds.push(id);
  });
}

/** @internal */
export function addPopoutWidget(
  state: NineZoneState,
  id: PopoutWidgetState["id"],
  tabs: WidgetState["tabs"],
  popoutWidgetArgs?: Partial<PopoutWidgetState>,
  widgetArgs?: Partial<WidgetState>
): NineZoneState {
  if (tabs.length !== 1)
    throw new UiError(
      category,
      "Popout widget should contain one tab only",
      undefined,
      () => ({ tabs })
    );

  const popoutWidget = createPopoutWidgetState(id, popoutWidgetArgs);
  state = addWidgetState(state, id, tabs, widgetArgs);
  return produce(state, (stateDraft) => {
    stateDraft.popoutWidgets.byId[id] = popoutWidget;
    stateDraft.popoutWidgets.allIds.push(id);
  });
}

/** @internal */
export function floatingWidgetBringToFront(
  state: NineZoneState,
  floatingWidgetId: FloatingWidgetState["id"]
): NineZoneState {
  return produce(state, (draft) => {
    const idIndex = draft.floatingWidgets.allIds.indexOf(floatingWidgetId);
    const spliced = draft.floatingWidgets.allIds.splice(idIndex, 1);
    draft.floatingWidgets.allIds.push(spliced[0]);
  });
}
