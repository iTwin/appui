/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { SvgWindowPopout } from "@itwin/itwinui-icons-react";
import { NineZoneDispatchContext } from "../base/NineZone.js";
import { useActiveTabId } from "./Widget.js";
import { useLayout } from "../base/LayoutStore.js";
import { WidgetAction } from "./WidgetAction.js";
import { useTranslation } from "../../hooks/useTranslation.js";

/** @internal */
export function PopoutToggle() {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const activeTabId = useActiveTabId();
  const { translate } = useTranslation();
  const label = translate("widget.tooltips.popoutActiveTab");

  return (
    <WidgetAction
      icon={<SvgWindowPopout />}
      label={label}
      onClick={() => {
        dispatch({
          id: activeTabId,
          type: "WIDGET_TAB_POPOUT",
        });
      }}
    />
  );
}

/** @internal */
export function usePopoutToggle() {
  const tabId = useActiveTabId();
  return useLayout((state) => {
    const tab = state.tabs[tabId];
    return !!tab.canPopout;
  });
}
