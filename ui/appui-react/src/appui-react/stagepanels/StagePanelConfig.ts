/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import type { WidgetConfig } from "../widgets/WidgetConfig";
import type { StagePanelState } from "./StagePanelState";

/** Configuration from which a stage panel is created.
 * @public
 */
export interface StagePanelConfig {
  /** Default Panel state. Controls how the panel is initially displayed. Defaults to StagePanelState.Open. */
  readonly defaultState?: StagePanelState;
  /** Maximum size of the panel. */
  readonly maxSize?: StagePanelMaxSizeSpec;
  /** Minimum size of the panel. */
  readonly minSize?: number;
  /** Indicates whether the panel is pinned. Defaults to true. */
  readonly pinned?: boolean;
  /** Indicates whether the panel is resizable. Defaults to true. */
  readonly resizable?: boolean;
  /** Default size of the panel. */
  readonly size?: number;
  /** Configuration of the panel sections. */
  readonly sections?: StagePanelSectionsConfig;
}

/** Configuration from which a stage panel section is created.
 * @public
 */
export type StagePanelSectionConfig = ReadonlyArray<WidgetConfig>;

/** Configuration from which stage panel sections are created.
 * @public
 */
export interface StagePanelSectionsConfig {
  /** Configuration of the `start` section. */
  readonly start?: StagePanelSectionConfig;
  /** Configuration of the `end` section. */
  readonly end?: StagePanelSectionConfig;
}

/** Available units of panel max size. Pixels or percentage of App size.
 * @note Percentage of App `height` is used for top/bottom panel and percentage of App `width` is used for left/right panel.
 * @public
 */
export type StagePanelMaxSizeSpec = number | { percentage: number };
