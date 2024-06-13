/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import type { FrontstageConfig } from "./FrontstageConfig";
import type { Frontstage } from "./Frontstage";

/** Provides a definition required to create a Frontstage.
 * @public
 * @deprecated in 4.15.0. Use {@link Frontstage} instead.
 */
export abstract class FrontstageProvider {
  /** Get the FrontstageProvider id. */
  public abstract get id(): string;
  /** Return the frontstage configuration. */
  // eslint-disable-next-line deprecation/deprecation
  public abstract frontstageConfig(): FrontstageConfig;
}
