/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { SvgCloseSmall } from "@itwin/itwinui-icons-react";
import { WidgetAction } from "../../layout/widget/WidgetAction.js";
import { usePreviewFeatures } from "../PreviewFeatures.js";
import { useActiveTabId } from "../../layout/widget/Widget.js";
import { NineZoneDispatchContext } from "../../layout/base/NineZone.js";
import type { TabState } from "../../layout/state/TabState.js";

/** @internal */
export function CloseWidgetButton() {
  const id = useActiveTabId();
  const dispatch = React.useContext(NineZoneDispatchContext);

  return (
    <WidgetAction
      icon={<SvgCloseSmall />}
      label="Close widget"
      onClick={() => {
        dispatch({
          type: "WIDGET_TAB_HIDE",
          id,
        });
      }}
    />
  );
}

/** @internal */
export function useControlWidgetVisibility(id: TabState["id"]) {
  const { controlWidgetVisibility } = usePreviewFeatures();
  if (Array.isArray(controlWidgetVisibility)) {
    return controlWidgetVisibility.includes(id);
  }
  return !!controlWidgetVisibility;
}

/** @internal */
export function useCloseTab() {
  const id = useActiveTabId();
  const controlWidgetVisibility = useControlWidgetVisibility(id);
  const { widgetTabActions } = usePreviewFeatures();
  // Close tab button is displayed for each individual tab.
  if (widgetTabActions) return false;
  return controlWidgetVisibility;
}
