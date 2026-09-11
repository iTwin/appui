/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { Badge } from "@itwin/core-react/internal";
import { WidgetTab } from "../layout/widget/Tab.js";
import { useWidgetDef } from "./Content.js";
import { StrataKitIcon } from "../preview/use-stratakit/StrataKitIcon.js";

/** @internal */
export function WidgetPanelsTab() {
  const widgetDef = useWidgetDef();
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const iconSpec = widgetDef?.initialConfig?.icon;
  const iconSpecIcon = iconSpec ? (
    <StrataKitIcon iconSpec={iconSpec} />
  ) : undefined;
  const icon = widgetDef?.initialConfig?.iconNode ?? iconSpecIcon;
  const iconElement = icon ? (
    React.isValidElement(icon) ? (
      icon
    ) : (
      <>{icon}</>
    )
  ) : undefined;
  return (
    <WidgetTab
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      badge={<Badge type={widgetDef?.badgeKind || widgetDef?.badgeType} />}
      icon={iconElement}
    />
  );
}
