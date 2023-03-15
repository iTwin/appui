/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Table
 */

import { BeEvent } from "@itwin/core-bentley";

/** An event broadcasted on table data changes
 * @deprecated in 3.5. Use the Table component in @itwin/itwinui-react instead, which does not use this class.
 * @public
 */
export class TableDataChangeEvent extends BeEvent<() => void> { }
