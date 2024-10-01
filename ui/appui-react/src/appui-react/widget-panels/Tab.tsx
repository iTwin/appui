/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { Badge, Icon } from "@itwin/core-react";
import * as React from "react";
import { WidgetTab } from "../layout/widget/Tab.js";
import { useWidgetDef } from "./Content.js";

/** @internal */
export function WidgetPanelsTab() {
  const widgetDef = useWidgetDef();
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
      // eslint-disable-next-line deprecation/deprecation
      badge={<Badge type={widgetDef?.badgeKind || widgetDef?.badgeType} />}
      icon={icon}
    />
  );
}
