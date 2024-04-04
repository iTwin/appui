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
 */
export type BadgeType = _BadgeType; // eslint-disable-line deprecation/deprecation

/** Specifies type of badge, if any, that should be overlaid on UI component.
 * @public
 */
export const BadgeType = _BadgeType; // eslint-disable-line @typescript-eslint/no-redeclare, deprecation/deprecation
