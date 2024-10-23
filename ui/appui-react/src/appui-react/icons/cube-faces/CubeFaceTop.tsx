/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";

/** @internal */
export function CubeFaceTop() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <polygon
        points="0.63 2.5 5.71 5.5 15.5 3.42 10.58 0.29 0.63 2.5"
        opacity="0.33"
        style={{ isolation: "isolate" }}
      />
      <path d="M11,0H10L0,2V13l5,3H6l10-2V3Zm4,12.62-4-2.19V5l4-.8Zm-.49-9.35L11,4V1.17ZM10,1V4.19L6,5,1.69,2.68Zm0,4.2V10l-4,.8V6ZM5,5.56V11l-4,.8V3.37ZM1.49,12.73,5,12v2.82ZM6,11.81,10,11l4.32,2.32L6,15Z" />
    </svg>
  );
}
