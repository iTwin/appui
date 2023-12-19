/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import "./SendBack.scss";
import classnames from "classnames";
import * as React from "react";
import { create } from "zustand";
import { assert } from "@itwin/core-bentley";
import { NineZoneDispatchContext, useLabel } from "../base/NineZone";
import { useLayout } from "../base/LayoutStore";
import { useFloatingWidgetId } from "./FloatingWidget";
import type { WidgetState } from "../state/WidgetState";
import { getWidgetPanelSectionId } from "../state/PanelState";
import type { NineZoneState } from "../state/NineZoneState";

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

/** @internal */
export function SendBack() {
  const id = useFloatingWidgetId();
  assert(!!id);
  const home = useLayout((state) => state.floatingWidgets.byId[id].home);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const title = useLabel("sendWidgetHomeTitle");
  const className = classnames("nz-widget-sendBack", `nz-${home.side}`);
  const setActiveWidgetId = (newId: WidgetState["id"] | undefined) =>
    useActiveSendBackWidgetIdStore.setState(newId);

  return (
    <button
      className={className}
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
      <i />
    </button>
  );
}
