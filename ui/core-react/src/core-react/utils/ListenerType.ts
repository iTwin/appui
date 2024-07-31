/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */
import type { Listener } from "@itwin/core-bentley";

/**
 * Retrieves the type of the callback function for an event type like `BeEvent`.
 * @note `ListenerType` is available in `@itwin/core-bentley@^4.8.0`
 * @internal
 */
export type ListenerType<
  TEvent extends {
    addListener(listener: Listener): () => void;
  }
> = TEvent extends {
  addListener(listener: infer TListener): () => void;
}
  ? TListener
  : never;
