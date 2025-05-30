/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import * as React from "react";
import { create } from "zustand";
import { assert } from "@itwin/core-bentley";
import {
  SvgDockBottom,
  SvgDockLeft,
  SvgDockRight,
  SvgDockTop,
} from "@itwin/itwinui-icons-react";
import { NineZoneDispatchContext } from "../base/NineZone.js";
import { useLayout } from "../base/LayoutStore.js";
import {
  useFloatingWidgetId,
  useWidgetAllowedToDock,
} from "./FloatingWidget.js";
import type { WidgetState } from "../state/WidgetState.js";
import { getWidgetPanelSectionId } from "../state/PanelState.js";
import type { NineZoneState } from "../state/NineZoneState.js";
import { useIsToolSettingsTab } from "./useIsToolSettingsTab.js";
import { WidgetAction } from "./WidgetAction.js";
import { useIsMaximizedWidget } from "../../preview/enable-maximized-widget/useMaximizedWidget.js";
import { useTranslation } from "../../hooks/useTranslation.js";

/** @internal */
export const useActiveSendBackWidgetIdStore = create<
  WidgetState["id"] | undefined
>(() => undefined);

/** @internal */
export function getSendBackHomeState(
  state: NineZoneState,
  widgetId: WidgetState["id"]
) {
  const floatingWidget = state.floatingWidgets.byId[widgetId];
  const home = floatingWidget.home;
  const panel = state.panels[home.side];
  const destinationWidgetId = home.widgetId
    ? home.widgetId
    : getWidgetPanelSectionId(panel.side, home.widgetIndex);

  let destinationWidget = state.widgets[destinationWidgetId];

  if (!destinationWidget && panel.widgets.length === panel.maxWidgetCount) {
    const id = panel.widgets[home.widgetIndex];
    destinationWidget = state.widgets[id];
  }

  // Widget would be added to an existing panel widget.
  if (destinationWidget) {
    return {
      side: home.side,
      widgetId: destinationWidget.id,
    };
  }

  // Widget would be added to a panel as it's first panel widget.
  if (panel.widgets.length === 0) {
    return {
      side: home.side,
    };
  }

  // Widget would be added to a panel with an existing panel widget as a separate panel widget.
  return {
    side: home.side,
    sectionIndex: destinationWidgetId.endsWith("End") ? 1 : 0,
  };
}

/** @internal */
export function useSendBackHomeState() {
  const widgetId = useActiveSendBackWidgetIdStore((state) => state);
  return useLayout((state) =>
    widgetId ? getSendBackHomeState(state, widgetId) : undefined
  );
}

function Icon() {
  const id = useFloatingWidgetId();
  assert(!!id);
  const home = useLayout((state) => state.floatingWidgets.byId[id].home);
  return home.side === "left" ? (
    <SvgDockLeft />
  ) : home.side === "right" ? (
    <SvgDockRight />
  ) : home.side === "top" ? (
    <SvgDockTop />
  ) : (
    <SvgDockBottom />
  );
}

/** @internal */
export function SendBack() {
  const id = useFloatingWidgetId();
  assert(!!id);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const { translate } = useTranslation();
  const label = translate("widget.tooltips.sendHome");
  const setActiveWidgetId = (newId: WidgetState["id"] | undefined) =>
    useActiveSendBackWidgetIdStore.setState(newId);

  const onClick = () => {
    setActiveWidgetId(undefined);
    dispatch({
      type: "FLOATING_WIDGET_SEND_BACK",
      id,
    });
  };
  const onMouseOver = () => {
    setActiveWidgetId(id);
  };
  const onFocus = () => {
    setActiveWidgetId(id);
  };
  const onMouseOut = () => {
    setActiveWidgetId(undefined);
  };
  const onBlur = () => {
    setActiveWidgetId(undefined);
  };
  const eventHandlers = { onMouseOver, onFocus, onMouseOut, onBlur };
  return (
    <WidgetAction
      icon={<Icon />}
      label={label}
      onClick={onClick}
      {...eventHandlers}
    />
  );
}

/** @internal */
export function useSendBack() {
  const maximizedWidget = useIsMaximizedWidget();
  const isToolSettings = useIsToolSettingsTab();
  const isFloatingWidget = !!useFloatingWidgetId();
  const canBeDocked = useWidgetAllowedToDock();

  return !maximizedWidget && isFloatingWidget && !isToolSettings && canBeDocked;
}
