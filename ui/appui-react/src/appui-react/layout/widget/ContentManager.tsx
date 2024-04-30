/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import produce, { castDraft } from "immer";
import * as React from "react";
import { create } from "zustand";
import { BeEvent } from "@itwin/core-bentley";
import type { TabState } from "../state/TabState";
import type { WidgetState } from "../state/WidgetState";

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
      container === null && saveTransientStateRef.current.raiseEvent(tabId);
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
  popoutContainers: { readonly [id in WidgetState["id"]]: Element | null };
  containers: { readonly [id in TabState["id"]]: Element | null };
  setContainer: (tabId: TabState["id"], container: Element | null) => void;
  setPopoutContainer: (
    widgetId: WidgetState["id"],
    container: Element | null
  ) => void;
}

/** @internal */
export const useContainersStore = create<ContainersStore>((set) => ({
  containers: {},
  popoutContainers: {},
  setContainer: (tabId: TabState["id"], container: Element | null) => {
    set((state) =>
      produce(state, (draft) => {
        draft.containers[tabId] = castDraft(container);
      })
    );
  },
  setPopoutContainer: (tabId: TabState["id"], container: Element | null) => {
    set((state) =>
      produce(state, (draft) => {
        draft.popoutContainers[tabId] = castDraft(container);
      })
    );
  },
}));

/** @internal */
export interface WidgetContentManagerContextArgs {
  setContainer(tabId: TabState["id"], container: Element | null): void;
  onSaveTransientState: BeEvent<(tabId: TabState["id"]) => void>;
  onRestoreTransientState: BeEvent<(tabId: TabState["id"]) => void>;
}

/** @internal */
export const WidgetContentManagerContext = React.createContext<
  WidgetContentManagerContextArgs | undefined
>(undefined);
WidgetContentManagerContext.displayName = "nz:WidgetContentManagerContext";
