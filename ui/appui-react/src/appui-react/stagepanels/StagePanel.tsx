/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import * as React from "react";

import { WidgetProps } from "../widgets/WidgetProps";
import { StagePanelState as StagePanelState } from "./StagePanelDef";

/** Available StagePanel locations.
 * ------------------------------------------------------------------------------------
 * Left     | Top                                                           | Right
 *          |---------------------------------------------------------------|
 *          | AppContent                                                    |
 *          |                                                               |
 *          |                                                               |
 *          |                                                               |
 *          |                                                               |
 *          |                                                               |
 *          |---------------------------------------------------------------|
 *          | Bottom                                                        |
 * ------------------------------------------------------------------------------------
 */

/** Properties of a stage panel section.
 * @public
 */
export interface PanelSectionProps {
  /** Properties for the Widgets in this Zone.
   * @note Stable `WidgetProps["id"]` is generated if id is not provided to correctly save and restore App layout.
   * [[Frontstage]] version must be increased when Widget location is changed or new widgets are added/removed.
   */
  widgets: Array<WidgetProps>;
  /** Any application data to attach to this Zone. */
  applicationData?: any;
}

/** Describes available stage panel sections.
 * @public
 */
export interface PanelSectionsProps {
  /** Properties of the Start section. */
  start?: PanelSectionProps;
  /** Properties of the End section. */
  end?: PanelSectionProps;
}

/** Available units of panel max size. Pixels or percentage of App size.
 * @note Percentage of App `height` is used for top/bottom panel and percentage of App `width` is used for left/right panel.
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
  resizable?: boolean;
  /** Default size of the panel. */
  size?: number;

  /** Properties for the Panel Zones in this Panel. */
  sections?: PanelSectionsProps;
}
