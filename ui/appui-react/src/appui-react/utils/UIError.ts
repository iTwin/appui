/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { GetMetaDataFunction } from "@itwin/core-bentley";
import { BentleyError, BentleyStatus } from "@itwin/core-bentley";

/** iTwin.js UI UiError class is a subclass of BentleyError, extended with a category. Errors are logged.
 * @public
 */
export class UiError extends BentleyError {
  public constructor(public category: string, message: string, errorNumber: number = BentleyStatus.ERROR, getMetaData?: GetMetaDataFunction) {
    super(errorNumber, message, getMetaData);
  }
}
