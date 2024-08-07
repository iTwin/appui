/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import "./TechnicalPreviewBadge.scss";
import * as React from "react";
import { Icon } from "@itwin/itwinui-react";

/** Technical preview badge component.
 * @internal
 */
export function TechnicalPreviewBadge() {
  return (
    <Icon className="core-badge-technicalPreviewBadge">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 16 16"
      >
        <defs>
          <linearGradient
            id="technical-preview-fill"
            x1="8"
            y1="15"
            x2="8"
            y2="1"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffc335" />
            <stop offset="1" stopColor="#ffdf52" />
          </linearGradient>
        </defs>
        <path d="M15,1V15L1,1H15" fill="url(#technical-preview-fill)" />
        <path
          d="M15,1V15L1,1H15m0-1H1A.87458.87458,0,0,0,.1.6.91284.91284,0,0,0,.3,1.7l14,14a.90783.90783,0,0,0,.7.3.60123.60123,0,0,0,.4-.1A.961.961,0,0,0,16,15V1A.94477.94477,0,0,0,15,0Z"
          fill="#ffc000"
        />
        <circle
          cx="11"
          cy="5"
          r="2"
          opacity="0.9"
          style={{ isolation: "isolate" }}
        />
      </svg>
    </Icon>
  );
}
