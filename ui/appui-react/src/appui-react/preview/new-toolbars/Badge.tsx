/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./Badge.scss";
import * as React from "react";
import { Badge as CoreBadge } from "@itwin/core-react";
import type { ToolbarItem } from "../../toolbar/ToolbarItem";

/** @internal */
export function Badge({ badge }: Pick<ToolbarItem, "badge">) {
  return (
    <div className="uifw-toolbar-group-badge">
      <CoreBadge type={badge} />
    </div>
  );
}
