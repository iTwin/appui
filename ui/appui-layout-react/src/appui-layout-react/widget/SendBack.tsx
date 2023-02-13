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
import create from "zustand";
import { assert } from "@itwin/core-bentley";
import { NineZoneDispatchContext, useLabel } from "../base/NineZone";
import { useLayout } from "../base/LayoutStore";
import { useFloatingWidgetId } from "./FloatingWidget";
import { WidgetState } from "../state/WidgetState";;
import { getWidgetState } from "../state/internal/WidgetStateHelpers";
import { getWidgetPanelSectionId } from "../state/PanelState";
import { PanelSide } from "../widget-panels/Panel";

/** @internal */
interface ActiveSendBackWidgetIdStore {
  id: WidgetState["id"] | undefined;
}

/** @internal */
export const useActiveSendBackWidgetIdStore = create<ActiveSendBackWidgetIdStore>(() => ({ id: undefined }));

/** @internal */
interface SendBackHomeState {
  side: PanelSide;
  widgetId?: WidgetState["id"];
  sectionIndex?: 0 | 1;
}

/** @internal */
export function useSendBackHomeState(): SendBackHomeState | undefined {
  const widgetId = useActiveSendBackWidgetIdStore((state) => state.id);
  return useLayout((state) => {
    if (!widgetId)
      return undefined;

    const floatingWidget = state.floatingWidgets.byId[widgetId];
    const widget = getWidgetState(state, widgetId);
    const home = floatingWidget.home;
    const panel = state.panels[home.side];
    const destinationWidgetId = home.widgetId ?? getWidgetPanelSectionId(panel.side, home.widgetIndex);

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
    if (panel.widgets.length === 0)
      return {
        side: home.side,
      };

    // Widget would be added to a panel with an existing panel widget as a separate panel widget.
    return {
      side: home.side,
      sectionIndex: destinationWidgetId.endsWith("End") ? 1 : 0,
    };
  });
}

/** @internal */
export function SendBack() {
  const id = useFloatingWidgetId();
  assert(!!id);
  const home = useLayout((state) => state.floatingWidgets.byId[id].home);
  const dispatch = React.useContext(NineZoneDispatchContext);
  const title = useLabel("sendWidgetHomeTitle");
  const className = classnames(
    "nz-widget-sendBack",
    `nz-${home.side}`,
  );
  const setActiveWidgetId = (newId: WidgetState["id"] | undefined) => useActiveSendBackWidgetIdStore.setState({ id: newId });

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
      onMouseOut={() => {
        setActiveWidgetId(undefined);
      }}
      title={title}
    >
      <i />
    </button >
  );
}
