/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Base
 */

import type {
  FloatingWidgetsState,
  PopoutWidgetsState,
  WidgetsState,
} from "./WidgetState.js";
import type { PanelsState } from "./PanelState.js";
import type { ToolSettingsState } from "./ToolSettingsState.js";
import { createPanelsState } from "./internal/PanelStateHelpers.js";
import type { DraggedTabState, TabsState } from "./TabState.js";
import type { SavedTabsState } from "./SavedTabState.js";
import type { SizeProps } from "../../utils/SizeProps.js";

/** @internal */
export interface NineZoneState {
  readonly draggedTab: DraggedTabState | undefined;
  readonly floatingWidgets: FloatingWidgetsState;
  readonly popoutWidgets: PopoutWidgetsState;
  readonly panels: PanelsState;
  readonly tabs: TabsState;
  readonly savedTabs: SavedTabsState;
  readonly toolSettings: ToolSettingsState | undefined;
  readonly widgets: WidgetsState;
  readonly size: SizeProps;
}

/** @internal */
export function createNineZoneState(
  args?: Partial<NineZoneState>
): NineZoneState {
  return {
    draggedTab: undefined,
    floatingWidgets: {
      byId: {},
      allIds: [],
    },
    popoutWidgets: {
      byId: {},
      allIds: [],
    },
    panels: createPanelsState(),
    widgets: {},
    tabs: {},
    savedTabs: {
      allIds: [],
      byId: {},
    },
    toolSettings: undefined,
    size: {
      height: 0,
      width: 0,
    },
    ...args,
  };
}
