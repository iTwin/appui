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
import { NineZoneDispatchContext, useLabel } from "../base/NineZone.js";
import { PanelSideContext } from "../widget-panels/Panel.js";
import { useLayout } from "../base/LayoutStore.js";
import { ActionButton } from "../../preview/widget-action-dropdown/Button.js";
import { useMainPanelWidgetId } from "./usePanelWidgetId.js";
import { useIsMaximizedWidget } from "../../preview/enable-maximized-widget/useMaximizedWidget.js";

/** @internal */
export function PinToggle() {
  const side = React.useContext(PanelSideContext);
  assert(!!side);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const pinLabel = useLabel("pinPanelTitle");
  const unpinLabel = useLabel("unpinPanelTitle");
  const pinned = useLayout((state) => state.panels[side].pinned);

  return (
    <ActionButton
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
