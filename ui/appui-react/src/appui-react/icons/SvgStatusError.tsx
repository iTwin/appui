/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon } from "@stratakit/foundations";

/**
 * Error SVG Icon component from stratakit.
 */
export default function SvgStatusError() {
  const info = new URL("@stratakit/icons/status-error.svg", import.meta.url)
    .href;
  return <Icon href={info} size="large" fill="negative" />;
}
