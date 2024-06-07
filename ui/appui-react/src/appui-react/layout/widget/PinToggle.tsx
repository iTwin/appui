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
import { NineZoneDispatchContext, useLabel } from "../base/NineZone";
import { PanelSideContext } from "../widget-panels/Panel";
import { useLayout } from "../base/LayoutStore";
import { ActionButton } from "../../preview/widget-action-dropdown/Button";
import { useMainPanelWidgetId } from "./usePanelWidgetId";
import { useIsMaximizedWidget } from "../../preview/enable-maximized-widget/useMaximizedWidget";

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
