/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiProvider
 */

/** Properties of an item provided by UiItemsProvider.
 * @public
 */
export type ProviderItem<T> = T & {
  readonly providerId: string;
};
