/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import type { SafeAreaInsets as LayoutSafeAreaInsets } from "../layout/base/SafeAreaInsets";
import type { SafeAreaInsets } from "./SafeAreaInsets";

/** @internal */
export function toLayoutSafeAreaInsets(
  safeAreaInsets: SafeAreaInsets | undefined
): LayoutSafeAreaInsets | undefined {
  return safeAreaInsets as LayoutSafeAreaInsets | undefined;
}
