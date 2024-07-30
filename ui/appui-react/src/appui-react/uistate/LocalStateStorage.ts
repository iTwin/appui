/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module UiStateStorage
 */

import { LocalStateStorage as _LocalStateStorage } from "@itwin/core-react";
import { UiStateStorage } from "./UiStateStorage";

/**
 * Implementation of {@link UiStateStorage} using `Window.localStorage`.
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export type LocalStateStorage = _LocalStateStorage;
/** @public */
// eslint-disable-next-line @typescript-eslint/no-redeclare, deprecation/deprecation
export const LocalStateStorage = _LocalStateStorage;
