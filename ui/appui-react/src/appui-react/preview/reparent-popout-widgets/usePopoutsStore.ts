/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { castDraft, produce } from "immer";
import { create } from "zustand";
import type { WidgetState } from "../../layout/state/WidgetState.js";
import { BeEvent } from "@itwin/core-bentley";

interface PopoutWidgetsStore {
  popouts: { readonly [id in WidgetState["id"]]: HTMLElement | undefined };
  setPopout: (
    widgetId: WidgetState["id"],
    container: HTMLElement | undefined
  ) => void;
  onClosePopoutWidget: BeEvent<(args: { windowId: string }) => void>;
}

/** @internal */
export const usePopoutsStore = create<PopoutWidgetsStore>((set) => ({
  popouts: {},
  setPopout: (
    widgetId: WidgetState["id"],
    container: HTMLElement | undefined
  ) => {
    set((state) =>
      produce(state, (draft) => {
        if (!container) {
          delete draft.popouts[widgetId];
          return;
        }

        draft.popouts[widgetId] = castDraft(container);
      })
    );
  },
  onClosePopoutWidget: new BeEvent<(args: { windowId: string }) => void>(),
}));
