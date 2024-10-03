/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import { useCallback, useSyncExternalStore } from "react";
import { SyncUiEventDispatcher } from "../syncui/SyncUiEventDispatcher.js";

/** Defines a common interface for existing conditional value classes: `ConditionalBooleanValue`, `ConditionalStringValue`, `ConditionalIconItem`. */
interface CommonConditionalValue<T> {
  syncEventIds: string[];
  refresh: () => boolean;
  value: T;
}

/** Type that is usually used in a conditional prop. */
type ConditionalProp<T> = CommonConditionalValue<T> | T | undefined;

/** Duck type the conditional. */
function isConditionalValue<T>(
  conditionalProp: ConditionalProp<T>
): conditionalProp is CommonConditionalValue<T> {
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
  const subscribe = useCallback(
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
  const getSnapshot = useCallback(() => {
    if (isConditionalValue(conditionalProp)) return conditionalProp.value;
    return conditionalProp;
  }, [conditionalProp]);
  return useSyncExternalStore(subscribe, getSnapshot);
}
