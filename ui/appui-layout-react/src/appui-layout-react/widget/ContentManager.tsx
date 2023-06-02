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
  setContainer: (tabId: TabState["id"], container: Element | null) => void;
  containers: { readonly [id in TabState["id"]]: Element | null };
}

/** @internal */
export const useContainersStore = create<ContainersStore>((set) => ({
  containers: {},
  setContainer: (tabId: TabState["id"], container: Element | null) => {
    set((state) =>
      produce(state, (draft) => {
        draft.containers[tabId] = castDraft(container);
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
export const WidgetContentManagerContext =
  React.createContext<WidgetContentManagerContextArgs>(null!);
WidgetContentManagerContext.displayName = "nz:WidgetContentManagerContext";
