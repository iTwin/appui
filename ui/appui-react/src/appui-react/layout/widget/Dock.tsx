/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { SvgDockTop } from "@itwin/itwinui-icons-react";
import { NineZoneDispatchContext } from "../base/NineZone.js";
import { WidgetAction } from "./WidgetAction.js";
import { useIsToolSettingsTab } from "./useIsToolSettingsTab.js";
import { useIsMaximizedWidget } from "../../preview/enable-maximized-widget/useMaximizedWidget.js";
import { useTranslation } from "../../hooks/useTranslation.js";

/** @internal */
export function Dock() {
  const dispatch = React.useContext(NineZoneDispatchContext);
  const { translate } = useTranslation();
  const label = translate("widget.tooltips.dockToolSettings");
  return (
    <WidgetAction
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
