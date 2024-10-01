/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { assert } from "@itwin/core-bentley";
import * as React from "react";
import { useLayout } from "../layout/base/LayoutStore.js";
import { getTabLocation } from "../layout/state/TabLocation.js";
import { isHorizontalPanelSide } from "../layout/widget-panels/Panel.js";
import { TabIdContext } from "../layout/widget/ContentRenderer.js";

/** Returns widget direction.
 * I.e. "horizontal" when widget is in bottom/top stage panel.
 * @alpha
 */
export function useWidgetDirection(): "horizontal" | "vertical" {
  const tabId = React.useContext(TabIdContext);
  assert(!!tabId);
  return useLayout((state) => {
    const tabLocation = getTabLocation(state, tabId);
    if (
      tabLocation &&
      "side" in tabLocation &&
      isHorizontalPanelSide(tabLocation.side)
    ) {
      return "horizontal";
    }
    return "vertical";
  });
}
