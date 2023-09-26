/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Widget
 */

import type { StagePanelLocation } from "../stagepanels/StagePanelLocation";
import type { StagePanelSection } from "../stagepanels/StagePanelSection";

/** Helper class to create widget items.
 * @alpha
 */
export namespace WidgetUtilities {
  /** @alpha */
  export function toContainerId( // TODO: rename?
    location: StagePanelLocation,
    section: StagePanelSection
  ) {
    return JSON.stringify({ location, section });
  }

  /** @alpha */
  export function fromContainerId(toolbarId: string):
    | undefined
    | {
        location: StagePanelLocation;
        section: StagePanelSection;
      } {
    const obj = JSON.parse(toolbarId);
    const location = obj.location;
    const section = obj.section;
    if (location === undefined) return undefined;
    if (section === undefined) return undefined;
    return { location, section };
  }
}
