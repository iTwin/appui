/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

/** Enumeration of time formats.
 * @public
 * @deprecated in 4.16.0. Use {@link @itwin/components-react#TimeFormat} instead.
 */
export enum TimeFormat {
  /** Show Date and time using toISOString */
  None = 0,
  /** Show Date using toLocaleDateString */
  Short,
  /** Show Date Time using toLocaleString */
  Long,
}
