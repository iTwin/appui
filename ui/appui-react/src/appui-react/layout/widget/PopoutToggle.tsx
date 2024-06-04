/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { SvgWindowPopout } from "@itwin/itwinui-icons-react";
import { NineZoneDispatchContext, useLabel } from "../base/NineZone";
import { useActiveTabId } from "./Widget";
import { useLayout } from "../base/LayoutStore";
import { ActionButton } from "../../preview/widget-action-dropdown/Button";

/** @internal */
export function PopoutToggle() {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const activeTabId = useActiveTabId();
  const label = useLabel("popoutActiveTab");

  return (
    <ActionButton
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
