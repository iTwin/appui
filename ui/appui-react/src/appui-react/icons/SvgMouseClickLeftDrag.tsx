/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";

/** @internal */
export function SvgMouseClickLeftDrag() {
  return (
    <svg viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m0 8 2.0625-2.0625v1.375h2.75v1.375h-2.75v1.375zm22 0-2.0625 2.0625v-1.375h-2.75v-1.375h2.75v-1.375z"
        fillRule="evenodd"
        opacity=".55"
      />
      <path d="m9.5 9h-2v-1h2zm7-3.5v5a5.5 5.5 0 0 1 -11 0v-5a5.5 5.5 0 0 1 11 0zm-5-4.4494v1.0412a1.49569 1.49569 0 0 1 1 1.4082v2.5h3v-.5a4.49037 4.49037 0 0 0 -4-4.4494zm-.5 1.9494a.50057.50057 0 0 0 -.5.5v3a.5.5 0 0 0 1 0v-3a.50057.50057 0 0 0 -.5-.5zm4.5 7.5v-3.5h-3.0918a1.49151 1.49151 0 0 1 -2.8164 0h-3.0918v3.5a4.5 4.5 0 0 0 9 0z" />
    </svg>
  );
}
