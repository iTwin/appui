/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module State
 */

import type { Immutable } from "immer";
import produce, { castDraft } from "immer";
import type { StoreApi, UseBoundStore } from "zustand";
import { create } from "zustand";
import type { ConfigurableUiState } from "../configurableui/ConfigurableUiState";
import { createFrameworkState } from "./FrameworkState";
import type { SessionState } from "./SessionState";
import type { ThemeId } from "../theme/ThemeId";

/** @internal */
export type GlobalState = Immutable<{
  configurableUi: ConfigurableUiState & {
    setTheme: (theme: ThemeId) => void;
  };
  session: SessionState;
}>;

/** Global store that will replace existing redux store.
 * @internal
 */
export const useGlobalStore: UseBoundStore<StoreApi<GlobalState>> = create(
  (set) => {
    const frameworkState = createFrameworkState();
    return {
      configurableUi: {
        ...frameworkState.configurableUiState,
        setTheme: (theme) => {
          set((state) =>
            produce(state, (draft) => {
              draft.configurableUi.theme = castDraft(theme);
            })
          );
        },
      },
      session: frameworkState.sessionState,
    };
  }
);
