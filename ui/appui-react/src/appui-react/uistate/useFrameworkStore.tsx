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
import type { ConfigurableUiState } from "../redux/ConfigurableUiState";
import { createFrameworkState } from "../redux/FrameworkState";
import type { SessionState } from "../redux/SessionState";
import type { ThemeId } from "../theme/ThemeId";

/** Interface that replaces framework state and actions used in redux.
 * @note This type is mapped to the redux framework state for backwards compatibility.
 * @note This type should not be used by consumers directly. Additional required properties can be added.
 * @internal
 */
export type FrameworkState = Immutable<{
  configurableUi: ConfigurableUiState & {
    setTheme: (theme: ThemeId) => void;
  };
  session: SessionState;
}>;

/** Internal global store that replaces redux store.
 * @internal
 */
export const useFrameworkStore: UseBoundStore<StoreApi<FrameworkState>> =
  create((set) => {
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
  });
