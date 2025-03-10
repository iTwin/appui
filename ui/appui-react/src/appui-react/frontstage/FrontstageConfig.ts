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
} from "../content/ContentGroup.js";
import type { StagePanelConfig } from "../stagepanels/StagePanelConfig.js";
import type { WidgetConfig } from "../widgets/WidgetConfig.js";
import type { Frontstage } from "./Frontstage.js";
import type { UiItemsProvider } from "../ui-items-provider/UiItemsProvider.js";
import type { StageUsage } from "./StageUsage.js";

/** Configuration from which a frontstage is created.
 * @public
 * @deprecated in 4.15.0. Use {@link Frontstage} instead.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface FrontstageConfig extends CommonProps {
  /** Id of the frontstage. To ensure uniqueness it is common practice to format id like `appName:stageId` */
  readonly id: string;
  /** Content group of the frontstage that describes the content views. Or a content group provider. */
  readonly contentGroup: ContentGroup | ContentGroupProvider;
  /** Usage type for this Frontstage. To allow generic {@link UiItemsProvider} to populate this stage set to {@link StageUsage.General}. */
  readonly usage?: string;
  /** Frontstage version. Used to force saved layout reinitialization after changes to frontstage.
   * @note This value should be increased when changes are made to the Frontstage.
   * Increasing the value will make sure to reinitialize App layout instead of restoring to old layout.
   */
  readonly version: number;
  /** The defaultTool is started when then frontstage loads and whenever any other tools exit.
   * Most of the time, this is the Element Selection Tool (SelectionTool.toolId).
   * Your app can specify its own tool or another core tool as default with this property.
   */
  readonly defaultTool?: string;

  /** The top-left corner that shows tools typically used to query and modify content. */
  readonly contentManipulation?: WidgetConfig;
  /** The settings of the active tool. */
  readonly toolSettings?: WidgetConfig & {
    /** Custom node for active tool, when tool has no settings. */
    activeToolEmptyNode?: React.ReactNode;
  };
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

  /**
   * Specifies a custom layout component that overrides or customizes the standard widget based layout.
   * Additionally, {@link StandardLayout} component can be used to wrap the standard layout with frontstage specific providers.
   * @alpha
   */
  readonly layout?: React.ReactNode;
}
