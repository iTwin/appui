/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiProvider
 */

import type { ProviderItem } from "./ProviderItem.js";

/** @internal */
export function isProviderItem<T extends object>(
  item: T
): item is ProviderItem<T> {
  return "providerId" in item;
}
