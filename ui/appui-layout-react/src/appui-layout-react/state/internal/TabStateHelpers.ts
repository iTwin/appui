/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import produce from "immer";
import { UiError } from "@itwin/appui-abstract";
import type { NineZoneState } from "../NineZoneState";
import type { DraggedTabState, TabState } from "../TabState";
import { category } from "./NineZoneStateHelpers";
import type { SavedTabState } from "../SavedTabState";
import type { WritableDraft } from "immer/dist/internal";

/** @internal */
export function createTabState(
  id: TabState["id"],
  args?: Partial<TabState>
): TabState {
  return {
    label: "",
    ...args,
    id,
    unloaded: false,
  };
}

/** @internal */
export function createDraggedTabState(
  tabId: DraggedTabState["tabId"],
  args?: Partial<DraggedTabState>
): DraggedTabState {
  return {
    home: {
      side: "left",
      widgetId: undefined,
      widgetIndex: 0,
    },
    position: { x: 0, y: 0 },
    ...args,
    tabId,
  };
}

/** @internal */
export function updateTabState(
  state: NineZoneState,
  id: TabState["id"],
  update: (draft: WritableDraft<TabState>) => void
) {
  if (!(id in state.tabs)) throw new UiError(category, "Tab does not exist");

  return produce(state, (draft) => {
    const tab = draft.tabs[id];
    update(tab);
  });
}

/** @internal */
export function updateSavedTabState(
  state: NineZoneState,
  id: TabState["id"],
  update: (draft: WritableDraft<SavedTabState>) => void
) {
  return produce(state, (draft) => {
    const allIds = draft.savedTabs.allIds;
    const byId = draft.savedTabs.byId;
    let tab = byId[id];
    if (!tab) {
      allIds.push(id);
      tab = byId[id] = { id };
    } else {
      const index = allIds.indexOf(id);
      allIds.splice(index, 1);
      allIds.push(id);
    }

    update(tab);
  });
}
