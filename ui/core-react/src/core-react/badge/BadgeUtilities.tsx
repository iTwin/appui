/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import { BadgeType as _BadgeType } from "@itwin/appui-abstract";
import { BetaBadge } from "./BetaBadge";
import { NewBadge } from "./NewBadge";

/** Specifies type of badge, if any, that should be overlaid on UI component.
 * @public
 */
export type BadgeType = _BadgeType; // eslint-disable-line deprecation/deprecation
export const BadgeType = _BadgeType; // eslint-disable-line @typescript-eslint/no-redeclare, deprecation/deprecation
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
