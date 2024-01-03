/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import {
  getTabLocation,
  isFloatingTabLocation,
  isPanelTabLocation,
  isPopoutTabLocation,
  TabIdContext,
} from "@itwin/appui-layout-react";
import { assert } from "@itwin/core-bentley";
import type { FrontstageDef } from "../frontstage/FrontstageDef";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager";
import type { WidgetState } from "./WidgetState";
import { useWidgetDef } from "../widget-panels/Content";

/** Hook that returns information about the Widget in the current context.
 * @returns ThisWidget interface that contains the WidgetLocation, WidgetState, and
 * the ability to set the state of the widget.
 * @alpha
 */
export function useWidget() {
  const tabId = React.useContext(TabIdContext);
  assert(!!tabId);

  const frontstage = useActiveFrontstageDef();

  assert(!!frontstage);

  const widgetDef = useWidgetDef();

  assert(!!widgetDef);

  const [widgetLocation, setWidgetLocation] = React.useState<
    "docked" | "floating" | "popout"
  >(findLocation(tabId, frontstage));

  const [state, setState] = React.useState(widgetDef.state);

  React.useEffect(() => {
    return InternalFrontstageManager.onFrontstageNineZoneStateChangedEvent.addListener(
      () => {
        if (widgetDef) return setState(widgetDef.state);
      }
    );
  }, [frontstage, widgetDef]);

  React.useEffect(() => {
    return InternalFrontstageManager.onFrontstageNineZoneStateChangedEvent.addListener(
      () => {
        setWidgetLocation(findLocation(tabId, frontstage));
      }
    );
  }, [frontstage, tabId]);

  const setWidgetState = React.useCallback(
    (widgetState: Omit<WidgetState, WidgetState.Floating>) => {
      widgetDef?.setWidgetState(widgetState as WidgetState);
    },
    [widgetDef]
  );

  return {
    /** State of the Widget */
    state,
    /** Where the widget is located ("docked" | "popout" | "floating"). */
    widgetLocation,
    /** Set widget to different state
     * @param WidgetState that you want to set the widget to.
     */
    setState: setWidgetState,
  };
}

function findLocation(locationTabId: string, frontstage: FrontstageDef) {
  assert(!!frontstage.nineZoneState);
  const tabLocation = getTabLocation(frontstage.nineZoneState, locationTabId);
  assert(!!tabLocation);

  if (tabLocation) {
    if (isFloatingTabLocation(tabLocation)) {
      return "floating";
    }

    if (isPopoutTabLocation(tabLocation)) {
      return "popout";
    }

    if (isPanelTabLocation(tabLocation)) {
      return "docked";
    }
  }

  return "docked";
}
