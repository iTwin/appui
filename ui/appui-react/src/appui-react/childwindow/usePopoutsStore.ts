/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import produce, { castDraft } from "immer";
import { create } from "zustand";
import type { WidgetState } from "../layout/state/WidgetState";
import { BeEvent } from "@itwin/core-bentley";

interface PopoutWidgetsStore {
  popouts: { readonly [id in WidgetState["id"]]: Element | undefined };
  setPopout: (
    widgetId: WidgetState["id"],
    container: Element | undefined
  ) => void;
  onClosePopoutWidget: BeEvent<(args: { windowId: string }) => void>;
}

/** @internal */
export const usePopoutsStore = create<PopoutWidgetsStore>((set) => ({
  popouts: {},
  setPopout: (widgetId: WidgetState["id"], container: Element | undefined) => {
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
