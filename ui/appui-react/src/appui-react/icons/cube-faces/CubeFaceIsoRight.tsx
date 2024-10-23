/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";

/** @internal */
export function CubeFaceIsoRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <polygon
        points="12.165 1.176 11.224 4.52 15.709 9.366 12.165 1.176"
        opacity="0.33"
        style={{ isolation: "isolate" }}
      />
      <path d="M13.0522,1.2313,11,0H10L0,2V13l5,3H6l10-2V8.0429ZM12.223,1.9l.0391.0235L15,8.25,11.5,4.4689Zm-.8887-.5333L11,2.5542V1.1662ZM5,14.8338,1.49,12.7275,5,12.015Zm0-3.829-4,.8039V3.3711L5,5.5625ZM1.6862,2.6826,10,1.02V4.188L6,5ZM10,5.1961V10l-4,.8038V6ZM6,14.98V11.812L10,11l4.3217,2.3159Zm5-4.5427V5.4007l4,4.3214v2.9016Z" />
    </svg>
  );
}