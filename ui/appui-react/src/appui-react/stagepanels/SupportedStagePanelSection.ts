/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import { StagePanelSection } from "@itwin/appui-abstract";

/** @internal */
export type SupportedStagePanelSection = StagePanelSection.Start | StagePanelSection.End;

/** @internal */
export function toSupportedStagePanelSection(section: StagePanelSection): section is SupportedStagePanelSection {
  switch (section) {
    case StagePanelSection.Start:
    case StagePanelSection.End:
      return true;
  }
  return false;
}
