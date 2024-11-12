/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";

/** @internal */
export function SvgCubeFaceRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path opacity=".33" d="M10.5.5v10.04l5 2.88V3.46z" />
      <path d="M11 0h-1L0 2v11l5 3h1l10-2V3Zm4 12.62-4-2.19V5l4-.8Zm-.49-9.35L11 4V1.17ZM10 1v3.19L6 5 1.69 2.68Zm0 4.2V10l-4 .8V6Zm-5 .36V11l-4 .8V3.37Zm-3.51 7.17L5 12v2.82ZM6 11.81l4-.81 4.32 2.32L6 15Z" />
    </svg>
  );
}
