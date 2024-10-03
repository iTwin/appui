/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./Badge.scss";
import * as React from "react";
import { Badge as CoreBadge } from "@itwin/core-react/internal";
import type { ToolbarItem } from "../../toolbar/ToolbarItem.js";

/** @internal */
export function Badge({
  badge, // eslint-disable-line deprecation/deprecation
  badgeKind,
}: Pick<ToolbarItem, "badge" | "badgeKind">) {
  return (
    <div className="uifw-toolbar-group-badge">
      <CoreBadge type={badgeKind || badge} />
    </div>
  );
}
