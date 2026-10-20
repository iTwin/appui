/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import type { StrataKitSymbol } from "../PreviewFeatures.js";
import type { enable } from "../../../useStrataKit.js";

type UseStrataKit = ReturnType<typeof enable>;
type UseStrataKitModules = UseStrataKit[typeof StrataKitSymbol]["modules"];

/** @internal */
export type StrataKitIconModules = Omit<UseStrataKitModules, "@stratakit/mui">;
