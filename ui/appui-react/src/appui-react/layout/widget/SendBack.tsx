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
import { NineZoneDispatchContext, useLabel } from "../base/NineZone";
import { useLayout } from "../base/LayoutStore";
import { useFloatingWidgetId } from "./FloatingWidget";
import type { WidgetState } from "../state/WidgetState";
import { getWidgetPanelSectionId } from "../state/PanelState";
import type { NineZoneState } from "../state/NineZoneState";
import { Button } from "@itwin/itwinui-react";
import {
  SvgDockBottom,
  SvgDockLeft,
  SvgDockRight,
  SvgDockTop,
} from "@itwin/itwinui-icons-react";
import type { PanelWidgetRestoreState } from "../state/WidgetRestoreState";

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

function getHomeIcon(home: PanelWidgetRestoreState) {
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
  const home = useLayout((state) => state.floatingWidgets.byId[id].home);
  const homeIcon = getHomeIcon(home);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const title = useLabel("sendWidgetHomeTitle");
  const setActiveWidgetId = (newId: WidgetState["id"] | undefined) =>
    useActiveSendBackWidgetIdStore.setState(newId);

  return (
    <Button
      className="nz-widget-sendBack"
      styleType="borderless"
      size="small"
      onClick={() => {
        setActiveWidgetId(undefined);
        dispatch({
          type: "FLOATING_WIDGET_SEND_BACK",
          id,
        });
      }}
      onMouseOver={() => {
        setActiveWidgetId(id);
      }}
      onFocus={
        // istanbul ignore next
        () => {
          setActiveWidgetId(id);
        }
      }
      onMouseOut={() => {
        setActiveWidgetId(undefined);
      }}
      onBlur={
        // istanbul ignore next
        () => {
          setActiveWidgetId(undefined);
        }
      }
      title={title}
    >
      {homeIcon}
    </Button>
  );
}
