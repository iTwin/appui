/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { Badge } from "@itwin/core-react";
import * as React from "react";
import { WidgetTab } from "../layout/widget/Tab";
import { useWidgetDef } from "./Content";

/** @internal */
export function WidgetPanelsTab() {
  const widgetDef = useWidgetDef();
  return (
    <WidgetTab
      // eslint-disable-next-line deprecation/deprecation
      badge={<Badge type={widgetDef?.badgeKind || widgetDef?.badgeType} />}
    />
  );
}
