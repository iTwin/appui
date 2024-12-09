/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";

/** @internal */
export function SvgSectionTool() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path d="M3 8h10v8H3Z" style={{ opacity: 0.5 }} />
      <path d="M3 2h10v4H3zm0-2h2v1H3zM0 2h1V1h1V0H0zm15 1h1v2h-1zM3 7h2v1H3zM1 6H0v2h2V7H1zM0 3h1v2H0zm7-3h2v1H7zm4 7h2v1h-2zM7 7h2v1H7zm7-7v1h1v1h1V0zm-3 0h2v1h-2zm4 7h-1v1h2V6h-1z" />
    </svg>
  );
}
