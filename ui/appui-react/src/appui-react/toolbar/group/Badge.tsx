/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Toolbar
 */

import "./Badge.scss";
import * as React from "react";
import { BadgeUtilities } from "@itwin/core-react";
import type { ToolbarItem } from "../ToolbarItem";

/** @internal */
export function Badge({ badge }: Pick<ToolbarItem, "badge">) {
  const badgeRenderer = BadgeUtilities.getComponentForBadgeType(badge);
  return <div className="uifw-toolbar-group-badge">{badgeRenderer}</div>;
}
