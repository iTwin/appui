/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { SvgDockTop } from "@itwin/itwinui-icons-react";
import { NineZoneDispatchContext, useLabel } from "../base/NineZone";
import { ActionButton } from "../../preview/widget-action-dropdown/Button";
import { useIsToolSettingsTab } from "./useIsToolSettingsTab";
import { useIsMaximizedWidget } from "../../preview/enable-maximized-widget/useMaximizedWidget";

/** @internal */
export function Dock() {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const title = useLabel("dockToolSettingsTitle");
  return (
    <ActionButton
      icon={<SvgDockTop />}
      title={title}
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
  const maximizedWidget = useIsMaximizedWidget();
  return isToolSettings && !maximizedWidget;
}
