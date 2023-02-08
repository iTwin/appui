/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import { StagePanelLocation as UIA_StagePanelLocation } from "@itwin/appui-abstract";

/** Available Stage Panel locations.
 * @public // TODO: 4.x cleanup
 */
export type StagePanelLocation = UIA_StagePanelLocation; // eslint-disable-line deprecation/deprecation

/** Available Stage Panel locations.
 * @public // TODO: 4.x cleanup
 */
export const StagePanelLocation = UIA_StagePanelLocation; // eslint-disable-line @typescript-eslint/no-redeclare, deprecation/deprecation
