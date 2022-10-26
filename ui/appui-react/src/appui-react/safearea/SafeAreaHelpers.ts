/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import { SafeAreaInsets as LayoutSafeAreaInsets } from "@itwin/appui-layout-react";
import { SafeAreaInsets } from "./SafeAreaInsets";

/** @internal */
export function toLayoutSafeAreaInsets(safeAreaInsets: SafeAreaInsets | undefined): LayoutSafeAreaInsets | undefined {
  return safeAreaInsets as LayoutSafeAreaInsets | undefined;
}
