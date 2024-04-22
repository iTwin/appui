/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module SyncUi
 */

import { BeUiEvent } from "@itwin/core-bentley";

/** UiSync Event arguments. Contains a set of lower case event Ids.
 * @public
 */
export interface UiSyncEventArgs {
  eventIds: Set<string>;
}

/** UiSync Event class.
 * @public
 * @deprecated in 4.13.x. Use `BeUiEvent<UiSyncEventArgs>` instead.
 */
export class UiSyncEvent extends BeUiEvent<UiSyncEventArgs> {}
