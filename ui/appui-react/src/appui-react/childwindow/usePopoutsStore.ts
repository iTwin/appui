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
  popouts: { readonly [id in WidgetState["id"]]: Element | null };
  setPopout: (widgetId: WidgetState["id"], container: Element | null) => void;
  onClosePopoutWidget: BeEvent<(args: { windowId: string }) => void>;
}

/** @internal */
export const usePopoutsStore = create<PopoutWidgetsStore>((set) => ({
  popouts: {},
  setPopout: (widgetId: WidgetState["id"], container: Element | null) => {
    set((state) =>
      produce(state, (draft) => {
        draft.popouts[widgetId] = castDraft(container);
      })
    );
  },
  onClosePopoutWidget: new BeEvent<(args: { windowId: string }) => void>(),
}));
