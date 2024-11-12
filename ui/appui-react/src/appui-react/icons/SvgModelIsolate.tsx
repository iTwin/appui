/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";

/** @internal */
export function SvgModelIsolate() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 1.18v6.94l-.5-.25-.5.25-4.48 2.2-.04.02L1 10.1v-.51l5-2.46V1.18l.5-.21z"
        opacity=".33"
      />
      <path d="M8 12.571h3.429V16H8zM8 8v3.429h3.429V8zm2.857 2.857H8.571V8.571h2.286zM12.571 8v3.429H16V8zm2.858 2.857h-2.286V8.571h2.286zm-2.858 1.714V16H16v-3.429zm2.858 2.858h-2.286v-2.286h2.286zM6.5 0 0 3.2v7.47l6.5 3.2.5-.25V6.85l5-2.46V7h1V3.2zM6 12.52l-4.48-2.2-.52-.26V4.39l5 2.46zm1-6.74-.5.25-.5-.25L1.36 3.5 6 1.22l.5-.25.5.25 4.64 2.28z" />
    </svg>
  );
}
