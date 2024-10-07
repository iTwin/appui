/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import { IModelApp } from "@itwin/core-frontend";
import { UiFramework } from "../UiFramework.js";

/** A helper function used to get the active viewport in conditional definitions.
 * Uses the deprecated active content control APIs to get the active viewport or the selected view of the view manager as a fallback.
 * @note Might need a better strategy for a use case where selected view fallback behavior is not desired (i.e. a map of active content id to a viewport).
 * @internal
 */
export function getActiveViewport() {
  // eslint-disable-next-line deprecation/deprecation
  const activeContentControl = UiFramework.content.getActiveContentControl();
  return activeContentControl
    ? activeContentControl.viewport
    : IModelApp.viewManager.selectedView;
}
