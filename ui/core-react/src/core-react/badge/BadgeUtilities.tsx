/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import { BetaBadge } from "./BetaBadge";
import { NewBadge } from "./NewBadge";

/** Specifies type of badge, if any, that should be overlaid on UI component.
 * @internal
 */
export enum BadgeType {
  /** No badge. */
  None = 0,
  /** Standard Technical Preview badge. */
  TechnicalPreview = 1,
  /** Standard New Feature badge. */
  New = 2,
}

/** Converts BadgeType to Badge React component
 * @internal
 */
export class BadgeUtilities {
  /** Converts BetaType to Badge React component */
  public static getComponentForBadgeType(
    badgeType?: BadgeType
  ): React.ReactNode {
    if (badgeType === undefined) return undefined;

    let component: React.ReactNode;

    switch (badgeType) {
      case BadgeType.TechnicalPreview:
        component = <BetaBadge />;
        break;
      case BadgeType.New:
        component = <NewBadge />;
        break;
      case BadgeType.None:
        component = undefined;
        break;
    }

    return component;
  }
}
