/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Utilities
 */

import { BadgeType as _BadgeType } from "@itwin/appui-abstract";

/** Specifies type of badge, if any, that should be overlaid on UI component.
 * @public
 * @deprecated in 4.16.0. Use values from badge kind string union instead.
 */
export type BadgeType = _BadgeType;

/** Specifies type of badge, if any, that should be overlaid on UI component.
 * @public
 * @deprecated in 4.16.0. Usevalues from badge kind string union instead.
 */
export const BadgeType = _BadgeType; // eslint-disable-line @typescript-eslint/no-redeclare

/** Type of badge that should be overlaid on UI component.
 * @internal
 */
export type BadgeKind =
  | "technical-preview"
  | "new"
  | "deprecated"
  | (string & {});
