/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import type { FrontstageConfig } from "./FrontstageConfig";

/** Provides a definition required to create a Frontstage.
 * @public
 */
export abstract class FrontstageProvider {
  /** Get the FrontstageProvider id. */
  public abstract get id(): string;
  /** Return the frontstage configuration. */
  public abstract frontstageConfig(): FrontstageConfig;
}
