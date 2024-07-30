/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import { SyncUiEventDispatcher } from "../syncui/SyncUiEventDispatcher";

/** Hook that allows to get a value that depends on some sync UI events.
 * @note This can be used as a replacement for a deprecated {@link @itwin/core-react#ConditionalIconItem}.
 * @alpha
 */
export function useConditionalValue<T>(getValue: () => T, eventIds: string[]) {
  const [value, setValue] = React.useState(() => getValue());

  const getValueRef = React.useRef(getValue);
  React.useEffect(() => {
    getValueRef.current = getValue;
  }, [getValue]);

  const eventIdsRef = React.useRef(eventIds);
  React.useEffect(() => {
    eventIdsRef.current = eventIds;
  }, [eventIds]);

  React.useEffect(() => {
    return SyncUiEventDispatcher.onSyncUiEvent.addListener((args) => {
      if (!eventIdsRef.current.some((id) => args.eventIds.has(id))) return;
      setValue(getValueRef.current());
    });
  }, []);

  return value;
}
