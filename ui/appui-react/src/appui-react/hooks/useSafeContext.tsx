/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import * as React from "react";

/** @internal */
export function useSafeContext<C>(context: React.Context<C>) {
  const value = React.useContext(context);

  if (value === undefined) {
    throw new Error(`${context.displayName || "Context"} is undefined`);
  }

  return value;
}
