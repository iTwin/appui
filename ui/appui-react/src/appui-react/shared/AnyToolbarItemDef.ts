/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Item
 */

import type { AnyItemDef } from "./AnyItemDef.js";
import type { CustomItemDef } from "./CustomItemDef.js";

/** Union of all Item definitions that can be specified in a Toolbar
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export type AnyToolbarItemDef = AnyItemDef | CustomItemDef;
