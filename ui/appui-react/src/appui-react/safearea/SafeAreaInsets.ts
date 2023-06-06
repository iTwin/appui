/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

/** Describes available safe area insets.
 * @public
 */
export enum SafeAreaInsets {
  Bottom = 1 << 0,
  Left = 1 << 1,
  Right = 1 << 2,
  Top = 1 << 3,
  All = SafeAreaInsets.Bottom |
    SafeAreaInsets.Left |
    SafeAreaInsets.Right |
    SafeAreaInsets.Top,
}
