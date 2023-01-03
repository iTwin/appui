/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import { StagePanelLocation } from "@itwin/appui-abstract";

/** @internal */
export type SupportedStagePanelLocation = StagePanelLocation.Bottom | StagePanelLocation.Left | StagePanelLocation.Right | StagePanelLocation.Top;

/** @internal */
export function toSupportedStagePanelLocation(location: StagePanelLocation): location is SupportedStagePanelLocation {
  switch (location) {
    case StagePanelLocation.Bottom:
    case StagePanelLocation.Left:
    case StagePanelLocation.Right:
    case StagePanelLocation.Top:
      return true;
  }
  return false;
}
