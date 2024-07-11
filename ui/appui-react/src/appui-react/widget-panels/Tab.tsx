/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { Badge, BadgeType, Icon } from "@itwin/core-react";
import * as React from "react";
import { WidgetTab } from "../layout/widget/Tab";
import { useWidgetDef } from "./Content";
import "./Tab.scss";

/** @internal */
export function WidgetPanelsTab() {
  const widgetDef = useWidgetDef();
  const badgeType = widgetDef?.badgeType;
  const badgeClassName = getBadgeClassName(badgeType);
  // eslint-disable-next-line deprecation/deprecation
  const iconSpec = widgetDef?.initialConfig?.icon;
  const icon =
    widgetDef?.initialConfig?.iconNode ??
    (iconSpec ? (
      // eslint-disable-next-line deprecation/deprecation
      <Icon iconSpec={iconSpec} />
    ) : undefined);
  return (
    <WidgetTab
      className={badgeClassName}
      badge={<Badge type={badgeType} />}
      icon={icon}
    />
  );
}

/** @internal */
export function getBadgeClassName(badgeType: BadgeType | undefined) {
  if (badgeType === BadgeType.New) return "uifw-badge-new";
  else if (badgeType === BadgeType.TechnicalPreview) return "uifw-badge-tp";
  return undefined;
}
