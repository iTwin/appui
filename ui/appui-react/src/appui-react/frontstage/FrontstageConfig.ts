/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Frontstage
 */

import type { CommonProps } from "@itwin/core-react";
import type {
  ContentGroup,
  ContentGroupProvider,
} from "../content/ContentGroup";
import type { StagePanelConfig } from "../stagepanels/StagePanelConfig";
import type { WidgetConfig } from "../widgets/WidgetConfig";

/** Configuration from which a frontstage is created.
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export interface FrontstageConfig extends CommonProps {
  /** Id for the Frontstage */
  readonly id: string;
  /** The Content Group providing the Content Views */
  readonly contentGroup: ContentGroup | ContentGroupProvider;
  /** Usage type for this Frontstage. */
  readonly usage?: string;
  /** Frontstage version. Used to force saved layout reinitialization after changes to frontstage.
   * @note This value should be increased when changes are made to the Frontstage.
   * Increasing the value will make sure to reinitialize App layout instead of restoring to old layout.
   */
  readonly version: number;
  /** The defaultTool is is started when then frontstage loads and whenever any other tools exit.
   * Most of the time, this is the Element Selection Tool (SelectionTool.toolId).
   * Your app can specify its own tool or another core tool as default with this property.
   */
  readonly defaultTool?: string;

  /** The top-left corner that shows tools typically used to query and modify content. */
  readonly contentManipulation?: WidgetConfig;
  /** The settings of the active tool. */
  readonly toolSettings?: WidgetConfig;
  /** The top-right corner that shows view navigation tools. */
  readonly viewNavigation?: WidgetConfig;
  /** The status bar of the application. */
  readonly statusBar?: WidgetConfig;

  /** Top panel of the application. */
  readonly topPanel?: StagePanelConfig;
  /** Left panel of the application. */
  readonly leftPanel?: StagePanelConfig;
  /** Right panel of the application. */
  readonly rightPanel?: StagePanelConfig;
  /** Bottom panel of the application. */
  readonly bottomPanel?: StagePanelConfig;
}
