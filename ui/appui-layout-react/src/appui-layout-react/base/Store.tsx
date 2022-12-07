/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import * as React from "react";
import { BeEvent } from "@itwin/core-bentley";

/** @internal */
export interface Store<T> {
  get: () => T;
  set: (state: T) => void;
  onChanged: (callback: () => void) => () => void;
}

/** @internal */
export function createStore<T>(initialState: T): Store<T> {
  let state = initialState;
  const get = () => state;
  const onChangedEvent = new BeEvent();

  const set = (newState: T) => {
    if (state === newState)
      return;
    state = newState;
    onChangedEvent.raiseEvent();
  };

  const onChanged = (callback: () => void) => {
    return onChangedEvent.addListener(callback);
  };

  return {
    get,
    set,
    onChanged,
  };
}

/** @internal */
export function useStoreData<T, SelectorOutput>(
  store: Store<T>,
  selector: (state: T) => SelectorOutput
): SelectorOutput {
  // TODO: useSyncExternalStore in React 18
  const [state, setState] = React.useState(() => selector(store.get()));
  React.useEffect(() => {
    setState(selector(store.get()));
  }, [store, selector]);
  React.useEffect(() => {
    return store.onChanged(() => {
      setState(selector(store.get()));
    });
  }, [store, selector]);

  return state;
}
