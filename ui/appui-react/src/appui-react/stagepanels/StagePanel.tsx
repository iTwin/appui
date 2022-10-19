/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import * as React from "react";
import { StagePanelLocation } from "@itwin/appui-abstract";

import { WidgetProps } from "../widgets/WidgetProps";
import { StagePanelDef, StagePanelState as StagePanelState } from "./StagePanelDef";

/** Available StagePanel locations.
 * ------------------------------------------------------------------------------------
 * TopMost
 * ------------------------------------------------------------------------------------
 * Left     | Top                                                           | Right
 *          |---------------------------------------------------------------|
 *          | Nine-zone                                                     |
 *          |                                                               |
 *          |                                                               |
 *          |                                                               |
 *          |                                                               |
 *          |                                                               |
 *          |---------------------------------------------------------------|
 *          | Bottom                                                        |
 * ------------------------------------------------------------------------------------
 * BottomMost
 * ------------------------------------------------------------------------------------
 */

/** Properties of a Stage Panel Zone
 * @public @deprecated
 */
export interface StagePanelZoneProps {
  /** Properties for the Widgets in this Zone.
   * @note Stable `WidgetProps["id"]` is generated if id is not provided to correctly save and restore App layout.
   * [[Frontstage]] version must be increased when Widget location is changed or new widgets are added/removed.
   */
  widgets: Array<React.ReactElement<WidgetProps>>;
  /** Any application data to attach to this Zone. */
  applicationData?: any;
}

/** Properties of the Stage Panel Zones
 * @public @deprecated
 */
export interface StagePanelZonesProps {
  /** Properties for the Widgets in the Start section. */
  start?: StagePanelZoneProps; // eslint-disable-line deprecation/deprecation
  /** Properties for the Widgets in the Middle section. Deprecated - all widgets originally targeted for "middle" will now go to "end". */
  middle?: StagePanelZoneProps; // eslint-disable-line deprecation/deprecation
  /** Properties for the Widgets in the End section. */
  end?: StagePanelZoneProps; // eslint-disable-line deprecation/deprecation
}

/** Available units of panel maximum size. Pixels or percentage of 9-Zone App size.
 * @note Percentage of 9-Zone `height` is used for top/bottom panel and percentage of 9-Zone `width` is used for left/right panel.
 * @public
 */
export type StagePanelMaxSizeSpec = number | { percentage: number };

/** Properties of a [[StagePanel]] component
 * @public
 */
export interface StagePanelProps {
  /** Any application data to attach to this Panel. */
  applicationData?: any;
  /** Default Panel state. Controls how the panel is initially displayed. Defaults to StagePanelState.Open. */
  defaultState?: StagePanelState;
  /** Stage panel header. */
  header?: React.ReactNode;
  /** Maximum size of the panel. */
  maxSize?: StagePanelMaxSizeSpec;
  /** Minimum size of the panel. */
  minSize?: number;
  /** Indicates whether the panel is pinned. Defaults to true. */
  pinned?: boolean;
  /** Indicates whether the panel is resizable. Defaults to true. */
  resizable: boolean;
  /** Default size of the panel. */
  size?: number;
  /** Properties for the Widgets in this Panel.
   * @note Stable `WidgetProps["id"]` is generated if id is not provided to correctly save and restore App layout.
   * [[Frontstage]] version must be increased when Widget location is changed or new widgets are added/removed.
   */
  widgets?: Array<React.ReactElement<WidgetProps>>;

  /** Properties for the Panel Zones in this Panel.
   * @beta */
  panelZones?: StagePanelZonesProps; // eslint-disable-line deprecation/deprecation
}

/** Default properties of [[StagePanel]] component.
 * @public
 */
export type StagePanelDefaultProps = Pick<StagePanelProps, "resizable">;

/** Frontstage Panel React component.
 * @public
 */
export class StagePanel extends React.Component<StagePanelProps> {
  public static readonly defaultProps: StagePanelDefaultProps = {
    resizable: true,
  };

  public static initializeStagePanelDef(panelDef: StagePanelDef, props: StagePanelProps, panelLocation: StagePanelLocation): void {
    panelDef.initializeFromProps(props, panelLocation);
  }

  public override render(): React.ReactNode {
    return null;
  }
}
