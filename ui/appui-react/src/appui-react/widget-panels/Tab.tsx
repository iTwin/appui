/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { BadgeType } from "@itwin/appui-abstract";
import { BadgeUtilities } from "@itwin/core-react";
import * as React from "react";
import { WidgetTab } from "../layout/widget/Tab";
import { useWidgetDef } from "./Content";
import "./Tab.scss";

/** @internal */
export function WidgetPanelsTab() {
  const widgetDef = useWidgetDef();
  const badgeType = widgetDef?.badgeType;
  const badgeClassName = getBadgeClassName(badgeType);
  const badge = React.useMemo(
    () => BadgeUtilities.getComponentForBadgeType(badgeType),
    [badgeType]
  );
  return <WidgetTab className={badgeClassName} badge={badge} />;
}

/** @internal */
export function getBadgeClassName(badgeType: BadgeType | undefined) {
  if (badgeType === BadgeType.New) return "uifw-badge-new";
  else if (badgeType === BadgeType.TechnicalPreview) return "uifw-badge-tp";
  return undefined;
}
