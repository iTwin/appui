/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import * as React from "react";
import type { SafeAreaInsets } from "./SafeAreaInsets";

/** Context used to manage safe area (feature used by devices with non-rectangular screens).
 *
 * If used, this is expected to wrap [[ConfigurableUiContent]].
 *
 * ```tsx
 *  <SafeAreaContext.Provider value={SafeAreaInsets.All}>
 *    <ConfigurableUiContent />
 *  </SafeAreaContext.Provider>
 * ```
 * @public
 */
export const SafeAreaContext = React.createContext<SafeAreaInsets | undefined>(
  undefined
);
