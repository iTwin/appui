/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Table
 */

import { BeEvent } from "@itwin/core-bentley";

/** An event broadcasted on table data changes
 * @public  @deprecated
 */
export class TableDataChangeEvent extends BeEvent<() => void> { }
