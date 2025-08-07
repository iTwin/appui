/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Hooks
 */

import { useActiveTool } from "./useActiveTool.js";

/** React hook that maintains the active `Tool` id.
 * @public
 */
export function useActiveToolId() {
  const activeTool = useActiveTool();
  return activeTool?.toolId;
}
