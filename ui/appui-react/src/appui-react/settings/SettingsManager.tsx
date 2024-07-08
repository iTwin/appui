/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Settings
 */

import type {
  SettingsTabEntry as _SettingsTabEntry,
  SettingsTabsProvider as _SettingsTabsProvider,
} from "@itwin/core-react";
import { SettingsManager as _SettingsManager } from "@itwin/core-react";

/** Interface used to populate a tab entry in the SettingContainer control
 * @public
 */
export type SettingsTabEntry = _SettingsTabEntry;

/** Setting Provider interface. Implemented by classes that want to supply settings pages for display in the SettingContainer. The
 * classes that implement this interface need to be registered with the [[SettingsManager]].
 * @public
 */
export type SettingsTabsProvider = _SettingsTabsProvider;

/** Settings Manager class. Hold registration of settings providers and supplies events for the provided settings pages to listen.
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export type SettingsManager = _SettingsManager;
/** @public */
// eslint-disable-next-line @typescript-eslint/no-redeclare, deprecation/deprecation
export const SettingsManager = _SettingsManager;
