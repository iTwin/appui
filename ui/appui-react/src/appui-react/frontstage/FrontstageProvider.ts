/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import { FrontstageProps } from "./Frontstage";

/** Provides a Frontstage.
 * @public
 */
export abstract class FrontstageProvider {
  /** Get the FrontstageProvider id. */
  public abstract get id(): string;
  /** Get the Frontstage definition. */
  public abstract get frontstage(): FrontstageProps;
}
