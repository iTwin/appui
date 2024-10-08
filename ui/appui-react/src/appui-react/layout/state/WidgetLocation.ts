/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type { PanelSide } from "../widget-panels/PanelTypes.js";
import { panelSides } from "../widget-panels/Panel.js";
import type { NineZoneState } from "./NineZoneState.js";
import type {
  FloatingWidgetState,
  PopoutWidgetState,
  WidgetState,
} from "./WidgetState.js";

/** @internal */
export interface PanelWidgetLocation {
  side: PanelSide;
  index: number;
}

/** @internal */
export interface FloatingWidgetLocation {
  floatingWidgetId: FloatingWidgetState["id"];
}

/** @internal */
export interface PopoutWidgetLocation {
  popoutWidgetId: PopoutWidgetState["id"];
}

/** @internal */
export type WidgetLocation =
  | PanelWidgetLocation
  | FloatingWidgetLocation
  | PopoutWidgetLocation;

/** @internal */
export function isFloatingWidgetLocation(
  location: WidgetLocation
): location is FloatingWidgetLocation {
  return "floatingWidgetId" in location;
}

/** @internal */
export function isPopoutWidgetLocation(
  location: WidgetLocation
): location is PopoutWidgetLocation {
  return "popoutWidgetId" in location;
}

/** @internal */
export function isPanelWidgetLocation(
  location: WidgetLocation
): location is PanelWidgetLocation {
  return "side" in location;
}

/** Returns a widget location or `undefined` if widget is not found.
 * @internal
 */
export function getWidgetLocation(
  state: NineZoneState,
  id: WidgetState["id"]
): WidgetLocation | undefined {
  if (id in state.floatingWidgets.byId) {
    return {
      floatingWidgetId: id,
    };
  }
  if (state.popoutWidgets) {
    if (id in state.popoutWidgets.byId) {
      return {
        popoutWidgetId: id,
      };
    }
  }
  for (const side of panelSides) {
    const panel = state.panels[side];
    const index = panel.widgets.indexOf(id);
    if (index >= 0) {
      return {
        side,
        index,
      };
    }
  }
  return undefined;
}
