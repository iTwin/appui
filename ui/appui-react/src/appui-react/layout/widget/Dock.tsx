/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { SvgDockTop } from "@itwin/itwinui-icons-react";
import { NineZoneDispatchContext, useLabel } from "../base/NineZone.js";
import { ActionButton } from "../../preview/widget-action-dropdown/Button.js";
import { useIsToolSettingsTab } from "./useIsToolSettingsTab.js";
import { useIsMaximizedWidget } from "../../preview/enable-maximized-widget/useMaximizedWidget.js";

/** @internal */
export function Dock() {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const label = useLabel("dockToolSettingsTitle");
  return (
    <ActionButton
      icon={<SvgDockTop />}
      label={label}
      onClick={() => {
        dispatch({
          type: "TOOL_SETTINGS_DOCK",
        });
      }}
    />
  );
}

/** @internal */
export function useDock() {
  const isToolSettings = useIsToolSettingsTab();
  const isMaximizedWidget = useIsMaximizedWidget();
  return isToolSettings && !isMaximizedWidget;
}
