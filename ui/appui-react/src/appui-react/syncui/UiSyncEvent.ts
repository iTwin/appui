/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module SyncUi
 */

import { UiEvent } from "@itwin/appui-abstract";

/** UiSync Event arguments. Contains a set of lower case event Ids.
 * @public
 */
export interface UiSyncEventArgs {
  eventIds: Set<string>;
}

/** UiSync Event class.
 * @public
 */
export class UiSyncEvent extends UiEvent<UiSyncEventArgs> { }
