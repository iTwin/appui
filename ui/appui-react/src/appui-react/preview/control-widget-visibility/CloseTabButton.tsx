/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { SvgCloseSmall } from "@itwin/itwinui-icons-react";
import { ActionButton } from "../widget-action-dropdown/Button";
import { usePreviewFeatures } from "../PreviewFeatures";
import { useActiveTabId } from "../../layout/widget/Widget";
import { NineZoneDispatchContext } from "../../layout/base/NineZone";

/** @internal */
export function CloseTabButton() {
  const id = useActiveTabId();
  const dispatch = React.useContext(NineZoneDispatchContext);

  return (
    <ActionButton
      icon={<SvgCloseSmall />}
      title="Close tab"
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
