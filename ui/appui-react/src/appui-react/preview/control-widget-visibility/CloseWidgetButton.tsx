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
export function useCloseTab() {
  const id = useActiveTabId();
  const { controlWidgetVisibility } = usePreviewFeatures();
  if (Array.isArray(controlWidgetVisibility)) {
    return controlWidgetVisibility.includes(id);
  }
  return !!controlWidgetVisibility;
}
