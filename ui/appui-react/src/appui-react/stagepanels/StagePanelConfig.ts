/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import type { WidgetConfig } from "../widgets/WidgetConfig.js";
import type { StagePanelState } from "./StagePanelState.js";

/** Configuration from which a stage panel is created.
 * @public
 */
export interface StagePanelConfig {
  /** Default Panel state. Controls how the panel is initially displayed. Defaults to StagePanelState.Open. */
  readonly defaultState?: StagePanelState;
  /** Maximum size of the panel.
   * @deprecated in 4.12.0. Please use {@link StagePanelConfig.maxSizeSpec}.
   */
  readonly maxSize?: StagePanelMaxSizeSpec; // eslint-disable-line deprecation/deprecation
  /** Maximum size of the panel. */
  readonly maxSizeSpec?: StagePanelSizeSpec;
  /** Minimum size of the panel.
   *  @deprecated in 4.12.0. Please use {@link StagePanelConfig.minSizeSpec}.
   */
  readonly minSize?: number;
  /** Minimum size of the panel. */
  readonly minSizeSpec?: StagePanelSizeSpec;
  /** Indicates whether the panel is pinned. Defaults to true. */
  readonly pinned?: boolean;
  /** Indicates whether the panel is resizable. Defaults to true. */
  readonly resizable?: boolean;
  /** Default size of the panel.
   * @deprecated in 4.12.0. Please use {@link StagePanelConfig.sizeSpec}.
   */
  readonly size?: number;
  /** Default size of the panel. */
  readonly sizeSpec?: StagePanelSizeSpec;
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
 * @deprecated in 4.12.0. Please use {@link StagePanelSizeSpec}.
 */
export type StagePanelMaxSizeSpec = number | { percentage: number };

/** Available units of panel size - pixels or percentage of app size.
 * @note Percentage of App `height` is used for top/bottom panel and percentage of app `width` is used for left/right panel.
 * @public
 */
export type StagePanelSizeSpec = number | { percentage: number };
