/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/* eslint-disable deprecation/deprecation */
/** @packageDocumentation
 * @module Frontstage
 */

import * as React from "react";
import { StagePanelLocation } from "@itwin/appui-abstract";
import { RectangleProps } from "@itwin/core-react";
import { ZoneDef } from "../zones/ZoneDef";

// TODO: consider removing non-deprecated UI1.0 interfaces.

/** Interface defining callbacks for stage panel changes
 * @public
 */
export interface StagePanelChangeHandler {
  /** @alpha */
  handlePanelInitialize(panelLocation: StagePanelLocation, size: number): void;
  /** @alpha */
  handlePanelResize(panelLocation: StagePanelLocation, resizeBy: number): void;
  /** @alpha */
  handlePanelPaneTargetChange(panelLocation: StagePanelLocation, paneIndex: number | undefined): void;
  /** @alpha */
  handlePanelTargetChange(panelLocation: StagePanelLocation | undefined): void;
  /** @alpha */
  handleTogglePanelCollapse(panelLocation: StagePanelLocation): void;
}

/** Interface defining callbacks for nine zone changes
 * @public
 */
export interface NineZoneChangeHandler {
  handleFloatingZonesBoundsChange(bounds: RectangleProps): void;
  handleZonesBoundsChange(bounds: RectangleProps): void;
}

/** Interface defining a provider for Zone definitions
 * @public
 */
export interface ZoneDefProvider {
  getZoneDef(zoneId: number): ZoneDef | undefined;
}

/** @internal */
export const ToolGroupPanelContext = React.createContext(false); // eslint-disable-line @typescript-eslint/naming-convention
