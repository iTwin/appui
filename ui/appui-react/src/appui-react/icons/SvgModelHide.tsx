/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";

/** @internal */
export function SvgModelHide() {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m7 7.13 2.62 1.29a6 6 0 0 0-1.15.42L7 8.12l-.5-.25-.5.25-4.48 2.2-.04.02L1 10.1v-.51l5-2.46V1.18l.5-.21.5.21z"
        opacity=".33"
      />
      <path d="M6.5 0 0 3.2v7.47l6.12 3.01a4.6 4.6 0 0 1-.82-1.5l-3.78-1.86-.52-.26V4.39l5 2.46v4.06A6.6 6.6 0 0 1 7 9.8V6.85l5-2.46v3.87a5 5 0 0 1 .76.12l.24-.24V3.2zM7 5.78l-.5.25-.5-.25L1.36 3.5 6 1.22l.5-.25.5.25 4.64 2.28zm.413 9.37 6.712-6.711.85.85L8.263 16zm.597-1.008.66-.661a3.04 3.04 0 0 1-1.2-1.262 4.5 4.5 0 0 1 3.724-2.102 3 3 0 0 1 .72.06l.782-.781a6 6 0 0 0-1.502-.18 5.31 5.31 0 0 0-4.806 3.003 5.06 5.06 0 0 0 1.622 1.923m6.428-3.845-.66.66a4.3 4.3 0 0 1 1.2 1.262 4.51 4.51 0 0 1-3.724 2.103 5 5 0 0 1-.781-.12l-.781.78a5.35 5.35 0 0 0 3.845-.3A5.43 5.43 0 0 0 16 12.22a5.5 5.5 0 0 0-1.562-1.922" />
    </svg>
  );
}