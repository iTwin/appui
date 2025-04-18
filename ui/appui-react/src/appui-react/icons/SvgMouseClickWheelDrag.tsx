/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";

/** @internal */
export function SvgMouseClickWheelDrag() {
  return (
    <svg viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m0 8 2.0625-2.0625v1.375h2.75v1.375h-2.75v1.375zm22 0-2.0625 2.0625v-1.375h-2.75v-1.375h2.75v-1.375z"
        fillRule="evenodd"
        opacity=".55"
      />
      <path d="m11 0a5.5 5.5 0 0 0 -5.5 5.5v5a5.5 5.5 0 0 0 11 0v-5a5.5 5.5 0 0 0 -5.5-5.5zm4.5 5.5v.5h-3v-2.5a1.49569 1.49569 0 0 0 -1-1.4082v-1.0412a4.49037 4.49037 0 0 1 4 4.4494zm-5-4.4494v1.0412a1.49569 1.49569 0 0 0 -1 1.4082v2.5h-3v-.5a4.49037 4.49037 0 0 1 4-4.4494zm.5 13.9494a4.50508 4.50508 0 0 1 -4.5-4.5v-3.5h3.0918a1.49151 1.49151 0 0 0 2.8164 0h3.0918v3.5a4.50508 4.50508 0 0 1 -4.5 4.5zm-1.5-5h3v-1h-3z" />
    </svg>
  );
}
