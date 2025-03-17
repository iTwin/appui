/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { assert } from "@itwin/core-bentley";
import { SvgPin, SvgPinHollow } from "@itwin/itwinui-icons-react";
import { NineZoneDispatchContext } from "../base/NineZone.js";
import { PanelSideContext } from "../widget-panels/Panel.js";
import { useLayout } from "../base/LayoutStore.js";
import { WidgetAction } from "./WidgetAction.js";
import { useMainPanelWidgetId } from "./usePanelWidgetId.js";
import { useIsMaximizedWidget } from "../../preview/enable-maximized-widget/useMaximizedWidget.js";
import { useTranslation } from "../../hooks/useTranslation.js";

/** @internal */
export function PinToggle() {
  const side = React.useContext(PanelSideContext);
  assert(!!side);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const { translate } = useTranslation();
  const pinLabel = translate("widget.tooltips.pinPanel");
  const unpinLabel = translate("widget.tooltips.unpinPanel");
  const pinned = useLayout((state) => state.panels[side].pinned);

  return (
    <WidgetAction
      icon={pinned ? <SvgPin /> : <SvgPinHollow />}
      label={pinned ? unpinLabel : pinLabel}
      onClick={() => {
        dispatch({
          side,
          type: "PANEL_TOGGLE_PINNED",
        });
      }}
    />
  );
}

/** @internal */
export function usePinToggle() {
  const isMainPanelWidget = !!useMainPanelWidgetId();
  const isMaximizedWidget = useIsMaximizedWidget();
  return isMainPanelWidget && !isMaximizedWidget;
}
