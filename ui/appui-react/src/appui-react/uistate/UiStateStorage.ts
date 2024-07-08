/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiStateStorage
 */

import type {
  UiStateStorage as _UiStateStorage,
  UiStateStorageResult as _UiStateStorageResult,
} from "@itwin/core-react";
import { UiStateStorageStatus as _UiStateStorageStatus } from "@itwin/core-react";

/** Interface for getting, saving and deleting settings.
 * @public
 */
export type UiStateStorage = _UiStateStorage;

/**
 * Enum for {@link UiStateStorage} status.
 * @public
 */
export type UiStateStorageStatus = _UiStateStorageStatus;
/** @public */
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UiStateStorageStatus = _UiStateStorageStatus;

/**
 * Interface for result of accessing UI state setting in {@link UiStateStorage}.
 * @public
 */
export type UiStateStorageResult = _UiStateStorageResult;
