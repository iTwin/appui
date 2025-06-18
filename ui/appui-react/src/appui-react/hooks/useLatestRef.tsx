/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import * as React from "react";

/** @internal */
export function useLatestRef<T>(value: T) {
  const valueRef = React.useRef<T>(value);

  React.useInsertionEffect(() => {
    valueRef.current = value;
  });

  return valueRef;
}
