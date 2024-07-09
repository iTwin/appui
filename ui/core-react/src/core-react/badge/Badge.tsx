/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import type { BadgeKind } from "./BadgeType";
import { BadgeType } from "./BadgeType";
import { TechnicalPreviewBadge } from "./TechnicalPreviewBadge";
import { NewBadge } from "./NewBadge";
import { DeprecatedBadge } from "./DeprecatedBadge";

/* eslint-disable deprecation/deprecation */

/** Properties for the {@link Badge} component.
 * @internal
 */
export interface BadgeProps {
  type?: BadgeType | BadgeKind;
}

/** Badge component that renders based on a badge type.
 * @internal
 */
export function Badge({ type }: BadgeProps) {
  if (type === BadgeType.TechnicalPreview || type === "technical-preview")
    return <TechnicalPreviewBadge />;
  if (type === BadgeType.New || type === "new") return <NewBadge />;
  if (type === "deprecated") return <DeprecatedBadge />;
  return null;
}
