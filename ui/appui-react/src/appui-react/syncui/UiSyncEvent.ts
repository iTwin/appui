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
 * @deprecated in 4.13.x. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface UiSyncEventArgs {
  eventIds: Set<string>;
}

/** UiSync Event class.
 * @public
 * @deprecated in 4.13.x. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class UiSyncEvent extends BeUiEvent<UiSyncEventArgs> {}
