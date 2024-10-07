/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { castDraft, produce } from "immer";
import * as React from "react";
import { create } from "zustand";
import { BeEvent } from "@itwin/core-bentley";
import type { TabState } from "../state/TabState.js";

/** @internal */
export interface WidgetContentManagerProps {
  children?: React.ReactNode;
}

/** @internal */
export function WidgetContentManager(props: WidgetContentManagerProps) {
  const setContentContainer = useContainersStore((state) => state.setContainer);
  const saveTransientStateRef = React.useRef(
    new BeEvent<(tabId: TabState["id"]) => void>()
  );
  const restoreTransientStateRef = React.useRef(
    new BeEvent<(tabId: TabState["id"]) => void>()
  );
  const setContainer = React.useCallback<
    WidgetContentManagerContextArgs["setContainer"]
  >(
    (tabId, container) => {
      if (!container) {
        saveTransientStateRef.current.raiseEvent(tabId);
      }
      setContentContainer(tabId, container);
    },
    [setContentContainer]
  );
  const widgetContentManagerContextValue =
    React.useMemo<WidgetContentManagerContextArgs>(
      () => ({
        setContainer,
        onSaveTransientState: saveTransientStateRef.current,
        onRestoreTransientState: restoreTransientStateRef.current,
      }),
      [setContainer]
    );
  return (
    <WidgetContentManagerContext.Provider
      value={widgetContentManagerContextValue}
    >
      {props.children}
    </WidgetContentManagerContext.Provider>
  );
}

interface ContainersStore {
  containers: { readonly [id in TabState["id"]]: Element | undefined };
  setContainer: (tabId: TabState["id"], container: Element | undefined) => void;
}

/** @internal */
export const useContainersStore = create<ContainersStore>((set) => ({
  containers: {},
  setContainer: (tabId: TabState["id"], container: Element | undefined) => {
    set((state) =>
      produce(state, (draft) => {
        if (!container) {
          delete draft.containers[tabId];
          return;
        }

        draft.containers[tabId] = castDraft(container);
      })
    );
  },
}));

/** @internal */
export interface WidgetContentManagerContextArgs {
  setContainer(tabId: TabState["id"], container: Element | undefined): void;
  onSaveTransientState: BeEvent<(tabId: TabState["id"]) => void>;
  onRestoreTransientState: BeEvent<(tabId: TabState["id"]) => void>;
}

/** @internal */
export const WidgetContentManagerContext = React.createContext<
  WidgetContentManagerContextArgs | undefined
>(undefined);
WidgetContentManagerContext.displayName = "nz:WidgetContentManagerContext";
