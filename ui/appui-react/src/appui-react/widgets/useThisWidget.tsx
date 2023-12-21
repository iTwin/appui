/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from "react";
import { getTabLocation, TabIdContext } from "@itwin/appui-layout-react";
import { assert } from "@itwin/core-bentley";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef";
import { InternalFrontstageManager } from "../frontstage/InternalFrontstageManager";
import { UiItemsManager } from "../ui-items-provider/UiItemsManager";
import type { WidgetState } from "./WidgetState";

/** Interface to be used with the useThisWidget hook. Holds information
 * about the Widget such as the state and location. Also contains a function to set WidgetState.
 * @alpha
 */
export interface ThisWidget {
  widgetLocation: "docked" | "floating" | "popout";
  setState(state: Exclude<WidgetState, WidgetState.Floating>): void;
  state: WidgetState;
}

/** Hook that returns information about the Widget in the current context.
 * @returns ThisWidget interface that contains the WidgetLocation, WidgetState, and
 * the ability to set the state of the widget.
 * @alpha
 */
export function useThisWidget(): ThisWidget {
  const tabId = React.useContext(TabIdContext);
  assert(!!tabId);

  const frontstage = useActiveFrontstageDef();

  const [widgetDef, setWidgetDef] = React.useState(() =>
    frontstage?.findWidgetDef(tabId)
  );

  assert(!!widgetDef);

  const [widgetLocation, setWidgetLocation] = React.useState<
    "docked" | "floating" | "popout"
  >(findLocation(tabId, true));

  const [state, setState] = React.useState(widgetDef.state);

  function findLocation(locationTabId: string, initial: boolean): any {
    let tabLocation;
    if (frontstage?.nineZoneState)
      tabLocation = getTabLocation(frontstage.nineZoneState, locationTabId);

    if (tabLocation) {
      if ("floatingWidgetId" in tabLocation) {
        if (initial) return "floating";
        return setWidgetLocation("floating");
      }

      if ("popoutWidgetId" in tabLocation) {
        if (initial) return "popout";
        return setWidgetLocation("popout");
      }

      if ("side" in tabLocation) {
        if (initial) return "docked";
        return setWidgetLocation("docked");
      }
    }

    return "docked";
  }

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
        findLocation(tabId, false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frontstage, tabId]);

  React.useEffect(() => {
    return UiItemsManager.onUiProviderRegisteredEvent.addListener(() => {
      setWidgetDef(frontstage?.findWidgetDef(tabId));
    });
  }, [frontstage, tabId]);

  function setWidgetState(
    widgetState: Omit<WidgetState, WidgetState.Floating>
  ) {
    widgetDef?.setWidgetState(widgetState as WidgetState);
  }

  return { state, widgetLocation, setState: setWidgetState };
}
