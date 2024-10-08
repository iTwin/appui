/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import { useLayout } from "../base/LayoutStore.js";
import { useActiveTabId } from "./Widget.js";

/** @internal */
export function useIsToolSettingsTab() {
  const activeTabId = useActiveTabId();
  const toolSettingsTabId = useLayout((state) => state.toolSettings?.tabId);
  return activeTabId === toolSettingsTabId;
}
