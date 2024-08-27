/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import { SyncUiEventDispatcher } from "../syncui/SyncUiEventDispatcher";

/** Define a common interface for conditionals. */
interface ConditionalValue<T> {
  syncEventIds: string[];
  refresh: () => boolean;
  value: T;
}

/** Type that is usually used in a conditional prop. */
type ConditionalProp<T> = ConditionalValue<T> | T | undefined;

/** Duck type the conditional. */
function isConditionalValue<T>(
  conditionalProp: ConditionalProp<T>
): conditionalProp is ConditionalValue<T> {
  return (
    typeof conditionalProp === "object" &&
    conditionalProp &&
    "syncEventIds" in conditionalProp &&
    "refresh" in conditionalProp &&
    "value" in conditionalProp
  );
}

/** @internal */
export function useConditionalProp<T>(conditionalProp: ConditionalProp<T>) {
  const subscribe = React.useCallback(
    (onStoreChange: () => void) => {
      if (isConditionalValue(conditionalProp)) {
        return SyncUiEventDispatcher.onSyncUiEvent.addListener(
          ({ eventIds }) => {
            if (
              !SyncUiEventDispatcher.hasEventOfInterest(
                eventIds,
                conditionalProp.syncEventIds
              )
            )
              return;
            if (!conditionalProp.refresh()) return;

            onStoreChange();
          }
        );
      }
      return () => {};
    },
    [conditionalProp]
  );
  const getSnapshot = React.useCallback(() => {
    if (isConditionalValue(conditionalProp)) return conditionalProp.value;
    return conditionalProp;
  }, [conditionalProp]);
  return useSyncExternalStore(subscribe, getSnapshot);
}
