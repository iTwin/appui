/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import { BadgeType } from "./BadgeType";
import { TechnicalPreviewBadge } from "./TechnicalPreviewBadge";
import { NewBadge } from "./NewBadge";

/** Properties for the [[Badge]] component.
 * @internal
 */
export interface BadgeProps {
  type?: BadgeType;
}

/** Badge component that renders based on a badge type.
 * @internal
 */
export function Badge({ type }: BadgeProps) {
  if (type === BadgeType.TechnicalPreview) return <TechnicalPreviewBadge />;
  if (type === BadgeType.New) return <NewBadge />;
  return null;
}
