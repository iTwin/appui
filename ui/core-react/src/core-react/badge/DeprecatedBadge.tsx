/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import { Icon } from "@itwin/itwinui-react";
import "./DeprecatedBadge.scss";

/** Deprecated badge component.
 * @internal
 */
export function DeprecatedBadge() {
  return (
    <Icon className="core-badge-deprecatedBadge">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        width="1rem"
        height="1rem"
      >
        <defs>
          <linearGradient
            id="deprecated-fill"
            x1="8.00287"
            y1="1.00273"
            x2="8.00287"
            y2="15.00273"
            gradientTransform="translate(0 16.00546) scale(1 -1)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ff1e35" />
            <stop offset="1" stopColor="#ff5352" />
          </linearGradient>
        </defs>
        <path
          d="m15.00287,1.00273v14L1.00287,1.00273h14"
          fill="url(#deprecated-fill)"
          style={{ strokeWidth: 0 }}
        />
        <path
          d="m15.00287,1.00273v14L1.00287,1.00273h14M15.00287.00273H1.00287C.60033-.02901.22839.21895.10287.60273-.08907.97211-.00681,1.42455.30287,1.70273l14,14c.17808.19777.43397.30744.7.3.14095.01486.28262-.02056.4-.1.36588-.14828.60385-.50524.6-.9V1.00273c.03145-.52083-.36527-.96855-.8861-1-.03793-.00229-.07596-.00229-.1139,0Z"
          fill="red"
          style={{ strokeWidth: 0 }}
        />
        <polygon
          points="13.15377 6.20045 12.20059 7.15363 11.00287 5.95591 9.80515 7.15363 8.85197 6.20045 10.04969 5.00273 8.85197 3.80501 9.80515 2.85183 11.00287 4.04955 12.20059 2.85183 13.15377 3.80501 11.95606 5.00273 13.15377 6.20045"
          style={{ strokeWidth: 0 }}
        />
      </svg>
    </Icon>
  );
}
